class RegistrationsController < Devise::RegistrationsController

    respond_to :json

    def create
        begin
            super do |user|
                if user.userDoesNotExist?
                    if params["partner"] == nil
                        newWedding = Wedding.create(date: params["wedding"]["date"], guest_count: params["wedding"]["guest_count"])
                        user.assign_wedding_if_not_full(newWedding)
                    else
                        partner = User.find_by(email: params["partner"]["email"])
                        if partner != nil
                            wedding = partner.wedding
                            user.assign_wedding_if_not_full(wedding)
                        else
                            raise InvalidPartnerError.new
                        end
                    end
                    user.save
                end
            end
        rescue UserExistsError => e
            validation_error(OpenStruct.new(errors: 'An account with that email already exists.'))
        rescue WeddingCapacityError => e
            validation_error(OpenStruct.new(errors: 'A wedding may not have more than two users.'))
        rescue InvalidPartnerError => e
            validation_error(OpenStruct.new(errors: 'Partner account does not exist.'))
        rescue ActiveRecord::RecordInvalid => e
            render_resource(e.record)
        end
    end



end