class ModuleMap
{
	constructor( gfx )
	{
		this.width = Math.floor( gfx.scrWidth / Module.width )
		this.height = Math.floor( gfx.scrHeight / Module.height )
		this.xPadding = Math.max( ( gfx.scrWidth % Module.width ) / this.width,
			( gfx.scrHeight % Module.height ) / this.height )
		this.yPadding = this.xPadding
		
		this.categories = []
		this.catNames = {}
		
		this.active = false
		
		// todo draw category names at top
		this.AddModule( "Physics",new PhysicsMod() )
		
		this.AddModule( "State",new ColorMod() )
		this.AddModule( "State",new SpriteMod() )
		
		this.AddModule( "Input",new DiagMoveMod() )
		this.AddModule( "Input",new AimerMod() )
		this.AddModule( "Input",new TankMoveMod() )
		this.AddModule( "Input",new ShooterMod() )
		
		this.AddModule( "AI",new FollowTargetMod() )
		this.AddModule( "AI",new DuperMod() )
		this.AddModule( "AI",new SpawnerMod() )
		this.AddModule( "AI",new SplitterMod() )
		
		this.AddModule( "View",new CameraFollowMod() )
		
		this.AddModule( "Collision",new LockToScreenMod() )
		this.AddModule( "Collision",new HitboxMod() )
		this.AddModule( "Collision",new LoopToScreenMod() )
	}
	
	Update( mouse,kbd )
	{
		for( let y in this.categories )
		{
			for( let x in this.categories[y] )
			{
				const curCat = this.categories[y][x]
				curCat.selected = curCat.Contains( mouse.x,mouse.y )
				if( curCat.selected && mouse.uniqueLeft )
				{
					return( new curCat.constructor() )
					// return( Object.create( curCat ) )
				}
			}
		}
		
		return( null )
	}
	
	Draw( gfx )
	{
		if( this.active )
		{
			let i = 0;
			for( let name in this.catNames )
			{
				gfx.DrawText( ( Module.width + this.xPadding ) * i,20,"white",name )
				++i
			}
			for( let y in this.categories )
			{
				for( let x in this.categories[y] )
				{
					this.categories[y][x].DrawBG( this.categories[y][x].selected,gfx )
				}
			}
		}
	}
	
	AddModule( category,module )
	{
		// todo prevent overstacking categories
		if( this.catNames[category] == undefined )
		{
			this.catNames[category] = this.categories.length
			this.categories.push( [] )
		}
		const catId = this.catNames[category]
		
		// todo padding
		module.x = catId * ( Module.width + this.xPadding )
		module.y = ( this.categories[catId].length + 1 ) * ( Module.height + this.yPadding )
		this.categories[catId].push( module )
	}
}