require 'test_helper'
require 'digest/sha1'

class LeapsControllerTest < ActionController::TestCase
  setup do
    @leap = leaps(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:leaps)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create leap" do
    now = 10.seconds.ago.to_i
    start = 20.seconds.ago.to_i
    inches = Leap.calculate_inches_from_now_to_date( now, start ).to_s
    csrf = session['_csrf_token']
    digest = Digest::SHA1.hexdigest( "#{now}-#{start}-#{inches}-#{csrf}" )

    assert_difference('Leap.count') do
      post :create, { :n => now, :s => start, :d => inches, :x => digest, :format => :json }
      assert_response :success  
    end
  end

  test "should fail to create leap with invalid digest" do
    now = 10.seconds.ago.to_i
    start = 20.seconds.ago.to_i
    inches = Leap.calculate_inches_from_now_to_date( 11.seconds.ago.to_i, start ).to_s
    csrf = session['_csrf_token']
    digest = Digest::SHA1.hexdigest( "#{now}-#{start}-#{inches}-#{csrf}" )

    assert_no_difference('Leap.count') do
      post :create, { :n => now, :s => start, :d => inches, :x => digest, :format => :json }
      assert_response :unprocessable_entity  
    end
  end

end
