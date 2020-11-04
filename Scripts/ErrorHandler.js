class ErrorHandler
{
	constructor( gfx )
	{
		this.botY = gfx.scrHeight - ObjectClass.botMenuHeight
		this.padding = 5
		
		this.fontSize = 20
		
		this.errorCol = "white"
	}
	
	Update( mouse,kbd )
	{
		if( kbd.lastKey == "Escape" || ( mouse.uniqueLeft && this.Contains( mouse.x,mouse.y ) ) )
		{
			ErrorHandler.msgs.length = 0
		}
	}
	
	Draw( gfx )
	{
		if( ErrorHandler.msgs.length < 1 ) return
		
		gfx.DrawRect( 0,this.botY,gfx.scrWidth,ObjectClass.botMenuHeight,"red" )
		
		gfx.DrawRect( 0 + this.padding,this.botY + this.padding,gfx.scrWidth - this.padding * 2,
			ObjectClass.botMenuHeight - this.padding * 2,"gray" )
		
		for( let i in ErrorHandler.msgs )
		{
			gfx.DrawText( this.padding * 2,this.botY + this.padding + ( this.fontSize + this.padding ) * ( i + 1 ),
				this.errorCol,ErrorHandler.msgs[i],this.fontSize )
		}
	}
	
	Contains( x,y )
	{
		return( y > this.botY )
	}
}

ErrorHandler.msgs = []
ErrorHandler.Throw = function( msg )
{
	ErrorHandler.msgs.push( "(!) Error: " + msg )
}