class Category < ApplicationRecord
    belongs_to :article
    belongs_to :article_tag
end