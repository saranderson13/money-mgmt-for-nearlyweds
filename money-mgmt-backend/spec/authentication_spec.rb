require 'rails_helper'

RSpec.describe 'POST /login', type: :request do

    let (:wedding) { Fabricate(:wedding) }
    let (:user) { wedding.users[0] }
    let (:url) { '/login' }
    let (:params) do 
        {
            user: {
                email: user.email,
                password: "password"
            }
        }
    end

    context 'When params are correct' do 

        before do
            post url, params: params
        end

        it 'returns 200' do
            expect(response).to have_http_status(200)
        end

        it 'returns valid JWT' do
            token_from_request = response.headers['Authorization'].split(" ").last
            decoded_token = JWT.decode(token_from_request, ENV['DEVISE_JWT_SECRET_KEY'], true)
            expect(decoded_token.first['sub']).to be_present
        end
    end

    context 'When login params are incorrect' do
        before { post url }

        it 'returns unauthorized status' do
            expect(response.status).to eq 401
        end
    end
end

RSpec.describe 'DELETE /logout', type: :request do

    let(:url) { '/logout' }

    it 'returns 204, no content' do
        delete url
        expect(response).to have_http_status(204)
    end

    let(:wedding) { Fabricate(:wedding) }
    let(:user) { wedding.users[0] }
    let(:login_url) { '/login' }
    let(:protected_url) { '/wedding' }
    let(:params) do
        {
            user: {
                email: user.email,
                password: "password"
            }
        }
    end

    it 'blacklists JWT token' do
        # Request protected URL without providing a JWT,
        # get unauthorized response.
        get protected_url
        expect(response).to have_http_status(401)

        # Login valid user & expect to see authorization token
        post login_url, params: params
        token = response.headers['Authorization'].split(' ').last
        expect(token).to be_present

        # Request protected URL with valid token, & get success.
        get protected_url, headers: { Authorization: "Bearer #{token}" }
        expect(response).to have_http_status(200)

        # Logout the user, try to access protected URL with their token,
        # get unauthorized response.
        delete url, headers: { Authorization: "Bearer #{token}" }
        get protected_url, headers: { Authorization: "Bearer #{token}" }
        expect(response).to have_http_status(401)
    end




end