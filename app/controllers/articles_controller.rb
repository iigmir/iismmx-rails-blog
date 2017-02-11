class ArticlesController < ApplicationController
  def index
  end
  def new
    @article = Article.new
  end
  def create
    Article.create( art_params )
    redirect_to articles_path
  end
  private

  def art_params
    params.require(:article).permit(:title, :context)
  end
end
