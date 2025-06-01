import http from 'node:http'

const users = []

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (url === '/users' && method === 'GET') {
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users))
  }

  if (url === '/users' && method === 'POST') {
    const user = {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@email.com'
    }

    users.push(user)

    return res.writeHead(201).end()
  }

  if (url === '/users' && method === 'DELETE') {
    return res.end('Delete user')
  }

  res
    .setHeader('Content-type', 'application/json')
    .writeHead(404)
    .end(JSON.stringify({ error: 'resource not found', method, url }))
})

server.listen(3333)
