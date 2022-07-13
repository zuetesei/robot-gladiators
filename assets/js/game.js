var playerName= window.prompt ("What is your robot's name?")
var playerHealth= 100; 
var playerAttack= 10;
var playerMoney=10;

var enemyNames = ["Roberto", "Amy", "Robi"]
var enemyHealth= 50;
var enemyAttack= 12;

var fight = function(enemyName) {
    while (enemyHealth > 0 && playerHealth > 0) {
    //Ask player if they'd like to fight or skip
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
   
     //if player chooses to skip 
    if (promptFight === "skip" || promptFight === "SKIP") {
        //confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
        
        //if yes(true),leave fight
        if (confirmSkip) {
            window.alert(playerName + " has decided to skip this fight. Goodbye!");
            //subtract money from playerMoney for skipping
            playerMoney = playerMoney - 10;
            console.log("playerMoney", playerMoney);
            break;
        }
    }
    //remove enemy health
    enemyHealth = enemyHealth - playerAttack;
    console.log (
        playerName + " attacked " + enemyName + " . " + enemyName + " now has " + enemyHealth + " health remaining."
    );
    //check enemy's health
    if (enemyHealth <= 0) {
        window.alert(enemyName + " has died!");

    //award player money for winning 
    playerMoney = playerMoney + 20; 
    //leave while loop since enemy is dead
    break;
    } else {
        window.alert (enemyName + " still has " + enemyHealth + " health left.");
    }

    //remove player's health by - amount set in enemyAttack
    playerHealth = playerHealth - enemyAttack;
    console.log (
     enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
    );

    //check player's health 
    if(playerHealth <= 0) {
        window.alert(playerName + " has died.");
        // leave while loop if player has died 
        break;
    } else {
        window.alert(playerName + " still has " + playerHealth + " health left.");
    }
} // end of while loop
};   //end of fight function

for (var i = 0; i < enemyNames.length; i++) {
    debugger;
    //call fight function with enemy robot
    fight (enemyNames[i]);
}

for (var i = 0; i < enemyNames.length; i++) {
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    fight(enemyNames[i]);
}

