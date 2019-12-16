Fabricator(:budget) do
  venue        { rand(0..15000) }
  catering     { rand(0..15000) }
  photography  { rand(0..1000) }
  videography  { rand(0..1000) }
  flowers      { rand(0..1000) }
  cake         { rand(0..1000) }
  dress_attire { rand(0..5000) }
  band         { rand(0..3000) }
  dj_mc        { rand(0..3000) }
  invitations  { rand(0..1000) }
  favors       { rand(0..2000) }
  officiant    { rand(0..500) }
  beauty       { rand(0..1000) }
  jewelry      { rand(0..2000) }
  rentals      { rand(0..5000) }
  other        { rand(0..3000) }
end