import json
import os
import urllib.request
import time
import datetime


regions = {
	'LCK': {'url' : 'https://api.lolesports.com/api/v1/leagues?slug=lck'},
	'NALCS': {'url' : 'https://api.lolesports.com/api/v1/leagues?slug=lcs'},
	'EULCS': {'url' : 'https://api.lolesports.com/api/v1/leagues?slug=lec'},
	'CBLOL': {'url' : 'https://api.lolesports.com/api/v1/leagues?slug=cblol-brazil'},
	'LMS' :  {'url' : 'https://api.lolesports.com/api/v1/leagues?slug=lms'},
	'TCL': {'url' : 'https://api.lolesports.com/api/v1/leagues?slug=turkiye-sampiyonluk-ligi'},
	'OPL': {'url' : 'https://api.lolesports.com/api/v1/leagues?slug=oce-opl'}
}

data_path = 'raw/'

if os.path.isfile('{}match_ids.json'.format(data_path)):
	f = open('{}match_ids.json'.format(data_path), 'r')
	text = f.read()
	match_array = json.loads(text)['matches']
	f.close()
else:
	match_array = []




def getGame(game_id, gameHash):

	region_base = 'ESPORTSTMNT0'
	region = ''
	i = 1
	while i < 6:
		region = region_base + str(i)
		print('checking region {}'.format(region))
		url_string = 'https://acs.leagueoflegends.com/v1/stats/game/{}/{}?gameHash={}'.format(region, game_id, gameHash)
		print('getting api: {}'.format(url_string))
		json_raw = getJson(url_string)
		if json_raw == False:
			i += 1
			if i == 6:
				print('no match found')
		else:
			break

	if json_raw == False:
		return False

	json_file = open(data_path + 'game/{}.json'.format(str(game_id)), 'wb')
	json_file.write(json_raw.encode('utf-8'))
	json_file.close

	url_string = 'https://acs.leagueoflegends.com/v1/stats/game/{}/{}/timeline?gameHash={}'.format(region, game_id, gameHash)
	print('getting second api: {}'.format(url_string))
	json_raw = getJson(url_string)
	if json_raw == False:
		return False

	json_file = open(data_path + 'timeline/{}.json'.format(str(game_id)), 'wb')
	json_file.write(json_raw.encode('utf-8'))
	json_file.close

def getJson(url_string):
	print('getting json: ' + url_string)
	req = urllib.request.Request(url_string, headers={'User-Agent' : "Magic Browser"}) 

	try:
		response_string = urllib.request.urlopen(req)
		json_raw = response_string.read().decode()
	except urllib.request.HTTPError as e:
		if(e.code == 104):
			print('error 104, sleeping for 20 seconds and retrying')
			time.sleep(20)
			return getJson(url_string)
		if(e.code == 404):
			return False
		print(e)
		return False

	print('got json')

	return json_raw

def addImage(match_json, region):
	if not os.path.isdir("assets/img/logos"):
		os.makedirs("assets/img/logos")

	if not os.path.isdir("assets/img/logos/{}".format(region)):
		os.makedirs("assets/img/logos/{}".format(region))

	i = 0
	if len(match_json['teams']) > 1:
		while i < 2:
			team_acro = match_json['teams'][i]["acronym"]
			if "{}.png".format(team_acro) not in os.listdir("assets/img/logos/{}/".format(region)):
				logo_link = match_json['teams'][i]["logoUrl"]
				urllib.request.urlretrieve(logo_link, "assets/img/logos/{}/{}.png".format(region, team_acro))
			i += 1

def wipeDir():
	os.system('del -r {}game/*'.format(data_path))
	os.system('del -r {}timeline/*'.format(data_path))

def getMatchFromURL(match_url_string, region_name, match_object, scrape_updates = False, game_map = False, scheduled_matches = False, extra_data = False):
	match_json_raw = getJson(match_url_string)

	match_json = json.loads(match_json_raw)

	addImage(match_json, region_name)

	if len(match_json['scheduleItems']) > 0:
		match_time = match_json['scheduleItems'][0]['scheduledTime']
		# print('week: {}, day: {}'.format(match_json['scheduleItems'][0]['tags']['blockLabel'], match_json['scheduleItems'][0]['tags']['subBlockLabel']))
		if scheduled_matches != False:
			if len(match_json['teams']) == 2:
				scheduled_matches.append({
					'region' : region_name,
					'team1' : match_json['teams'][0]['name'],
					'team1acro' : match_json['teams'][0]['acronym'],
					'team2' : match_json['teams'][1]['name'],
					'team2acro' : match_json['teams'][1]['acronym'],
					'datetime' : match_time,
				})

		if scrape_updates != False:
			if region_name not in scrape_updates['regions']:
				scrape_updates['regions'][region_name] = []

			if (int(datetime.datetime.now().timestamp()) - (3600 * 6)) < int(datetime.datetime.strptime(match_time, '%Y-%m-%dT%H:%M:%S.%f%z').timestamp()):
				scrape_updates['regions'][region_name].append({
					'match_url' : match_url_string,
					'datetime' : match_time,
					'match_data' : extra_data
				})
		

	for game in match_json['gameIdMappings']:

		print('checking {}'.format(game['id']))

		game_hash = game['gameHash']
		game_id_hash = game['id']

		if 'gameId' not in match_object['games'][game_id_hash]:
			print(match_object['games'])
			continue

		game_id = match_object['games'][game_id_hash]['gameId'].replace('\t', '')

		if game_id + '.json' in os.listdir(data_path + 'game'):
			print('skipping: ' + game_id)
			continue

		print('managed to get here')

		getGame(game_id, game_hash)
		if game_map != False:
			game_map[game_id] = region_name

	return [scrape_updates, game_map, scheduled_matches]

