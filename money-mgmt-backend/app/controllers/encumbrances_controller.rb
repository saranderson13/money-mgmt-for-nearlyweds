class EncumbrancesController < ApplicationController

    before_action :authenticate_user!

    def create
        sPlan = SavingsPlan.find(enc_params["savings_plan_id"])
        planUser = sPlan.user
        authorize_user_resource(sPlan)
        encParams = params["encumbrance"]
        enc = planUser.encumbrances.build(savings_plan: sPlan, encumbrance_name: enc_params["encumbrance_name"], amount: enc_params["amount"])
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
        params.require(:encumbrance).permit(:savings_plan_id, :encumbrance_name, :amount)
    end



end
