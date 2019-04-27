extends Control

# Switch to the other scene
func _on_GoToScene2Button_pressed():
	get_tree().change_scene("res://Scene2.tscn")

# Load and play track 1
func _on_PlayTrack1Button_pressed():
	MusicController.play("res://tracks/track 1.ogg")

# Stop the music
func _on_StopMusicButton_pressed():
	MusicController.stop()
