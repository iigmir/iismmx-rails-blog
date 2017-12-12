class ArticleTag < ApplicationRecord
    has_many :category
    has_many :article, through: :category
end