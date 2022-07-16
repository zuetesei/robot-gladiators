/* GAME FUNCTIONS */

// Function to generate a random numeric value 
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min) + min);

    return value;
};

// function to check if player wants to skip or sk
var fightOrSkip = function () {
    // ask player if they'd like to fight or skip using this function
    var promptFight = window.prompt ('Would you like to FIGHT or SKIP this battle? Enter FIGHT or SKIP to choose.');

    // validate prompt answer
    if (promptFight === "" || promptFight === null) {
        window.alert ('You need to provide a valid answer. Please try again!');
        return fightOrSkip();
    } 

    // convert promptFight to all lowercase so we can check with less options
    promptFight = promptFight.toLowerCase(); 

    if (promptFight === "skip") {
        //confirm player wants to skip 
        var confirmSkip = window.confirm ('Are you sure you want to quit?');

        // if yes (true), leave fight 
        if (confirmSkip) {
            window.alert (playerInfo.name + ' has decided to skip this fight. Goodbye!');
            // subtract money from playerMoney for skipping
            playerInfo.playerMoney = Math.max(0, playerInfo.money - 10);
            // return true if player wants to leave 
            return true; 
        }
    }
    return false;
}

// Fight function (now with parameter for enemy's object holding name, health, and attack values)
var fight = function(enemy) {
    // keep track of who goes first 
    var isPlayerTurn = true; 

    //randomly change turn order 
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }
       
     // repeat and execute as long as the enemy-robot is alive 
    while (playerInfo.health > 0 && enemy.health > 0) {
        if (isPlayerTurn) {
        //ask player if they'd like to fight or skip using fightOrSkip function
        if (fightOrSkip()) {
        // if true, leave fight by breaking loop
            break;
            }
        
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

        // remove enemy's health by subtracting the amount we set in the damage variable
        enemy.health = Math.max(0, enemy.health - damage);
        console.log (
            playerInfo.name + 
            ' attacked ' + 
            enemy.name + ' . ' + 
            enemy.name + 
            ' now has ' + 
            enemy.health + 
            ' health remaining.'
        );

        //check enemy's health
        if (enemy.health <= 0) {
            window.alert(enemy.name + ' has died!');

        //award player money for winning 
        playerInfo.money = playerInfo.money + 20; 

        //leave while loop since enemy is dead
        break;
        } else {
        window.alert (enemy.name + " still has " + enemy.health + " health left.");
        }
        // player gets attacked first 
        } else {
            var damage = randomNumber(enemy.attack - 3, enemy.attack);

            // remove enemy's health by subtracting the amount we set in the damage variable 
            playerInfo.health = Math.max (0, playerInfo.health - damage);
            console.log (
                enemy.name + 
                " attacked " +
                playerInfo.name + 
                ". " + 
                playerInfo.name + 
                " now has " + 
                playerInfo.health + 
                " health remaining."
            );
        //check player's health 
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + ' has died!');
            // leave while loop if player has died 
            break;
        } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
    }
    // switch turn order for next round 
    isPlayerTurn = !isPlayerTurn;
    } // end of While Loop
}; // end of fight function 
        

// Function to Start a New Game 
var startGame = function( ) { 
    //reset player stats
    playerInfo.reset(); 

    //fight each enemy-robot by looping over them and fighting them one at a time
    for (var i = 0; i < enemyInfo.length; i++) {
        // check player stats 
        console.log (playerInfo);

        //if player is still alive, keep fighting
        if (playerInfo.health > 0) {
        //let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it 
        window.alert ("Welcome to Robot Gladiators! Round " + (i + 1));

        //pick new enemy to fight based on the index of the enemy.names array
        var pickedEnemyObj = enemyInfo[i];

        //reset enemy.health before starting new fight
        pickedEnemyObj.health = randomNumber(40,60);

        console.log(pickedEnemyObj);

        //pass the pickedenemy.name variable's value into the fight function, where it will assume the value of the enemy.name parameter
        fight(pickedEnemyObj);

        //if we're not at the last enemy in the array 
        if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
            //ask if player wants to use the store before next round
            var storeConfirm = window.confirm ("The fight is over, visit the store before the next round?");
            //if yes, take them to the store() function
            if (storeConfirm) {
            shop();
        }
    }
    }
    // if player isn't alive, stop the game
    else {
        window.alert ("You have lost your robot in battle! Game Over!");
        break;
    }
}
// after loop ENDS, we are either out of player health or enemies to fight 
// so run endGAME function
endGame();
}; 

// Function to END the entire game 
var endGame = function () {
    window.alert ("The game has now ended. Let's see how you did!")

    // check localStorage for high score, if it's not there, use 0
    var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
        highScore = 0;
    }

    // if player has more money than the high score, player has a new high score!
    if (playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

    alert(playerInfo.name + " now has the high score of " + playerInfo.name + "!");
} else { 
    alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
}

    // ask player if they'd like to play again 
    var playAgainConfirm = window.confirm ("Would you like to play again?");

    if (playAgainConfirm) {
        //restart the game 
        startGame();
    }
    else {
        window.alert ("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

// go to shop between battles function 
var shop = function() {
    // ask player what they'd like to do 
    var shopOptionPrompt = window.prompt( 
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please eneter one: 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
        );
    
    // convert answer from prompt to an actual number
    shopOptionPrompt = parseInt(shopOptionPrompt);
    
    // use switch to carry out action 
    switch (shopOptionPrompt) {
        case 1: 
        playerInfo.refillHealth();
        break;
        case 2:
        playerInfo.upgradeAttack();
        break; 
        case 3:
        window.alert("Leaving the store.");
        break; 
        default:
        window.alert("You did not pick a valid option. Try again.");
        shop();
        break;
}
};

// Player Information 
var getPlayerName = function () {
    var name = "";

    while (name === "" || name === null) {
        name = prompt ("What is your robot's name?");
    }
    console.log ("Your robot's name is " + name);
    return name;
};

/* END GAME FUNCTIONS */

/* GAME INFORMATION / VARIABLES */

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10; 
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert ("Refilling player's health by 20 for $7.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert ("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >=7 ) {
            window.alert ("Upgrading player's attack by 6 for $7.");
            this.attack += 6;
            this.money -= 7;
        } 
        else {
            window.alert ("You don't have enough money!");
        }
}
};

// enemy information 
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber (10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber (10, 14)
    },
    {
        name: "Humboldt",
        attack: randomNumber (10, 14)
    }
];

/* END GAME INFORMATION/VARIABLES */

console.log(enemyInfo);
console.log(enemyInfo[0]);
console.log(enemyInfo[0].name);
console.log(enemyInfo[0]['attack']);


/* RUN GAME */
startGame();