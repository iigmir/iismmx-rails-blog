class Category < ApplicationRecord
    has_many :article_tag
    has_many :article, through: :article_tag
    def self.articles_under_tag( aut_input_ids )
        return Article.select( :id , :title ).where( id: aut_input_ids )
    end
end