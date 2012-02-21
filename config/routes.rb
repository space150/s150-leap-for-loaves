Leapforloaves::Application.routes.draw do

  match 'leaderboard' => 'leaps#index', :via => :get, :as => :leaderboard
  match 'leaps' => 'leaps#create', :via => :post, :as => :new_leap
  match 'leap' => 'leaps#new', :via => :get, :as => :leap
  
  match 'welcome' => 'welcome#index', :via => :get, :as => :step1
  match 'step2' => 'welcome#step2', :via => :get, :as => :step2
  match 'step3' => 'welcome#step3', :via => :get, :as => :step3
  match 'step4' => 'welcome#step4', :via => :get, :as => :step4
  match 'about' => 'welcome#about', :via => :get, :as => :about
  
  root :to => 'leaps#index', :via => :get
  
end
