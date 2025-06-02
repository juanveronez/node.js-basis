import { Transform } from 'node:stream'

export class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = String(Number(chunk.toString()) * -1)

    // callback(<error>, <value>)
    callback(null, Buffer.from(transformed))
  }
}
