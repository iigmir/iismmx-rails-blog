class FixRelationNotExist < ActiveRecord::Migration[5.0]
  def change
    rename_table( :categories , :article_tags )
  end
end
