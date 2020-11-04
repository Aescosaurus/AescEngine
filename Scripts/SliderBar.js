class SliderBar
{
	constructor( label,sliderCol = "gray",startPercent = 1.0 )
	{
		this.label = label
		// gfx.ctx.font = "18px Arial"
		// this.textWidth = gfx.ctx.measureText( this.label ).width
		
		this.x = 0
		this.y = 0
		
		this.barX = this.x - SliderBar.barWidth / 2
		this.barY = this.y + SliderBar.height - SliderBar.height * startPercent
		
		this.sliderCol = sliderCol
		
		this.sliding = false
		this.slideOffset = 0
		
		this.vec = new Vector( 0,0,-100,0 )
	}
	
	Update( mouse,kbd )
	{
		if( !this.sliding && ( mouse.down || mouse.rightDown ) && this.Contains( mouse.x,mouse.y ) )
		{
			this.sliding = true
			
			this.slideOffset = this.barY - mouse.y
		}
		
		if( this.sliding )
		{
			if( !mouse.down && !mouse.rightDown ) this.sliding = false
			
			this.barY = mouse.y + this.slideOffset
			if( this.barY < this.y ) this.barY = this.y
			if( this.barY > this.MaxY() ) this.barY = this.MaxY()
		}
		else
		{
			this.vec.Update( mouse,kbd )
		}
		
		return( this.Dragging() )
	}
	
	MoveTo( x,y )
	{
		this.vec.MoveTo( x,y )
		
		const xDiff = ( this.vec.end.x + SliderBar.vecXOffset ) - this.x
		const yDiff = ( this.vec.end.y + SliderBar.vecYOffset ) - this.y
		
		this.x += xDiff
		this.y += yDiff
		this.barX += xDiff
		this.barY += yDiff
	}
	
	Draw( gfx )
	{
		this.vec.Draw( gfx,SliderBar.vecCol )
		
		gfx.DrawRect( this.x - SliderBar.width / 2,this.y,
			SliderBar.width,SliderBar.height,this.sliderCol )
		
		gfx.DrawRect( this.barX,this.barY - SliderBar.barHeight / 2,SliderBar.barWidth,SliderBar.barHeight,"white" )
		
		gfx.ctx.font = "20px Arial"
		const labelStr = this.label + ": " + this.CalcVal().toFixed( 2 ).toString()
		const textWidth = gfx.ctx.measureText( labelStr ).width
		
		gfx.DrawText( this.x - textWidth / 2,this.y - SliderBar.barHeight,
			this.sliderCol,labelStr )
	}
	
	Contains( x,y )
	{
		return( x > this.barX && x < this.barX + SliderBar.barWidth &&
			y > this.barY - SliderBar.barHeight / 2 && y < this.barY + SliderBar.barHeight / 2 )
	}
	
	Dragging()
	{
		return( this.vec.Dragging() || this.sliding )
	}
	
	MaxY()
	{
		return( this.y + SliderBar.height )
	}
	
	CalcVal()
	{
		const scaling = this.vec.Diff().GetLen() / SliderBar.scalingDiv
		return( this.CalcValPlain() * scaling )
	}
	
	// Ignores vector scaling.
	CalcValPlain()
	{
		const diff = Math.abs( this.barY + SliderBar.barHeight / 2 - ( this.y ) ) - 7.5
		return( ( 1.0 - ( diff / SliderBar.height ) ) )
	}
}

SliderBar.width = 20
SliderBar.height = 100
SliderBar.barWidth = 25
SliderBar.barHeight = 15
SliderBar.vecXOffset = 25
SliderBar.vecYOffset = 40
SliderBar.scalingDiv = 100.0
SliderBar.vecCol = "coral"