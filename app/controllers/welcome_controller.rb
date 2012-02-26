class WelcomeController < ApplicationController
  caches_action :index
  
  def index
    # render index.html.erb
  end
  
end
