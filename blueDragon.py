jsons/game/import urllib.request
import os
import json
import math


y = 0
z = 0

path = 'jsons/game/'
games = os.listdir(path)

for game in games:
	y += 1
	file = 'jsons/game/' + game

	f = open(file, 'r')
	text = f.read()
	encjson = json.loads(text)

	if(encjson['teams'][0]['firstDragon'] is True):
		z += 1

os.system('clear')
print('Blue side First Dragon is {}%. Sample size: {}'.format(str(round((z/y)*100)), str(y)))
print('Red side First Dragon is {}%. Sample size: {}'.format(str(100 - round((z/y)*100)), str(y)))
