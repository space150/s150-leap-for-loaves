module LeapsHelper
  
  def total_leap_distance
    Leap.sum(:distance)
  end
  
end
