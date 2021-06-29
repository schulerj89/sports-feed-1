const sdv = require('sportsdataverse');

module.exports = {
    getPlayByPlay: async function (gameId) {
        let team1 = 0;
        let team2 = 0;
        let teamid = 0;
        let teamPlayers = {};
        let fullPlay = '';
        let playerName = ''
        const result = await sdv.nba.getPlayByPlay(gameId);
    
        // calculate the stats of every player
        for(const play of result.plays) {
            if(play.team === undefined) {
                continue;
            }
    
            fullPlay = play.text;
            fullPlayArray = fullPlay.split(' ');
            teamid = play.team.id;
            playerName = fullPlayArray[0] + ' ' + fullPlayArray[1];
    
            // if the player hasn't been defined 
            if(teamPlayers[playerName] === undefined) {
                teamPlayers[playerName] = {plays: [], stats: {fga: 0, fgm: 0, reb: 0, tov: 0}}; // define it
            }
    
            // missed/made a shot ( not a free throw )
            if((fullPlay.indexOf('makes') > -1 || fullPlay.indexOf('misses') > -1) && fullPlay.indexOf('free throw') == -1) {
                teamPlayers[playerName].stats.fga = ++teamPlayers[playerName].stats.fga;
    
                // made a shot
                if(fullPlay.indexOf('makes') > -1) {
                    teamPlayers[playerName].stats.fgm = ++teamPlayers[playerName].stats.fgm;
                }
            } else if(fullPlay.indexOf('rebound') > -1) {
                teamPlayers[playerName].stats.reb = ++teamPlayers[playerName].stats.reb;
            } else if(fullPlay.indexOf('turnover') > -1) {
                teamPlayers[playerName].stats.tov = ++teamPlayers[playerName].stats.tov;
            }
    
            teamPlayers[playerName]['plays'].push(fullPlay);    
        }
    
        console.log(teamPlayers); // display our objects of players
    }
}
