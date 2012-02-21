class CreateLeaps < ActiveRecord::Migration
  def change
    create_table :leaps do |t|
      t.decimal :inches
      t.timestamps
    end
  end
end
