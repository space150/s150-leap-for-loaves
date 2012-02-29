class LeapsController < ApplicationController
  
  # GET /leaderboard
  def leaderboard
    redirect_to '/leaps'
  end

  # GET /leaps
  # GET /leaps.json
  def index
    @leaps = Leap.page(params[:page]).order('created_at desc')

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @leaps }
    end
  end

  # GET /leaps/new
  # GET /leaps/new.json
  def new
    @leap = Leap.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @leap }
    end
  end
  
end
