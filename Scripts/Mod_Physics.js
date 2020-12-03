class PhysicsMod extends Module
{
	constructor()
	{
		super( "Physics","Green arrow is velocity, yellow arrow is force." )
		
		// this.vel = new Vector( 0,0,50,0,false )
		// this.force = new Vector( 0,0,0,50,false )
		this.vel = new VecRand( 100,-100,100,-100 )
		this.force = new VecRand( 100,100,100,100 )
	}
	
	Update( mouse,kbd,info )
	{
		this.vel.Update( mouse,kbd )
		this.vel.MoveTo( info.pos.x,info.pos.y )
		if( !this.vel.Dragging() )
		{
			this.force.Update( mouse,kbd )
			this.force.MoveTo( info.pos.x,info.pos.y )
		}
	}
	
	Draw( gfx )
	{
		this.vel.Draw( gfx,"#00ff00" )
		this.force.Draw( gfx,"#ffff00" )
	}
	
	Decorate( obj )
	{
		// todo gotta redo this with components
		// obj.start += "this.vel = " + this.vel.Code()
		// obj.start += "this.vel = this.vel.Normalize().Multiply( " + PhysicsMod.velScale + " )\n"
		// obj.start += "this.force = " + this.force.Code()
		// obj.start += "this.force = this.force.Normalize().Multiply( " + PhysicsMod.forceScale + " )\n"
		// 
		// obj.update += "this.pos.Add( this.vel )\n"
		// obj.update += "this.vel.Add( this.force )\n"
		
		obj.start += "this.pVelDist = " + this.vel.Code()
		obj.start += "this.pForceDist = " + this.force.Code()
		obj.start += "this.pXVel = this.pVelDist.x * " + PhysicsMod.velScale + "\n"
		obj.start += "this.pYVel = this.pVelDist.y * " + PhysicsMod.velScale + "\n"
		obj.start += "this.pXForce = this.pForceDist.x * " + PhysicsMod.forceScale + "\n"
		obj.start += "this.pYForce = this.pForceDist.y * " + PhysicsMod.forceScale + "\n"
		// obj.start += "this.pXVel = " + ( this.vel.Diff().x * PhysicsMod.velScale ) + '\n'
		// obj.start += "this.pYVel = " + ( this.vel.Diff().y * PhysicsMod.velScale ) + '\n'
		// obj.start += "this.pXForce = " + ( this.force.Diff().x * PhysicsMod.forceScale ) + '\n'
		// obj.start += "this.pYForce = " + ( this.force.Diff().y * PhysicsMod.forceScale ) + '\n'
		
		obj.update += "const phyRot = this.rot + Math.PI / 2.0\n"
		obj.update += "this.x -= this.pXVel * Math.cos( phyRot ) + this.pYVel * Math.sin( phyRot )\n"
		obj.update += "this.y += this.pYVel * Math.cos( phyRot ) + this.pXVel * Math.sin( phyRot )\n"
		obj.update += "this.pXVel += this.pXForce\n"
		obj.update += "this.pYVel += this.pYForce\n"
		
		obj.Newline()
		
		return( obj )
	}
}

PhysicsMod.velScale = 1 / 30
PhysicsMod.forceScale = 1 / 500