Rails.application.routes.draw do
  mount Ckeditor::Engine => '/ckeditor'
  devise_for :users
  resources :articles
  resources :mylinks
  root "articles#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '*path' => redirect('/')
end
