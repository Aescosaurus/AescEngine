class GameBuild
{
	constructor()
	{
		this.objs = []
	}
	
	Update()
	{
		for( let i in this.objs )
		{
			this.objs[i].Update()
		}
	}
	
	Draw()
	{
		for( let i in this.objs )
		{
			this.objs[i].Draw()
		}
	}
	
	// create build and call start
	CreateBuild( objs )
	{
		for( let i in objs )
		{
			this.objs.push( new BuildBase() )
			objs[i].Decorate( this.objs[this.objs.length - 1] )
			this.objs[this.objs.length - 1].Start()
		}
	}
	
	Reset()
	{
		this.objs.length = 0
	}
}