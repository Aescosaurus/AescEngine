class PingPongMod extends Module
{
	constructor()
	{
		super( "Ping Pong","Moves back and forth across arrow." )
		
		this.speed = new SliderBar( "Speed" )
		this.moveVec = new Vector( 0,0,100,0 )
	}
	
	Update( mouse,kbd,info )
	{
		this.speed.MoveTo( info.pos.x,info.pos.y )
		this.moveVec.MoveTo( info.pos.x - this.moveVec.Diff().x / 2,info.pos.y - this.moveVec.Diff().y / 2 )
		
		if( !this.speed.Update( mouse,kbd ) )
		{
			this.moveVec.Update( mouse,kbd )
		}
	}
	
	Draw( gfx )
	{
		this.speed.Draw( gfx )
		this.moveVec.Draw( gfx )
	}
	
	Decorate( obj )
	{
		const diff = this.moveVec.Diff()
		const norm = diff.Copy().Divide( diff.GetLen() )
		const spdVal = this.speed.CalcVal()
		obj.start += "this.ppX1 = this.x - " + ( diff.x / 2 ) + '\n'
		// obj.start += "this.ppY1 = this.y - " + ( diff.x / 2 ) + '\n'
		obj.start += "this.ppX2 = this.x + " + ( diff.x / 2 ) + '\n'
		obj.start += "if( this.ppX1 > this.ppX2 ) {\n"
		obj.start += "const temp = this.ppX1\n"
		obj.start += "this.ppX1 = this.ppX2\n"
		obj.start += "this.ppX2 = temp\n"
		obj.start += "}\n"
		// obj.start += "this.ppY2 = this.y + " + ( diff.x / 2 ) + '\n'
		obj.start += "this.ppXVel = " + ( norm.x * spdVal * PingPongMod.spdMult ) + '\n'
		obj.start += "this.ppYVel = " + ( norm.y * spdVal * PingPongMod.spdMult ) + '\n'
		// obj.start += "this.ppSpeed = " + this.speed.CalcVal() + '\n'
		obj.start += "this.ppDir = 1\n"
		
		obj.update += "if( this.x < this.ppX1 || this.x > this.ppX2 ) this.ppDir *= -1\n"
		obj.update += "this.x += this.ppXVel * this.ppDir\n"
		obj.update += "this.y += this.ppYVel * this.ppDir\n"
		
		obj.Newline()
		
		return( obj )
	}
}

PingPongMod.spdMult = 3.0