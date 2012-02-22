function calculateInchesFromNowToDate( now, date )
{
	var d1 = now - date;
	var d2 = d1*0.16; // MAGIC NUMBER HERE!!! - 0.16 millimeter per millisecond
	return d2*0.0393700787; // convert mm to inches
}