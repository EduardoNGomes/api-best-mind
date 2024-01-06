import fastify from 'fastify'

const app = fastify()

app.get('/', (req, reply) => {
  console.log('hello world')
  return reply.status(200).send()
})

app.listen({ port: 8080 }).then(() => {
  console.log('server is running')
})
