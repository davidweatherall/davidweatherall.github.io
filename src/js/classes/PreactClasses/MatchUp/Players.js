import { h, render, Component } from 'preact';

import ReactHintFactory from 'react-hint'
const ReactHint = ReactHintFactory({createElement: h, Component})


class Players extends Component {
	constructor() {
		super();
		this.setState({playerData: false});
	}

	removeTeam(playerName) {
		Array.from(this.props.game.teamNames, (teamName) => {
			playerName = playerName.replace(teamName, '');
		});
		return playerName;
	}

	getChamp(champId) {
		const champIds = {'145' : 'Kaisa', '555' : 'Pyke', '77': 'Udyr', '427': 'Ivern', '85': 'Kennen', '18': 'Tristana', '78': 'Poppy', '9': 'Fiddlesticks', '267': 'Nami', '15': 'Sivir', '19': 'Warwick', '54': 'Malphite', '164': 'Camille', '14': 'Sion', '6': 'Urgot', '61': 'Orianna', '45': 'Veigar', '44': 'Taric', '60': 'Elise', '20': 'Nunu', '106': 'Volibear', '110': 'Varus', '62': 'MonkeyKing', '161': 'Velkoz', '429': 'Kalista', '27': 'Singed', '498': 'Xayah', '83': 'Yorick', '53': 'Blitzcrank', '133': 'Quinn', '245': 'Ekko', '74': 'Heimerdinger', '57': 'Maokai', '25': 'Morgana', '163': 'Taliyah', '63': 'Brand', '107': 'Rengar', '10': 'Kayle', '41': 'Gangplank', '203': 'Kindred', '223': 'TahmKench', '127': 'Lissandra', '13': 'Ryze', '105': 'Fizz', '17': 'Teemo', '117': 'Lulu', '254': 'Vi', '34': 'Anivia', '102': 'Shyvana', '7': 'Leblanc', '92': 'Riven', '31': 'Chogath', '43': 'Karma', '222': 'Jinx', '236': 'Lucian', '39': 'Irelia', '141': 'Kayn', '86': 'Garen', '26': 'Zilean', '99': 'Lux', '4': 'TwistedFate', '58': 'Renekton', '68': 'Rumble', '134': 'Syndra', '51': 'Caitlyn', '29': 'Twitch', '421': 'RekSai', '497': 'Rakan', '240': 'Kled', '266': 'Aatrox', '111': 'Nautilus', '36': 'DrMundo', '32': 'Amumu', '113': 'Sejuani', '121': 'Khazix', '50': 'Swain', '72': 'Skarner', '126': 'Jayce', '120': 'Hecarim', '104': 'Graves', '48': 'Trundle', '143': 'Zyra', '33': 'Rammus', '268': 'Azir', '201': 'Braum', '23': 'Tryndamere', '69': 'Cassiopeia', '112': 'Viktor', '38': 'Kassadin', '89': 'Leona', '24': 'Jax', '516': 'Ornn', '131': 'Diana', '432': 'Bard', '76': 'Nidalee', '42': 'Corki', '90': 'Malzahar', '142': 'Zoe', '1': 'Annie', '119': 'Draven', '64': 'LeeSin', '8': 'Vladimir', '37': 'Sona', '114': 'Fiora', '40': 'Janna', '59': 'JarvanIV', '420': 'Illaoi', '5': 'XinZhao', '35': 'Shaco', '103': 'Ahri', '67': 'Vayne', '84': 'Akali', '202': 'Jhin', '150': 'Gnar', '91': 'Talon', '55': 'Katarina', '30': 'Karthus', '238': 'Zed', '2': 'Olaf', '28': 'Evelynn', '98': 'Shen', '16': 'Soraka', '56': 'Nocturne', '11': 'MasterYi', '122': 'Darius', '157': 'Yasuo', '96': 'KogMaw', '12': 'Alistar', '412': 'Thresh', '82': 'Mordekaiser', '115': 'Ziggs', '81': 'Ezreal', '101': 'Xerath', '79': 'Gragas', '75': 'Nasus', '21': 'MissFortune', '136': 'AurelionSol', '22': 'Ashe', '80': 'Pantheon', '3': 'Galio', '154': 'Zac'}
		return champIds[champId];
	}

	getPlayerData() {
		fetch(`/api/${this.props.activeRegion}/games/${this.props.game.gameId}/players.json`)
		.then(
			response => response.json()
		).then(data => {
			this.setState({playerData: data});
		});		
	}

	getFB(playerData) {
		let firstBlood = '';
		if(playerData.firstBloodKill) {
			firstBlood = <img data-rh="First Kill" src="/assets/svg/sword.svg"/>;
		} else if(playerData.firstBloodAssist) {
			firstBlood = <img data-rh="First Kill Assist" src="/assets/svg/help.svg"/>; 
		} else if(playerData.firstDeath) {
			firstBlood = <img data-rh="First Death" src="/assets/svg/skull.svg"/>;
		}
		return firstBlood;
	}

	renderPlayer(playerData) {
		let playerName = playerData.name
		playerName = this.removeTeam(playerName)
		const firstBlood = this.getFB(playerData);
		const KDA = `${playerData.kills}/${playerData.deaths}/${playerData.kills}`;
		const champNane = this.getChamp(playerData.champId);
		const champImage = `http://ddragon.leagueoflegends.com/cdn/8.14.1/img/champion/${champNane}.png`
		console.log(playerData);
		return (
			<tr class="card__player">
				<td>{playerName}</td>
				<td class="card__champ"><img src={champImage}/></td>
				<td>{KDA}</td>
				<td class="card__svg">
					<ReactHint autoPosition events delay={100} />
					<ReactHint persist
						attribute="data-custom"
						className="custom-hint"
						events={{hover: true}}
						ref={(ref) => this.instance = ref} />
					{firstBlood}
				</td>
			</tr>
		);
	}

	renderPlayers() {
		if(this.state.playerData) {
			let team1Players = [];
			let team2Players = [];
			let playerCount = 0;
			while(playerCount < 5) {
				const playerData = this.state.playerData[playerCount];
				team1Players.push(this.renderPlayer(playerData));
				playerCount++;
			}
			while(playerCount < 10) {
				const playerData = this.state.playerData[playerCount];
				team2Players.push(this.renderPlayer(playerData));
				playerCount++;
			}
			return (
				<div class="card__players">
					<table class="card__team">
						{this.props.index == 0 ? team1Players : team2Players}
					</table>
					<table class="card__team">
						{this.props.index == 0 ? team2Players : team1Players}
					</table>
				</div>
			);
		} else {
			return 'getting players...';
		}
	}

	render() {
		return (
			<div class="matches__players">{this.renderPlayers()}</div>
		);
	}

	componentDidMount() {
		this.getPlayerData();
	}
}

export default Players;