class BuildBase
{
	constructor()
	{
		this.start = ""
		this.update = ""
		this.draw = ""
		
		this.startFunc = null
		this.updateFunc = null
		this.drawFunc = null
	}
	
	Start()
	{
		this.startFunc = Function( this.start )
		this.updateFunc = Function( this.update )
		this.drawFunc = Function( this.draw )
		
		this.startFunc()
	}
	
	Update()
	{
		this.updateFunc()
	}
	
	Draw()
	{
		this.drawFunc()
	}
	
	Newline()
	{
		this.start += '\n'
		this.update += '\n'
		this.draw += '\n'
	}
	
	Duplicate()
	{
		return( { startFunc: this.startFunc,updateFunc: this.updateFunc,drawFunc: this.drawFunc,
			Start: function() { this.startFunc() },
			Update: function() { this.updateFunc() },
			Draw: function() { this.drawFunc() },
			Duplicate: this.Duplicate,
			CheckOverlap: this.CheckOverlap } )
	}
	
	CheckOverlap( x1,y1,size1,x2,y2,size2 )
	{
		const left1 = x1 - size1.width / 2
		const top1 = y1 - size1.height / 2
		const right1 = x1 + size1.width / 2
		const bot1 = y1 + size1.height / 2
		
		const left2 = x2 - size2.width / 2
		const top2 = y2 - size2.height / 2
		const right2 = x2 + size2.width / 2
		const bot2 = y2 + size2.height / 2
		
		return( right1 > left2 && left1 < right2 &&
			bot1 > top2 && top1 < bot2 )
	}
}