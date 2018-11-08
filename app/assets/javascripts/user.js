$(document).on('turbolinks:load', function() {
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
            search_list.empty();
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
// $(function){
      var chatmember = $("#chat-group-users")
  $(document).off("click");
  $(document).on("click",".chat-group-user__btn--add",function(){
      var user_name = $(this).data("user-name");
      var user_id = $(this).data("user-id");
      var html = `<div class="chat-group-user clearfix">
                  <input{name: "chat_group[user_ids][]", type: "hidden", value:'${user_id}'>  </input>
                  <p class="chat-group-user__name">${user_name}</p>
                  </div>`
          chatmember.append(html);
          $(this).parent().remove();
  });

})
