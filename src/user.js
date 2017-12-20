const allUsers = []

class User {
  constructor(json) {
    this.id = json.id
    this.name = json.name
  }

  static all() {
    return [...allUsers]
  }
}
