class EncumbrancesController < ApplicationController

    before_action :authenticate_user!

    def create
        enc = current_user.encumbrances.build(savings_plan: current_user.savings_plan)
        enc.update(enc_params)
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
        params.require(:encumbrance).permit(:savings_plan, :id, :encumbrance_name, :amount)
    end

end
