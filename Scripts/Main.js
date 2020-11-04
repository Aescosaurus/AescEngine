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
		
		this.playButton = new PlayButton( this.gfx )
		
		this.errorHandler = new ErrorHandler( this.gfx )
	}
	
	Update()
	{
		if( this.running )
		{
			this.game.Update()
			// if( this.kbd.KeyDown( 'B' ) && this.kbd.KeyDown( 'U' ) )
			if( !this.playButton.Playing() )
			{
				this.StopRunning()
			}
		}
		// else if( this.kbd.KeyDown( 'B' ) && this.kbd.KeyDown( 'I' ) )
		else if( this.playButton.Playing() )
		{
			this.running = true
			
			ErrorHandler.msgs.length = 0
			
			cam.MoveTo( -this.objMenu.cam.pos.x,-this.objMenu.cam.pos.y )
			for( let obj of this.objMenu.objs ) obj.UpdateCam( cam )
			
			this.game.CreateBuild( this.objMenu.objs )
			
			cam.MoveTo( this.objMenu.cam.pos.x,this.objMenu.cam.pos.y )
			for( let obj of this.objMenu.objs ) obj.UpdateCam( cam )
			
			if( ErrorHandler.msgs.length != 0 )
			{
				this.StopRunning()
			}
		}
		else
		{
			this.objMenu.Update( this.mouse,this.kbd )
			this.textIn.Update( this.mouse,this.kbd )
		}
		
		this.playButton.Update( this.mouse,this.kbd )
		this.errorHandler.Update( this.mouse,this.kbd )
		
		this.mouse.Update()
		this.kbd.lastKey = ""
	}
	
	Draw()
	{
		if( this.running )
		{
			this.game.Draw()
		}
		else
		{
			this.objMenu.Draw( this.gfx )
			this.textIn.Draw( this.gfx )
		}
		
		this.errorHandler.Draw( this.gfx )
		this.playButton.Draw( this.gfx )
	}
	
	StopRunning()
	{
		this.running = false
		this.game.Reset()
		this.playButton.playing = false
	}
}

const main = new Main()

// Function executes in global scope so these are needed for build.
const gfx = main.gfx
const mouse = main.mouse
const kbd = main.kbd
const objs = main.game.objs
const cam = new Camera()

setInterval( function()
{
	main.gfx.DrawRect( 0,0,main.gfx.scrWidth,main.gfx.scrHeight,"black" )
	main.Update()
	main.Draw()
},1000 / 60.0 )