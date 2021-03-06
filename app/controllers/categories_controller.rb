class CategoriesController < ApplicationController
    before_action :authenticate_user!, only: [:new, :edit, :create, :update, :destroy]
    def new
    end
    def create
        Category.create( atag_params )
        redirect_to categories_path
    end

    def index
        @html_title = "標籤"
        @new_cata = Category.new
        tags = Category.all
        respond_to do |format|
            format.json { render json: tags }
            format.html { render :index }  
        end
    end
    def show
        tagged_articles = Category.articles_under_tag( Category.find( params[:id] ).article_ids )
        render json: tagged_articles
    end

    def edit
        @article = Category.find(params[:id])
    end
    def update
        @article = Category.find(params[:id])
        @article.update_attributes(art_params)
        redirect_to categories_path
    end

    def destroy
        article_pending_del = Category.find(params[:id])
        article_pending_del.destroy
        redirect_to categories_path
    end

    private
    def atag_params
        params.require(:category).permit(:tag_name)
    end
end
