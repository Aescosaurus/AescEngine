class ColliderMod extends Module
{
	constructor()
	{
		super( "Collider","Stops moving stuff from moving into rectangle.  Must add this to both objs you dont want to overlap." )
		
		this.size = new Vector( 0,0,100,100 )
		
		this.hitboxCol = "cyan"
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
		obj.start += "this.cCollider = { width: " + this.size.Diff().x + ",height: " + this.size.Diff().y + " }\n"
		obj.start += "this.cLastSafeX = this.x\n"
		obj.start += "this.cLastSafeY = this.y\n"
		
		// todo: custom x and y overlap checking somehow
		obj.update += "let cOverlapX = false\n"
		obj.update += "let cOverlapY = false\n"
		obj.update += "for( let obj of objs ) {\n"
		obj.update += "if( obj.objName != this.objName && obj.cCollider && this.CheckOverlap( this.x,this.y,this.cCollider,obj.x,obj.y,obj.cCollider ) ) {\n"
		obj.update += "cOverlapX = true\n"
		obj.update += "cOverlapY = true\n"
		obj.update += "}\n"
		obj.update += "}\n"
		obj.update += "if( cOverlapX ) this.x = this.cLastSafeX\n"
		obj.update += "if( cOverlapY ) this.y = this.cLastSafeY\n"
		obj.update += "this.cLastSafeX = this.x\n"
		obj.update += "this.cLastSafeY = this.y\n"
		
		obj.Newline()
		
		return( obj )
	}
}