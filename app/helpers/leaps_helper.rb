module LeapsHelper
  
  def total_leap_distance
    format_distance Leap.sum(:inches)
  end
  
  def format_distance( distance )
    '%.2f"' % distance
  end
  
end
