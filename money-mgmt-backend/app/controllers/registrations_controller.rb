class RegistrationsController < Devise::RegistrationsController

    respond_to :json

    def create
        begin
            super do |user|
                @user = user
                # binding.pry
                if @user.userDoesNotExist?
                    if params["partner"] == nil
                        newWedding = Wedding.create(date: params["wedding"]["date"], guest_count: params["wedding"]["guest_count"])
                        @user.assign_wedding_if_not_full(newWedding)
                    else
                        partner = User.find_by(email: params["partner"]["email"])
                        if partner != nil
                            wedding = partner.wedding
                            @user.assign_wedding_if_not_full(wedding)
                        else
                            @user.errors.add(:wedding, 'Partner email not valid')
                        end
                    end
                    # binding.pry
                    @user.save
                else
                    binding.pry
                end
            end
        rescue ActiveRecord::RecordInvalid => e
            render_resource(e.record)
        rescue ActiveRecord::RecordNotUnique => e
            err = OpenStruct.new(errors: {user: 'Already Exists'})
            validation_error(err)
        end
    end



end