class MessagesController < ApplicationController
  before_action :set_group
  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
    # binding.pry
    respond_to do |format|
      format.html
      format.json{ @new_message = @messages.where('id > ?', params[:id]) }
      # binding.pry
    end
  end
  def create
    @message = @group.messages.new(message_params)
    @message.user = current_user
    if @message.save
    respond_to do |format|
      format.html { redirect_to root_path}
      format.json

      end

    end
  end

   private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
    Time.zone = 'Tokyo'
  end
end
