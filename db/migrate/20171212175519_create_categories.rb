class CreateCategories < ActiveRecord::Migration[5.0]
    def change
        create_table :article_tags do |t|
            t.references :article, foreign_key: true
            t.references :article_tags, foreign_key: true
            t.timestamps
        end
    end
end
