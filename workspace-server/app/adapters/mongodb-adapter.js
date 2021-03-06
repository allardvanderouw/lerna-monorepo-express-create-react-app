const { MongoClient } = require('mongodb')

let dbConnection
let db

const getDB = () => db

const connect = async (mongoDbUri) => {
  // Connect to Mongo DB
  dbConnection = await MongoClient.connect(mongoDbUri, { useNewUrlParser: true })
  db = dbConnection.db()

  return db
}

const close = async () => {
  if (dbConnection) {
    dbConnection.removeAllListeners()
    await dbConnection.close()
  }
}

module.exports = {
  getDB,
  connect,
  close,
}
