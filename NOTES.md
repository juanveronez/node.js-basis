# NodeJS

## Streams

As streams são uma abstração para trabalhar com dados que podem ser lidos ou escritos de forma contínua, sem precisar carregar tudo na memória de uma vez. Elas são úteis para manipular grandes volumes de dados, como arquivos ou transmissões.

Exemplos de uso incluem leitura e escrita de arquivos, manipulação de dados em tempo real, e comunicação entre processos.

Esse conceito é útil, pois permite que você trabalhe com dados de forma eficiente, sem precisar carregar tudo na memória de uma vez. Por exemplo, ao ler um arquivo grande, você pode processar os dados à medida que eles são lidos, em vez de esperar que todo o arquivo seja carregado.

Pensando em um cenário onde você precisa ler um arquivo CSV de 1GB e a velocidade de internet é 10Mbps, você pode usar streams para ler o arquivo em partes, processando cada parte à medida que é lida. Isso evita o uso excessivo de memória e permite que você comece a trabalhar com os dados imediatamente, sem esperar que todo o arquivo seja carregado.

No NodeJS temos quatro tipos principais de streams:
1. **Readable**: Permite ler dados de uma fonte, como um arquivo .CSV de 1GB.
```js
export class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))

        this.push(buf)
      }
    }, 1000)
  }
}
```

2. **Writable**: Permite escrever dados em um destino, como a transmição de uma série na Netflix.
```js
export class LogStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(`Escrevendo: ${chunk.toString()}`)
    callback()
  }
}
```

3. **Transform**: Permite transformar dados, por meio de uma função capturamos o buffer de entrada, utilizamos uma transformação e depois escrevemos o resultado em um buffer de saída.
```js
export class UpperCaseTransform extends Transform {
  _transform(chunk, encoding, callback) {
    const upperCaseChunk = chunk.toString().toUpperCase()
    this.push(upperCaseChunk)
    callback()
  }
}
```

4. **Duplex**: Permite ler e escrever dados ao mesmo tempo, como em uma conexão de rede bidirecional, acaba sendo uma junção dos tipos Readable e Writable, porém não é muito comum.
