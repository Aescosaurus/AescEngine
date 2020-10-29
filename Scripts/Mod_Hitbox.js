class HitboxMod extends Module
{
	constructor()
	{
		super( "Hitbox","desc" )
		
		this.size = new Vector( 0,0,100,100 )
		this.hitboxCol = "orange"
	}
	
	Update( mouse,kbd,info )
	{
		this.size.MoveTo( info.pos.x - this.size.Diff().x / 2,info.pos.y - this.size.Diff().y / 2 )
		this.size.Update( mouse,kbd )
	}
	
	Draw( gfx )
	{
		gfx.DrawRect( this.size.start.x,this.size.start.y,this.size.Diff().x,1,this.hitboxCol )
		gfx.DrawRect( this.size.end.x,this.size.start.y,1,this.size.Diff().y,this.hitboxCol )
		gfx.DrawRect( this.size.start.x,this.size.end.y,this.size.Diff().x,1,this.hitboxCol )
		gfx.DrawRect( this.size.start.x,this.size.start.y,1,this.size.Diff().y,this.hitboxCol )
		
		this.size.Draw( gfx )
	}
	
	Decorate( obj )
	{
		obj.start += "this.hHitbox = { width: " + this.size.Diff().x + ",height: " + this.size.Diff().y + " }\n"
		
		obj.Newline()
		
		return( obj )
	}
}