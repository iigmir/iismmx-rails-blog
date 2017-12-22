class ArticlesController < ApplicationController
    before_action :authenticate_user!, only: [:new, :edit, :create, :update, :destroy]

    # R for CRUD
    def index
        @articles = Article.order(id: :desc).paginate(:page => params[:page], :per_page => 10 )
    end
    def show
        @article = Article.find_by_id(params[:id])
        @markdown = Redcarpet::Markdown.new( Redcarpet::Render::HTML.new(filter_html: false) , )
    end

    # C for CRUD
    def new
        @article = Article.new
    end
    def create
        Article.create( art_params )
        redirect_to article_path( Article.last[:id] )
    end

    # U for CRUD
    def edit
        @article = Article.find(params[:id])
    end
    def update
        byebug
        @article = Article.find(params[:id])
        @article.update_attributes(art_params)
        redirect_to article_path(@article)
    end

    # D for CRUD
    def destroy
        @article = Article.find(params[:id])
        @article.destroy
        redirect_to articles_path
    end

    before_filter :check_for_cancel, :only => [:create, :update]
    def check_for_cancel
        if params[:commit] == "Cancel"
            redirect_to articles_path
        end
    end

    private
    def art_params
        params.require(:article).permit(:title, :context, :article_category_ids)
    end
end
