class ArticlesController < ApplicationController
  # Auth setting
  
  # R for CRUD
  def index
    @articles = Article.order(id: :desc)
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
    #  What's different between:
    #  Article.update( art_params )
    
    #  And:
    #  @job = Job.find(params[:id])
    #  @job.update_attributes(job_params)
    
    #  Fucking! Fucking different! Article.update( art_params ) may update EVERYTHING!!!!!
    
  end

  # D for CRUD
  def destroy
    @article = Article.find(params[:id])
    @article.destroy
    redirect_to articles_path
  end

  private
  def art_params
    params.require(:article).permit(:title, :context)
  end
end
