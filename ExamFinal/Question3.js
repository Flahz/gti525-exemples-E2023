const {EventEmitter} = require('events');

class User{
  constructor(fluxChatroom,username){
    this.fluxChatroom=fluxChatroom;
    this.username=username;
    //***********Compléter*************
  }

  sendMessage(msg){
    this.fluxChatroom.emit("null",msg)
  }

  sendPrivateMessage(receiverUsername, msg){
    //***********Compléter*************
    this.fluxChatroom.emit(receiverUsername,msg)
  }

  printMessage(isGeneral, senderUsername, msg){
    let generalTag = isGeneral?"(general)":"";
    console.log(`${this.username}> ${senderUsername}${generalTag}: ${msg}`);
  }
}

function test(showRun=true,showTest=true){
  let consoleText="";
  let expected=[
    "user0> user0(general): Salut tout le monde",
    "user1> user0(general): Salut tout le monde",
    "user2> user0(general): Salut tout le monde",
    "user3> user0(general): Salut tout le monde",
    "user0> user1: Salut user0",
    "user2> user3: Salut user2",
    "user0> user3(general): Salut user0",
    "user1> user3(general): Salut user0",
    "user2> user3(general): Salut user0",
    "user3> user3(general): Salut user0"
  ].join("\n").trim();
  
  let bckConsole=console.log;
  let fctTrace = function(msg){
    consoleText+=msg+"\n";
    if(showRun)bckConsole(msg);
  }
  console.log=fctTrace;
  try{
    if(showRun)bckConsole("Run:\n===========================================");
    run();
    if(showRun)bckConsole("===========================================\n");
    if(showTest)bckConsole("Test result: "+(expected==consoleText.trim()?"Pass!":
          `Fail\n\nExpected:\n${expected}\n\nBut reveiced:\n${consoleText}\nTest failed!`));
  }
  catch(e){ bckConsole(e); } 
  finally{ console.log=bckConsole;}
}

function run(){
  let flux = new EventEmitter(); // Initialiser le flux d'événements
  
  // Initialiser 4 utilisateurs
  let users=[];
  for(let i=0;i<4;i++){
    users.push(new User(flux,`user${i}`));
  }

  //Exemple d'utilisation
  users[0].sendMessage("Salut tout le monde");
  /*rendu à la console:
  user0> user0(general): Salut tout le monde
  user1> user0(general): Salut tout le monde
  user2> user0(general): Salut tout le monde
  user3> user0(general): Salut tout le monde
  */

  users[1].sendPrivateMessage(users[0].username,"Salut user0");
  /*rendu à la console:
  user0> user1: Salut user0
  */

  users[2].sendPrivateMessage("patate","Salut user0");
  //rien dans la console car la user "patate" n'existe pas

  users[3].sendPrivateMessage(users[2].username,"Salut user2");
  /*rendu à la console:
  user2> user3: Salut user2
  */
 
  users[3].sendMessage("Salut user0");
  /*rendu à la console:
  user0> user3(general): Salut user0
  user1> user3(general): Salut user0
  user2> user3(general): Salut user0
  user3> user3(general): Salut user0
  */
}

test()