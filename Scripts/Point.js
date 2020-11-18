class Point
{
	constructor( x = 0,y = 0 )
	{
		this.x = x
		this.y = y
		
		this.dragging = false
	}
	
	Update( mouse,kbd )
	{
		if( Math.pow( mouse.x - this.x,2 ) + Math.pow( mouse.y - this.y,2 ) < Math.pow( Point.radius,2 ) )
		{
			if( mouse.down ) this.dragging = true
		}
		
		if( !mouse.down )
		{
			this.dragging = false
		}
		
		if( this.dragging )
		{
			this.x = mouse.x
			this.y = mouse.y
			
			// todo: fix this based on camera pos
			// if( kbd.KeyDown( 16 ) )
			// {
			// 	this.x -= this.x % 20
			// 	this.y -= this.y % 20
			// }
		}
	}
	
	Draw( gfx,color,rad = Point.radius )
	{
		gfx.DrawCircle( this.x,this.y,rad,color )
	}
	
	Move( dx,dy )
	{
		this.x += dx
		this.y += dy
	}
	
	MoveTo( x,y )
	{
		const xDiff = x - this.x
		const yDiff = y - this.y
		
		this.Move( xDiff,yDiff )
	}
	
	Add( other )
	{
		this.x += other.x
		this.y += other.y
		
		return( this )
	}
	
	Subtract( other )
	{
		this.x -= other.x
		this.y -= other.y
		
		return( this )
	}
	
	Multiply( amount )
	{
		this.x *= amount
		this.y *= amount
		
		return( this )
	}
	
	Divide( amount )
	{
		this.x /= amount
		this.y /= amount
		
		return( this )
	}
	
	Set( x,y )
	{
		this.x = x
		this.y = y
	}
	
	GetLen()
	{
		return( Math.sqrt( this.x * this.x + this.y * this.y ) )
	}
	
	Normalize()
	{
		const len = this.GetLen()
		if( len != 0.0 )
		{
			this.x /= len
			this.y /= len
		}
		return( this )
	}
	
	Dragging()
	{
		return( this.dragging )
	}
	
	Copy()
	{
		return( new Point( this.x,this.y ) )
	}
	
	Code()
	{
		return( "new Point( " + this.x + "," + this.y + " )\n" )
	}
}

Point.lineWidth = 3
Point.radius = 10