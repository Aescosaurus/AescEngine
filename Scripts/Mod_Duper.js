class DuperMod extends Module
{
	constructor()
	{
		super( "Duper","Duplicates object on timer." )
		
		// todo: start inactive option
		
		this.spawnTimer = new Vector( 0,0,100,100 )
	}
	
	Update( mouse,kbd,info )
	{
		this.spawnTimer.Update( mouse,kbd )
		this.spawnTimer.MoveTo( info.pos.x,info.pos.y )
	}
	
	Draw( gfx )
	{
		this.spawnTimer.Draw( gfx )
	}
	
	Decorate( obj )
	{
		obj.start += "this.dDupeDuration = " + this.spawnTimer.Diff().GetLen() + '\n'
		obj.start += "this.dDupeTimer = 0.0\n"
		// obj.start += "this.dDupeActive = false\n"
		obj.start += "if( !this.dDupeActive ) {\n"
		obj.start += "this.Update = function() {\n"
		obj.start += "if( ++this.dDupeTimer > this.dDupeDuration ) {\n"
		obj.start += "this.dDupeTimer = 0.0\n"
		obj.start += "objs.push( new this.constructor() )\n"
		obj.start += "objs[objs.length - 1].start = this.start\n"
		obj.start += "objs[objs.length - 1].update = this.update\n"
		obj.start += "objs[objs.length - 1].draw = this.draw\n"
		obj.start += "objs[objs.length - 1].dDupeActive = true\n"
		obj.start += "objs[objs.length - 1].Start()\n"
		obj.start += "}\n"
		
		obj.start += "}\n"
		obj.start += "this.Draw = function() {}\n"
		obj.start += "}\n"
		
		obj.Newline()
		
		return( obj )
	}
}

DuperMod.timerDiv = 100