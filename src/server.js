import http from 'node:http'

const server = http.createServer((req, res) => {
  res.end('hello world!')
})

server.listen(3333)