def scrape():

	print('Wipe previous data? y/n')

	if input('') == 'y':
		wipeDir()

	region_tournaments = []
	scheduled_matches = []
	game_map = {}
	scrape_updates = {
		'currentTime': int(datetime.datetime.now().timestamp()),
		'regions' : {}
	}

	for region in regions:
		print('region: ' + region)
		region_dict = regions[region]

		json_raw = getJson(region_dict['url'])

		json_obj = json.loads(json_raw)

		count = 0

		for tournament in json_obj['highlanderTournaments']:
			print('{}. {}'.format(count, tournament['title']))
			count += 1

		print('Select Tournaments (seperate by spaces):')
		tournaments = input('')

		if tournaments:
			tournaments_array = tournaments.split(" ")
		else:
			tournaments_array = []

		region_tournaments.append({
			'region_name' : region,
			'region_dict' : region_dict,
			'tournaments_array': tournaments_array,
			'json_raw' : json_raw,
			'json_obj' : json_obj
		})

	number_regions_scraped = 0
	total_regions = len(region_tournaments)

	for region_data in region_tournaments:

		number_regions_scraped = number_regions_scraped + 1

		region_dict = region_data['region_dict']
		region_name = region_data['region_name']
		tournaments_array = region_data['tournaments_array']
		json_raw = region_data['json_raw']
		json_obj = region_data['json_obj']
		

		for tournament_key in tournaments_array:

			tournament_key = int(tournament_key)

			print('sraping {}'.format(json_obj['highlanderTournaments'][tournament_key]['title']))

			tournament_id = json_obj['highlanderTournaments'][tournament_key]['id']

			brackets = json_obj['highlanderTournaments'][tournament_key]['brackets']

			for bracket in brackets:

				matches = brackets[bracket]['matches']

				for match_id in matches:

					match_object = matches[match_id]

					match_url_string = 	'https://api.lolesports.com/api/v2/highlanderMatchDetails?tournamentId={}&matchId={}'.format(tournament_id, match_id)

					extra_data = {
						'tournament_key' : tournament_key,
						'tournament_id' : tournament_id,
						'bracket' : bracket,
						'match_id' : match_id
					}

					[scrape_updates, game_map, scheduled_matches] = getMatchFromURL(match_url_string, region_name, match_object, scrape_updates, game_map, scheduled_matches, extra_data)

					print('{} / {} region'.format(number_regions_scraped, total_regions))

	f = open(data_path + 'scheduled_matches.json', 'w')
	f.write(json.dumps(scheduled_matches))
	f.close()

	f = open(data_path + 'game_map.json', 'w')
	f.write(json.dumps(game_map))
	f.close()

	f = open(data_path + 'scrape_updates.json', 'w')
	f.write(json.dumps(scrape_updates))
	f.close()

	

	return scheduled_matches

def getRegionData(region):
	json_raw = getJson(regions[region]['url'])
	json_obj = json.loads(json_raw)

	return json_obj

def update():
	scrape_updates = open(data_path + 'scrape_updates.json', 'r')
	scrape_updates = scrape_updates.read()
	scrape_updates = json.loads(scrape_updates)

	game_map = open(data_path + 'game_map.json', 'r')
	game_map = game_map.read()
	game_map = json.loads(game_map)

	for region_name in scrape_updates['regions']:
		print(region_name)
		region_data = False
		matches = scrape_updates['regions'][region_name]
		for match in matches:
			match_url_string = match['match_url']
			match_data = match['match_data']
			match_time = match['datetime']

			match_timestamp = int(datetime.datetime.strptime(match_time, '%Y-%m-%dT%H:%M:%S.%f%z').timestamp())
			now_timestamp = int(datetime.datetime.now().timestamp())

			if (now_timestamp > match_timestamp):
				if region_data is False:
					region_data = getRegionData(region_name)

				match_object = region_data['highlanderTournaments'][match_data['tournament_key']]['brackets'][match_data['bracket']]['matches'][match_data['match_id']]

				[a, game_map, a] = getMatchFromURL(match_url_string, region_name, match_object, False, game_map, False)



	f = open(data_path + 'game_map.json', 'w')
	f.write(json.dumps(game_map))
	f.close()