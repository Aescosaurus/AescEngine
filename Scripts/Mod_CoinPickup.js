class CoinPickupMod extends Module
{
	constructor()
	{
		super( "Coin Pickup","Destroys objects with coin mod on collision." )
		
		this.hitbox = new Vector( 0,0,100,100 )
		this.hitboxCol = "orange"
	}
	
	Update( mouse,kbd,info )
	{
		this.hitbox.MoveTo( info.pos.x - this.hitbox.Diff().x / 2,info.pos.y - this.hitbox.Diff().y / 2 )
		this.hitbox.Update( mouse,kbd )
	}
	
	Draw( gfx )
	{
		gfx.DrawRect( this.hitbox.start.x,this.hitbox.start.y,this.hitbox.Diff().x,1,this.hitboxCol )
		gfx.DrawRect( this.hitbox.end.x,this.hitbox.start.y,1,this.hitbox.Diff().y,this.hitboxCol )
		gfx.DrawRect( this.hitbox.start.x,this.hitbox.end.y,this.hitbox.Diff().x,1,this.hitboxCol )
		gfx.DrawRect( this.hitbox.start.x,this.hitbox.start.y,1,this.hitbox.Diff().y,this.hitboxCol )
		
		this.hitbox.Draw( gfx )
	}
	
	Decorate( obj )
	{
		obj.start += "this.cpHitbox = { width: " + this.hitbox.Diff().x + ",height: " + this.hitbox.Diff().y + " }\n"
		
		obj.Newline()
		
		return( obj )
	}
}