class Article < ApplicationRecord
    has_many :category
    has_many :article_tag, through: :category
end