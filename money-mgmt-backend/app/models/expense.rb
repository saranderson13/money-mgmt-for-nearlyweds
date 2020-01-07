class Expense < ApplicationRecord

    belongs_to :wedding
    has_many :users, through: :wedding
    has_many :savings_plans, through: :users

end
