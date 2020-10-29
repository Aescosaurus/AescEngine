class Module
{
	constructor( name,desc = "",x = 0,y = 0 )
	{
		this.name = name
		this.desc = desc
		this.x = x
		this.y = y
	}
	
	Update( mouse,kbd,info )
	{
	}
	
	UpdatePassive( info )
	{
	}
	
	Draw( gfx )
	{
	}
	
	// Draws regardless of selected or not.
	DrawAlways( gfx )
	{
	}
	
	// Draws on top of everything else.
	DrawUI( gfx )
	{
	}
	
	DrawLeftSideMenu( xStart,yStart,gfx )
	{
		gfx.DrawText( xStart,yStart + 25,"white",this.name + " Module",25 )
		for( let i in this.desc )
		{
			gfx.DrawText( xStart,yStart + 30 + 25 + 18 * i,"white",this.desc[i],18 )
		}
	}
	
	DrawBG( selected,gfx,c1 = "red",c2 = "darkred" )
	{
		gfx.DrawRect( this.x,this.y,Module.width,Module.height,selected ? c1 : c2 )
		
		let name = this.name
		if( this.hotkey ) name = '[' + this.hotkey + "] " + this.name
		gfx.DrawText( this.x + 5,this.y + 25,"white",name )
	}
	
	DrawArgText( gfx,args )
	{
		for( let i in args )
		{
			gfx.DrawText( this.x + 5,this.y + 45 + 25 * i,"white",args[i] )
		}
	}
	
	Contains( x,y )
	{
		return( x > this.x && x < this.x + Module.width &&
			y > this.y && y < this.y + Module.height )
	}
	
	Decorate( obj )
	{
		return( obj )
	}
	
	FormatText( gfx )
	{
		gfx.ctx.font = "18px Arial"
		let newDesc = []
		newDesc.push( "" )
		for( let i in this.desc )
		{
			newDesc[newDesc.length - 1] += this.desc[i]
			
			if( gfx.ctx.measureText( newDesc[newDesc.length - 1] ).width > gfx.scrWidth )
			{
				newDesc.push( "" )
			}
		}
		
		this.desc = newDesc
	}
}

Module.width = 160
Module.height = 40