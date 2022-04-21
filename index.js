const { fifaData } = require('./fifa.js')

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note. 

💡 HINT: You may want to filter the data first 😉*/
const final2014 = fifaData.filter(a => a.Year === 2014 && a.Stage === 'Final')
//(a) Home Team name for 2014 world cup final
console.log(final2014[0]['Home Team Name'])
//(b) Away Team name for 2014 world cup final
console.log(final2014[0]['Away Team Name'])
//(c) Home Team goals for 2014 world cup final
console.log(final2014[0]['Home Team Goals'])
//(d) Away Team goals for 2014 world cup final
console.log(final2014[0]['Away Team Goals'])
//(e) Winner of 2014 world cup final */
console.log(final2014[0]['Home Team Name'])


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive an array as a parameter that will take the fifa data as its argument
2. Return an array of objects with the data of the teams that made it to the final stage

💡 HINT - you should be looking at the stage key inside of the objects
*/

function getFinals(arr) {
    return arr.filter(e => e.Stage === 'Final')
 }



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(arr, callback) {
    return callback(arr).map(e => e.Year)
}
// console.log(getYears(fifaData,getFinals))


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Determines the winner (home or away) of each `finals` game. 
💡 HINT: Don't worry about ties for now (Please see the README file for info on ties for a stretch goal.)
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(arr, callback) {
    return callback(arr).map(a => a['Home Team Goals']>a['Away Team Goals']? a['Home Team Name'] : a['Away Team Name'])
}
// console.log(getWinners(fifaData,getFinals))


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Receive a callback function as the third parameter that will take getYears from task 3 as an argument
4. Receive a callback function as the fourth parameter that will take getWinners from task 4 as an argument
5. Return an array of strings that say "In {year}, {country} won the world cup!" 

💡 HINT: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(arr, cb1, cb2, cb3) {
    const winners = cb3(arr, cb2);
    const years = cb2(arr, cb1);
    const strings = [];
    for (let i = 0; i<years.length; i++) {
        strings.push(`In ${years[i]}, ${winners[i]} won the world cup!`)
    }
    return strings;
}



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive a callback function in a parameter that will take getFinals (from task 2) as an argument and ensure you pass in the fifaData as its argument
 
 💡 HINT: Example of invocation: getAverageGoals(getFinals(fifaData));

 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 💡 HINT: use .reduce, .toFixed (refer to MDN for syntax), and do this in 2 steps) 
 
 
*/

function getAverageGoals(finals) {
    return (finals.map(a=>a['Home Team Goals']+a['Away Team Goals']).reduce((a,b)=>a+b)/finals.length).toFixed(2);
 }




/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */
function getCountryWins(data, initials) {
    const winners = getWinners(data, getFinals);
    let name = "";
    for (let i = 0; i<data.length; i++){
        if (data[i]['Away Team Initials']===initials){
            name = data[i]["Away Team Name"]
            break;
        }
        if (data[i]['Home Team Initials']===initials){
            name = data[i]["Home Team Name"]
            break;
        }
    }
    return winners.reduce((acc, team)=> team === name? acc += 1: acc += 0, 0)
}
// console.log(getCountryWins(fifaData, 'ARG'))

/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data) {
    const gameData = [];
    for (let i = 0; i < data.length; i++){
        if (data[i].Stage === 'Final') {
            let team = data[i];
            let homeName = team['Home Team Name'];
            let awayName = team['Away Team Name'];
            let homeGoals = team['Home Team Goals'];
            let awayGoals = team['Away Team Goals'];
            gameData.push({name: homeName, goals: homeGoals});
            gameData.push({name: awayName, goals: awayGoals});
        }
    }
    let averageGoals = [];
    for (let i = 0; i < gameData.length; i++){ 
        let team = gameData[i].name;
        // check to see if Team name is already in array -- if not 
        if(!averageGoals.some(e => e.name === gameData[i].name)){
            let count = 0;
            let goals = 0;
            // get count and goals for each object with matching name
            for (let j = 0; j < gameData.length; j++){

                if(gameData[j].name === team){
                    count++;
                    goals += gameData[j].goals;
                }

            }
            let average = goals/count
            averageGoals.push({name:team, avg:average})
        }
    }const sorted = averageGoals.sort((a,b) => b.avg - a.avg);
    return sorted[0]
}
console.log(getGoals(fifaData))

/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(data) {
    const gameData = [];
    for (let i = 0; i < data.length; i++){
        if (data[i].Stage === 'Final') {
            let team = data[i];
            let homeName = team['Home Team Name'];
            let awayName = team['Away Team Name'];
            let homeOpponent = team['Away Team Goals'];
            let AwayOpponent = team['Home Team Goals'];
            gameData.push({name: homeName, goals: homeOpponent});
            gameData.push({name: awayName, goals: AwayOpponent});
        }
    }
    let averageGoals = [];
    for (let i = 0; i < gameData.length; i++){ 
        let team = gameData[i].name;
        // check to see if Team name is already in array -- if not 
        if(!averageGoals.some(e => e.name === gameData[i].name)){
            let count = 0;
            let goals = 0;
            // get count and goals for each object with matching name
            for (let j = 0; j < gameData.length; j++){

                if(gameData[j].name === team){
                    count++;
                    goals += gameData[j].goals;
                }

            }
            let average = goals/count
            averageGoals.push({name:team, avg:average})
        }
    }const sorted = averageGoals.sort((a,b) => b.avg - a.avg);
    return sorted[0]
}
console.log(badDefense(fifaData))


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
