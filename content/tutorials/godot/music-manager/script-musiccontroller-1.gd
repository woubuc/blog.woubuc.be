extends Control

# Load the music player node
onready var _player = $AudioStreamPlayer

# Calling this function will load the given track, and play it
func play(track_url : String):
    pass

# Calling this function will stop the music
func stop():
    pass
