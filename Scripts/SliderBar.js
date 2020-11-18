class SliderBar
{
	constructor( label,rand = false )
	{
		this.label = label
		// gfx.ctx.font = "18px Arial"
		// this.textWidth = gfx.ctx.measureText( this.label ).width
		
		this.x = 0
		this.y = 0
		
		this.barX = this.x - SliderBar.barWidth / 2
		this.barY = this.y + SliderBar.height - SliderBar.height * 1.0
		this.bar2Y = this.y + SliderBar.height / 4
		this.rand = rand
		
		this.sliderCol = "gray"
		
		this.sliding = false
		this.sliding2 = false
		this.slideOffset = 0
		
		this.vec = new Vector( 0,0,-100,0 )
	}
	
	Update( mouse,kbd )
	{
		if( !this.sliding && !this.sliding2 && ( mouse.down || mouse.rightDown ) )
		{
			if( this.Contains( mouse.x,mouse.y,this.barY ) )
			{
				this.sliding = true
				
				this.slideOffset = this.barY - mouse.y
			}
			else if( this.Contains( mouse.x,mouse.y,this.bar2Y ) && this.rand )
			{
				this.sliding2 = true
				
				this.slideOffset = this.bar2Y - mouse.y
			}
		}
		
		if( this.sliding || this.sliding2 )
		{
			if( !mouse.down && !mouse.rightDown )
			{
				this.sliding = false
				this.sliding2 = false
			}
			
			if( this.sliding ) this.barY = mouse.y + this.slideOffset
			else if( this.sliding2 ) this.bar2Y = mouse.y + this.slideOffset
			
			if( mouse.rightDown )
			{
				if( this.sliding ) this.bar2Y = this.barY
				else if( this.sliding2 ) this.barY = this.bar2Y
			}
			
			if( this.barY < this.y ) this.barY = this.y
			if( this.barY > this.MaxY() ) this.barY = this.MaxY()
			if( this.bar2Y < this.y ) this.bar2Y = this.y
			if( this.bar2Y > this.MaxY() ) this.bar2Y = this.MaxY()
		}
		else
		{
			this.vec.Update( mouse,kbd )
		}
		
		return( this.Dragging() )
	}
	
	Draw( gfx )
	{
		this.vec.Draw( gfx,SliderBar.vecCol )
		
		gfx.DrawRect( this.x - SliderBar.width / 2,this.y,
			SliderBar.width,SliderBar.height,this.sliderCol )
		
		gfx.DrawRect( this.barX,this.barY - SliderBar.barHeight / 2,SliderBar.barWidth,SliderBar.barHeight,"white" )
		if( this.rand )gfx.DrawRect( this.barX,this.bar2Y - SliderBar.barHeight / 2,SliderBar.barWidth,SliderBar.barHeight,"white" )
		
		gfx.ctx.font = "20px Arial"
		let labelStr = this.label + ": " + this.CalcVal().toFixed( 2 ).toString()
		if( this.rand ) labelStr += " - " + this.CalcVal2().toFixed( 2 ).toString()
		const textWidth = gfx.ctx.measureText( labelStr ).width
		
		gfx.DrawText( this.x - textWidth / 2,this.y - SliderBar.barHeight,
			this.sliderCol,labelStr )
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
		this.bar2Y += yDiff
	}
	
	Contains( x,y,barY )
	{
		return( x > this.barX && x < this.barX + SliderBar.barWidth &&
			y > barY - SliderBar.barHeight / 2 && y < barY + SliderBar.barHeight / 2 )
	}
	
	Dragging()
	{
		return( this.vec.Dragging() || this.sliding || this.sliding2 )
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
	
	CalcVal2()
	{
		const scaling = this.vec.Diff().GetLen() / SliderBar.scalingDiv
		return( this.CalcValPlain2() * scaling )
	}
	
	// Ignores vector scaling.
	CalcValPlain()
	{
		const diff = Math.abs( this.barY + SliderBar.barHeight / 2 - ( this.y ) ) - 7.5
		return( ( 1.0 - ( diff / SliderBar.height ) ) )
	}
	
	CalcValPlain2()
	{
		const diff = Math.abs( this.bar2Y + SliderBar.barHeight / 2 - ( this.y ) ) - 7.5
		return( ( 1.0 - ( diff / SliderBar.height ) ) )
	}
	
	// Does not give \n at end
	Code()
	{
		if( this.rand )
		{
			return( "Random.Range( " + this.CalcVal() + ',' + this.CalcVal2() + " )" )
		}
		else
		{
			return( this.CalcVal() )
		}
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