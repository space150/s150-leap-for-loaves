class LeapsController < ApplicationController
  # GET /leaps
  # GET /leaps.json
  def index
    @leaps = Leap.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @leaps }
    end
  end

  # GET /leaps/1
  # GET /leaps/1.json
  def show
    @leap = Leap.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @leap }
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

  # GET /leaps/1/edit
  def edit
    @leap = Leap.find(params[:id])
  end

  # POST /leaps
  # POST /leaps.json
  def create
    @leap = Leap.new(params[:leap])

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

  # PUT /leaps/1
  # PUT /leaps/1.json
  def update
    @leap = Leap.find(params[:id])

    respond_to do |format|
      if @leap.update_attributes(params[:leap])
        format.html { redirect_to @leap, notice: 'Leap was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @leap.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /leaps/1
  # DELETE /leaps/1.json
  def destroy
    @leap = Leap.find(params[:id])
    @leap.destroy

    respond_to do |format|
      format.html { redirect_to leaps_url }
      format.json { head :no_content }
    end
  end
end
