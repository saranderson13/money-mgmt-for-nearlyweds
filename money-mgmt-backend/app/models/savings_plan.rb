class SavingsPlan < ApplicationRecord

    belongs_to :user
    has_many :encumbrances, dependent: :destroy

end
