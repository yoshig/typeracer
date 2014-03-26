class ChangeRaceTable < ActiveRecord::Migration
  def change
    add_column :races, :source, :string, null: false
  end
end
