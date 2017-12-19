class Article < ApplicationRecord
    has_many :article_tag
    has_many :category, through: :article_tag
end