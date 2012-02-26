class Leap < ActiveRecord::Base
  extend ActionView::Helpers::NumberHelper

  self.per_page = 30

  attr_accessible :inches
  validates_presence_of :inches
  validates :inches, :numericality => { :greater_than => 0.0, :less_than_or_equal_to => 50.0 }
  
  def formatted_inches
    "%d\"" % self.inches.ceil
  end
  
  def self.formatted_total_inches
    total = Leap.sum(:inches).ceil
    feet = (total/12).floor
    remaining = (total%12)
    if feet > 0 
      "%s'%d\"" % [ number_with_delimiter( feet ), remaining ]
    else
      "%d\"" % remaining
    end
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
