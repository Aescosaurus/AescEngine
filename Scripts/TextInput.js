class TextInput
{
	constructor( gfx )
	{
		this.inputs = []
		this.x = gfx.scrWidth / 2 - TextInput.width / 2
		this.y = gfx.scrHeight / 2 - TextInput.height
		this.enterButton = new Module( "Enter","",this.x,gfx.scrHeight / 2 + 10 )
	}
	
	Update( mouse,kbd )
	{
		const done = mouse.uniqueLeft && this.enterButton.Contains( mouse.x,mouse.y )
		const enter = ( kbd.lastKey == "Enter" )
		const backspace = ( kbd.lastKey == "Backspace" )
		for( let i in this.inputs )
		{
			this.inputs[i].Update( enter,
				backspace,
				kbd.lastKey,
				done )
		}
	}
	
	Draw( gfx )
	{
		let open = false
		let canEnter = false
		for( let i in this.inputs )
		{
			if( this.inputs[i].open )
			{
				open = true
				if( this.inputs[i].text.length > 0 ) canEnter = true
				break
			}
		}
		if( open )
		{
			gfx.DrawRect( this.x,this.y,TextInput.width,TextInput.height,"white" )
			
			for( let i in this.inputs )
			{
				this.inputs[i].Draw( this.x,this.y,gfx )
			}
			this.enterButton.DrawBG( canEnter,gfx,"limegreen","darkgreen" )
		}
	}
	
	CreateChild( name )
	{
		this.inputs.push( new TextInputChild( name ) )
		return( this.inputs[this.inputs.length - 1] )
	}
}

TextInput.width = 600
TextInput.height = 45

class TextInputChild
{
	constructor( name )
	{
		this.name = name
		this.text = ""
		this.done = false
		this.open = false
	}
	
	Update( enter,backspace,key,done )
	{
		if( !this.open ) return
		
		if( enter && this.text.length > 0 )
		{
			this.done = true
			Hotkeys.blocked = false
		}
		else if( backspace )
		{
			this.text = this.text.substring( 0,this.text.length - 1 )
		}
		else if( !this.done && key.length < 2 )
		{
			this.text += key
		}
		
		if( done && this.text.length > 0 )
		{
			this.done = true
			Hotkeys.blocked = false
		}
	}
	
	Draw( x,y,gfx )
	{
		if( this.open )
		{
			gfx.DrawText( x,y - 20,"white",this.name,40 )
			gfx.DrawText( x,y + 35,"gray",this.text,40 )
		}
	}
	
	CheckResult()
	{
		if( this.done ) return( this.text )
		
		return( "" )
	}
	
	Open()
	{
		this.open = true
		Hotkeys.blocked = true
	}
	
	Reset()
	{
		this.text = ""
		this.done = false
		this.open = false
	}
}