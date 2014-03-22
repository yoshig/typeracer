TypeRacer::Application.routes.draw do
  root to: "static_pages#home"
  resources :users, except: :destroy
  resource :session, only: [:create, :new, :destroy]
  resources :heats, only: [:show, :new, :index]
  post "/heats/update_board", to: "heats#update_board"
  post "/heats/add_car", to: "heats#add_car"
  resources :racer_stats, only: [:index, :create]
  resources :races, only: [:show]
end
