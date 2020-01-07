class Wedding < ApplicationRecord
    
    has_many :users
    has_one :expenses, class_name: :Expense, dependent: :destroy
    has_many :savings_plans, through: :budget
    has_many :encumbrances, through: :savings_plans
    has_one :color_palette, dependent: :destroy

    validates :date, presence: true
    validates :guest_count, presence: true

    

    def brides 
        self.users.map { |u| u if u.role == "Bride" }.compact
    end

    def grooms
        self.users.map { |u| u if u.role == "Groom" }.compact
    end

    def nearlyweds
        self.users.map { |u| u if u.role == "Nearlywed" }.compact
    end

    def format_couple
        
    end




end
