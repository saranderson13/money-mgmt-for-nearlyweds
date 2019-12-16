require 'rails_helper'

RSpec.describe 'GET /encumbrances', type: :request do

    let(:wedding) { Fabricate(:wedding) }
    let(:user1) { wedding.users[0] }
    let(:user2) { wedding.users[1] }
    let(:url) { '/login' }
    let(:path_root1) { "/users/#{user1.id}" }
    let(:path_root2) { "/users/#{user2.id}" }
    let(:params1) do
        {
            user: {
                email: user1.email,
                password: "password"
            }
        }
    end

    let(:params2) do
        {
            user: {
                email: user2.email,
                password: "password"
            }
        }
    end

    context 'Must be authorized to perform CRUD actions on encumbrances' do
        it 'does not allow unauthorized requests to the encumbrance controller' do

            get "#{path_root1}/encumbrances"
            expect(response.status).to eq(401)

            get "#{path_root1}/encumbrances/1"
            expect(response.status).to eq(401)

            post "#{path_root1}/encumbrances", params: { encumbrance: {name: "rent", amount: 500, frequency: "monthly" } }
            expect(response.status).to eq(401)

            patch "#{path_root1}/encumbrances/1", params: { encumbrance: {name: "mortgage"} }
            expect(response.status).to eq(401)

            delete "#{path_root1}/encumbrances/1"
            expect(response.status).to eq(401)
        end
    end

    context 'Authenticated users can only create & update their own encumbrances' do

        let(:eURL1) { "#{path_root1}/encumbrances" }
        let(:eURL2) { "#{path_root2}/encumbrances" }

        before do
            post '/login', params: params1
            @token1 = response.headers['Authorization']
            
            post '/login', params: params2
            @token2 = response.headers['Authorization']
        end

        it 'Returns a 404 for unfound encumbrances' do

            get "#{eURL2}/1000", headers: { Authorization: @token2 }
            expect(response.status).to eq(404)

        end

        it 'allows a user to only view their own encumbrances' do

            get eURL1, headers: { Authorization: @token1 }
            body1 = JSON.parse(response.body)
            expect(body1.length).to eq 5
            expect(body1.first['savings_plan_id']).to eq user1.savings_plan.id
            expect(body1.last['savings_plan_id']).to eq user1.savings_plan.id

            get eURL2, headers: { Authorization: @token2}
            body2 = JSON.parse(response.body)
            expect(body2.length).to eq 5
            expect(body2.first['savings_plan_id']).to eq user2.savings_plan.id
            expect(body2.last['savings_plan_id']).to eq user2.savings_plan.id

        end

        it 'prevents a user from updating an encumbrance that is not theirs' do

            patch "#{eURL1}/1", params: { encumbrance: { name: "flowers" } }, headers: { Authorization: @token2 }
            expect(response.status).to eq(401)

        end

        it 'allows a user to update their own encumbrance' do

            patch "#{eURL1}/1", params: { encumbrance: { name: "flowers" } }, headers: { Authorization: @token1 }
            expect(response.status).to eq 200
            body = JSON.parse(response.body)
            expect(body["name"]).to eq("flowers")

        end

        it "stops someone who is not the owner from deleting an encumbrance" do

            delete "#{eURL1}/1", headers: { Authorization: @token2 }
            expect(response.status).to eq 401

        end

        it "prevents someone from viewing an encumbrance that is not theirs" do

            get "#{eURL1}/1", headers: { Authorization: @token2 }
            binding.pry
            expect(response.status).to eq 401

        end

    end

end