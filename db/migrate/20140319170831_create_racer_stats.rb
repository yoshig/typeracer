class CreateRacerStats < ActiveRecord::Migration
  def change
    create_table :racer_stats do |t|
      t.integer :heat_id
      t.integer :user_id

      t.timestamps
    end
  end
end
