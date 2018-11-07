module ApplicationHelper
  def simple_time(time)
    Time.now.to_s(:datetime)
  end
end
