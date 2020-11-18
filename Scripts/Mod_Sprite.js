class SpriteMod extends Module
{
	constructor()
	{
		super( "Sprite","Click the rectangle to open sprite picker, arrow determines size." )
		
		this.spr = new SpritePicker()
		// this.sprImg = null
		this.xScale = 1
		this.yScale = 1
		
		this.scale = new Vector( 0,0,100,100 )
		this.spr.width = this.scale.Diff().x
		this.spr.height = this.scale.Diff().y
		this.diff = this.scale.Diff()
	}
	
	Update( mouse,kbd,info )
	{
		this.scale.MoveTo( info.pos.x - this.scale.Diff().x / 2,info.pos.y - this.scale.Diff().y / 2 )
		this.scale.Update( mouse,kbd )
		
		// this.spr.x = info.pos.x
		// this.spr.y = info.pos.y
		
		this.spr.width = this.scale.Diff().x
		this.spr.height = this.scale.Diff().y
		
		this.spr.Update( mouse,kbd )
		
		this.diff = this.scale.Diff()
	}
	
	UpdatePassive( info )
	{
		this.spr.x = info.pos.x - this.diff.x / 2
		this.spr.y = info.pos.y - this.diff.y / 2
		
		this.spr.hovering = false
	}
	
	Draw( gfx )
	{
		// this.spr.Draw( gfx )
		
		this.scale.Draw( gfx,"red" )
	}
	
	DrawAlways( gfx )
	{
		// const diff = this.scale.Interp( 0.5 ).Multiply( IdentityMod.scaleScale )
		// gfx.DrawRect( this.pos.x - diff.x / 2,this.pos.y - diff.y / 2,
		// 	diff.x,diff.y,this.color )
		
		// if( this.sprImg != null )
		// {
		// 	gfx.DrawSpriteScale( this.x + 5,this.y + 5,
		// 		this.spr,SpritePicker.size - 10,SpritePicker.size - 10 )
		// }
		
		this.spr.Draw( gfx )
	}
	
	Decorate( obj,info )
	{
		if( !this.spr.spr )
		{
			ErrorHandler.Throw( "Obj '" + info.name + "': Sprite Mod has empty sprite." )
			return
		}
		
		obj.start += "this.sSprite = new Sprite( '" + this.spr.spr.path + "')\n"
		obj.start += "this.sWidth = " + this.spr.width + '\n'
		obj.start += "this.sHeight = " + this.spr.height + '\n'
		
		obj.draw += "gfx.ctx.save()\n"
		obj.draw += "gfx.ctx.translate( this.x,this.y )\n"
		obj.draw += "gfx.ctx.rotate( this.rot + Math.PI / 2 )\n"
		obj.draw += "gfx.DrawSpriteScale( -this.sWidth / 2,-this.sHeight / 2,this.sSprite,this.sWidth,this.sHeight )\n"
		obj.draw += "gfx.ctx.restore()\n"
		
		obj.Newline()
		
		return( obj )
	}
}