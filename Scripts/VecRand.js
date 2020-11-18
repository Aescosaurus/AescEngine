class VecRand
{
	constructor( x1,y1,x2,y2 )
	{
		this.v1 = new Vector( 0,0,x1,y1 )
		this.v2 = new Vector( 0,0,x2,y2 )
	}
	
	Update( mouse,kbd )
	{
		if( mouse.rightDown )
		{
			if( this.v1.Dragging() ) this.v2.end = this.v1.end.Copy()
			else if( this.v2.Dragging() ) this.v1.end = this.v2.end.Copy()
		}
		
		this.v1.Update( mouse,kbd )
		if( !this.v1.Dragging() || mouse.rightDown ) this.v2.Update( mouse,kbd )
	}
	
	Draw( gfx,color )
	{
		this.v1.Draw( gfx,color )
		this.v2.Draw( gfx,color )
		
		gfx.DrawPoly( [ this.v1.start,this.v1.end,this.v2.end,this.v2.start ],color,VecRand.fillAlpha )
	}
	
	MoveTo( x,y )
	{
		this.v1.MoveTo( x,y )
		this.v2.MoveTo( x,y )
	}
	
	Dragging()
	{
		return( this.v1.Dragging() || this.v2.Dragging() )
	}
	
	Interp( percent )
	{
		const v1 = this.v1.Diff()
		const v2 = this.v2.Diff()
		return( v2.Subtract( v1 ).Multiply( percent ).Add( v1 ) )
	}
	
	Code( addNewline = true )
	{
		const v1 = this.v1.Diff()
		const v2 = this.v2.Diff()
		return( "new Point( Random.Range( " + v1.x + ',' + v2.x +
			" ),Random.Range( " + v1.y + ',' + v2.y + " ) )" + ( addNewline ? '\n' : '' ) )
	}
}

VecRand.fillAlpha = 0.3