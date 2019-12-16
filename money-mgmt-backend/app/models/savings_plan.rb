class SavingsPlan < ApplicationRecord

    belongs_to :user
    has_one :wedding, through: :user
    has_many :encumbrances, dependent: :destroy

end
