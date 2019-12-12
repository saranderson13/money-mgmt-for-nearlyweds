class Wedding < ApplicationRecord
    
    has_many :users
    has_one :budget
    has_many :savings_plans, through: :budget
    has_one :color_palette

    

    def brides 
        self.users.map { |u| u if u.role == "Bride" }.compact
    end

    def grooms
        self.users.map { |u| u if u.role == "Groom" }.compact
    end

    def nearlyweds
        self.users.map { |u| u if u.role == "Nearlywed" }.compact
    end



end
