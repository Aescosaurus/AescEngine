class Keyboard
{
	constructor()
	{
		this.keyMap = []
		this.lastKey = ""
		const self = this
		
		onkeydown = onkeyup = function( event )
		{
			self.keyMap[event.keyCode] = ( event.type == "keydown" )
			if( event.type == "keydown" ) self.lastKey = event.key
		}
	}
	
	KeyDown( key )
	{
		if( typeof( key ) == "string" ) key = key.charCodeAt( 0 )
		
		return( this.keyMap[key] )
	}
}