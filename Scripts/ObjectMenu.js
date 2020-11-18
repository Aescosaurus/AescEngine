class ObjectMenu
{
	constructor( gfx,textIn )
	{
		this.gfx = gfx
		this.textIn = textIn.CreateChild( "Type object name:" )
		
		this.cam = new Camera()
		
		this.objs = []
		
		this.curObj = -1
		
		this.modMap = new ModuleMap( gfx )
		this.imgMap = new ImageMap( gfx )
		
		this.padding = 8
		
		this.createObjButton = new Module( "[C]reate Obj","",0,0 )
		this.destroyObjButton = new Module( "[D]estroy Obj","",0,Module.height + this.padding )
		
		this.createObjHotkey = 'C'
		this.destroyObjHotkey = 'D'
	}
	
	Update( mouse,kbd )
	{
		if( this.modMap.active )
		{
			const result = this.modMap.Update( mouse,kbd )
			if( result != null )
			{
				this.GetActiveObj().AddModule( result )
				this.modMap.active = false
			}
		}
		else if( ImageMap.active )
		{
			const result = this.imgMap.Update( mouse,kbd )
			// todo get result to mod and close
		}
		else
		{
			this.cam.Update( mouse,kbd )
			
			for( let obj of this.objs ) obj.UpdateCam( this.cam )
		
			if( this.curObj >= 0 && !this.modMap.active && !this.textIn.open )
			{
				this.modMap.active = this.objs[this.curObj].Update( mouse,kbd,this.objs,this.cam )
			}
			
			if( ( mouse.uniqueLeft && this.createObjButton.Contains( mouse.x,mouse.y ) ) ||
				( Hotkeys.Check( this.createObjHotkey ) && !this.textIn.open ) )
			{
				if( this.objs.length < 9 )
				{
					this.objs.push( new ObjectClass( this.gfx ) )
					this.textIn.Open()
					kbd.lastKey = '' // Dangerous!
					this.curObj = this.objs.length - 1
					this.ReorderObjs()
				}
			}
			else if( ( ( mouse.uniqueLeft && this.destroyObjButton.Contains( mouse.x,mouse.y ) ) ||
				Hotkeys.Check( this.destroyObjHotkey ) ) &&
				this.objs.length > 0 && !this.textIn.open )
			{
				this.objs.splice( this.curObj,1 )
				--this.curObj
				this.ReorderObjs()
			}
			
			if( mouse.uniqueLeft )
			{
				for( let i in this.objs )
				{
					if( this.objs[i].objButton.Contains( mouse.x,mouse.y )/* ||
						this.objs[i].modules[0].RectContains( mouse.x,mouse.y )*/ )
					{
						this.curObj = i
					}
				}
			}
			
			let result = this.textIn.CheckResult()
			if( result.length > 0 )
			{
				for( let i = 0; i < this.objs.length; ++i )
				{
					const obj = this.objs[i]
					
					if( obj.objButton.name == result )
					{
						result += "1"
						i = 0
					}
				}
				
				this.objs[this.curObj].objButton.name = result
				this.objs[this.curObj].modules[0].objName = result
				this.textIn.Reset()
			}
		}
	}
	
	Draw( gfx )
	{
		if( this.modMap.active )
		{
			this.modMap.Draw( this.gfx )
		}
		else if( ImageMap.active )
		{
			this.imgMap.Draw( this.gfx )
		}
		else
		{
			this.cam.Draw( gfx )
			
			for( let i in this.objs )
			{
				// this.objs[i].objButton.DrawBG( this.curObj == i,gfx,"blue","darkblue" )
				this.objs[i].DrawBG( gfx )
			}
			
			if( this.curObj >= 0 ) this.objs[this.curObj].DrawActive( gfx )
			
			gfx.DrawRect( 0,0,Module.width,gfx.scrHeight,"gray" )
			
			this.createObjButton.DrawBG( this.objs.length < 9,gfx,"dodgerblue","#103088" )
			this.destroyObjButton.DrawBG( this.objs.length > 0,gfx,"dodgerblue","#103088" )
			
			for( let i in this.objs )
			{
				this.objs[i].objButton.DrawBG( this.curObj == i,gfx,"blue","darkblue" )
				// this.objs[i].DrawBG( gfx )
			}
			
			if( this.curObj >= 0 ) this.objs[this.curObj].DrawBotMenu( gfx )
		}
	}
	
	ReorderObjs()
	{
		for( let i in this.objs )
		{
			const objY = this.destroyObjButton.y + ( Module.height + this.padding ) * ( parseInt( i ) + 1 )
			// set module x y instead of using new
			if( !this.objs[i].objButton ) this.objs[i].objButton = new Module( "new obj","",0,objY )
			else this.objs[i].objButton.y = objY
		}
	}
	
	GetActiveObj()
	{
		return( this.objs[this.curObj] )
	}
}