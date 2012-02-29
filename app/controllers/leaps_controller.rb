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

  # POST /leaps
  # POST /leaps.json
  def create
    now = params[:n]
    start = params[:s]
    inches = params[:d]
    csrf = session['_csrf_token']
    digest = params[:x]

    # if our validation hash and recalculated result match, we are good to go!
    if Leap.validate_digest( now, start, inches, csrf, digest )
      @leap = Leap.new( :inches => inches )

      respond_to do |format|
        if @leap.save
          format.html { render action: "new" }
          format.json { render json: { i: @leap.formatted_inches, t: Leap.formatted_total_inches }, status: 200 }
        else
          format.html { render action: "new" }
          format.json { render json: @leap.errors, status: :unprocessable_entity }
        end
      end
    else
      # toss an error!
      respond_to do |format|
        format.html { render action: "new" }
        format.json { render json: "EPIC FAILURE", status: :unprocessable_entity }
      end
    end
  end
  
end
