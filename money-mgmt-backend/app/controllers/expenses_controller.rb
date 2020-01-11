class ExpensesController < ApplicationController

    before_action :authenticate_user!

    def index 
        # expenses = User.find(1).expenses
        expenses = current_user.expenses
        render json: expenses.to_json()
    end

    def update
        exp = Expense.find(params["expenses"]["id"])
        begin
            if (current_user === exp.users[0] || (exp.users.length > 1 && current_user === exp.users[1]))
                exp.update(exp_params)
                updatedExpenses = current_user.expenses
                render json: updatedExpenses.to_json()
            else
                raise UnauthorizedError.new
            end
        rescue UnauthorizedError => e
            validation_error(OpenStruct.new(errors: 'You are not authorized to edit the expense set.'))
        end
        
    end

    private

    def exp_params
        params.require(:expenses).permit(:id, :venue, :catering, :photography, :videography, :flowers, :cake, :attire, :band, :djmc, :invitations, :favors, :officiant, :beauty, :jewelry, :rentals, :other)
    end
end
