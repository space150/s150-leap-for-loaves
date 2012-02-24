class WelcomeController < ApplicationController
  caches_page :about, :index
  
  def about
    # render about.html.erb
  end
  
  def index
    # render index.html.erb
  end
  
end
