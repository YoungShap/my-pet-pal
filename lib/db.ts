import { MongoClient, Db } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

const uri = process.env.MONGO_URI;
const dbName = 'petClinic'; 

export async function connectToDatabase(): Promise<Db> {
  try {
    if (!uri) {
      throw new Error("MONGO_URI is not defined");
    }

    if (cachedDb) {
      return cachedDb;
    }

    cachedClient = new MongoClient(uri, {} as any);

    await cachedClient.connect();
    cachedDb = cachedClient.db(dbName);

    console.log("Connected to MongoDB");

    return cachedDb;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
