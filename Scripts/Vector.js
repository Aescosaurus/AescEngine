class Vector
{
	constructor( sx,sy,ex,ey,editStart = false )
	{
		this.start = new Point( sx,sy )
		this.end = new Point( ex,ey )
		
		this.dragStart = false
		this.dragEnd = false
		this.canEditStart = editStart
	}
	
	Update( mouse,kbd )
	{
		if( Math.pow( mouse.x - this.end.x,2 ) + Math.pow( mouse.y - this.end.y,2 ) < Math.pow( Vector.endClickArea,2 ) )
		{
			if( mouse.down || mouse.rightDown ) this.dragEnd = true
		}
		else if( Math.pow( mouse.x - this.start.x,2 ) + Math.pow( mouse.y - this.start.y,2 ) < Math.pow( Vector.startRad,2 ) )
		{
			if( mouse.down || mouse.rightDown ) this.dragStart = true
		}
		
		if( !mouse.down && !mouse.rightDown )
		{
			this.dragStart = false
			this.dragEnd = false
		}
		
		if( this.dragStart && this.canEditStart )
		{
			this.start.x = mouse.x
			this.start.y = mouse.y
		}
		else if( this.dragEnd )
		{
			this.end.x = mouse.x
			this.end.y = mouse.y
		}
		
		if( kbd.KeyDown( 16 ) && this.Dragging() )
		{
			const diff = this.Diff()
			if( ( diff.x ) > ( diff.y ) )
			{
				this.end.x = this.start.x + diff.y
			}
			else
			{
				this.end.y = this.start.y + diff.x
			}
		}
	}
	
	Draw( gfx,color = "red" )
	{
		gfx.DrawLine( this.start.x,this.start.y,this.end.x,this.end.y,color,Vector.lineWidth )
		
		const diff = this.Diff()
		gfx.DrawTriangle( this.end.x,this.end.y,Vector.endRad,diff.x,diff.y,color )
		
		// this.start.Draw( gfx,color,Vector.startRad )
		// this.end.Draw( gfx,color,Vector.endRad )
	}
	
	Move( dx,dy )
	{
		this.start.Move( dx,dy )
		this.end.Move( dx,dy )
	}
	
	MoveTo( x,y )
	{
		const xDiff = x - this.start.x
		const yDiff = y - this.start.y
		
		this.Move( xDiff,yDiff )
	}
	
	Dragging()
	{
		return( this.dragStart || this.dragEnd )
	}
	
	Diff()
	{
		return( new Point( this.end.x - this.start.x,this.end.y - this.start.y ) )
	}
	
	Copy()
	{
		return( new Vector( this.start.x,this.start.y,this.end.x,this.end.y,this.canEditStart ) )
	}
	
	Code()
	{
		return( "new Vector( " + this.start.x + "," + this.start.y + "," +
			this.end.x + "," + this.end.y + " )\n" )
	}
}

Vector.lineWidth = 2
Vector.startRad = 5
Vector.endRad = 15
Vector.endClickArea = 25