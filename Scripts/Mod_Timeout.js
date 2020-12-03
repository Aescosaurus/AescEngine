class TimeoutMod extends Module
{
	constructor()
	{
		super( "Timeout","Destroys object after timer." )
		
		this.timer = new SliderBar( "Time" )
	}
	
	Update( mouse,kbd,info )
	{
		this.timer.MoveTo( info.pos.x,info.pos.y )
		this.timer.Update( mouse,kbd )
	}
	
	Draw( gfx )
	{
		this.timer.Draw( gfx )
	}
	
	Decorate( obj )
	{
		obj.start += "this.tOuchTimeout = " + this.timer.CalcVal() + " * 60\n"
		
		obj.update += "--this.tOuchTimeout\n"
		obj.update += "if( this.tOuchTimeout <= 0 ) this.active = false\n"
		
		obj.Newline()
		
		return( obj )
	}
}