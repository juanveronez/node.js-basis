export class Database {
  // # set something as private
  #database = {}

  select(entity) {
    const data = this.#database[entity] ?? []
    return data
  }

  insert(entity, data) {
    if (Array.isArray(this.#database[entity])) {
      this.#database[entity].push(data)
    } else {
      this.#database[entity] = [data]
    }

    return data
  }
}
