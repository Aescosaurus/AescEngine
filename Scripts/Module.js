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
		gfx.DrawText( xStart,yStart + Module.MenuTitleTextSize + 5,"white",this.name + " Mod",Module.MenuTitleTextSize )
		for( let i in this.desc )
		{
			gfx.DrawText( xStart,yStart + 30 + Module.MenuTitleTextSize + Module.MenuTextSize * i,"white",this.desc[i],Module.MenuTextSize )
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
	
	Decorate( obj,info )
	{
		return( obj )
	}
	
	FormatText( gfx )
	{
		// gfx.ctx.font = Module.MenuTextSize + "px Arial"
		// let newDesc = []
		// newDesc.push( "" )
		// for( let i in this.desc )
		// {
		// 	let curDesc = newDesc[newDesc.length - 1]
		// 	curDesc += this.desc[i]
		// 	
		// 	if( gfx.ctx.measureText( newDesc[newDesc.length - 1] ).width >= gfx.scrWidth - 20 )
		// 	{
		// 		for( let i = curDesc.length - 1; i > 0; --i )
		// 		{
		// 			if( curDesc[i] == ' ' )
		// 			{
		// 				newDesc.push( curDesc.substring( i,curDesc.length - 1 ) )
		// 				curDesc = curDesc.substr( 0,i )
		// 				break
		// 			}
		// 		}
		// 		
		// 		// newDesc.push( "" )
		// 	}
		// }
		
		this.desc += ' ' // Helps logic
		
		gfx.ctx.font = Module.MenuTextSize + "px Arial"
		const newDesc = []
		newDesc.push( "" )
		let curWord = ""
		for( let c of this.desc )
		{
			const curDesc = newDesc[newDesc.length - 1]
			
			if( c == ' ' )
			{
				if( gfx.ctx.measureText( curDesc + ' ' + curWord ).width >= gfx.scrWidth - Module.MenuTextSize )
				{
					newDesc.push( curWord + ' ' )
				}
				else
				{
					newDesc[newDesc.length - 1] += curWord + ' '
				}
				curWord = ""
			}
			else
			{
				curWord += c
			}
		}
		
		this.desc = newDesc
	}
}

Module.width = 160
Module.height = 40
Module.MenuTextSize = 20
Module.MenuTitleTextSize = 27