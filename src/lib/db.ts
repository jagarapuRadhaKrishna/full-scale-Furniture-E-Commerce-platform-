import { MongoClient, Db, MongoClientOptions, Document } from 'mongodb'

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local')
}

const uri = process.env.MONGODB_URI
const options: MongoClientOptions = {
  maxPoolSize: 10,
  minPoolSize: 2,
  maxIdleTimeMS: 30000,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise as Promise<MongoClient>
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise

export async function getDatabase(): Promise<Db> {
  const client = await clientPromise
  return client.db(process.env.MONGODB_DB_NAME || 'dfw_furniture')
}

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB_NAME || 'dfw_furniture')
  return { client, db }
}

export async function getClient(): Promise<MongoClient> {
  return clientPromise
}

export async function testConnection(): Promise<boolean> {
  try {
    const client = await clientPromise
    await client.db().admin().ping()
    console.log('MongoDB connected')
    return true
  } catch (err) {
    console.error('MongoDB connection error', err)
    return false
  }
}

export async function closeConnection(): Promise<void> {
  try {
    const client = await clientPromise
    await client.close()
    console.log('MongoDB connection closed')
  } catch (err) {
    console.error('Error closing MongoDB connection', err)
  }
}

export async function getCollection<T extends Document = Document>(name: string) {
  const db = await getDatabase()
  return db.collection<T>(name)
}

export async function initializeIndexes(): Promise<void> {
  const db = await getDatabase()
  // create minimal required indexes; additional indexes can be added later
  await db.collection('users').createIndex({ email: 1 }, { unique: true })
  await db.collection('products').createIndex({ slug: 1 }, { unique: true })
  await db.collection('products').createIndex({ title: 'text', description: 'text' })
  await db.collection('orders').createIndex({ userId: 1 })
  console.log('Indexes initialization completed')
}