class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  # devise :database_authenticatable, :registerable,
  #        :recoverable, :rememberable, :validatable

  devise :database_authenticatable,
         :jwt_authenticatable, 
         :registerable,
         jwt_revocation_strategy: JwtBlacklist

  belongs_to :wedding
  has_one :savings_plan, dependent: :destroy
  has_many :encumbrances, through: :savings_plan
  has_one :budget, through: :wedding


end
