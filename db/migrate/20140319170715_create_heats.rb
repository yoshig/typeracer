class CreateHeats < ActiveRecord::Migration
  def change
    create_table :heats do |t|
      t.integer :race_id

      t.timestamps
    end
  end
end
