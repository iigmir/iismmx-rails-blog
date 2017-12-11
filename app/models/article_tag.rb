class ArticleTag < ApplicationRecord
    #has_and_belongs_to_many :article
    belongs_to :article
end