function published(){
    $('#listPublished').show()
    $('#listDraft').hide()
    $('#formCreateArticle').hide()
}

function draft(){
    $('#listDraft').show()
    $('#listPublished').hide()
    $('#formCreateArticle').hide()
}

function createArticle(){
    $('#formCreateArticle').show()
    $('#listPublished').hide()
    $('#listDraft').hide()
}

$(document).ready(
    $('#listPublished').hide(),
    $('#formCreateArticle').hide(),
    $('#listDraft').hide()
)

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })
  
// formCreateArticle