class ArticleTagsController < ApplicationController
    def new
    end
    def create
        ArticleTag.create( atag_params )
        redirect_to article_tags_path
    end

    def index
        @new_article_tag = ArticleTag.new
        @tags = ArticleTag.all
        respond_to do |format|
            format.json { render json: @tags }
            format.html { render :index }  
        end
    end
    def show
        #@tagged_articles = ArticleTag.find( params[:id] ).article_ids
        tagged_articles = ArticleTag.articles_under_tag( ArticleTag.find( params[:id] ).article_ids )
        render json: tagged_articles
    end

    def edit
        @article = ArticleTag.find(params[:id])
    end
    def update
        @article = ArticleTag.find(params[:id])
        @article.update_attributes(art_params)
        redirect_to article_tags_path
    end

    def destroy
        article_pending_del = ArticleTag.find(params[:id])
        article_pending_del.destroy
        redirect_to article_tags_path
    end

    private
    def atag_params
        params.require(:article_tag).permit(:tag_name)
    end
end
