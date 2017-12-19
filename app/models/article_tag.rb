class ArticleTag < ApplicationRecord
    has_many :category
    has_many :article, through: :category
    def self.articles_under_tag( aut_input_ids )
        return Article.select( :id , :title ).where( id: aut_input_ids )
    end
end