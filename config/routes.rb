Rails.application.routes.draw do
	root to: 'static_pages#root'

	namespace :api, defaults: { format: :json } do
		resources :videos, only: [:index, :show, :create, :destroy] do
			resources :comments, only: [:index, :create, :destroy]
			resources :likes, only: [:index, :create]
		end

		resource :session, only: [:show, :create, :destroy]
	end
end
