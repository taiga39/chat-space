
  json.content  @message.content
  json.id  @message.user.id
  json.name  @message.user.name
  json.created_at @message.created_at.strftime('%Y/%m/%d %H:%M:%S')
