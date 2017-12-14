class ArticleTagTablenameChange < ActiveRecord::Migration[5.0]
    def change
        rename_table( :article_tag , :article_tags )
    end
end
