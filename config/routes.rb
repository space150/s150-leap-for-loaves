Leapforloaves::Application.routes.draw do

  match 'leaderboard' => 'leaps#index', :via => :get, :as => :leaderboard
  match 'leaps' => 'leaps#create', :via => :post, :as => :new_leap
  match 'leap' => 'leaps#new', :via => :get, :as => :leap
  
  match 'welcome' => 'welcome#index', :via => :get, :as => :welcome
  match 'about' => 'welcome#about', :via => :get, :as => :about
  
  root :to => 'welcome#index', :via => :get
  
end
