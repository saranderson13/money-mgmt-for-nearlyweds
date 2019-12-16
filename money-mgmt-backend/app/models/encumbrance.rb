class Encumbrance < ApplicationRecord

    belongs_to :savings_plan
    has_one :user, through: :savings_plan
    has_one :wedding, through: :savings_plan

end
