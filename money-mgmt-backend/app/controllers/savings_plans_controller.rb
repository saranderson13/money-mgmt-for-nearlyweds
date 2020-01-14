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

    def update_encumbrances
        savings = SavingsPlan.find(enc_params["savings_id"])
        enc_params["lines"].each do |enc|
            if enc["deletable"] == true
                Encumbrance.find(enc["id"]).destroy
            else
                savedEnc = Encumbrance.find(enc["id"])
                savedEnc.encumbrance_name = enc["encumbrance_name"]
                savedEnc.amount = enc["amount"]
                savedEnc.save
            end
        end
        render json: savings.to_json( include: :encumbrances )
    end

    private

    def savings_params
        params.require(:savings).permit(:id, :amount, :income, :monthly_savings_goal)
    end

    def enc_params
        params.require(:encumbrances).permit(:savings_id, lines: [:id, :deletable, :encumbrance_name, :amount])
    end

end
