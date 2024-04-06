import { MongoClient, Db } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

const uri = 'mongodb+srv://avivshapira22:Shap$2503@mypetclinic.x7vp9vj.mongodb.net/';
const dbName = 'petClinic'; 

export async function connectToDatabase(): Promise<Db> {
  try {
    if (cachedDb) {
      return cachedDb;
    }

    cachedClient = new MongoClient(uri, {
    } as any);

    await cachedClient.connect();
    cachedDb = cachedClient.db(dbName);

    console.log("Connected to MongoDB");

    return cachedDb;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}



