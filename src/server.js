import http from 'node:http'
import { json } from './middlewares/json.js'
import { Database } from './database.js'

const database = new Database()

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  if (url === '/users' && method === 'GET') {
    return res.end(JSON.stringify(database.select('users')))
  }

  if (url === '/users' && method === 'POST') {
    const { name, email } = req.body

    const user = {
      id: 1,
      name,
      email,
    }

    database.insert('users', user)

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
