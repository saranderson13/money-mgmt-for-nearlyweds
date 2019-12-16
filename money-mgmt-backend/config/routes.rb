Rails.application.routes.draw do

  get '/wedding', to: 'weddings#index'

  resources :users, only: [:show] do

    # resources :savings_plans, only: [:]
    resources :encumbrances, except: [:new, :edit]

    # resources :weddings, only: [:index]

    # resources :weddings, only: [:index] do 
    #   resources :color_palettes
    #   resources :budgets
    # end

    # get '/wedding', to: 'weddings#index'

  end

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
