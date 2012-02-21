Leapforloaves::Application.routes.draw do

  resources :leaps
  match 'leap' => 'leaps#new', :as => :leap
  
  match 'welcome' => 'welcome#index', :as => :step1
  match 'step2' => 'welcome#step2', :as => :step2
  match 'step3' => 'welcome#step3', :as => :step3
  match 'step4' => 'welcome#step4', :as => :step4
  match 'about' => 'welcome#about', :as => :about
  
  match 'test' => 'game#index', :as => :test
  
  root :to => 'leaps#index'
  
end
