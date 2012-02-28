class LeapSweeper < ActionController::Caching::Sweeper
  observe Leap
  
  def after_create(leap)
    expire_cache_for leap
  end
  
  def expire_cache_for(leap)
    page_num = (Leap.count/Leap.per_page).ceil
    1.upto(page_num) { |i| Rails.cache.delete( "views/leaps/#{i}" ) }
  end
end