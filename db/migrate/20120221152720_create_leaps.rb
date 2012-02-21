class CreateLeaps < ActiveRecord::Migration
  def change
    create_table :leaps do |t|
      t.integer :distance
      t.string :leap_type

      t.timestamps
    end
  end
end
