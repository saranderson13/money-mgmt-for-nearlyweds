class EncumbrancesController < ApplicationController

    before_action :authenticate_user!


    def index
        # u = User.find(params[:user_id])
        # enc = u.encumbrances
        enc = current_user.encumbrances
        render json: enc.to_json
    end


    def show
        enc = Encumbrance.find(params[:id])
        authorize_user_resource(enc)
        render json: enc.to_json
    end


    def create
        enc = current_user.encumbrances.build(savings_plan: current_user.savings_plan)
        enc.update(enc_params)
        enc.save
        render json: enc.to_json
    end


    def update
        enc = Encumbrance.find(params[:id])
        authorize_user_resource(enc)
        enc.update(enc_params)
        render json: enc.to_json
    end


    def destroy
        enc = Encumbrance.find(params[:id])
        authorize_user_resource(enc)
        enc.destroy
        render json: enc.to_json
    end



    private

    def enc_params
        params.require(:encumbrance).permit(:savings_plan, :name, :amount, :frequency,)
    end

end
