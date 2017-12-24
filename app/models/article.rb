class Article < ApplicationRecord
    has_many :article_tag
    has_many :category, through: :article_tag
    def self.categories_under_article( cua_input_id )
        cua_api = Article.find( cua_input_id ).category_ids
        return Category.select( :id , :tag_name ).where( id: cua_api )
    end
end