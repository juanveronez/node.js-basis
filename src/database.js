import fs from 'node:fs/promises'

// import.meta.url is the absolute path to this module
// new URL creates a path that should be used to ref an absolute location
const databasePath = new URL('../db.json', import.meta.url)

export class Database {
  // # set something as private
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then(data => {
        this.#database = JSON.parse(data)
      })
      .catch(() => this.#persist())
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(entity, search) {
    let data = this.#database[entity] ?? []

    if (search) {
      data = data.filter(row => (
        Object.entries(search).some(
          ([key, value]) => row[key].toLowerCase().includes(value.toLowerCase())
        )
      ))
    }

    return data
  }

  insert(entity, data) {
    if (Array.isArray(this.#database[entity])) {
      this.#database[entity].push(data)
    } else {
      this.#database[entity] = [data]
    }

    this.#persist()

    return data
  }

  update(entity, id, data) {
    const rowIndex = this.#database[entity].findIndex((item) => item.id === id)

    if (rowIndex > -1) {
      this.#database[entity][rowIndex] = { id, ...data }
      this.#persist()
    }
  }

  delete(entity, id) {
    const rowIndex = this.#database[entity].findIndex((item) => item.id === id)

    if (rowIndex > -1) {
      this.#database[entity].splice(rowIndex, 1)
      this.#persist()
    }
  }
}
