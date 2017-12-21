const allUsers = []

let currentUser = document.getElementById('user-dropdown')

class User {
  constructor(json) {
    this.id = json.id
    this.name = json.name
    allUsers.push(this)
  }


/////////static methods
  static all() {
    return [...allUsers]
  }

  static createUser(json) {
    for (var i = 0; i < json.length; i++) {
      let user = json[i]
      let newUser = new User(user)
      newUser.addToDropdown()
    }
  }




///////////instance methods

  addToDropdown() {
    let option = document.createElement('option')
    option.innerHTML = `${this.name}`
    option.value = `${this.id}`
    document.getElementById('user-dropdown').appendChild(option)
  }


  // render () {
  //   return `${this.name}`
  // }


}
