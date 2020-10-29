class ObjectClass
{
	constructor( gfx )
	{
		this.modules = []
		
		this.gfx = gfx
		
		this.AddModule( new IdentityMod() )
		
		this.modX = gfx.scrWidth - Module.width
		this.modY = ( Module.height + ObjectClass.padding ) * 2
		
		this.botMenuY = gfx.scrHeight - ObjectClass.botMenuHeight
		
		this.selectedMod = 0
		
		this.ReorderMods()
		
		this.addModButton = new Module( "[A]dd Module","",gfx.scrWidth - Module.width,0 )
		this.delModButton = new Module( "[R]emove Module","",gfx.scrWidth - Module.width,Module.height + ObjectClass.padding )
	}
	
	Update( mouse,kbd,objs )
	{
		const info = {
			pos: this.modules[0].pos,
			color: "#ff00ff",
			objs: objs
		}
		
		for( let i in this.modules )
		{
			this.modules[i].UpdatePassive( info )
			
			if( kbd.KeyDown( this.modules[i].hotkey ) )
			{
				this.selectedMod = i
			}
			
			// if( this.modules[i].GetColor ) this.modules[0].color = this.modules[i].GetColor()
		}
		
		if( ( mouse.uniqueLeft && this.addModButton.Contains( mouse.x,mouse.y ) ) ||
			Hotkeys.Check( ObjectClass.addModHotkey ) )
		{
			return( true )
		}
		else if( ( mouse.uniqueLeft && this.delModButton.Contains( mouse.x,mouse.y ) ) ||
			Hotkeys.Check( ObjectClass.delModHotkey ) )
		{
			if( this.selectedMod > 0 )
			{
				this.modules.splice( this.selectedMod,1 )
				this.selectedMod = 0 // So we don't have to care about unique clicks.
				this.ReorderMods()
			}
		}
		
		if( mouse.uniqueLeft )
		{
			for( let i in this.modules )
			{
				if( this.modules[i].Contains( mouse.x,mouse.y ) )
				{
					this.selectedMod = i
					break
				}
			}
		}
		
		this.modules[this.selectedMod].Update( mouse,kbd,info )
	}
	
	UpdateCam( cam )
	{
		this.modules[0].pos.Add( cam.GetDiff() )
		
		const info = {
			pos: this.modules[0].pos,
			color: "#ff00ff",
			objs: objs
		}
		
		for( let i in this.modules )
		{
			this.modules[i].UpdatePassive( info )
		}
	}
	
	DrawActive( gfx )
	{
		// gfx.DrawRect( 0,0,Module.width,gfx.scrHeight,"gray" )
		gfx.DrawRect( 0,this.botMenuY,gfx.scrWidth,ObjectClass.botMenuHeight,"gray" )
		
		this.addModButton.DrawBG( true,gfx,"limegreen","darkgreen" )
		this.delModButton.DrawBG( this.selectedMod > 0,gfx,"limegreen","darkgreen" )
		
		this.modules[this.selectedMod].DrawLeftSideMenu( 10,this.botMenuY,gfx )
		
		for( let i in this.modules ) this.modules[i].DrawAlways( gfx )
		
		for( let i in this.modules )
		{
			const selected = ( i == this.selectedMod )
			
			this.modules[i].DrawBG( selected,gfx )
			
			if( selected )
			{
				this.modules[i].Draw( gfx )
			}
		}
		
		for( let i in this.modules ) this.modules[i].DrawUI( gfx )
	}
	
	DrawBG( gfx )
	{
		// this.modules[0].DrawAlways( gfx )
		for( let mod of this.modules )
		{
			mod.DrawAlways( gfx )
		}
	}
	
	Decorate( obj )
	{
		for( let i in this.modules )
		{
			this.modules[i].Decorate( obj )
		}
		
		return( obj )
	}
	
	ReorderMods()
	{
		for( let i in this.modules )
		{
			this.modules[i].x = this.modX
			this.modules[i].y = this.modY + ( Module.height + ObjectClass.padding ) * i
			this.modules[i].hotkey = ( parseInt( i ) + 1 ).toString()
		}
	}
	
	AddModule( mod )
	{
		for( let i in this.modules )
		{
			if( this.modules[i].constructor == mod.constructor ) return
		}
		this.modules.push( mod )
		this.modules[this.modules.length - 1].FormatText( this.gfx )
		this.ReorderMods()
	}
}

ObjectClass.padding = 8
ObjectClass.botMenuHeight = 140
ObjectClass.addModHotkey = 'A'
ObjectClass.delModHotkey = 'R'