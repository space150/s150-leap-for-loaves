Leapforloaves::Application.routes.draw do
  match 'leaps' => 'leaps#index', :via => :get, :as => :leaps
  match 'leaderboard' => 'leaps#leaderboard', :via => :get
  match 'leap' => 'leaps#new', :via => :get, :as => :leap
  
  match 'countdown' => 'welcome#index', :via => :get, :as => :countdown
  
  # launch
  root :to => 'leaps#index', :via => :get
  
end
