class ShooterMod extends Module
{
	constructor()
	{
		super( "Shooter","Shoots projectile towards arrow on key press." )
		
		this.shootKey = new InputStr( 'Q',1 )
		
		this.shootDir = new Vector( 0,0,0,-100 )
		
		this.bulletSpr = new SpritePicker()
		this.bulletScale = new Vector( 0,0,30,30 )
		
		this.shotCooldown = new SliderBar( "Cooldown" )
	}
	
	Update( mouse,kbd,info )
	{
		this.shootDir.Update( mouse,kbd )
		this.shootDir.MoveTo( info.pos.x,info.pos.y )
		
		this.shootKey.MoveTo( this.shootDir.end.x,this.shootDir.end.y - 40 )
		this.bulletSpr.MoveTo( this.shootDir.end.x + 20,this.shootDir.end.y + 20 )
		this.bulletScale.MoveTo( this.bulletSpr.x,this.bulletSpr.y )
		
		if( !this.shootDir.Dragging() )
		{
			this.shootKey.Update( mouse,kbd )
			
			this.bulletScale.Update( mouse,kbd )
			
			if( !this.bulletScale.Dragging() ) this.bulletSpr.Update( mouse,kbd )
			
			this.bulletSpr.width = this.bulletScale.Diff().x
			this.bulletSpr.height = this.bulletScale.Diff().y
			
			this.shotCooldown.Update( mouse,kbd )
			this.shotCooldown.MoveTo( info.pos.x,info.pos.y )
		}
	}
	
	Draw( gfx )
	{
		this.shootKey.Draw( gfx )
		
		this.bulletSpr.Draw( gfx )
		
		this.shootDir.Draw( gfx )
		
		this.bulletScale.Draw( gfx )
		
		this.shotCooldown.Draw( gfx )
	}
	
	Decorate( obj,info )
	{
		if( !this.bulletSpr.spr )
		{
			ErrorHandler.Throw( "Obj '" + info.name + "': Shooter Mod has no bullet sprite." )
			return
		}
		
		obj.start += "this.sBulletSpr = new Sprite( '" + this.bulletSpr.spr.path + "' )\n"
		obj.start += "this.sBulletWidth = " + this.bulletScale.Diff().x + '\n'
		obj.start += "this.sBulletHeight = " + this.bulletScale.Diff().y + '\n'
		obj.start += "this.sBulletList = []\n"
		obj.start += "this.sBulletSpeed = " + ( this.shootDir.Diff().GetLen() * ShooterMod.speedScale ) + '\n'
		obj.start += "this.sShotCooldown = " + ( this.shotCooldown.CalcVal() * 60 ) + '\n'
		obj.start += "this.sShotTimer = 0\n"
		obj.start += "this.sBulletRotOffset = " + Math.atan2( this.shootDir.Diff().y,this.shootDir.Diff().x ) + " + Math.PI / 2\n"
		
		obj.update += "if( ++this.sShotTimer > this.sShotCooldown && ( kbd.KeyDown( '" + this.shootKey.str + "' ) || '" + this.shootKey.str + "'.length < 1 ) ){\n"
		obj.update += "this.sShotTimer = 0.0\n"
		obj.update += "this.sBulletList.push( { x: this.x - this.sBulletWidth / 2,y: this.y - this.sBulletHeight / 2,xVel: Math.cos( this.rot + this.sBulletRotOffset ),yVel: Math.sin( this.rot + this.sBulletRotOffset ) } )\n"
		obj.update += "}\n"
		obj.update += "for( let bi in this.sBulletList ){\n"
		obj.update += "const b = this.sBulletList[bi]\n"
		obj.update += "b.x += b.xVel * this.sBulletSpeed\n"
		obj.update += "b.y += b.yVel * this.sBulletSpeed\n"
		obj.update += "for( let oi in objs ) {\n"
		obj.update += "const obj = objs[oi]\n"
		obj.update += "if( obj.hHitbox && obj.objName != this.objName ){\n"
		obj.update += "const objLeft = obj.x - obj.hHitbox.width / 2\n"
		obj.update += "const objTop = obj.y - obj.hHitbox.height / 2\n"
		obj.update += "const objRight = obj.x + obj.hHitbox.width / 2\n"
		obj.update += "const objBot = obj.y + obj.hHitbox.height / 2\n"
		obj.update += "const bRight = b.x + this.sBulletWidth\n"
		obj.update += "const bBot = b.y + this.sBulletHeight\n"
		obj.update += "if( objRight > b.x && objLeft < bRight && objBot > b.y && objTop < bBot ) {\n"
		obj.update += "if( objs[oi].sDestroyFunc ) objs[oi].sDestroyFunc()\n"
		obj.update += "objs.splice( oi,1 )\n"
		obj.update += "this.sBulletList.splice( bi,1 )\n"
		obj.update += "break\n"
		obj.update += "}\n"
		obj.update += "}\n"
		obj.update += "}\n"
		obj.update += "}\n"
		
		obj.draw += "for( let b of this.sBulletList ) gfx.DrawSpriteScale( b.x,b.y,this.sBulletSpr,this.sBulletWidth,this.sBulletHeight )\n"
		
		obj.Newline()
		
		return( obj )
	}
}

ShooterMod.speedScale = 0.05