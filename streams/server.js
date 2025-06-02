import http from 'node:http'
import { Transform, Writable } from 'node:stream'

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = String(Number(chunk.toString()) * -1)
    console.log(transformed)
    callback(null, Buffer.from(transformed))
  }
}

const server = http.createServer((req, res) => {
  return req
    .pipe(new InverseNumberStream())
    .pipe(res)
});

server.listen(3334);
