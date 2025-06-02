import http from 'node:http'
import { Transform, Writable } from 'node:stream'

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = String(Number(chunk.toString()) * -1)
    console.log(transformed)
    callback(null, Buffer.from(transformed))
  }
}

const server = http.createServer(async (req, res) => {
  if (req.url === 'full') {
    const buffers = []

    // This for await the entire stream end to continue
    for await (const chunk of req) {
      buffers.push(chunk)
    }

    const fullStreamContent = Buffer.concat(buffers).toString()
    console.log(fullStreamContent)

    return res.end(fullStreamContent)
  }

  return req
    .pipe(new InverseNumberStream())
    .pipe(res)
});

server.listen(3334);
