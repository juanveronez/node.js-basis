import http from 'node:http'
import { json } from './middlewares/json.js'

const users = []

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  if (url === '/users' && method === 'GET') {
    return res.end(JSON.stringify(users))
  }

  if (url === '/users' && method === 'POST') {
    const { name, email } = req.body

    const user = {
      id: users.length + 1,
      name,
      email,
    }

    users.push(user)

    return res.writeHead(201).end()
  }

  if (url === '/users' && method === 'DELETE') {
    return res.end('Delete user')
  }

  res
    .writeHead(404)
    .end(JSON.stringify({ error: 'resource not found', method, url }))
})

server.listen(3333)
