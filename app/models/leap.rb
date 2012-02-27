require 'digest/sha1'

class Leap < ActiveRecord::Base
  extend ActionView::Helpers::NumberHelper

  self.per_page = 30
  MAX_INCHES = 50.0

  attr_accessible :inches
  validates_presence_of :inches
  validates :inches, :numericality => { :greater_than => 0.0, :less_than_or_equal_to => Leap::MAX_INCHES }
  
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

  def self.validate_digest( now, start, inches, csrf, digest )
    calced_digest = Digest::SHA1.hexdigest( "#{now}-#{start}-#{inches}-#{csrf}" )
    result = calculate_inches_from_now_to_date now, start
    digest == calced_digest && inches.to_f == result
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

  def self.calculate_inches_from_now_to_date( now, start )
    # using the passed in data recalculate the result (to ensure the passed in data is at least
    # internally consistant)
    m1 = 0.16;
    m2 = 0.0393700787; # the number of inches in 1mm
    d1 = now.to_i - start.to_i;
    d2 = d1*m1;
    result = d2*m2;
    if result > Leap::MAX_INCHES
      result = Leap::MAX_INCHES
    end
    result
  end
  
end
