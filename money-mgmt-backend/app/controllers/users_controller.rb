class UsersController < ApplicationController

    before_action :authenticate_user!

    def index
        # user = User.find(1)
        render json: current_user.to_json(
            include:  [:savings_plan, :encumbrances]
        ) 
    end

end