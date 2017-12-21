// const Note = (function createNoteClass() {
  const all = []
  // return
  class Note {
    constructor(json) {
      this.id = json.id
      this.title = json.title
      this.body = json.body
      all.push(this)
    }

///////static methods
    static all() {
      return [...all]
    }

    static attachListeners() {
      document.getElementById('add-note').addEventListener('click', this.newNote)
      document.getElementById('title').addEventListener('change', this.updateCurrentNote)
      document.getElementById('content').addEventListener('keyup', this.updateCurrentNote)

      document.getElementById('title').addEventListener('focus', this.animatePreviewOut)
      document.getElementById('content').addEventListener('focus', this.animatePreviewOut)

      document.getElementById('done').addEventListener('click', this.animatePreviewIn)

      // document.getElementById('')
    }

    static createNote(json) {
      document.getElementById('notes').innerHTML = ''
      let noteId = json[json.length - 1].id
      this.updateFormValue(noteId)
      for (var i = json.length - 1; i >= 0; i--) {
        let note = json[i]
        let newNote = new Note(note)
        newNote.makeCard()
      }
    }

    static updateCurrentNote(e) {
      let note_id = document.getElementById('note-id').value
      if (e.target.id === 'title') {
        let title = e.target.value
        let data = {note_id, title}
        Adapter.updateNote(data)
      } else if (e.target.id === 'content') {
        let body = e.target.value
        let data = {note_id, body}
        Adapter.updateNote(data)
      }
    }

    static animatePreviewOut() {
      let preview = document.getElementById('preview')
      if ((!preview.style.marginLeft) || (parseInt(preview.style.marginLeft) >= 0)) {
        let num = 0
        preview.style.marginLeft = `${num}px`
        let animate = setInterval(function(){
          // while (num > -500) {
            num -= 5
          //   console.log(num);
          // }

          preview.style.marginLeft = `${num}px`
          if (num < -500) {
            clearInterval(animate)
          }
        }, 5)
      }
    }

    static animatePreviewIn (e) {
      e.preventDefault()
      let preview = document.getElementById('preview')
      if (parseInt(preview.style.marginLeft) < -500) {
          console.log('hey!')
          let num = -350
          preview.style.marginLeft = `${num}px`
          let animate = setInterval(function(){
          // while (num > -500) {
            num += 5
          //   console.log(num);
          // }

          preview.style.marginLeft = `${num}px`
          if (num >= 0) {
            clearInterval(animate)
          }
        }, 5)
      }
    }

    static animateNoteOut(e) {

      let preview = document.getElementById(`${e}`)
      console.log(preview)
      if ((!preview.style.marginLeft) || (parseInt(preview.style.marginLeft) >= 0)) {
        let num = 0
        preview.style.marginLeft = `${num}px`
        let animate = setInterval(function(){
          // while (num > -500) {
            num -= 5
          //   console.log(num);
          // }

          preview.style.marginLeft = `${num}px`
          if (num < -500) {
            clearInterval(animate)
          }
        }, 5)
      }
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

    static updateFormValue(id) {
      let formId = document.getElementById('note-id')
      formId.value = id
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

////////instance methods
    makeCard() {
      let div = document.createElement('div')
      div.innerHTML = this.render()
      div.value = `${this.id}`
      div.id = `${this.id}`
      document.getElementById('notes').appendChild(div)
      div.addEventListener('click', this.divAction)
    }

    divAction(e) {
      if (e.target.id.includes('delete-note')) {
        Adapter.deleteNote(e.target.value)
        Note.animateNoteOut(e.target.value)

        // console.log('delete note', e.target.value)
        Adapter.getNotes()
      } else if (e.target.parentElement.id.includes('delete-note')) {
        Adapter.deleteNote(e.target.parentElement.value)

        Note.animateNoteOut(e.target.parentElement.value)

        Adapter.getNotes()
      } else {
        console.log('preview', this.value)
        Note.updateForm(parseInt(this.value))
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
