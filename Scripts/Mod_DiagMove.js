class DiagMoveMod extends Module
{
	constructor()
	{
		super( "Diag Move","Up down left right movement keys, arrow changes speed." )
		
		this.w = new InputStr( 'W',1 )
		this.s = new InputStr( 'S',1 )
		this.a = new InputStr( 'A',1 )
		this.d = new InputStr( 'D',1 )
		
		this.wasdPos = new Vector( 0,0,50,-50 )
		
		this.wasdPadding = InputStr.width + 5
	}
	
	Update( mouse,kbd,info )
	{
		this.w.Update( mouse,kbd )
		this.s.Update( mouse,kbd )
		this.a.Update( mouse,kbd )
		this.d.Update( mouse,kbd )
		
		this.wasdPos.MoveTo( info.pos.x,info.pos.y )
		this.wasdPos.Update( mouse,kbd )
		
		const drawX = this.wasdPos.end.x
		const drawY = this.wasdPos.end.y
		this.w.SetPos( drawX,drawY - this.wasdPadding * 2 )
		this.s.SetPos( drawX,drawY - this.wasdPadding )
		this.a.SetPos( drawX - this.wasdPadding,drawY - this.wasdPadding )
		this.d.SetPos( drawX + this.wasdPadding,drawY - this.wasdPadding )
	}
	
	Draw( gfx )
	{
		this.w.Draw( gfx )
		this.s.Draw( gfx )
		this.a.Draw( gfx )
		this.d.Draw( gfx )
		
		this.wasdPos.Draw( gfx,"red" )
	}
	
	Decorate( obj )
	{
		obj.start += "this.dmSpeed = " + this.wasdPos.Diff().Multiply( DiagMoveMod.speedScale ).GetLen().toString() + '\n'
		obj.start += "this.dmControls = [ '" + this.w.str + "'.toUpperCase(),'" + this.s.str + "'.toUpperCase(),'" +
			this.a.str + "'.toUpperCase(),'" + this.d.str + "'.toUpperCase() ]\n"
		
		// obj.update += "for( let i in this.controls ) { if( kbd.KeyDown( this.controls[i] ) )  }"
		obj.update += "let dMoveX = 0\n"
		obj.update += "let dMoveY = 0\n"
		obj.update += "if( kbd.KeyDown( this.dmControls[0] ) ) dMoveY -= 1\n"
		obj.update += "if( kbd.KeyDown( this.dmControls[1] ) ) dMoveY += 1\n"
		obj.update += "if( kbd.KeyDown( this.dmControls[2] ) ) dMoveX -= 1\n"
		obj.update += "if( kbd.KeyDown( this.dmControls[3] ) ) dMoveX += 1\n"
		obj.update += "const dMoveLen = Math.sqrt( dMoveX * dMoveX + dMoveY * dMoveY )\n"
		obj.update += "if( dMoveLen > 0 ) {\n"
		obj.update += "this.x += dMoveX / dMoveLen * this.dmSpeed\n"
		obj.update += "this.y += dMoveY / dMoveLen * this.dmSpeed\n"
		obj.update += "}\n"
		
		obj.Newline()
		
		return( obj )
	}
}

DiagMoveMod.speedScale = 0.03