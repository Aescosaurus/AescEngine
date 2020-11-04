class LockToScreenMod extends Module
{
	constructor()
	{
		super( "Lock Screen","Keeps object on the screen." )
		
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
		const diff = this.size.Diff().Divide( 2 )
		obj.update += "if( this.x - " + diff.x + " < 0 ) this.x = " + diff.x + '\n'
		obj.update += "if( this.x + " + diff.x + " >= gfx.scrWidth ) this.x = gfx.scrWidth - 1 - " + diff.x + '\n'
		obj.update += "if( this.y - " + diff.y + " < 0 ) this.y = " + diff.y + '\n'
		obj.update += "if( this.y + " + diff.y + " >= gfx.scrHeight ) this.y = gfx.scrHeight - 1 - " + diff.y + '\n'
		
		obj.Newline()
		
		return( obj )
	}
}