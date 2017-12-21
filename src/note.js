// const Note = (function createNoteClass() {
  const all = []
  // return
  class Note {
    constructor(json) {
      this.id = json.id
      this.title = json.title
      this.body = json.body
      // if (!json.user.id) {
      //   this.userId = 'blank'
      // } else {
      //   this.userId = json.user.id
      // }
      all.push(this)
    }

///////static methods
    static all() {
      return [...all]
    }

    static createNote(json) {
      document.getElementById('notes').innerHTML = ''
      let noteId = json[json.length - 1].id
      console.log(noteId);
      this.updateFormValue(noteId)
      for (var i = json.length - 1; i >= 0; i--) {
        let note = json[i]
        let newNote = new Note(note)
        newNote.makeCard()
      }
    }

    static attachListeners() {
      document.getElementById('add-note').addEventListener('click', this.newNote)
      document.getElementById('title').addEventListener('change', this.updateCurrentNote)
      document.getElementById('content').addEventListener('change', this.updateCurrentNote)
      // document.getElementById('')
    }

    static updateCurrentNote(e) {
      let note_id = document.getElementById('note-id').value
      if (e.target.id === 'title') {
        let title = e.target.value
        let data = {note_id, title}
        // console.log(data)
        Adapter.updateNote(data)
      } else if (e.target.id === 'content') {
        let body = e.target.value
        let data = {note_id, body}
        // console.log(data)
        Adapter.updateNote(data)
      }
      // console.log(e.target.id)

      // console.log(e.target.value)
    }

    static newNote(e) {
      e.preventDefault()
      let title = document.getElementById('title').value
      let body = document.getElementById('content').value
      let user_id = parseInt(document.getElementById('user-dropdown').value)
      const data = {title, body, user_id}
      Adapter.createNewNote(data)
      Adapter.getNotes()
    }


////////instance methods
    makeCard() {
      let div = document.createElement('div')
      div.innerHTML = this.render()
      div.value = `${this.id}`
      document.getElementById('notes').appendChild(div)
      div.addEventListener('click', this.divAction)
    }

    divAction(e) {
      if (e.target.id.includes('delete-note')) {
        Adapter.deleteNote(e.target.value)
        // console.log('delete note', e.target.value)
        Adapter.getNotes()
      } else if (e.target.parentElement.id.includes('delete-note')) {
        Adapter.deleteNote(e.target.parentElement.value)
        Adapter.getNotes()
      } else {
        console.log('preview', this.value)
        Note.updateForm(parseInt(this.value))
      }
    }

    static updateFormValue(id) {
      let formId = document.getElementById('note-id')
      formId.value = id

      // console.log(this.id)
    }

    static updateForm(id) {
      let formTitle = document.getElementById('title')
      let formBody = document.getElementById('content')
      let formId = document.getElementById('note-id')
      let note = Note.findNote(id)
      console.log(note);
      console.log("Title:", note.title);
      console.log("Body:", note.body);
      if (formTitle) {
        formTitle.value = note.title
      }
      if (formBody) {
        formBody.value = note.body
      }
      formId.value = note.id
    }

    static findNote(id) {
      return Note.all().find(note => note.id === id)
    }






    render () {
      return (
        `<div class="panel panel-default">
          <div class="panel-heading" >${this.title}
              <button id="delete-note-${this.id}" value="${this.id}" type="button" class="btn pull-right btn-default btn-xs" aria-label="Left Align">
                <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
              </button>
          </div>
          <div class="panel-body" style="height: 60px; overflow: hidden">${this.body}</div>
        </div>`
      )
    }





  }
// })
