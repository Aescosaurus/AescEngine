class TilemapMod extends Module
{
	constructor()
	{
		super( "Tilemap","Creates a tilemap of target objs, disables original obj.  Left/right click to add/remove tiles, make sure to enable edit mode first." )
		
		this.tiles = {}
		
		this.minX = 0
		this.minY = 0
		this.maxX = 0
		this.maxY = 0
		
		this.xOffset = 0
		this.yOffset = 0
		
		// this.targetObj = new InputStr( "tile obj",99999,"limegreen","green" )
		this.targetObjList = []
		this.editValList = []
		this.tileSize = new Vector( 0,0,100,100 )
		
		this.gridCol = "lightgray"
		
		this.selectX = 0
		this.selectY = 0
		
		this.addTileButton = new CheckBox( "Add tile obj",false )
		this.delTileButton = new CheckBox( "Remove tile obj",false )
		
		this.tileSetVal = 0
		this.editing = false
	}
	
	Update( mouse,kbd,info )
	{
		this.tileSize.MoveTo( info.pos.x,info.pos.y )
		for( let i = 0; i < this.targetObjList.length; ++i )
		{
			this.targetObjList[i].MoveTo( this.tileSize.end.x,this.tileSize.end.y + 120 + 40 * i )
			
			const curTargetObj = this.targetObjList[i]
			this.editValList[i].MoveTo( curTargetObj.x + curTargetObj.width / 2 + 10,curTargetObj.y - 15 )
		}
		// this.targetObj.MoveTo( this.tileSize.end.x,this.tileSize.end.y + 70 )
		
		this.addTileButton.MoveTo( this.tileSize.end.x - 15,this.tileSize.end.y + 20 )
		this.delTileButton.MoveTo( this.tileSize.end.x - 15,this.tileSize.end.y + 60 )
		
		this.editing = false
		for( let i = 0; i < this.editValList.length; ++i )
		{
			this.editValList[i].Update( mouse,kbd )
			if( this.editValList[i].Checked() )
			{
				for( let button of this.editValList ) button.on = false
				this.editValList[i].on = true
				this.editing = true
				
				this.tileSetVal = i + 1
			}
		}
		
		if( !this.editing )
		{
			for( let targetObj of this.targetObjList )
			{
				if( targetObj.Update( mouse,kbd ) )
				{
					targetObj.valid = false
					for( let obj of info.objs )
					{
						if( obj.modules[0].objName == targetObj.str )
						{
							targetObj.valid = true
							break
						}
					}
				}
			}
			
			this.tileSize.Update( mouse,kbd )
			
			this.addTileButton.Update( mouse,kbd )
			this.delTileButton.Update( mouse,kbd )
			
			if( this.addTileButton.Checked() )
			{
				this.AddTargetObj()
				this.addTileButton.on = false
			}
			if( this.delTileButton.Checked() )
			{
				this.targetObjList.splice( this.targetObjList.length - 1,1 )
				this.delTileButton.on = false
			}
		}
		else if( !kbd.KeyDown( ' ' ) )
		{
			const diff = this.tileSize.Diff()
			const mx = mouse.x - this.xOffset % diff.x
			const my = mouse.y - this.yOffset % diff.y
			this.selectX = mx - mx % diff.x + ( this.xOffset % diff.x )
			this.selectY = my - my % diff.y + ( this.yOffset % diff.y )
			
			// todo some way to set tilesetval
			
			if( mouse.down || mouse.rightDown )
			{
				// console.log( ( this.selectX - this.xOffset ) / diff.x,( this.selectY - this.yOffset ) / diff.y )
				const xIndex = ( this.selectX - this.xOffset ) / diff.x
				const yIndex = ( this.selectY - this.yOffset ) / diff.y
				
				if( xIndex < this.minX ) this.minX = xIndex
				if( xIndex > this.maxX ) this.maxX = xIndex
				if( yIndex < this.minY ) this.minY = yIndex
				if( yIndex > this.maxY ) this.maxY = yIndex
				
				const val = mouse.down ? this.tileSetVal : 0
				// this.tiles[yIndex * diff.x + xIndex] = val
				this.SetTile( xIndex,yIndex,val )
			}
		}
	}
	
	UpdatePassive( info )
	{
		this.xOffset = info.pos.x
		this.yOffset = info.pos.y
	}
	
	Draw( gfx )
	{
		const diff = this.tileSize.Diff()
		
		for( let y = this.yOffset % diff.y; y < gfx.scrHeight; y += diff.y )
		{
			gfx.DrawRect( 0,y,gfx.scrWidth,1,this.gridCol )
		}
		for( let x = this.xOffset % diff.x; x < gfx.scrWidth; x += diff.x )
		{
			gfx.DrawRect( x,0,1,gfx.scrHeight,this.gridCol )
		}
		
		if( this.editing ) gfx.DrawRect( this.selectX,this.selectY,diff.x,diff.y,this.Tile2Col( this.tileSetVal ) )
		
		for( let i = 0; i < this.targetObjList.length; ++i )
		{
			this.targetObjList[i].Draw( gfx )
			
			this.editValList[i].Draw( gfx )
		}
		this.tileSize.Draw( gfx )
		this.addTileButton.Draw( gfx,false )
		this.delTileButton.Draw( gfx,false )
	}
	
	DrawAlways( gfx )
	{
		const diff = this.tileSize.Diff()
		
		for( let y = this.minY; y <= this.maxY; ++y )
		{
			for( let x = this.minX; x <= this.maxX; ++x )
			{
				const curTile = this.GetTile( x,y )
				if( curTile )
				{
					gfx.DrawRect( x * diff.x + this.xOffset,y * diff.y + this.yOffset,
						diff.x,diff.y,this.Tile2Col( curTile ) )
				}
			}
		}
	}
	
	SetTile( x,y,val )
	{
		// this.tiles[y * this.tileSize.Diff().x + x] = val
		this.tiles[this.XY2Name( x,y )] = val
	}
	
	GetTile( x,y )
	{
		// return( this.tiles[y * this.tileSize.Diff().x + x] )
		return( this.tiles[this.XY2Name( x,y )] )
	}
	
	// this is so sketch
	XY2Name( x,y )
	{
		return( x.toString() + ',' + y.toString() )
	}
	
	Tile2Col( val )
	{
		return( TilemapMod.tileCols[val - 1] )
	}
	
	AddTargetObj()
	{
		const targetObj = new InputStr( "tile obj " + this.targetObjList.length.toString(),
			99999,"limegreen","green" )
		
		this.targetObjList.push( targetObj )
		
		this.editValList.push( new CheckBox( "Enable",false ) )
	}
	
	Decorate( obj,info )
	{
		for( let i = 0; i < this.targetObjList.length; ++i )
		{
			if( !this.targetObjList[i].valid )
			{
				ErrorHandler.Throw( "Obj '" + info.name + "' Tilemap Mod has invalid tile object " + i + '.' )
				return
			}
		}
		
		const diff = this.tileSize.Diff()
		
		obj.start += "this.tTileObjList = []\n"
		obj.start += "this.tTileInitDone = false\n"
		obj.start += "this.tTilemapInit = function() {\n"
		obj.start += "this.tTileInitDone = true\n"
		obj.start += "if( this.tTileObjList.length < 1 ){\n"
		for( let targetObj of this.targetObjList )
		{
			obj.start += "for( let obj of objs ) { if( obj.objName == '" + targetObj.str + "' ) {\n"
			obj.start += "this.tTileObjList.push( obj )\n"
			obj.start += "obj.active = false\n"
			obj.start += "obj.hHitbox = null\n"
			obj.start += "break\n"
			obj.start += "}\n"
			obj.start += "}\n"
		}
		obj.start += "}\n"
		for( let y = this.minY; y <= this.maxY; ++y )
		{
			for( let x = this.minX; x <= this.maxX; ++x )
			{
				const curTile = this.GetTile( x,y )
				if( curTile )
				{
					obj.start += "objs.push( this.tTileObjList[" + ( curTile - 1 ) + "].Duplicate() )\n"
					obj.start += "objs[objs.length - 1].Start()\n"
					obj.start += "objs[objs.length - 1].x = " + ( x * diff.x + this.xOffset + diff.x / 2 ) + '\n'
					obj.start += "objs[objs.length - 1].y = " + ( y * diff.y + this.yOffset + diff.y / 2 ) + '\n'
				}
			}
		}
		obj.start += "}\n"
		
		obj.update += "if( !this.tTileInitDone ) {\n"
		obj.update += "this.tTilemapInit()\n"
		obj.update += "}\n"
		
		obj.Newline()
		
		return( obj )
	}
}

TilemapMod.tileCols =
[
	"gray",
	"lightgray",
	"orange",
	"yellow",
	"limegreen",
	"green",
	"cyan",
	"blue",
	"purple"
]