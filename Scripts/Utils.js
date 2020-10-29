class Random{}
Random.Range = function( min,max )
{
	return( ( Math.random() * ( max - min ) ) + min )
}