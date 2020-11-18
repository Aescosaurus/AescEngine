class PathFollowMod extends Module
{
	constructor()
	{
		super( "Path Follow","Follows the designated path, blue arrows define path red arrow defines speed." )
		
		this.pathSpots = []
		this.AddSegment()
		this.addPath = new CheckBox( "Add Segment",false )
		this.delPath = new CheckBox( "Remove Segment",false )
		this.moveSpeed = new SliderBar( "Speed" )
	}
	
	Update( mouse,kbd,info )
	{
		for( let path of this.pathSpots )
		{
			if( path.Update( mouse,kbd ) ) break
		}
		
		// this.pathSpots[0].MoveTo( info.pos.x,info.pos.y )
		for( let i = 1; i < this.pathSpots.length; ++i )
		{
			this.pathSpots[i].start.Set( this.pathSpots[i - 1].end.x,this.pathSpots[i - 1].end.y )
		}
		
		const lastPath = this.pathSpots[this.pathSpots.length - 1]
		this.addPath.MoveTo( lastPath.end.x,lastPath.end.y + 20 )
		this.delPath.MoveTo( lastPath.end.x,lastPath.end.y + 60 )
		
		this.addPath.Update( mouse,kbd )
		this.delPath.Update( mouse,kbd )
		
		if( this.addPath.on )
		{
			this.addPath.on = false
			this.AddSegment()
		}
		else if( this.delPath.on )
		{
			this.delPath.on = false
			if( this.pathSpots.length > 1 )
			{
				this.pathSpots.splice( this.pathSpots.length - 1,1 )
			}
		}
		
		this.moveSpeed.Update( mouse,kbd )
		this.moveSpeed.MoveTo( info.pos.x,info.pos.y )
	}
	
	UpdatePassive( info )
	{
		const xDiff = info.pos.x - this.pathSpots[0].start.x
		const yDiff = info.pos.y - this.pathSpots[0].start.y
		
		for( let path of this.pathSpots )
		{
			path.Move( xDiff,yDiff )
		}
	}
	
	Draw( gfx )
	{
		for( let path of this.pathSpots )
		{
			path.Draw( gfx,"dodgerblue" )
		}
		
		this.addPath.Draw( gfx,false )
		this.delPath.Draw( gfx,false )
		
		this.moveSpeed.Draw( gfx )
	}
	
	AddSegment()
	{
		if( this.pathSpots.length < 1 )
		{
			this.pathSpots.push( new Vector( 0,0,100,100 ) )
		}
		else
		{
			const lastPath = this.pathSpots[this.pathSpots.length - 1]
			this.pathSpots.push( new Vector( lastPath.end.x,lastPath.end.y,lastPath.end.x + 100,lastPath.end.y + 100 ) )
		}
	}
	
	Decorate( obj )
	{
		obj.start += "this.pfTargetLocs = [\n"
		obj.start += this.pathSpots[0].start.Code()
		for( let path of this.pathSpots )
		{
			obj.start += ',' + path.end.Code()
		}
		obj.start += "]\n"
		obj.start += "this.pfCurTarget = 0"
		
		obj.update += "{\n"
		obj.update += "const xDiff = this.pfTargetLocs[this.pfCurTarget].x - this.x\n"
		obj.update += "const yDiff = this.pfTargetLocs[this.pfCurTarget].y - this.y\n"
		obj.update += "const len = Math.sqrt( xDiff * xDiff + yDiff * yDiff )\n"
		obj.update += "if( len != 0.0 ) {\n"
		const moveSpd = this.moveSpeed.CalcVal() * PathFollowMod.speedFactor
		obj.update += "this.x += xDiff / len * " + moveSpd + '\n'
		obj.update += "this.y += yDiff / len * " + moveSpd + '\n'
		obj.update += "}\n"
		obj.update += "const xTargetDist = this.pfTargetLocs[this.pfCurTarget].x - this.x\n"
		obj.update += "const yTargetDist = this.pfTargetLocs[this.pfCurTarget].y - this.y\n"
		obj.update += "if( xTargetDist * xTargetDist + yTargetDist * yTargetDist < " + Math.pow( PathFollowMod.retargetDist,2 ) + " ) {\n"
		obj.update += "if( ++this.pfCurTarget >= this.pfTargetLocs.length ) this.pfCurTarget = 0\n"
		obj.update += "}\n"
		obj.update += "}\n"
		
		obj.Newline()
		
		return( obj )
	}
}

PathFollowMod.speedFactor = 3.0
PathFollowMod.retargetDist = 5