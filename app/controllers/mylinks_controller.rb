class MylinksController < ApplicationController
  before_action :authenticate_user!, only: [:new, :edit, :update, :destroy]
  def index
  end
end
