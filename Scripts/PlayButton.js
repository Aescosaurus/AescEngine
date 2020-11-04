class PlayButton
{
	constructor( gfx )
	{
		this.size = 45
		this.padding = 8
		this.x = gfx.scrWidth - this.size - this.padding
		this.y = gfx.scrHeight - this.size - this.padding
		
		this.hover = false
		
		this.playPoly =
		[
			{ x: this.x,y: this.y },
			{ x: this.x + this.size,y: this.y + this.size / 2 },
			{ x: this.x,y: this.y + this.size }
		]
		this.stopPoly =
		[
			{ x: this.x,y: this.y },
			{ x: this.x + this.size,y: this.y },
			{ x: this.x + this.size,y: this.y + this.size },
			{ x: this.x,y: this.y + this.size }
		]
		
		this.playing = false
	}
	
	Update( mouse,kbd )
	{
		this.hover = ( mouse.x > this.x && mouse.x < this.x + this.size &&
			mouse.y > this.y && mouse.y < this.y + this.size )
		
		if( ( this.hover && mouse.uniqueLeft ) ||
			Hotkeys.Check( 'B' ) )
		{
			this.playing = !this.playing
		}
	}
	
	Draw( gfx )
	{
		gfx.DrawPoly( this.playing ? this.stopPoly : this.playPoly,this.hover ? "white" : "lightgray" )
	}
	
	Playing()
	{
		return( this.playing )
	}
}