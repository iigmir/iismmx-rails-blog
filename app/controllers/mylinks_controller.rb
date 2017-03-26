class MylinksController < ApplicationController
  before_action :authenticate_user!, only: [:new, :edit, :update, :destroy]
  # C
  def new
    @link = Mylink.new
  end
  def create
    Article.create( link_params )
    redirect_to mylinks_path
  end

  # R
  def index
    @links = Mylink.order(id: :desc)
  end

  # U
  def edit
    @link = Mylink.find(params[:id])
  end
  def update
    @link = Mylink.find(params[:id])
    @link.update_attributes(link_params)
    redirect_to mylinks_path
  end

  # D
  def destory
    @link = Mylink.find(params[:id])
    @line.destroy
    redirect_to mylinks_path
  end

  # params
  private
  def link_params
    params.require(:article).permit(:site, :name, :intro, :group))
  end
end
