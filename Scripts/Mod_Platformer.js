class PlatformerMod extends Module
{
	constructor()
	{
		super( "Platformer","Attach collider mod to walls or floors." )
		
		this.size = new Vector( 0,0,100,100 )
		this.hitboxCol = "limegreen"
		
		this.w = new InputStr( 'W',1 )
		this.a = new InputStr( 'A',1 )
		this.d = new InputStr( 'D',1 )
		this.wasdPadding = InputStr.width + 5
		
		this.speed = new Vector( 0,0,100,0 )
		this.grav = new SliderBar( "Gravity" )
		this.jump = new SliderBar( "Jump Power" )
		this.jump.vec.end.y -= 100
	}
	
	Update( mouse,kbd,info )
	{
		this.size.MoveTo( info.pos.x - this.size.Diff().x / 2,info.pos.y - this.size.Diff().y / 2 )
		this.size.Update( mouse,kbd )
		
		this.speed.MoveTo( info.pos.x,info.pos.y )
		this.speed.Update( mouse,kbd )
		
		this.w.Update( mouse,kbd )
		this.a.Update( mouse,kbd )
		this.d.Update( mouse,kbd )
		const drawX = this.speed.end.x
		const drawY = this.speed.end.y
		this.w.SetPos( drawX,drawY - this.wasdPadding * 2 )
		this.a.SetPos( drawX - this.wasdPadding,drawY - this.wasdPadding )
		this.d.SetPos( drawX + this.wasdPadding,drawY - this.wasdPadding )
		
		this.grav.MoveTo( info.pos.x,info.pos.y )
		this.grav.Update( mouse,kbd )
		
		this.jump.MoveTo( info.pos.x,info.pos.y )
		this.jump.Update( mouse,kbd )
	}
	
	Draw( gfx )
	{
		gfx.DrawRect( this.size.start.x,this.size.start.y,this.size.Diff().x,1,this.hitboxCol )
		gfx.DrawRect( this.size.end.x,this.size.start.y,1,this.size.Diff().y,this.hitboxCol )
		gfx.DrawRect( this.size.start.x,this.size.end.y,this.size.Diff().x,1,this.hitboxCol )
		gfx.DrawRect( this.size.start.x,this.size.start.y,1,this.size.Diff().y,this.hitboxCol )
		
		this.size.Draw( gfx )
		
		this.w.Draw( gfx )
		this.a.Draw( gfx )
		this.d.Draw( gfx )
		
		this.speed.Draw( gfx )
		
		this.grav.Draw( gfx )
		this.jump.Draw( gfx )
	}
	
	Decorate( obj,info )
	{
		obj.start += "this.pHitbox = { width: " + this.size.Diff().x + ",height: " + this.size.Diff().y + " }\n"
		obj.start += "this.platGravAcc = " + ( this.grav.CalcVal() * PlatformerMod.gravityScale ) + '\n'
		obj.start += "this.platYVel = 0.0\n"
		obj.start += "this.platTestXMove = 0.0\n"
		obj.start += "this.platTestYMove = 0.0\n"
		obj.start += "this.platJumping = false\n"
		obj.start += "this.platCanJump = true\n"
		
		const spd = this.speed.Diff().GetLen() * PlatformerMod.speedScale
		obj.update += "this.platYVel += this.platGravAcc\n"
		obj.update += "if( kbd.KeyDown( '" + this.a.str.toUpperCase() + "' ) ) this.platTestXMove = -" + spd + '\n'
		obj.update += "if( kbd.KeyDown( '" + this.d.str.toUpperCase() + "' ) ) this.platTestXMove = " + spd + '\n'
		obj.update += "this.platTestYMove += this.platYVel\n"
		
		obj.update += "let platXColl = false\n"
		obj.update += "let platYColl = false\n"
		obj.update += "for( let obj of objs ) {\n"
		obj.update += "if( obj.objName != this.objName && ( obj.cCollider && this.CheckOverlap( this.x + this.platTestXMove,this.y,this.pHitbox,obj.x,obj.y,obj.cCollider ) ) ) {\n"
		obj.update += "platXColl = true\n"
		obj.update += "}\n"
		obj.update += "if( obj.objName != this.objName && ( obj.cCollider && this.CheckOverlap( this.x,this.y + this.platTestYMove,this.pHitbox,obj.x,obj.y,obj.cCollider ) ) ) {\n"
		obj.update += "platYColl = true\n"
		obj.update += "this.platCanJump = true\n"
		obj.update += "}\n"
		obj.update += "else this.platYVel = 0.0\n"
		obj.update += "}\n"
		obj.update += "if( !platXColl ) {\n"
		obj.update += "this.x += this.platTestXMove\n"
		obj.update += "this.platTestXMove = 0.0\n"
		obj.update += "}\n"
		obj.update += "if( !platYColl ) {\n"
		obj.update += "this.y += this.platTestYMove\n"
		obj.update += "this.platJumping = false\n"
		// obj.update += "this.platTestYMove = 0.0\n"
		obj.update += "}\n"
		
		obj.update += "if( this.platCanJump && kbd.KeyDown( '" + this.w.str.toUpperCase() + "' ) ) {\n"
		obj.update += "this.platJumping = true\n"
		obj.update += "this.platCanJump = false\n"
		obj.update += "}\n"
		obj.update += "if( this.platJumping ) {\n"
		obj.update += "this.platTestYMove = -" + ( this.jump.CalcVal() * PlatformerMod.jumpScale ) + '\n'
		obj.update += "this.platJumping = false\n"
		obj.update += "}\n"
		
		obj.Newline()
		
		return( obj )
	}
}

PlatformerMod.gravityScale = 0.1
PlatformerMod.speedScale = 0.03
PlatformerMod.jumpScale = 1.9