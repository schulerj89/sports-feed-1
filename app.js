const nba = require('./nba');
const gameId = 401283399;

nba.getPlayByPlay(gameId)
.catch(err => {
    console.error(err);
});
