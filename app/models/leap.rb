class Leap < ActiveRecord::Base
  
  attr_accessible :inches
  validates_presence_of :inches
  
end
