import http from 'node:http'

const server = http.createServer((req, res) => {
  res.end('Hello Node.JS!')
})

server.listen(3333)
