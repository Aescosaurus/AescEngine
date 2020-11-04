class ColorMod extends Module
{
	constructor()
	{
		super( "Color","Arrows represent red, green, and blue in object color." )
		
		this.rOffset = -60
		this.gOffset = -30
		this.bOffset = 0
		
		// this.r = new Vector( this.rOffset,0,this.rOffset,-100 )
		// this.g = new Vector( this.gOffset,0,this.gOffset,-100 )
		// this.b = new Vector( this.bOffset,0,this.bOffset,-100 )
		
		this.rBar = new SliderBar( "R","red" )
		this.gBar = new SliderBar( "G","#00ff00" )
		this.bBar = new SliderBar( "B","blue" )
		
		this.rBar.vec = new Vector( 0,0,100,0 )
		this.gBar.vec = new Vector( 0,0,0,-100 )
		this.bBar.vec = new Vector( 0,0,-100,0 )
		
		this.scale = new Vector( 0,0,100,100 )
		this.diff = this.scale.Diff()
		
		this.drawPos = new Point( 0,0 )
	}
	
	Update( mouse,kbd,info )
	{
		// this.r.MoveTo( info.pos.x + this.rOffset,info.pos.y )
		// this.g.MoveTo( info.pos.x + this.gOffset,info.pos.y )
		// this.b.MoveTo( info.pos.x + this.bOffset,info.pos.y )
		
		const sDiff = this.scale.Diff().x
		this.rBar.MoveTo( info.pos.x,info.pos.y )
		this.gBar.MoveTo( info.pos.x,info.pos.y )
		this.bBar.MoveTo( info.pos.x,info.pos.y )
		
		this.scale.Update( mouse,kbd )
		this.scale.MoveTo( info.pos.x - this.scale.Diff().x / 2,info.pos.y - this.scale.Diff().y / 2 )
		
		this.diff = this.scale.Diff()
		
		if( !this.scale.Dragging() )
		{
			if( !this.rBar.Update( mouse,kbd ) )
			{
				if( !this.gBar.Update( mouse,kbd ) )
				{
					this.bBar.Update( mouse,kbd )
				}
			}
			
			// this.r.Update( mouse,kbd )
			// if( !this.r.Dragging() )
			// {
			// 	this.g.Update( mouse,kbd )
			// 	
			// 	if( !this.g.Dragging() )
			// 	{
			// 		this.b.Update( mouse,kbd )
			// 	}
			// }
		}
	}
	
	UpdatePassive( info )
	{
		this.drawPos.x = info.pos.x - this.diff.x / 2
		this.drawPos.y = info.pos.y - this.diff.y / 2
	}
	
	Draw( gfx )
	{
		// this.r.Draw( gfx,"#ff0000" )
		// this.g.Draw( gfx,"#00ff00" )
		// this.b.Draw( gfx,"#0000ff" )
		
		this.rBar.Draw( gfx )
		this.gBar.Draw( gfx )
		this.bBar.Draw( gfx )
		
		this.scale.Draw( gfx,"purple" )
	}
	
	DrawAlways( gfx )
	{
		const diff = this.scale.Diff()
		gfx.DrawRect( this.drawPos.x,this.drawPos.y,
			diff.x,diff.y,this.GetColor() )
	}
	
	GetColor()
	{
		// const rgb = this.Color2RGB( 0.5 )
		// return( "rgb( " + rgb.r + ',' + rgb.g + ',' + rgb.b + " )" )
		return( "rgb( " + ( this.rBar.CalcVal() * 255 ) + ',' +
			( this.gBar.CalcVal() * 255 ) + ',' +
				( this.bBar.CalcVal() * 255 ) + " )" )
	}
	
	// Color2RGB( interp )
	// {
	// 	let r = this.r.Diff().GetLen()
	// 	let g = this.g.Diff().GetLen()
	// 	let b = this.b.Diff().GetLen()
	// 	
	// 	const max = Math.max( Math.max( r,g ),b )
	// 	r /= max
	// 	g /= max
	// 	b /= max
	// 	
	// 	return( { r: Math.floor( r * 255 ),g: Math.floor( g * 255 ),b: Math.floor( b * 255 ) } )
	// }
	
	Decorate( obj )
	{
		obj.start += "this.ccolor = 'rgb( " + this.rBar.CalcVal() * 255 + ',' +
			this.gBar.CalcVal() * 255 + ',' + this.bBar.CalcVal() * 255 + " )'\n"
		// obj.start += "const r = Random.Range( " + this.r.v1.Diff().GetLen() + ',' + this.r.v2.Diff().GetLen() + " )\n";
		// obj.start += "const g = Random.Range( " + this.g.v1.Diff().GetLen() + ',' + this.g.v2.Diff().GetLen() + " )\n";
		// obj.start += "const b = Random.Range( " + this.b.v1.Diff().GetLen() + ',' + this.b.v2.Diff().GetLen() + " )\n";
		// obj.start += "this.color = 'rgb( ' + r + ',' + g + ',' + b + ' )'\n"
		
		const scale = this.scale.Diff()
		obj.draw += "gfx.DrawRect( this.x - " + scale.x / 2 + ",this.y - " + scale.y / 2 + "," +
			scale.x + "," + scale.y + ",this.ccolor )\n"
		
		obj.Newline()
		
		return( obj )
	}
}