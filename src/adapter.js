class Adapter {
  constructor() {

  }
  static getUsers() {
    fetch('http://localhost:3000/api/v1/users')
    .then(resp => resp.json())
    .then(json => User.createUser(json))
  }


  static getNotes() {
    fetch('http://localhost:3000/api/v1/users/1')
    .then(resp => resp.json())
    // .then(json => console.log(json.notes))
    .then(json => Note.createNote(json.notes))
  }

  static createNewNote(json) {
    fetch('http://localhost:3000/api/v1/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json)
    }).then(resp => resp.json())
    .then(data => Adapter.getNotes())
    // .then(data => Note.updateFormValue())
    // .then(console.log)
  }

  static deleteNote(id) {
    fetch(`http://localhost:3000/api/v1/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(Adapter.getNotes())
  }

  static updateNote(id) {

  }


}
