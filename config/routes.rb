TypeRacer::Application.routes.draw do
  root to: "static_pages#home"

  post "/heats/update_board", to: "heats#update_board"
  post "/heats/add_car", to: "heats#add_car"
  post "/heats/start_game", to: "heats#start_game"

  resources :users, except: :destroy
  resource :session, only: [:create, :new, :destroy]
  resources :heats, only: [:show, :new, :index]
  resources :racer_stats, only: [:index, :create]
  resources :races, only: [:show]
end