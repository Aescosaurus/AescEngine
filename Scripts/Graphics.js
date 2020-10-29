class Graphics
{
	constructor()
	{
		this.canv = document.getElementById( "canv" )
		this.ctx = this.canv.getContext( "2d" )
		
		this.ctx.imageSmoothingEnabled = false
		this.ctx.mozImageSmoothingEnabled = false
		
		const scale = 1.0
		this.scale = scale
		
		this.ctx.scale( scale,scale )
		
		this.scrWidth = this.canv.width / scale
		this.scrHeight = this.canv.height / scale
	}
	
	DrawRect( x,y,width,height,color )
	{
		this.ctx.fillStyle = color
		this.ctx.fillRect( x,y,width,height )
	}
	
	DrawCircle( x,y,radius,color )
	{
		this.ctx.strokeStyle = color
		this.ctx.lineWidth = 2
		this.ctx.beginPath()
		this.ctx.arc( x,y,radius,0,2 * Math.PI )
		this.ctx.stroke()
	}
	
	DrawSprite( x,y,sprite )
	{
		this.ctx.drawImage( sprite.img,Math.round( x ),Math.round( y ) )
	}
	
	DrawSpriteScale( x,y,sprite,width,height )
	{
		this.ctx.drawImage( sprite.img,x,y,width,height )
	}
	
	DrawLine( x1,y1,x2,y2,color,width = 2 )
	{
		this.ctx.strokeStyle = color
		this.ctx.lineWidth = width
		this.ctx.beginPath()
		this.ctx.moveTo( x1,y1 )
		this.ctx.lineTo( x2,y2 )
		this.ctx.stroke()
	}
	
	DrawTriangle( x,y,size,xDir,yDir,color )
	{
		this.ctx.fillStyle = color
		this.ctx.beginPath()
		
		const len = Math.sqrt( xDir * xDir + yDir * yDir )
		xDir = xDir / len * size
		yDir = yDir / len * size
		const perp = { x: yDir,y: -xDir }
		
		// this.ctx.moveTo( x,y )
		// this.ctx.lineTo( x - xDir + perp.x / 2,y - yDir + perp.y / 2 )
		// this.ctx.lineTo( x - xDir - perp.x / 2,y - yDir - perp.y / 2 )
		// 
		// this.ctx.closePath()
		// this.ctx.fill()
		this.DrawPoly( [ { x: x,y: y },
			{ x: x - xDir + perp.x / 2,y: y - yDir + perp.y / 2 },
			{ x: x - xDir - perp.x / 2,y: y - yDir - perp.y / 2 } ],
			color,1.0 )
	}
	
	DrawPoly( points,color,alpha = 1.0 )
	{
		this.ctx.globalAlpha = alpha
		this.ctx.fillStyle = color
		
		this.ctx.moveTo( points[0].x,points[0].y )
		for( let i = 1; i < points.length; ++i )
		{
			this.ctx.lineTo( points[i].x,points[i].y )
		}
		
		this.ctx.closePath()
		this.ctx.fill()
		
		this.ctx.globalAlpha = 1.0
	}
	
	DrawText( x,y,color,str,size = 20 )
	{
		this.ctx.font = size.toString() + "px Arial"
		this.ctx.fillStyle = color
		this.ctx.fillText( str,x,y )
	}
}