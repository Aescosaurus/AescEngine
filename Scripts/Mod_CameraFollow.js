class CameraFollowMod extends Module
{
	constructor()
	{
		super( "Camera Follow","Camera will follow this object." )
		
		this.pos = new Point( 0,0 )
		this.col = "white"
	}
	
	UpdatePassive( info )
	{
		this.pos.x = info.pos.x - gfx.scrWidth / 2
		this.pos.y = info.pos.y - gfx.scrHeight / 2
	}
	
	DrawAlways( gfx )
	{
		gfx.DrawRect( this.pos.x,this.pos.y,gfx.scrWidth,1,this.col )
		gfx.DrawRect( this.pos.x + gfx.scrWidth,this.pos.y,1,gfx.scrHeight,this.col )
		gfx.DrawRect( this.pos.x,this.pos.y + gfx.scrHeight,gfx.scrWidth,1,this.col )
		gfx.DrawRect( this.pos.x,this.pos.y,1,gfx.scrHeight,this.col )
	}
}