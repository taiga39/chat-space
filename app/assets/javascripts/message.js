$(document).on('turbolinks:load', function() {
  $(function(){
    function buildHTML(message){
    var html = `<div class='message-box'dataid=${message.id}>
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

        var html = buildHTML(data);
        $('.right-bottom').append(html)
        $("form")[0].reset();
        $('.right-bottom').animate({scrollTop: $('.right-bottom')[0].scrollHeight}, 'fast');
      })
    })
    var interval = setInterval(function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
    $.ajax({
      url: location.href,
      dataType:'json'
    })
    .done(function(json){
      var id = $("message-box").data("messageId");
      var insertHTML = "";
      json.messages.forEach(function(message) {
          insertHTML += buildHTML(message);
      });
      $('.right-bottom').append(insertHTML);
      })
    } else {
      clearInterval(interval);
    }} ,5 * 1000 );

  });
})
