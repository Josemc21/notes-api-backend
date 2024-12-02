const mongoose = require('mongoose')

const { MONGODB_URI,  MONGODB_URI_TEST, NODE_ENV } = process.env

const connectionString = NODE_ENV === 'test'
  ? MONGODB_URI_TEST
  : MONGODB_URI

if (!connectionString) {
  console.error('No connection string provided')
  process.exit(1)
}

// Connect to MongoDB
mongoose.connect(connectionString)
  .then(() => {
    console.log('Connected to MongoDB')
  }).catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })

process.on('uncaughtException', error => {
  console.error('uncaughtException', error.message)
  mongoose.disconnect()
})

/* 
const note = new Note({
    content: 'MongoDB is easy',
    date: new Date(),
    important: true,
})

note.save().then(result => {
    console.log(result)
    mongoose.connection.close()
}).catch(error => {
    console.log(error)
}) */