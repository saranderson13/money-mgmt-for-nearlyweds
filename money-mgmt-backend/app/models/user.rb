class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  # devise :database_authenticatable, :registerable,
  #        :recoverable, :rememberable, :validatable


  # ASSOCIATIONS
  belongs_to :wedding
  has_one :savings_plan, dependent: :destroy
  has_many :encumbrances, through: :savings_plan
  has_one :expenses, class_name: :Expense, through: :wedding

  # VALIDATIONS 
  validates :email, presence: true, uniqueness: true
  validates :wedding_id, presence: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :role, presence: true, inclusion: { 
    in: ["Bride", "Groom", "Nearlywed"], 
    message: "That is not a valid role." 
  }

  # This validation does not work because in the Registrations Controller a user is
  # technically created when 'super' is called. At that point, a wedding is not assigned
  # to them, which means that when the #wedding_users_not_exceeded method is called during
  # automatic validation, user.wedding == nil, and user.wedding.users throws an error.
  # To make sure too many users are not assigned to a wedding, the #assign_wedding_if_not_full
  # method is called before the user is saved to the database, which will add
  # the appropriate error to the user object.
  ### validate :wedding_users_not_exceeded
  
  # DEVISE STUFF
  devise :database_authenticatable,
         :jwt_authenticatable, 
         :registerable,
         jwt_revocation_strategy: JwtBlacklist


  def userDoesNotExist?
    attemptedEmail = User.find_by(email: self.email)
    if (attemptedEmail != nil) 
      raise UserExistsError.new
    else 
      return true
    end
  end

  def assign_wedding_if_not_full(wedding)
    if wedding.users.length < 2
      self.wedding = wedding
    else
      raise WeddingCapacityError.new
    end
  end
  
  private

  # def wedding_users_not_exceeded
  #   user_count = self.wedding.users.length
  #   errors.add(:wedding_id, "cannot have more than two users") unless user_count < 2
  # end


end
