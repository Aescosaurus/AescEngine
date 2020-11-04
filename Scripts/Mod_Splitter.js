class SplitterMod extends Module
{
	constructor()
	{
		super( "Splitter","Splits into 2 objects on destroy.  Does not disable target object." )
		
		this.size = new Vector( 0,0,100,100 )
		this.hitboxCol = "orange"
		
		this.spawnTarget = new InputStr( "spawn target",9999,"limegreen","green" )
	}
	
	Update( mouse,kbd,info )
	{
		this.size.MoveTo( info.pos.x - this.size.Diff().x / 2,info.pos.y - this.size.Diff().y / 2 )
		this.size.Update( mouse,kbd )
		
		this.spawnTarget.MoveTo( info.pos.x - 90,info.pos.y - 90 )
		if( this.spawnTarget.Update( mouse,kbd ) )
		{
			this.spawnTarget.valid = false
			for( let obj of info.objs )
			{
				if( obj.modules[0].objName == this.spawnTarget.str )
				{
					this.spawnTarget.valid = true
					break
				}
			}
		}
	}
	
	Draw( gfx )
	{
		gfx.DrawRect( this.size.start.x,this.size.start.y,this.size.Diff().x,1,this.hitboxCol )
		gfx.DrawRect( this.size.end.x,this.size.start.y,1,this.size.Diff().y,this.hitboxCol )
		gfx.DrawRect( this.size.start.x,this.size.end.y,this.size.Diff().x,1,this.hitboxCol )
		gfx.DrawRect( this.size.start.x,this.size.start.y,1,this.size.Diff().y,this.hitboxCol )
		
		this.size.Draw( gfx )
		
		this.spawnTarget.Draw( gfx )
	}
	
	Decorate( obj,info )
	{
		if( !this.spawnTarget.valid )
		{
			ErrorHandler.Throw( "Object '" + info.name + "': Splitter Mod has invalid spawn target." )
			return
		}
		
		obj.start += "if( !this.hHitbox ) this.hHitbox = { width: " + this.size.Diff().x + ",height: " + this.size.Diff().y + " }\n"
		obj.start += "this.sSpawnTarget = null\n"
		obj.start += "this.sDestroyFunc = function() { \n"
		obj.start += "if( this.sSpawnTarget ) { \n"
		
		// todo variable spawn count
		obj.start += "for( let i = 0; i < " + 2 + "; ++i ) {\n"
		// obj.start += "let temp = Object.assign( {},this.sSpawnTarget )\n"
		obj.start += "let temp = { startFunc: this.sSpawnTarget.startFunc,updateFunc: this.sSpawnTarget.updateFunc,drawFunc: this.sSpawnTarget.drawFunc,Start: function() { this.startFunc() },Update: function() { this.updateFunc() },Draw: function() { this.drawFunc() } }\n"
		obj.start += "temp.startFunc()\n"
		obj.start += "temp.active = true\n"
		obj.start += "temp.x = this.x\n"
		obj.start += "temp.y = this.y\n"
		obj.start += "temp.Update = this.sSpawnTarget.Update\n"
		obj.start += "temp.Draw = this.sSpawnTarget.Draw\n"
		// obj.start += "let temp = { startFunc: this.sSpawnTarget.startFunc,updateFunc: this.sSpawnTarget.updateFunc,drawFunc: this.sSpawnTarget.drawFunc,Start: this.sSpawnTarget.Start,Update: this.sSpawnTarget.Update,Draw: this.sSpawnTarget.Draw }\n"
		// obj.start += "temp.Start()\n"
		// obj.start += "temp.active = true\n"
		// obj.start += "temp.x = this.x\n"
		// obj.start += "temp.y = this.y\n"
		obj.start += "objs.push( temp )\n"
		obj.start += "}\n"
		obj.start += "}\n"
		
		obj.start += "}\n"
		
		obj.update += "if( !this.sSpawnTarget ){\n"
		obj.update += "for( let obj of objs ) { if( obj.objName == '" + this.spawnTarget.str + "' ) {\n"
		obj.update += "this.sSpawnTarget = obj\n"
		obj.update += "obj.active = false\n"
		obj.update += "obj.hHitbox = null\n"
		obj.update += "break\n"
		obj.update += "}\n"
		obj.update += "}\n"
		obj.update += "}\n"
		
		obj.Newline()
		
		return( obj )
	}
}