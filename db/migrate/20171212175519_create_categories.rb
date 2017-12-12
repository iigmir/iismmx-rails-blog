class CreateCategories < ActiveRecord::Migration[5.0]
    def change
        create_table :categories do |t|
            t.references :article, foreign_key: true
            t.references :article_tag, foreign_key: true
            t.timestamps
        end
    end
end
