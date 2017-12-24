class CategoryRelationsController < ApplicationController
    # Pure JSONs
    # Do such things:
    # Article.find(1).category_ids => [1, 4, 5, 6] # Show
    #
    # Article.find(1).category_ids = [ 1 , 5 , 6 ] # update
    # Article.find(2).category_ids = [ 4 , 5 ]
    before_action :authenticate_user!, only: [:new, :edit, :create, :update, :destroy]
    def show
        outputs = Article.find( params[:id] ).category_ids
        #Article.categories_under_article(params[:id])
        render json: outputs
    end
    def update
        # Give Article number, get [1,2,3] back
        render json: tagged_articles
    end
end
