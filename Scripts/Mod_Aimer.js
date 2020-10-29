class AimerMod extends Module
{
	constructor()
	{
		super( "Aimer","Aim towards the mouse." )
	}
	
	Decorate( obj )
	{
		obj.update += "this.rot = Math.atan2( mouse.y - this.y,mouse.x - this.x )\n"
		
		obj.Newline()
		
		return( obj )
	}
}