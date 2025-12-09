import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const MONGODB_DB = process.env.MONGODB_DB || 'dfw_furniture';

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local');
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(MONGODB_URI, {
    maxPoolSize: 10,
    minPoolSize: 5,
  });

  const db = client.db(MONGODB_DB);

  cachedClient = client;
  cachedDb = db;

  console.log('✅ MongoDB connected successfully');

  return { client, db };
}

export async function getDatabase(): Promise<Db> {
  const { db } = await connectToDatabase();
  return db;
}

export async function closeDatabaseConnection() {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
    console.log('MongoDB connection closed');
  }
}
