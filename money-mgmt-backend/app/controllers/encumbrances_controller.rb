class EncumbrancesController < ApplicationController

    before_action :authenticate_user!

    def create
        sPlan = SavingsPlan.find(params["encumbrance"]["savings_plan_id"])
        planUser = sPlan.user
        authorize_user_resource(sPlan)
        encParams = params["encumbrance"]
        enc = planUser.encumbrances.build(savings_plan: sPlan, encumbrance_name: encParams["encumbrance_name"], amount: encParams["amount"])
        enc.save
        encs = current_user.encumbrances
        render json: encs.to_json()
    end


    def update
        enc = Encumbrance.find(params[:id])
        authorize_user_resource(enc)
        enc.update(enc_params)
        encs = current_user.encumbrances
        render json: encs.to_json()
    end


    def destroy
        enc = Encumbrance.find(params[:id])
        authorize_user_resource(enc)
        enc.destroy
        render json: enc.to_json()
    end



    private

    def enc_params
        params.require(:encumbrance).permit(:savings_plan, :encumbrance_name, :amount)
    end

end
