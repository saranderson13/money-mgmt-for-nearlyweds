Fabricator(:color_palette) do
  primary   { Random.bytes(3).unpack1('H*') }
  secondary { Random.bytes(3).unpack1('H*') }
  accent1   { Random.bytes(3).unpack1('H*') }
  accent2   { Random.bytes(3).unpack1('H*') }
  accent3   { Random.bytes(3).unpack1('H*') }
  accent4   { Random.bytes(3).unpack1('H*') }
  accent5   { Random.bytes(3).unpack1('H*') }
end