class FollowTargetMod extends Module
{
	constructor()
	{
		super( "Follow Target","Name target to object name.  Arrow length is speed." )
		
		this.target = new InputStr( "target",999,"limegreen","green","red","darkred" )
		this.speed = new Vector( 0,0,50,-50 )
	}
	
	Update( mouse,kbd,info )
	{
		if( this.target.Update( mouse,kbd ) )
		{
			this.target.valid = false
			for( let obj of info.objs )
			{
				if( obj.modules[0].objName == this.target.str )
				{
					this.target.valid = true
					break
				}
			}
		}
		
		this.speed.MoveTo( info.pos.x,info.pos.y )
		this.speed.Update( mouse,kbd )
		
		this.target.SetPos( this.speed.end.x,this.speed.end.y - 50 )
	}
	
	Draw( gfx )
	{
		this.target.Draw( gfx )
		
		this.speed.Draw( gfx,"red" )
	}
	
	Decorate( obj )
	{
		obj.start += "this.ftName = \"" + this.target.str + "\"\n"
		obj.start += "this.ftSpeed = " + this.speed.Diff().Multiply( FollowTargetMod.speedScale ).GetLen() + '\n'
		obj.start += "this.ftTarget = null\n"
		obj.start += "for( let obj of objs ) if( obj.objName == this.ftName ) this.ftTarget = obj\n"
		
		obj.update += "if( this.ftTarget ) {\n"
		obj.update += "let xDiff = this.ftTarget.x - this.x\n"
		obj.update += "let yDiff = this.ftTarget.y - this.y\n"
		obj.update += "const len = Math.sqrt( xDiff * xDiff + yDiff * yDiff )\n"
		obj.update += "this.x += xDiff / len * this.ftSpeed\n"
		obj.update += "this.y += yDiff / len * this.ftSpeed\n"
		obj.update += "}\n"
		
		obj.Newline()
		
		return( obj )
	}
}

FollowTargetMod.speedScale = 0.03