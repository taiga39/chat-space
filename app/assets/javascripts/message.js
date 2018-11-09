$(document).on('turbolinks:load', function() {
  $(function(){
    function buildHTML(message){
    var html = `<div class='message-box' data-id="${message.id}">
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
      url: location.href.json,
      type:"GET",
      dataType:'json'
    })
    .done(function(json){
      var latest_id = $(".message-box:last").data("id");
      var insertHTML = "";
      json.messages.forEach(function(message) {
        if (message.id > latest_id ) {
          insertHTML += buildHTML(message)
          console.log(message.id)
        }
      });
      console.log("23")
      $('.right-bottom').append(insertHTML)
      $('.right-bottom').animate({scrollTop: $('.right-bottom')[0].scrollHeight}, 'fast');
      })
      } else {
        clearInterval(interval);
   }} , 5 * 1000 );

  });
})
