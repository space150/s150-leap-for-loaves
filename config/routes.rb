Leapforloaves::Application.routes.draw do
  match 'leaps' => 'leaps#index', :via => :get, :as => :leaps
  match 'leaderboard' => 'leaps#leaderboard', :via => :get
  match 'leaps' => 'leaps#create', :via => :post, :as => :new_leap
  match 'leap' => 'leaps#new', :via => :get, :as => :leap
  
  match 'countdown' => 'welcome#index', :via => :get, :as => :countdown
  
  # pre-launch
  root :to => 'welcome#index', :via => :get
  
  # launch
  #root :to => 'leaps#index', :via => :get
  
end
