class ImageButton
{
	constructor( img,x = 0,y = 0 )
	{
		this.img = img
		this.x = x
		this.y = y
	}
	
	Draw( selected,gfx,c1 = "darkgray",c2 = "gray" )
	{
		gfx.DrawRect( this.x,this.y,ImageButton.size,ImageButton.size,selected ? c1 : c2 )
		
		gfx.DrawSpriteScale( this.x + 5,this.y + 5,this.img,ImageButton.size - 10,ImageButton.size - 10 )
	}
	
	Contains( x,y )
	{
		return( x > this.x && x < this.x + ImageButton.size &&
			y > this.y && y < this.y + ImageButton.size )
	}
}

ImageButton.size = 96