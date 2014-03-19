class CreateRaces < ActiveRecord::Migration
  def change
    create_table :races do |t|
      t.text :passage

      t.timestamps
    end

    create_table :heats do |t|
      t.integer :race_id

      t.timestamps
    end

    create_table :racer_stats do |t|
      t.integer :heat_id
      t.integer :user_id
      t.float :wpm
      t.float :wpm_percentile

      t.timestamps
    end

    add_index :races, :passage, unique: true
    add_index :heats, :race_id
    add_index :racer_stats, :heat_id
    add_index :racer_stats, :user_id
  end
end
