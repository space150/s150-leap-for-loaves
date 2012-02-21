class WelcomeController < ApplicationController
  caches_page :about, :index, :step2, :step3, :step4
  
  def about
    # render about.html.erb
  end
  
  def index
    # render index.html.erb
  end
  
  def step2
    # render step2.html.erb
  end
  
  def step3
    # render step3.html.erb
  end
  
  def step4
    # render step4.html.erb
  end
  
end
