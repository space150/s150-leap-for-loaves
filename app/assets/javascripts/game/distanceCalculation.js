
function calculateInchesFromNowToDate( now, date )
{
	// MAGIC NUMBERS HERE!
	
	// it is assumed that the "average" jumping speed/velocity of a user
	// will be 0.16mm per 1ms. We take the time of the jump and calculate how
	// high the user might have jumped in that time. We are currently ignoring
	// things such as the jump trajectory/apex/etc. as this is a silly little game

	// also keep in mind this logic is mirrored server side (look at leaps#calculate_inches_from_now_to_date)
	var m1 = 0.16;
	var m2 = 0.0393700787; // the number of inches in 1mm
	var d1 = now - date;
	var d2 = d1*m1;
	var d3 = d2*m2;
	if ( d3 > 50.0 )
		d3 = 50.0; // cap at 50
	return d3;
}