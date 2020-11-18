class RowColInitMod extends Module
{
	constructor()
	{
		super( "Row Col Init","Spawns things in row col order.  Disables this object." )
		
		this.rowCount = new SliderBar( "Row Width" )
		this.colCount = new SliderBar( "Col Height" )
		this.colCount.vec.end.x = this.colCount.vec.start.x
		this.colCount.vec.end.y -= 100
		this.padding = new Vector( 0,0,100,100 )
		
		this.hitboxCol = "orange"
	}
	
	Update( mouse,kbd,info )
	{
		this.rowCount.MoveTo( info.pos.x,info.pos.y )
		this.colCount.MoveTo( info.pos.x,info.pos.y )
		this.padding.MoveTo( info.pos.x - this.padding.Diff().x / 2,info.pos.y - this.padding.Diff().y / 2 )
		
		if( !this.padding.Update( mouse,kbd ) )
		{
			if( !this.rowCount.Update( mouse,kbd ) )
			{
				this.colCount.Update( mouse,kbd )
			}
		}
	}
	
	Draw( gfx )
	{
		this.rowCount.Draw( gfx )
		this.colCount.Draw( gfx )
		this.padding.Draw( gfx )
		
		gfx.DrawRect( this.padding.start.x,this.padding.start.y,this.padding.Diff().x,1,this.hitboxCol )
		gfx.DrawRect( this.padding.end.x,this.padding.start.y,1,this.padding.Diff().y,this.hitboxCol )
		gfx.DrawRect( this.padding.start.x,this.padding.end.y,this.padding.Diff().x,1,this.hitboxCol )
		gfx.DrawRect( this.padding.start.x,this.padding.start.y,1,this.padding.Diff().y,this.hitboxCol )
	}
	
	Decorate( obj,info )
	{
		const rows = Math.floor( this.rowCount.CalcVal() )
		const cols = Math.floor( this.colCount.CalcVal() )
		
		if( rows < 1 || cols < 1 )
		{
			ErrorHandler.Throw( "Obj '" + info.name + "': Row Col Init Mod has row or col val less than 1." )
			return
		}
		
		const padding = this.padding.Diff()
		// padding.x /= ( rows / 2 )
		// padding.y /= ( cols / 2 )
		
		obj.start += "if( !this.rciAlreadyInitted ) {\n"
		obj.start += "for( let y = " + -cols / 2 + "; y < " + cols / 2 + "; ++y ) {\n"
		obj.start += "for( let x = " + -rows / 2 + "; x < " + rows / 2 + "; ++x ) {\n"
		obj.start += "const temp = this.Duplicate()\n"
		obj.start += "temp.rciAlreadyInitted = true\n"
		obj.start += "temp.Start()\n"
		obj.start += "temp.x = this.x + x * " + padding.x + '\n'
		obj.start += "temp.y = this.y + y * " + padding.y + '\n'
		obj.start += "objs.push( temp )\n"
		obj.start += "}\n"
		obj.start += "}\n"
		obj.start += "this.active = false\n"
		obj.start += "}\n"
		
		obj.Newline()
		
		return( obj )
	}
}