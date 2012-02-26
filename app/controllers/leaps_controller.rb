require 'digest/sha1'

class LeapsController < ApplicationController
  caches_action :index, :cache_path => Proc.new{ |c| "leaderboard/#{params[:page] || 1}" }
  
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

    # use the passed in data and csrf token to generate a validation hash
    now = params[:n]
    start = params[:s]
    inches = params[:d]
    csrf = session['_csrf_token']
    digest = params[:x]
    calced_digest = Digest::SHA1.hexdigest( "#{now}-#{start}-#{inches}-#{csrf}" )

    # using the passed in data recalculate the result (to ensure the passed in data is at least
    # internally consistant)
    m1 = 0.16;
    m2 = 0.0393700787; # the number of inches in 1mm
    d1 = now.to_i - start.to_i;
    d2 = d1*m1;
    result = d2*m2;

    # if our validation hash and recalculated result match, we are good to go!
    if digest == calced_digest && inches.to_f == result
      @leap = Leap.new( :inches => params[:d] )

      respond_to do |format|
        if @leap.save
          format.html { redirect_to @leap, notice: 'Leap was successfully created.' }
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
