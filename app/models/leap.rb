class Leap < ActiveRecord::Base
  
  attr_accessible :inches
  validates_presence_of :inches
  
  def formatted_inches
    Leap.format_distance self.inches
  end
  
  def self.formatted_total_inches
    format_distance Leap.sum(:inches)
  end

  def self.format_distance( distance )
    '%.2f"' % distance
  end
  
end
