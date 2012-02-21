module LeapsHelper
  
  def total_leap_distance
    Leap.sum(:inches)
  end
  
end
