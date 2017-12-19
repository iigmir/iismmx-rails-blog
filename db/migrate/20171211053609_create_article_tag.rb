class CreateArticleTag < ActiveRecord::Migration[5.0]
    def change
        # add_column :articles , :tags , :string
        create_table :categories do |a|
            a.integer :article_number
            a.string :tag_name
        end
    end
end
