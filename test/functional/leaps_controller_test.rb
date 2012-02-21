require 'test_helper'

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
    assert_difference('Leap.count') do
      post :create, leap: @leap.attributes
    end

    assert_redirected_to leap_path(assigns(:leap))
  end

  test "should show leap" do
    get :show, id: @leap
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @leap
    assert_response :success
  end

  test "should update leap" do
    put :update, id: @leap, leap: @leap.attributes
    assert_redirected_to leap_path(assigns(:leap))
  end

  test "should destroy leap" do
    assert_difference('Leap.count', -1) do
      delete :destroy, id: @leap
    end

    assert_redirected_to leaps_path
  end
end
