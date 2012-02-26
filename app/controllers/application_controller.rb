class ApplicationController < ActionController::Base
  protect_from_forgery
  cache_sweeper :leap_sweeper
  
end
