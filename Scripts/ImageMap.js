class ImageMap
{
	constructor( gfx )
	{
		this.imageScale = 12
		this.imageSize = 8 * this.imageScale
		this.width = Math.floor( gfx.scrWidth / this.imageSize )
		this.height = Math.floor( gfx.scrHeight / this.imageSize )
		this.xPadding = Math.max( ( gfx.scrWidth % this.imageSize ) / this.width,
			( gfx.scrHeight % this.imageSize ) / this.height )
		this.yPadding = this.xPadding
		
		this.images = []
		this.curX = 0
		this.curY = 0
		
		this.images.push( [] )
		
		this.AddImage( new Sprite( "Images/Cactus" ) )
		this.AddImage( new Sprite( "Images/Triangle" ) )
		this.AddImage( new Sprite( "Images/Circle" ) )
	}
	
	Update( mouse,kbd )
	{
		for( let y in this.images )
		{
			for( let x in this.images[y] )
			{
				const curImg = this.images[y][x]
				curImg.selected = curImg.Contains( mouse.x,mouse.y )
				if( curImg.selected && mouse.uniqueLeft )
				{
					ImageMap.spr = curImg.img
					ImageMap.active = false
					return( curImg.img )
				}
			}
		}
		
		return( null )
	}
	
	Draw( gfx )
	{
		if( ImageMap.active )
		{
			for( let y in this.images )
			{
				for( let x in this.images[y] )
				{
					this.images[y][x].Draw( this.images[y][x].selected,gfx )
				}
			}
		}
	}
	
	AddImage( img )
	{
		if( this.images[this.curY].length >= this.width ) 
		{
			this.images.push( [] )
		}
		this.images[this.curY].push( new ImageButton( img,
			this.curX * ( this.imageSize + this.xPadding ),this.curY * ( this.imageSize + this.yPadding ) ) )
		
		++this.curX
	}
}

ImageMap.active = false
ImageMap.spr = null