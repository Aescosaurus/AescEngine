class IdentityMod extends Module
{
	constructor()
	{
		super( "Identity","Object position and scale." )
		this.pos = new Point( 400,250 )
		this.rot = -Math.PI / 2
		// this.scale = new Vector( 30,20,30,30,false )
		// this.scale.MoveTo( this.pos.x,this.pos.y )
		// this.color = "#ff00ff"
		this.objName = ""
	}
	
	Update( mouse,kbd,info )
	{
		this.pos.Update( mouse,kbd )
		// if( !this.pos.Dragging() )
		// {
		// 	this.scale.Update( mouse )
		// }
		// this.scale.MoveTo( this.pos.x,this.pos.y )
	}
	
	Draw( gfx )
	{
		// this.scale.Draw( gfx,"purple" )
		this.pos.Draw( gfx,"aquamarine" )
	}
	
	DrawAlways( gfx )
	{
		// const diff = this.scale.Interp( 0.5 ).Multiply( IdentityMod.scaleScale )
		// const diff = this.scale.Diff()
		// gfx.DrawRect( this.pos.x,this.pos.y,
		// 	diff.x,diff.y,this.color )
	}
	
	Decorate( obj )
	{
		obj.start += "this.objName = \"" + this.objName + "\"\n"
		obj.start += "this.x = " + this.pos.x + '\n'
		obj.start += "this.y = " + this.pos.y + '\n'
		obj.start += "this.rot = " + this.rot + '\n'
		obj.start += "this.active = true\n"
		// obj.start += "this.scale = " + this.scale.Code()
		// obj.start += "this.scale.Multiply( " + IdentityMod.scaleScale + " )\n"
		// obj.start += "this.color = '" + this.color + "'\n"
		
		obj.update += "if( !this.active ) return\n"
		
		// obj.draw += "gfx.DrawRect( this.pos.x - this.scale.x / 2,this.pos.y - this.scale.y / 2,this.scale.x,this.scale.y,this.color )\n"
		
		obj.draw += "if( !this.active ) return\n"
		
		obj.Newline()
		
		return( obj )
	}
	
	// RectContains( x,y )
	// {
	// 	// todo adjust for cam pos
	// 	const s = this.scale.Diff().Multiply( IdentityMod.scaleScale )
	// 	s.x = Math.abs( s.x )
	// 	s.y = Math.abs( s.y )
	// 	x += s.x / 2
	// 	y += s.y / 2
	// 	return( x > this.pos.x && x < this.pos.x + s.x &&
	// 		y > this.pos.y && y < this.pos.y + s.y )
	// }
	
	// GetScale()
	// {
	// 	return( this.scale )
	// }
}

IdentityMod.scaleScale = 2.0