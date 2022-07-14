var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

var playerInfo = {
    name: window.prompt ("What is your robot's name?"),
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

var enemyInfo = [
    {
        name: "Roborto",
        attack: 12
    },
    {
        name: "Amy Android",
        attack: 13
    },
    {
        name: "Humboldt",
        attack: 14
    }
];

//fight functions (now with parameter for enemy's name)
var fight = function(enemy) {
    while (playerInfo.health > 0 && enemy.health > 0) {
        //Ask player if they'd like to fight or skip
        var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
   
        //if player chooses to skip 
        if (promptFight === 'skip' || promptFight === 'SKIP') {
            //confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
        
            //if yes(true),leave fight
            if (confirmSkip) {
             window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
             //subtract money from playerInfo.money for skipping
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("player money: ", playerInfo.money);
                break;
            }
        }
        //remove enemy health
        var damage = randomNumber (playerInfo.attack - 3); playerInfo.attack;
        enemy.health = Math.max(0, enemy.health - damage);
        console.log (
            playerInfo.name + ' attacked ' + enemy.name + ' . ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
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

        //remove player's health by - amount set in enemy.attack
        var damage = randomNumber (enemy.attack - 3); enemy.attack;
        playerInfo.health = Math.max (0, playerInfo.health - damage);
        console.log (
        enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
        );

        //check player's health 
        if (playerInfo.health <= 0) {
         window.alert(playerInfo.name + ' has died!');
        // leave while loop if player has died 
        break;
        } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
    } // end of while loop
};   //end of fight function


//function to start a new game 
var startGame = function( ) { 
    //reset player stats
    playerInfo.reset(); 

    //fight each enemy-robot by looping over them and fighting them one at a time
    for (var i = 0; i < enemyInfo.length; i++) {
        //if player is still alive, keep fighting
        if (playerInfo.health > 0) {
        //let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it 
        window.alert ("Welcome to Robot Gladiators! Round " + (i + 1));

        //pick new enemy to fight based on the index of the enemy.names array
        var pickedEnemyObj = enemyInfo[i];

        //reset enemy.health before starting new fight
        pickedEnemyObj.health = randomNumber(40,60);

        //use debugger to pause script from running and check what's going on at that moment in the code 
        // debugger; 

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
endGame();
};

var endGame = function () {
    // if player is still alive, player wins! 
    if (playerInfo.health > 0) {
        window.alert ("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".")
    }
    else {
    window.alert ("You've lost your robot in battle.");
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
}

// go to shop between battles function 
var shop = function() {
    // ask player what they'd like to do 
    var shopOptionPrompt = window.prompt( 
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please eneter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
        );
    
    // use switch to carry out action 
    switch (shopOptionPrompt) {
        case "REFILL": 
        case "refill":
            playerInfo.refillHealth();
            break;
    case "UPGRADE": 
    case "upgrade":
            playerInfo.upgradeAttack();
            break; 
    case "LEAVE": //new case
    case "leave": 
        window.alert("Leaving the store.");

        // do nothing, so function will end 
        break; 
        default:
        window.alert("You did not pick a valid option. Try again.");
        
        shop();
        break;
}
};

startGame();