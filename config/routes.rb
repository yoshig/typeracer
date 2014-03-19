TypeRacer::Application.routes.draw do
  root to: "static_pages#home"
  resources :users, except: :destroy
  resource :session, only: [:create, :new, :destroy]
  resources :heats, only: [:show, :new, :index]
  resources :racer_stats, only: [:index]
end
