class Mouse
{
	constructor( gfx )
	{
		const canv = document.getElementById( "canv" )
		
		this.down = false
		this.rightDown = false
		this.uniqueLeft = false
		this.canClick = true
		this.x = 0
		this.y = 0
		const self = this
		
		canv.addEventListener( "mousedown",function( e )
		{
			if( e.button == 0 )
			{
				self.down = true
				if( self.canClick )
				{
					self.uniqueLeft = true
					self.canClick = false
				}
			}
			else if( e.button == 2 ) self.rightDown = true
		} )
		canv.addEventListener( "mouseup",function( e )
		{
			if( e.button == 0 )
			{
				self.down = false
				self.canClick = true
				self.uniqueLeft = false
			}
			else if( e.button == 2 ) self.rightDown = false
		} )
		canv.addEventListener( "mousemove",function( event )
		{
			const rect = canv.getBoundingClientRect()
			const root = document.documentElement
			self.x = event.clientX - rect.left - root.scrollLeft
			self.y = event.clientY - rect.top - root.scrollTop
			
			self.x = Math.floor( self.x / gfx.scale )
			self.y = Math.floor( self.y / gfx.scale )
		} )
		canv.oncontextmenu = function( e ) { e.preventDefault() }
	}
	
	Update()
	{
		this.uniqueLeft = false
	}
}