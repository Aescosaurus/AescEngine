class WeldMod extends Module
{
	constructor()
	{
		super( "Weld","Makes this object stick to target with offset." )
		
		this.weldOffset = new Vector( 0,0,100,100 )
		this.weldTarget = new InputStr( "target",9999,"limegreen","green" )
	}
	
	Update( mouse,kbd,info )
	{
		this.weldOffset.MoveTo( info.pos.x,info.pos.y )
		this.weldOffset.Update( mouse,kbd )
		
		this.weldTarget.MoveTo( this.weldOffset.end.x,this.weldOffset.end.y - 35 )
		if( this.weldTarget.Update( mouse,kbd ) )
		{
			this.weldTarget.Validate( info.objs )
		}
	}
	
	Draw( gfx )
	{
		this.weldOffset.Draw( gfx )
		this.weldTarget.Draw( gfx )
	}
	
	Decorate( obj,info )
	{
		if( !this.weldTarget.valid )
		{
			ErrorHandler.Throw( "Object '" + info.name + "': Weld Mod has invalid target." )
			return
		}
		
		const diff = this.weldOffset.Diff()
		obj.start += "this.weldXOffset = " + diff.x + '\n'
		obj.start += "this.weldYOffset = " + diff.y + '\n'
		obj.start += "this.weldTarget = null\n"
		obj.start += "this.weldName = '" + this.weldTarget.str + "'\n"
		
		obj.update += "if( this.weldTarget ) {\n"
		obj.update += "this.x = this.weldTarget.x + this.weldXOffset\n"
		obj.update += "this.y = this.weldTarget.y + this.weldYOffset\n"
		obj.update += "}\n"
		obj.update += "else {\n"
		obj.update += "for( let obj of objs ) if( obj.objName == this.weldName ) this.weldTarget = obj\n"
		obj.update += "}\n"
		
		obj.Newline()
		
		return( obj )
	}
}