class ArticleTagsController < ApplicationController
    def new
        @article_tag = ArticleTag.new
    end
    def create
        #ArticleTag.create( atag_params )
        #redirect_to article_tags_path
    end

    def index
        @tags = ArticleTag.all
    end
    def show
        @tagged_articles = ArticleTag.find( params[:id] ).article
    end

    def edit
    end
    def update
    end

    def destroy
    end

    private
    def atag_params
        params.require(:article_tag).permit(:tag_name)
    end
end
