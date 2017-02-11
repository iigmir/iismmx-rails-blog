class ArticlesController < ApplicationController
  # R for CRUD
  def index
    @articles = Article.all
  end
  def show
    @article = Article.find(params[:id])
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
    Article.update( art_params )
    redirect_to articles_path
    #  What's different between:
    #  @job = Job.find(params[:id])
    #  @job.update_attributes(job_params)
    #  redirect_to jobs_path
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
