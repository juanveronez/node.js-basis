import http from 'node:http'

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (url === '/users' && method === 'GET') {
    return res.end('List users')
  }

  if (url === '/users' && method === 'POST') {
    return res.end('Create user')
  }

  if (url === '/users' && method === 'DELETE') {
    return res.end('Delete user')
  }

  res.end(method, url)
})

server.listen(3333)
