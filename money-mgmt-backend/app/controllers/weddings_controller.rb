class WeddingsController < ApplicationController

    before_action :authenticate_user!

    def index
        wedding = current_user.wedding
        render json: wedding.to_json( 
            include: {
                users: { 
                    include: {
                        savings_plan: { include: :encumbrances }
                    }
                }, 
                expenses: {}, 
                color_palette: {}
            }
        )
    end

end
