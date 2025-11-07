let runs = 0;
let wickets = 0;
let overs = 0;

let maxOvers = 5;
let maxWickets = 10;

let isTeamATurn = true;
let teamARuns = 0;
let teamBRuns = 0;

const runsDisplay = document.getElementById("runs");
const wicketsDisplay = document.getElementById("wickets");
const oversDisplay = document.getElementById("overs");
const turnText = document.getElementById("turn-text");
const commentaryText = document.getElementById("commentary-text");
const targetDisplay = document.getElementById("target-display");
const batButton = document.getElementById("bat-button");
const bowlButton = document.getElementById("bowl-button");
const resetButton = document.getElementById("reset-button");


batButton.addEventListener("click", handleBatClick);
bowlButton.addEventListener("click", handleBowlClick);

function updateScoreboard() {
    runsDisplay.textContent = runs;
    wicketsDisplay.textContent = wickets;
    oversDisplay.textContent = overs.toFixed(1);

    // Add flash animation
    runsDisplay.classList.add("flash");
    wicketsDisplay.classList.add("flash");
    commentaryText.classList.add("fade");

    setTimeout(() => {
        runsDisplay.classList.remove("flash");
        wicketsDisplay.classList.remove("flash");
        commentaryText.classList.remove("fade");
    }, 400);
}

function handleBatClick() {
    if (wickets >= maxWickets || overs >= maxOvers) {
        switchInnings();
        return;
    }

    let outcome = Math.floor(Math.random() * 7);

    if (outcome === 0) {
        wickets++;
        commentaryText.textContent = `⚡ WICKET! Batsman is OUT!`;
    } else {
        runs += outcome;
        commentaryText.textContent = `🏏 Scored ${outcome} run(s)!`;
    }
if (!isTeamATurn && runs > teamARuns) {
    commentaryText.textContent = `🎉 Team B Wins by chase!`;
    batButton.disabled = true;
    return;
}

    updateBall();
    updateScoreboard();
}

function handleBowlClick() {
    if (wickets >= maxWickets || overs >= maxOvers) {
        switchInnings();
        return;
    }

    let outcome = Math.floor(Math.random() * 7);

    if (outcome === 0) {
        wickets++;
        commentaryText.textContent = `🎯 CLEAN BOWLED!`;
    } else if (outcome === 1) {
        runs += 0;
        commentaryText.textContent = `• Dot ball`;
    } else {
        runs += outcome;
        commentaryText.textContent = `🏏 Batsman hit ${outcome} runs!`;
    }

    updateBall();
    updateScoreboard();

    // Team B chase auto-win check
    if (!isTeamATurn && runs > teamARuns) {
        commentaryText.textContent = `🎉 Team B wins the match by chasing the target!`;
        batButton.disabled = true;
        bowlButton.disabled = true;
    }
}

function updateBall() {
    overs += 0.1;
    if (overs.toFixed(1).endsWith(".6")) {
        overs = Math.floor(overs) + 1;
    }
}

function switchInnings() {
    if (isTeamATurn) {
        teamARuns = runs;
        let target = teamARuns + 1;
        targetDisplay.textContent = `🎯 Target for Team B: ${target} runs`;
        commentaryText.textContent = `Team A scored ${teamARuns}. Team B needs ${target} to win!`;

        resetForNextInnings();
        turnText.textContent = "Team B Batting";
        isTeamATurn = false;
    } else {
        teamBRuns = runs;
        targetDisplay.textContent = ""; // Hide target at match end
        endMatch();
    } 
}


function resetForNextInnings() {
    runs = 0;
    wickets = 0;
    overs = 0;
    updateScoreboard();
}

function endMatch() {
    batButton.disabled = true;
    bowlButton.disabled = true;
    resetButton.style.display = "inline-block"; // ✅ Show reset button

    if (teamBRuns > teamARuns) {
        commentaryText.textContent = `🎉 Team B Wins by ${10 - wickets} wickets!`;
    } else if (teamBRuns < teamARuns) {
        commentaryText.textContent = `🏆 Team A Wins by ${teamARuns - teamBRuns} runs!`;
    } else {
        commentaryText.textContent = `🤝 Match Drawn!`;
    }
}
resetButton.addEventListener("click", resetGame);

function resetGame() {
    // Reset all variables
    runs = 0;
    wickets = 0;
    overs = 0;

    teamARuns = 0;
    teamBRuns = 0;
    isTeamATurn = true;

    // Reset UI
    batButton.disabled = false;
    bowlButton.disabled = false;
    resetButton.style.display = "none"; 
    targetDisplay.textContent = "";
    turnText.textContent = "Team A Batting";
    commentaryText.textContent = "Match restarted! Team A, start batting! 🏏";

    updateScoreboard();
}


// Initialize Display   
updateScoreboard();