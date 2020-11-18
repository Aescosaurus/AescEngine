class CoinMod extends Module
{
	constructor()
	{
		super( "Coin","Coin that can be picked up by specified object.  Specified object must have Coin Pickup Mod." )
		
		this.hitbox = new Vector( 0,0,100,100 )
		this.hitboxCol = "orange"
		
		this.targetObj = new InputStr( "Player",9999,"limegreen","green" )
	}
	
	Update( mouse,kbd,info )
	{
		this.hitbox.MoveTo( info.pos.x - this.hitbox.Diff().x / 2,info.pos.y - this.hitbox.Diff().y / 2 )
		this.hitbox.Update( mouse,kbd )
		
		this.targetObj.MoveTo( this.hitbox.end.x,this.hitbox.end.y + 30 )
		if( this.targetObj.Update( mouse,kbd ) )
		{
			this.targetObj.Validate( info.objs )
		}
	}
	
	Draw( gfx )
	{
		gfx.DrawRect( this.hitbox.start.x,this.hitbox.start.y,this.hitbox.Diff().x,1,this.hitboxCol )
		gfx.DrawRect( this.hitbox.end.x,this.hitbox.start.y,1,this.hitbox.Diff().y,this.hitboxCol )
		gfx.DrawRect( this.hitbox.start.x,this.hitbox.end.y,this.hitbox.Diff().x,1,this.hitboxCol )
		gfx.DrawRect( this.hitbox.start.x,this.hitbox.start.y,1,this.hitbox.Diff().y,this.hitboxCol )
		
		this.hitbox.Draw( gfx )
		this.targetObj.Draw( gfx )
	}
	
	Decorate( obj,info )
	{
		if( !this.targetObj.valid )
		{
			ErrorHandler.Throw( "Obj: '" + info.name + "' Coin Mod has an invalid player." )
		}
		
		obj.start += "this.cPickupArea = { width: " + this.hitbox.Diff().x + ",height: " + this.hitbox.Diff().y + " }\n"
		obj.start += "this.cPlayerTarget = null\n"
		
		obj.update += "if( !this.cPlayerTarget ) {\n"
		obj.update += "for( let obj of objs ) {\n"
		obj.update += "if( obj.objName == '" + this.targetObj.str + "' ) {\n"
		obj.update += "this.cPlayerTarget = obj\n"
		obj.update += "}\n"
		obj.update += "}\n"
		obj.update += "}\n"
		obj.update += "if( this.cPlayerTarget.cpHitbox && this.cPlayerTarget.CheckOverlap( this.x,this.y,this.cPickupArea,this.cPlayerTarget.x,this.cPlayerTarget.y,this.cPlayerTarget.cpHitbox ) ) {\n"
		obj.update += "this.active = false\n"
		obj.update += "}\n"
		
		obj.Newline()
		
		return( obj )
	}
}