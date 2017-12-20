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
      for (var i = json.length - 1; i >= 0; i--) {
        let note = json[i]
        let newNote = new Note(note)
        newNote.makeCard()
      }
    }

    static attachListeners() {
      document.getElementById('note-form').addEventListener('submit', this.newNote)
      // document.getElementById('')
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
        
        // console.log('trash can', e.target.parentElement.value);
      }
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
