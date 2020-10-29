class Hotkeys
{}

Hotkeys.blocked = false
Hotkeys.Check = function( key )
{
	return( !Hotkeys.blocked && kbd.lastKey == key.toLowerCase() )
}