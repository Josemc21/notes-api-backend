module.exports = (error, request, response, next) => {
  console.error(error)

  if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
  } else 
      response.status(500).end()

  next(error)
}