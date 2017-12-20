document.addEventListener("DOMContentLoaded", function() {
  Adapter.getUsers()
  Adapter.getNotes()
  Note.attachListeners()
}
)
