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
        // function(note) {
          let newNote = new Note(note)
          newNote.makeCard()
        // }
      }

      // json.forEach(
      //
      // )
    }

    static attachListeners() {
      document.getElementById('note-form').addEventListener('submit', this.newNote)
    }


    static newNote(e) {
      e.preventDefault()
      let title = document.getElementById('title').value
      let body = document.getElementById('content').value
      const data = {title, body}
      console.log(data)
      // if (title.length && content.length) {
      //   const data = {
      //     "title": title
      //     "body": content
      //   }
        Adapter.createNewNote(data)
        Adapter.getNotes()
      // }
    }


////////instance methods
    makeCard() {
      let div = document.createElement('div')
      div.innerHTML = this.render()
      document.getElementById('notes').appendChild(div)
    }






    render () {
      return (
        `<div class="panel panel-default">
          <div class="panel-heading" >${this.title}
              <button id="delete-note-${this.id}" type="button" class="btn pull-right btn-default btn-xs" aria-label="Left Align">
                <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
              </button>
          </div>
          <div class="panel-body" style="height: 60px; overflow: hidden">${this.body}</div>
        </div>`
      )
    }





  }
// })
