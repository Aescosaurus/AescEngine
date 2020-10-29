class InputStr
{
	constructor( defaultVal,maxLen = 99999,c1 = "orange",c2 = "chocolate",c3 = "red",c4 = "darkred" )
	{
		this.str = defaultVal
		this.maxLen = maxLen
		this.active = false
		this.x = 0
		this.y = 0
		
		this.c1 = c1
		this.c2 = c2
		this.c3 = c3
		this.c4 = c4
		
		this.width = InputStr.width
		
		this.valid = false
	}
	
	// Return true for 1 frame on deactivate.
	Update( mouse,kbd,x,y )
	{
		if( this.active )
		{
			if( kbd.lastKey == "Backspace" ) this.str = this.str.substr( 0,this.str.length - 1 )
			if( kbd.lastKey.length < 2 ) this.str += kbd.lastKey
			if( this.str.length >= this.maxLen || kbd.lastKey == "Enter" || kbd.lastKey == "Escape" )
			{
				if( this.active )
				{
					this.active = false
					Hotkeys.blocked = false
					return( true )
				}
			}
		}
		else
		{
			if( mouse.uniqueLeft && this.Contains( mouse.x + this.width / 2,mouse.y + InputStr.height / 2 ) )
			{
				this.str = ""
				this.active = true
				Hotkeys.blocked = true
			}
		}
		
		return( false )
	}
	
	Draw( gfx )
	{
		// wtf do this in update :P
		if( this.str.length > 0 )
		{
			gfx.ctx.font = InputStr.fontSize.toString() + "px Arial"
			this.width = gfx.ctx.measureText( this.str ).width + InputStr.padding * 2
		}
		
		// let drawCol = valid ? this.c1 : this.c3
		// if( this.active ) drawCol = valid ? this.c2 : this.c4
		let drawCol = this.active ? this.c1 : this.c2
		if( !this.valid ) drawCol = this.active ? this.c3 : this.c4
		gfx.DrawRect( this.x - this.width / 2 - InputStr.padding,this.y - InputStr.height / 2,
			this.width,InputStr.height,
			drawCol )
		
		gfx.DrawText( this.x - this.width / 2,this.y + 7,"white",this.str,InputStr.fontSize )
	}
	
	SetPos( x,y )
	{
		this.x = x
		this.y = y
	}
	
	MoveTo( x,y )
	{
		this.SetPos( x,y )
	}
	
	Contains( x,y )
	{
		return( x > this.x && x < this.x + this.width &&
			y > this.y && y < this.y + InputStr.height )
	}
}

InputStr.width = 32
InputStr.height = 30
InputStr.fontSize = 25
InputStr.padding = 5