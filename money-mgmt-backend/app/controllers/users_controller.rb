class UsersController < ApplicationController

    def show
        # binding.pry
        user = User.find(params["id"])
        render json: { message: "Hello, #{user.name}" }
    end

end