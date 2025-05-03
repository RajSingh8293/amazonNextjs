const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID!;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET!;
const PAYPAL_API_BASE =
  process.env.PAYPAL_API_BASE || "https://api-m.sandbox.paypal.com";
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.message || "PayPal API error");
  }

  return response.json();
};

// Get PayPal Access Token
export const getPayPalAccessToken = async (): Promise<string> => {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString(
    "base64"
  );
  const url = `${PAYPAL_API_BASE}/v1/oauth2/token`;
  const response = await fetch(url, {
    method: "post",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  if (!response.ok) {
    const error = await response.json();
    console.error("PayPal Auth Error:", error);
    throw new Error(
      error.error_description || "Failed to fetch PayPal access token"
    );
  }

  const result = await handleResponse(response);
  return result.access_token;
};

export const paypal = {
  createPayPalOrder: async (price: number) => {
    const inrToUsdRate = 83.5;
    const usdAmount = (price / inrToUsdRate).toFixed(2);
    const accessToken = await getPayPalAccessToken();
    console.log("Currency price:", price);
    console.log("Currency price:", price / 83.5);
    const url = `${PAYPAL_API_BASE}/v2/checkout/orders`;
    const body = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: usdAmount,
          },
        },
      ],
    };
    const response = await fetch(url, {
      method: "post",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return handleResponse(response);
    //   return data;
  },
  // Capture PayPal Order
  capturePayPalOrder: async (orderId: string) => {
    const accessToken = await getPayPalAccessToken();
    const url = `${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`;
    const response = await fetch(url, {
      method: "post",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return handleResponse(response);
    //   return data;
  },
};
