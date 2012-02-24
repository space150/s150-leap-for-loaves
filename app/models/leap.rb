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

  def anim_filename
    "tier-%d-anim-%d.gif" % [self.tier, rand(3)]
  end

  def tier
    if self.inches > 20.0
      3
    elsif self.inches > 11.0
      2
    else
      1
    end
  end
  
end
