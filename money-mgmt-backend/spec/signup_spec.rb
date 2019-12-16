require 'rails_helper'

RSpec.describe 'POST /signup', type: :request do

    let(:url) { '/signup' }
    let (:wedding) { Wedding.create() }
    let(:params) do
        {
            user: {
                wedding_id: wedding.id,
                email: "example@example.com",
                password: "password"
            }
        }
    end

    context 'When user is unauthenticated' do
        before { post url, params: params }

        # THIS TEST WILL PASS IF EXPECTING 201 (successful creation)
        it 'returns 200' do 
            binding.pry
            expect(response.status).to eq 200
        end

        it 'returns a JWT' do
            expect(response.headers['Authorization']).to be_present
        end
    end

    context 'When a user already exists' do
        before do
            post url, params: params
            post url, params: params
        end

        it 'returns bad request status' do
            expect(response.status).to eq 400
        end

        it 'returns validation errors' do
            json = JSON.parse(response.body)
            expect(json['errors'].first['title']).to eq('Bad Request')
        end
    end

end