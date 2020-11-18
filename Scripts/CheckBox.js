class CheckBox
{
	constructor( name,defaultOn = true )
	{
		this.name = name
		this.on = defaultOn
		
		this.x = 0
		this.y = 0
	}
	
	Update( mouse,kbd )
	{
		if( mouse.uniqueLeft )
		{
			if( this.Contains( mouse.x,mouse.y ) )
			{
				this.Toggle()
			}
		}
	}
	
	Draw( gfx,drawOnOff = true )
	{
		const col = this.on ? "limegreen" : "red"
		
		gfx.DrawRect( this.x,this.y,CheckBox.size,CheckBox.size,col )
		
		gfx.DrawText( this.x + CheckBox.size + 7,this.y + CheckBox.size - 7,"lightgray",
			this.name + ( drawOnOff ? ( ": " + ( this.on ? "ON" : "OFF" ) ) : "" ) )
	}
	
	MoveTo( x,y )
	{
		this.x = x
		this.y = y
	}
	
	Toggle()
	{
		this.on = !this.on
	}
	
	Contains( x,y )
	{
		return( x > this.x && x < this.x + CheckBox.size &&
			y > this.y && y < this.y + CheckBox.size )
	}
	
	Checked()
	{
		return( this.on )
	}
}

CheckBox.size = 30