class ArticlesController < ApplicationController
  # R for CRUD
  def index
    @articles = Article.order(id: :desc).paginate(:page => params[:page], :per_page => 5 )
  end
  def show
    @article = Article.find_by_id(params[:id])
    if @article == nil
      redirect_to articles_path
    end
  end

  # C for CRUD
  def new
    @article = Article.new
  end
  def create
    Article.create( art_params )
    redirect_to articles_path
  end

  # U for CRUD
  def edit
    @article = Article.find(params[:id])
  end
  def update
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
    params.require(:article).permit(:title, :context)
  end
end
