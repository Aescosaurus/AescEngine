class Main
{
	constructor()
	{
		this.gfx = new Graphics()
		this.mouse = new Mouse( this.gfx )
		this.kbd = new Keyboard()
		
		this.textIn = new TextInput( this.gfx )
		
		this.objMenu = new ObjectMenu( this.gfx,this.textIn )
		
		this.game = new GameBuild()
	}
	
	Update()
	{
		if( this.running )
		{
			this.game.Update()
			if( this.kbd.KeyDown( 'B' ) && this.kbd.KeyDown( 'U' ) )
			{
				this.running = false;
				this.game.Reset()
			}
			return
		}
		else if( this.kbd.KeyDown( 'B' ) && this.kbd.KeyDown( 'I' ) )
		{
			this.running = true
			this.game.CreateBuild( this.objMenu.objs )
		}
		
		this.objMenu.Update( this.mouse,this.kbd )
		this.textIn.Update( this.mouse,this.kbd )
		
		this.mouse.Update()
		this.kbd.lastKey = ""
	}
	
	Draw()
	{
		if( this.running )
		{
			this.game.Draw()
			return
		}
		
		this.objMenu.Draw( this.gfx )
		this.textIn.Draw( this.gfx )
	}
}

const main = new Main()

// Function executes in global scope so these are needed for build.
const gfx = main.gfx
const mouse = main.mouse
const kbd = main.kbd
const objs = main.game.objs

setInterval( function()
{
	main.gfx.DrawRect( 0,0,main.gfx.scrWidth,main.gfx.scrHeight,"black" )
	main.Update()
	main.Draw()
},1000 / 60.0 )