class CreateRaces < ActiveRecord::Migration
  def change
    create_table :races do |t|
      t.text :passage

      t.timestamps
    end
  end
end
