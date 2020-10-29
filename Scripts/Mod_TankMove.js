class TankMoveMod extends Module
{
	constructor()
	{
		super( "Tank Move","Red is move speed orange is rot speed." )
		
		this.w = new InputStr( 'W',1 )
		this.s = new InputStr( 'S',1 )
		this.a = new InputStr( 'A',1 )
		this.d = new InputStr( 'D',1 )
		
		this.wasdPos = new Vector( 0,0,100,100 )
		this.rotSpeed = new Vector( 0,0,50,-50 )
		
		this.wasdPadding = InputStr.width + 5
		
		this.friction = new SliderBar( "Friction" )
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
		
		this.friction.Update( mouse,kbd )
		this.friction.MoveTo( info.pos.x - 80,info.pos.y )
		
		this.rotSpeed.Update( mouse,kbd )
		this.rotSpeed.MoveTo( info.pos.x,info.pos.y )
	}
	
	Draw( gfx )
	{
		this.w.Draw( gfx )
		this.s.Draw( gfx )
		this.a.Draw( gfx )
		this.d.Draw( gfx )
		
		this.wasdPos.Draw( gfx,"red" )
		this.rotSpeed.Draw( gfx,"orange" )
		
		this.friction.Draw( gfx )
	}
	
	Decorate( obj )
	{
		obj.start += "this.tmUpKey = '" + this.w.str + "'\n"
		obj.start += "this.tmDownKey = '" + this.s.str + "'\n"
		obj.start += "this.tmLeftKey = '" + this.a.str + "'\n"
		obj.start += "this.tmRightKey = '" + this.d.str + "'\n"
		obj.start += "this.tmSpeed = " + ( this.wasdPos.Diff().GetLen() / TankMoveMod.spdDiv ) + '\n'
		obj.start += "this.tmRotSpeed = " + ( this.rotSpeed.Diff().GetLen() / TankMoveMod.rotDiv ) + '\n'
		obj.start += "this.tmFriction = " + ( 1.0 - this.friction.CalcVal() ) + '\n'
		obj.start += "this.tmXVel = 0\n"
		obj.start += "this.tmYVel = 0\n"
		
		obj.update += "let tmXMove = 0\n"
		obj.update += "let tmYMove = 0\n"
		obj.update += "if( kbd.KeyDown( this.tmUpKey ) ) --tmYMove\n"
		obj.update += "if( kbd.KeyDown( this.tmDownKey ) ) ++tmYMove\n"
		obj.update += "if( kbd.KeyDown( this.tmLeftKey ) ) this.rot -= this.tmRotSpeed\n"
		obj.update += "if( kbd.KeyDown( this.tmRightKey ) ) this.rot += this.tmRotSpeed\n"
		obj.update += "this.tmXVel += Math.cos( this.rot ) * tmXMove + Math.cos( this.rot ) * tmYMove\n"
		obj.update += "this.tmYVel += Math.sin( this.rot ) * tmXMove + Math.sin( this.rot ) * tmYMove\n"
		obj.update += "this.x -= this.tmXVel * this.tmSpeed\n"
		obj.update += "this.y -= this.tmYVel * this.tmSpeed\n"
		obj.update += "this.tmXVel *= this.tmFriction\n"
		obj.update += "this.tmYVel *= this.tmFriction\n"
		
		obj.Newline()
		
		return( obj )
	}
}

TankMoveMod.spdDiv = 100.0
TankMoveMod.rotDiv = 1000.0