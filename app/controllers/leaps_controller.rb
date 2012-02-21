class LeapsController < ApplicationController
  
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

  # POST /leaps
  # POST /leaps.json
  def create
    @leap = Leap.new(:inches => params[:inches])

    respond_to do |format|
      if @leap.save
        format.html { redirect_to @leap, notice: 'Leap was successfully created.' }
        format.json { render json: @leap, status: :created, location: @leap }
      else
        format.html { render action: "new" }
        format.json { render json: @leap.errors, status: :unprocessable_entity }
      end
    end
  end
  
end
