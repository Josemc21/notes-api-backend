const notesRouter = require('express').Router()
const mongoose = require('mongoose')
const Note = require('../models/Note')

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  response.json(notes)
})

notesRouter.get('/:id', (request, response, next) => {
  const { id } = request.params
  
  Note.findById(id).then(note => {
    if (note) response.json(note)
    else response.status(404).end()
  })
    .catch(error => next(error))
})

notesRouter.put('/:id', (request, response, next) => {
  const { id } = request.params
  const note = request.body

  const newNoteInfo = {
    content: note.content,
    important: note.important,
  }

  Note.findByIdAndUpdate(id, newNoteInfo, {new: true})
    .then(result => response.json(result))
    .catch(error => next(error))
})

notesRouter.delete('/:id', async (request, response, next) => {
  const { id } = request.params

  // Verifica si el ID es un ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ error: 'malformatted id' })
  }

  try {
    const result = await Note.findByIdAndDelete(id)
    if (!result) {
      return response.status(404).json({ error: 'Note not found' })
    }

    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

notesRouter.post('/', async (request, response, next) => {
  const note = request.body

  if (!note || !note.content) {
    return response.status(400).json({
      error: 'note.content is missing'
    })
  }

  const newNote = new Note({
    content: note.content,
    important: note.important || false,
    date: new Date(),
  })

  try {
    const savedNote = await newNote.save()
    response.status(201).json(savedNote)
  } catch (error) {
    next(error)
  }
})

module.exports = notesRouter