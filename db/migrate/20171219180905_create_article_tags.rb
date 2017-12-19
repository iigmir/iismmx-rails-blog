class CreateArticleTags < ActiveRecord::Migration[5.0]
    def change
        drop_table :article_tags
        # The Kingis dead, Long live the King!
        create_table :article_tags do |t|
            t.references :article, foreign_key: true
            t.references :category, foreign_key: true

            t.timestamps
        end
    end
end
