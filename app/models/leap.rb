class Leap < ActiveRecord::Base
  
  validates_presence_of :distance, :leap_type
  
end
