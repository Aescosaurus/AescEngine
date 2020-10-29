class Camera
{
	constructor()
	{
		this.pos = new Point( 0,0 )
		this.diff = new Point( 0,0 )
		this.oldX = -1
		this.oldY = -1
		
		this.lineWidth = 1
		this.lineCol = "cyan"
	}
	
	Update( mouse,kbd )
	{
		this.diff.Set( 0,0 )
		if( kbd.KeyDown( ' ' ) && mouse.down )
		{
			if( this.oldX > 0 && this.oldY > 0 )
			{
				const xDiff = mouse.x - this.oldX
				const yDiff = mouse.y - this.oldY
				
				this.pos.x += xDiff
				this.pos.y += yDiff
				
				this.diff.x = xDiff
				this.diff.y = yDiff
			}
		}
			
		this.oldX = mouse.x
		this.oldY = mouse.y
	}
	
	Draw( gfx )
	{
		gfx.DrawRect( gfx.scrWidth / 2 + this.pos.x,0,
			this.lineWidth,gfx.scrHeight,this.lineCol )
		gfx.DrawRect( Module.width,gfx.scrHeight / 2 + this.pos.y,
			gfx.scrWidth - Module.width,this.lineWidth,this.lineCol )
	}
	
	GetDiff()
	{
		return( this.diff )
	}
}