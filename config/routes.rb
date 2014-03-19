TypeRacer::Application.routes.draw do
  resources :users, except: :destroy
  resource :session, only: [:create, :new, :destroy]
end
