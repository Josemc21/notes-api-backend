const mongoose = require('mongoose')
const { test, afterAll, expect, beforeEach, describe } = require('@jest/globals')

const { server } = require('../index')
const Note = require('../models/Note')
const { api, initialNotes, getAllContentFromNotes } = require('./helpers')

beforeEach(async () => {
  await Note.deleteMany({})

  // parallel
  // const noteObjects = initialNotes.map(note => new Note(note))
  // const promises = noteObjects.map(note => note.save())
  // await Promise.all(promises)

  // sequential
  for (let note of initialNotes) {
    const noteObject = new Note(note)
    await noteObject.save()
  }
})

describe('GET all notes', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are three notes', async () => {
    const response = await api.get('/api/notes')

    expect(response.body).toHaveLength(initialNotes.length)
  })

  test('the first note is about new note', async () => {
    const { contents } = await getAllContentFromNotes()

    expect(contents).toContain('This is a new note')
  })
})

describe('create a note', () => {
  test('is possible with a valid note', async () => {
    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true
    }
  
    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const { contents, response } = await getAllContentFromNotes()
  
    expect(response.body).toHaveLength(initialNotes.length + 1)
    expect(contents).toContain(newNote.content)
  })
  
  test('is not possible with an invalid note', async () => {
    const newNote = {
      important: true
    }
  
    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)
  
    const response = await api.get('/api/notes')
  
    expect(response.body).toHaveLength(initialNotes.length)
  })
})

test('a note can be updated', async () => {
  const { response: firstResponse } = await getAllContentFromNotes()
  const { body: notes } = firstResponse

  const noteToUpdate = notes[0]
  const updatedNote = {
    content: 'This note has been updated',
    important: false
  }

  await api
    .put(`/api/notes/${noteToUpdate.id}`)
    .send(updatedNote)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const { contents: afterUpdateContents, response: secondResponse } = await getAllContentFromNotes()

  expect(secondResponse.body).toHaveLength(initialNotes.length)
  expect(afterUpdateContents).toContain(updatedNote.content)
  expect(afterUpdateContents).not.toContain(noteToUpdate.content)
})

test('a note can be deleted', async () => {
  const { response: firstResponse } = await getAllContentFromNotes()
  const { body: notes } = firstResponse
  const noteToDelete = notes[0]

  await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204)

  const { contents, response: secondResponse } = await getAllContentFromNotes()

  expect(secondResponse.body).toHaveLength(initialNotes.length - 1)
  expect(contents).not.toContain(noteToDelete.content)
})

test('a note that does not exist can not be deleted', async () => {
  await api
    .delete('/api/notes/1234')
    .expect(400)

  const { response } = await getAllContentFromNotes()
  
  expect(response.body).toHaveLength(initialNotes.length)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})