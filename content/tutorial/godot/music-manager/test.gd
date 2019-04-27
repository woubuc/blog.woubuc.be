extends Control

# Declare member variables here. Examples:
var a = 2
var b = "text"

onready var foo = $Bar
var test = 27

# Called when the node enters the scene tree for the first time.
func _ready():
	foo.test()
# Called every frame. 'delta' is the elapsed time since the previous frame.
#func _process(delta):
#	pass
