Rails.application.routes.draw do
	root to: 'static_pages#root'

	namespace :api, defaults: { format: :json } do
		resources :videos, only: [:index, :show, :create, :destroy] do
			resources :comments, only: [:index, :create]
			resources :likes, only: [:index, :create]
			# below is same as: "get 'like', to: 'likes#show'"
			resource :like, only: [:show]
		end

		resources :likes, only: [:destroy]
		resources :comments, only: [:destroy]
		resources :users, only: [:index, :create, :show]
		resource :session, only: [:show, :create, :destroy]
	end
end
