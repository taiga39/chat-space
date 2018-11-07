$(function() {
  var search_list = $("#user-search-result");

  function appendName(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    search_list.append(html);
  }
    function appendNoUserName(fail_comment) {
    var html = `<p>
                  <div class="chat-group-user__name'>${fail_comment}</div>
                </p>`
    search_list.append(html);
  }
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
        $.ajax({
          type: 'GET',
          url: '/users',
          data: { name: input },
          dataType: 'json'
    })
        .done(function(users) {
          if (users.length !== 0){
            users.forEach(function(user){
            appendName(user);
              });
            }
            else {
              appendNoUserName("一致しません");
            }
          })
          .fail(function() {
            alert('名前検索に失敗しました');
          })
  });
});

