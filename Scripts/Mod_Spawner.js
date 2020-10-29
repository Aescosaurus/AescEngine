class SpawnerMod extends Module
{
	constructor()
	{
		super( "Spawner","Spawns object specified by name on a timer.  Disables target obj." )
		
		this.timer = new Vector( 0,0,100,100 )
		this.spawnObj = new InputStr( "spawn obj",9999,"limegreen","green" )
	}
	
	Update( mouse,kbd,info )
	{
		this.timer.MoveTo( info.pos.x,info.pos.y )
		this.timer.Update( mouse,kbd )
		
		this.spawnObj.MoveTo( this.timer.end.x,this.timer.end.y - 50 )
		if( this.spawnObj.Update( mouse,kbd ) )
		{
			this.spawnObj.valid = false
			for( let obj of info.objs )
			{
				if( obj.modules[0].objName == this.spawnObj.str )
				{
					this.spawnObj.valid = true
					break
				}
			}
		}
	}
	
	Draw( gfx )
	{
		this.timer.Draw( gfx )
		
		this.spawnObj.Draw( gfx )
	}
	
	Decorate( obj )
	{
		if( this.spawnObj.valid )
		{
			obj.start += "this.sSpawnDuration = " + ( this.timer.Diff().GetLen() * SpawnerMod.timerDiv ) + '\n'
			obj.start += "this.sSpawnTimer = this.sSpawnDuration + 1\n"
			obj.start += "this.sSpawnTarget = null\n"
			
			obj.update += "if( ++this.sSpawnTimer > this.sSpawnDuration ) {\n"
			obj.update += "this.sSpawnTimer = 0\n"
			obj.update += "if( !this.sSpawnTarget ){\n"
			obj.update += "for( let obj of objs ) { if( obj.objName == '" + this.spawnObj.str + "' ) {\n"
			obj.update += "this.sSpawnTarget = obj\n"
			obj.update += "obj.active = false\n"
			obj.update += "obj.hHitbox = null\n"
			obj.update += "break\n"
			obj.update += "}\n"
			obj.update += "}\n"
			obj.update += "}\n"
			// obj.update += "let temp = Object.assign( {},this.sSpawnTarget )\n"
			obj.update += "let temp = { startFunc: this.sSpawnTarget.startFunc,updateFunc: this.sSpawnTarget.updateFunc,drawFunc: this.sSpawnTarget.drawFunc,Start: function() { this.startFunc() },Update: function() { this.updateFunc() },Draw: function() { this.drawFunc() } }\n"
			obj.update += "temp.startFunc()\n"
			obj.update += "temp.active = true\n"
			obj.update += "temp.x = this.x\n"
			obj.update += "temp.y = this.y\n"
			obj.update += "temp.Update = this.sSpawnTarget.Update\n"
			obj.update += "temp.Draw = this.sSpawnTarget.Draw\n"
			obj.update += "objs.push( temp )\n"
			obj.update += "}\n"
		}
		
		obj.Newline()
		
		return( obj )
	}
}

SpawnerMod.timerDiv = 2