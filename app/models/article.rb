class Article < ApplicationRecord
    has_many :article_tag
    has_many :category, through: :article_tag
    def self.categories_under_article( cua_input_id )
        cua_api = Article.find( cua_input_id ).category_ids
        return Category.select( :id , :tag_name ).where( id: cua_api )
    end
    def self.change_article_categories( cac_article_id , cac_categories_input_array )
        new_array = []
        cac_categories_input_array.each do |i|
            new_array.push( i.to_i )
        end
        Article.find(cac_article_id).category_ids = new_array
        #byebug
        return new_array
    end
end