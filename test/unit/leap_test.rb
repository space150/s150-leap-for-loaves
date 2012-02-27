require 'test_helper'

class LeapTest < ActiveSupport::TestCase

	test "should correctly format total inches" do
		assert_equal Leap.sum(:inches).ceil, 42
		assert_equal Leap.formatted_total_inches, "3'6\""
	end

	test "should calculate tier image" do
		leap = Leap.new( :inches => 4.0 )
		assert_equal leap.tier, 1
		leap.inches = 12
		assert_equal leap.tier, 2
		leap.inches = 50
		assert_equal leap.tier, 3
	end

end
