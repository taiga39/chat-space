$(document).on('turbolinks:load', function() {
  $(function(){
    var buildHTML = function(message) {
    if(message.content && message.image.url){
    var html = `<div class='message-box' data-id="${message.id}">
                  <div class='message'>
                    <div class='message__member-name'>
                      ${message.name}
                    </div>
                    <div class='message__date'>
                      ${message.created_at}
                    </div>
                    <div class='chat'>
                      <div class="lower-message__content">
                        ${message.content}
                      </div>
                      <img src="${message.image.url}">
                    </div>
                  </div>
                </div>`;
    } else if (message.content) {
    var html = `<div class='message-box' data-id="${message.id}">
                  <div class='message'>
                    <div class='message__member-name'>
                      ${message.name}
                    </div>
                    <div class='message__date'>
                      ${message.created_at}
                    </div>
                    <div class='chat'>
                      <div class="lower-message__content">
                      ${message.content}
                      </div>

                    </div>
                  </div>
                </div>`;
     } else if (message.image.url) {
    var html = `<div class='message-box' data-id="${message.id}">
                  <div class='message'>
                    <div class='message__member-name'>
                      ${message.name}
                    </div>
                    <div class='message__date'>
                      ${message.created_at}
                    </div>
                    <div class='chat'>
                      <img src="${message.image.url}">
                    </div>
                  </div>
                </div>`;
              }
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
      var latest_id = $(".message-box:last").data("id");
      $.ajax({
        url: location.href,
        type: 'GET',
        data: {id: latest_id},
        dataType:'json'
      })
      .done(function(datar) {
        datar.forEach(function(message) {
          var insertHTML = buildHTML(message);
          $('.right-bottom').append(insertHTML);
          $('.right-bottom').animate({scrollTop: $('.right-bottom')[0].scrollHeight}, 'fast');
        })
      })
      } else {
        clearInterval(interval);
      }
    } , 5 * 1000 );
  });
})
