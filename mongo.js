const mongoose = require('mongoose')

const connectionString = process.env.MONGODB_URI

// Connect to MongoDB
mongoose.connect(connectionString)
    .then(() => {
        console.log('Connected to MongoDB')
    }).catch((error) => {
            console.log('Error connecting to MongoDB:', error.message)
    }
)

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