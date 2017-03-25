class CreateMylinks < ActiveRecord::Migration[5.0]
  def change
    create_table :mylinks do |t|
      t.string :site
      t.string :name
      t.string :intro
      t.string :group
      t.timestamps
    end
  end
end
