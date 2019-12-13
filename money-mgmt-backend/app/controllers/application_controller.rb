class ApplicationController < ActionController::API

    rescue_from ActiveRecord::RecordNotFound, with: :not_found
    rescue_from AuthenticationError, with: :unauthorized_error

    def render_resource(resource)
        if resource.errors.empty?
            render json: resource
        else
            validation_error(resource)
        end
    end

    def validation_error(resource)
        render json: {
            errors: [
                {
                    status: '400',
                    title: 'Bad Request',
                    detail: resource.errors,
                    code: '100'
                }
            ]
        }, status: :bad_request
    end

    def unauthorized_error
        render json: { message: "No access authorization." }, status: 404
    end

    def not_found
        render json: { message: "Resource not found."}
    end

    def authorize_user_resource(resource)
        raise AuthorizationError.new if resource.user != current_user
    end

end
