class SpritePicker
{
	constructor()
	{
		this.c1 = "limegreen"
		this.c2 = "darkgreen"
		this.c3 = "red"
		this.c4 = "darkred"
		
		this.x = 0
		this.y = 0
		
		this.spr = null
		
		this.hovering = false
		
		this.width = SpritePicker.size
		this.height = SpritePicker.size
	}
	
	Update( mouse,kbd )
	{
		this.hovering = this.Contains( mouse.x,mouse.y )
		if( mouse.uniqueLeft && this.hovering )
		{
			ImageMap.active = true
		}
		
		if( ImageMap.spr != null )
		{
			this.spr = ImageMap.spr
			
			ImageMap.active = false
			ImageMap.spr = null
		}
	}
	
	Draw( gfx )
	{
		if( this.spr == null )
		{
			gfx.DrawRect( this.x,this.y,this.width,this.height,
				this.hovering ? this.c3 : this.c4 )
		}
		else if( this.hovering )
		{
			gfx.DrawRect( this.x,this.y,this.width,this.height,
				this.c1 )
		}
		
		if( this.spr != null )
		{
			gfx.DrawSpriteScale( this.x + 5,this.y + 5,
				this.spr,this.width - 10,this.height - 10 )
		}
	}
	
	MoveTo( x,y )
	{
		this.x = x
		this.y = y
	}
	
	Contains( x,y )
	{
		return( x > this.x && x < this.x + this.width &&
			y > this.y && y < this.y + this.height )
	}
}

SpritePicker.size = 96 / 2