class MylinksController < ApplicationController
  before_action :authenticate_user!, only: [:new, :edit, :update, :destroy]
  # C
  def new
    @link = Mylink.new
    render layout: false
  end
  def create
    Mylink.create( link_params )
    redirect_to mylinks_path
  end

  # R
  def index
    @links = Mylink.order(id: :asc)
  end

  # U
  def edit
    @link = Mylink.find(params[:id])
    render layout: false
  end
  def update
    @link = Mylink.find(params[:id])
    @link.update_attributes(link_params)
    redirect_to mylinks_path
  end

  # D
  def destroy
    @link = Mylink.find(params[:id])
    @link.destroy
    redirect_to mylinks_path
  end

  # params
  private
  def link_params
    params.require(:mylink).permit(:site, :name, :intro, :group)
  end
end
