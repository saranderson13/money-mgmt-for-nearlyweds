Rails.application.routes.draw do

  get '/wedding', to: 'weddings#index'
  get '/savings', to: 'savings_plans#index'
  get '/user', to: 'users#index'
  resources :expenses, only: [:index, :update]
  resources :encumbrances, only: [:create, :update, :destroy]


  # devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root to: "home#index"

  devise_for :users,
              defaults: { format: :json },
              path: '',
              path_names: {
                sign_in: '/login',
                sign_out: '/logout',
                registration: '/signup'
              },
              controllers: {
                sessions: 'sessions',
                registrations: 'registrations'
              }

end
