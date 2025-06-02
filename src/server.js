import http from 'node:http'

const users = []

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    req.body = null
  }

  if (url === '/users' && method === 'GET') {
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users))
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
    .setHeader('Content-type', 'application/json')
    .writeHead(404)
    .end(JSON.stringify({ error: 'resource not found', method, url }))
})

server.listen(3333)
