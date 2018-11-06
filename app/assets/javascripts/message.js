$(document).on('turbolinks:load', function() {
  $(function(){
    function buildHTML(message){
    var html = `<div class='message-box'>
                  <div class='message'>
                    <div class='message__member-name'>
                      ${message.name}
                    </div>
                    <div class='message__date'>
                      ${message.created_at}
                    </div>
                    <div class='chat'>
                      ${message.content}
                    </div>
                  </div>
                </div>`;
    return html;
  }

  $('.item_form').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
  })
      .done(function(data){
        // console.log(data)
        var html = buildHTML(data);
        $('.right-bottom').append(html)
        $('.form__message').val('')
        $('.message').animate({scrollTop: $(".message")[0].scrollHeight}, 1500);
      })
      .fail(function() {
        alert('error');
      });
    })
  });
})
