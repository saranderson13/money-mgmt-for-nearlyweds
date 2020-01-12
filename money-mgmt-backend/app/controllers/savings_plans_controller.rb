class SavingsPlansController < ApplicationController

    before_action :authenticate_user!

    def index
        savings = current_user.savings_plan
        render json: savings.to_json(
            include: :encumbrances
        )
    end

end
