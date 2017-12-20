class Adapter {
  constructor() {

  }

  static getNotes() {
    fetch('http://localhost:3000/api/v1/notes')
    .then(resp => resp.json())
    .then(json => Note.createNote(json))
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
  }
}
