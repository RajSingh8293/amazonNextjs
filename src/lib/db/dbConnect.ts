import mongoose from "mongoose";

// export async function dbConnect() {
//   try {
//     mongoose.connect(process.env.MONGODB_URI!);
//     const connection = mongoose.connection;
//     connection.on("connected", () => {
//       console.log("Connected Database");
//     });
//     connection.on("error", (error) => {
//       console.log("Connection failed", error);
//       process.exit();
//     });
//   } catch (error) {
//     console.log("Something went wrong with db connection :", error);
//   }
// }

type CachedMongoose = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Type global properly
declare global {
  let mongoose: CachedMongoose | undefined;
}

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env.local"
  );
}

// global casting
const globalForMongoose = global as typeof globalThis & {
  mongoose: CachedMongoose;
};

let cached = globalForMongoose.mongoose;

if (!cached) {
  cached = globalForMongoose.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = { bufferCommands: false };
    cached.promise = mongoose
      .connect(MONGO_URI, opts)
      .then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
