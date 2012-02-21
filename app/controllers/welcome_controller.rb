class WelcomeController < ApplicationController
  caches_page :about, :index, :step2, :step3, :step4
  
  def about
    # render about.html.erb
  end
  
  def index
    # render index.html.erb
  end
  
end
