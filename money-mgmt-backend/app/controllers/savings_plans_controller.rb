class SavingsPlansController < ApplicationController

    before_action :authenticate_user!

    def index
        savings = current_user.savings_plan
        render json: savings.to_json(
            include: :encumbrances
        )
    end

    def update
        savings = SavingsPlan.find(params["savings"]["id"])
        authorize_user_resource(savings)
        if params["savings"]["amount"] != nil
            updated_savings = savings.current_savings += params["savings"]["amount"].to_i
            savings.update(current_savings: updated_savings)
        else
            # binding.pry
            savings.update(income_per_month: params["savings"]["income"], monthly_savings_goal: params["savings"]["monthly_savings_goal"])
        end
        plan = current_user.savings_plan
        render json: plan.to_json( include: :encumbrances )
    end

    private

    def savings_params
        params.require(:savings).permit(:id, :amount, :income, :monthly_savings_goal)
    end

end
