class CreateColorPalettes < ActiveRecord::Migration[6.0]
  def change
    create_table :color_palettes do |t|
      t.belongs_to :wedding
      t.string :primary
      t.string :secondary
      t.string :accent1
      t.string :accent2
      t.string :accent3
      t.string :accent4
      t.string :accent5

      t.timestamps
    end
  end
end
