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
}