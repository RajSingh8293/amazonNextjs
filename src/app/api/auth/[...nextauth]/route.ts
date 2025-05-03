import { authOptions } from "@/lib/auth/options";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { NextAuthOptions } from "next-auth";
// import User from "@/models/user.model";
// import bcrypt from "bcryptjs";
// import { dbConnect } from "@/lib/db/dbConnect";
// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         await dbConnect();
//         const user = await User.findOne({ email: credentials?.email });

//         if (!user) throw new Error("No user found");
//         const isValid = bcrypt.compare(
//           credentials!.password as string,
//           user.password
//         );
//         if (!isValid) throw new Error("Invalid password");
//         return {
//           id: user._id.toString(),
//           name: user.name,
//           email: user.email,
//           role: user.role,
//         };
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   pages: {
//     signIn: "/sign-in", // optional
//     error: "/sign-in", // optional
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id as string;
//         session.user.role = token.role as string;
//       }
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

// app/api/auth/[...nextauth]/route.ts
