
class GroupsController < ApplicationController
  before_action :set_group, only: [:edit, :update]
  # before_action :set_users
  def index
    @groups = current_user.groups
  end
  def new
    @group = Group.new
    @group.users << current_user
  end
  def create
    @group = Group.new(group_params)
    @group.users << current_user
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
      binding.pry
    else
      render :new
    end
  end
  def edit
  end
  def update
    binding.pry
    if @group.update(group_params)
       redirect_to group_messages_path(@group), notice: 'グループを編集しました'
       # binding.pry
    else
      render :edit
    end
  end
  private
  def group_params
    params.require(:group).permit(:name, user_ids: [])
  end
  def set_group
    @group = Group.find(params[:id])
  end
  # def set_users
  #   @users = User.where.not(id:current_user.id)
  # end
end
