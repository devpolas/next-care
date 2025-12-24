import mongoose from "mongoose";

// Cache the connection across hot reloads in development
const cached: {
  connection: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
} = {
  connection: null,
  promise: null,
};

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.connection) return cached.connection;

  if (!cached.promise) {
    let dbUri = process.env.MONGODB_URI;
    if (dbUri) {
      dbUri = dbUri
        .replace("<DB_USER>", process.env.DB_USER || "")
        .replace("<DB_PASSWORD>", process.env.DB_PASSWORD || "");
    }

    if (!dbUri) {
      throw new Error(
        "Please define the MONGODB_URI environment variable inside .env"
      );
    }

    cached.promise = mongoose.connect(dbUri).then((mongooseInstance) => {
      console.log("MongoDB connected successfully");
      return mongooseInstance;
    });
  }

  cached.connection = await cached.promise;
  return cached.connection;
}

export default dbConnect;
