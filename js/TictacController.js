angular
  .module('tictacApp')
  .controller('TictacController', TictacController);


TictacController.$inject = ['$firebaseObject'];
// so these functions are set up and running angularfire and are the basic functions of the tictac toe board. Still need to introduce functions for the two player version.

  function TictacController($firebaseObject,$index){ //constructor fct that builds cntrls my angular app
    var self = this; //reassigning keyword this to a variable called self (cos john papa says so) 

    self.board = getBoard(); //retrieves board from firebase and attaches to controller
    createBoxes(); // call fct createBoxes to display them
    self.clickYou = clickYou;
    self.playerX = true;
    self.playerO = false;

    self.win = false;
    self.winner = winner;

    // self.message = self.winner;
    self.clearGrid = clearGrid;
    self.appearGame = appearGame;
    self.appear = false;

    self.turn = "";
    self.noClick = "";

    //declare name player one
    self.names = [];
    self.newName = " ";
    self.addNames = addNames;

    //declare name player two
    self.names2 = [];
    self.newName2 = " ";
    self.addNames2 = addNames2;


    function getBoard(){  //FB function, to include all .board inside it
      // console.log(counter);
      var ref = new Firebase("https://tpfgametictactoe.firebaseio.com/");
      var board = $firebaseObject(ref);
      return board;
      }

    function createBoxes(){
      console.log("running createBoxes")
      console.log(self.board)
      self.board.message =""; //no msg when u load the page
      self.board.newName = ""; //empty names
      self.board.newName2 = "";
      self.board.counter = 0;  //start counter at 0 when page loads
      self.board.boxes = [      //key-value of the board
      {active: false, p1owns:""},
      {active: false, p1owns:""},
      {active: false, p1owns:""},
      {active: false, p1owns:""},
      {active: false, p1owns:""},
      {active: false, p1owns:""},
      {active: false, p1owns:""},
      {active: false, p1owns:""},
      {active: false, p1owns:""}]; 

      // our game counter
      self.board.$save();  // infos of board saved to FB
      console.log(self.board.counter)
      }

    function clickYou($index){

      if(self.win){ //win has been declared to false so until this condition remains false, msg will appear on a click when win is false
        self.board.turn = "To start a new game, hit reset!";
        self.board.message = "";
        // alert('To start a new game, hit reset!');
      return
      } 

      if(self.board.boxes[$index].p1owns != "") { //p1owns are empty so if not empty, noClick will show up
        self.board.noClick = "This button has already been clicked"  
       // alert("This button has already been clicked")
      } 

      else {
          if (self.playerX == true) { //this conditon is verified bc we assigned playerX to false at the beginning
          console.log("X");
          self.board.boxes[$index].active[$index]= true; //we are re assignning active boolean to true
          self.board.boxes[$index].p1owns = "X"; //now the string is not empty but is assigned to "X"
          console.log(self.board.boxes[$index])
          self.board.counter ++;  //we add the counter by 1 for each click
          console.log(self.board.counter);
          self.board.turn = "Player Two " + self.board.newName2 + " Turn"; // when click on this, a message will be displayed that it is now player2 turn
          self.board.noClick = ""; //to get rid of noClick msg if it has been displayed earlier
          self.board.$save(); //save thos infos to FB
          self.playerX = false ; //re assign playerX to false so game wil switch turn after one click
          } else {
          self.board.boxes[$index].active[$index] = false;
          self.board.boxes[$index].p1owns = "O";
          console.log("O");
          self.board.turn = "Player One " + self.board.newName + " Turn";
          self.board.noClick = "";
          self.board.counter ++;
          console.log(self.board.counter);
          self.board.$save(); 
          self.playerX = true ;
          } 
          winner();
      //     // console.log(self.counter)
      //     console.log(self.win)
      }
    }

      function winner() {
      // console.log("winner x");

        //check for a winning combination for player1("X")
        if(
        ((self.board.boxes[0].p1owns == "X") && (self.board.boxes[1].p1owns == "X") && (self.board.boxes[2].p1owns == "X")) || 
        ((self.board.boxes[3].p1owns == "X") && (self.board.boxes[4].p1owns == "X") && (self.board.boxes[5].p1owns == "X")) || 
        ((self.board.boxes[6].p1owns == "X") && (self.board.boxes[7].p1owns == "X") && (self.board.boxes[8].p1owns == "X")) ||
        ((self.board.boxes[0].p1owns == "X") && (self.board.boxes[3].p1owns == "X") && (self.board.boxes[6].p1owns == "X")) || 
        ((self.board.boxes[1].p1owns == "X") && (self.board.boxes[4].p1owns == "X") && (self.board.boxes[7].p1owns == "X")) || 
        ((self.board.boxes[2].p1owns == "X") && (self.board.boxes[5].p1owns == "X") && (self.board.boxes[8].p1owns == "X")) || 
        ((self.board.boxes[0].p1owns == "X") && (self.board.boxes[4].p1owns == "X") && (self.board.boxes[8].p1owns == "X")) || 
        ((self.board.boxes[2].p1owns == "X") && (self.board.boxes[4].p1owns == "X") && (self.board.boxes[6].p1owns == "X")) 
        ) { 
        console.log("player one wins");
        self.board.message = self.board.newName + " Wins !";
        self.board.noClick = "";
        self.board.turn = "";
        self.board.$save(); 

        // self.board.$save();
        self.win = true;


        //check for a winning combination for player2("0")      
        } else if (
        ((self.board.boxes[0].p1owns == "O") && (self.board.boxes[1].p1owns == "O") && (self.board.boxes[2].p1owns == "O")) ||   
        ((self.board.boxes[3].p1owns == "O") && (self.board.boxes[4].p1owns == "O") && (self.board.boxes[5].p1owns == "O")) || 
        ((self.board.boxes[6].p1owns == "O") && (self.board.boxes[7].p1owns == "O") && (self.board.boxes[8].p1owns == "O")) ||
        ((self.board.boxes[0].p1owns == "O") && (self.board.boxes[3].p1owns == "O") && (self.board.boxes[6].p1owns == "O")) || 
        ((self.board.boxes[1].p1owns == "O") && (self.board.boxes[4].p1owns == "O") && (self.board.boxes[7].p1owns == "O")) || 
        ((self.board.boxes[2].p1owns == "O") && (self.board.boxes[5].p1owns == "O") && (self.board.boxes[8].p1owns == "O")) || 
        ((self.board.boxes[0].p1owns == "O") && (self.board.boxes[4].p1owns == "O") && (self.board.boxes[8].p1owns == "O")) || 
        ((self.board.boxes[2].p1owns == "O") && (self.board.boxes[4].p1owns == "O") && (self.board.boxes[6].p1owns == "O")) 
        ) {
        console.log("player two wins");
        self.board.message = self.board.newName2 + " Wins ! ";
        self.board.noClick = "";
        self.board.turn = "";
        self.board.$save();
        self.win = true;


        //once counter reached 8 and no one won, tie!  
        } else if (self.board.counter === 9) {
        console.log("It's a Tie!");
        self.board.message =  " Tie !";
        self.board.noClick = "";
        self.board.turn = "";
        self.board.$save();
        // alert('To start a new game, hit reset!');
        }
      }

      function clearGrid($index) {
        self.board.counter = 0;
        self.playerX = true;
        self.playerO = false;
        self.win = false;
        self.board.turn = "";
        self.board.noClick = "";
        self.board.message = "";
        self.board.boxes = [
        {active: false, p1owns:""},
        {active: false, p1owns:""},
        {active: false, p1owns:""},
        {active: false, p1owns:""},
        {active: false, p1owns:""},
        {active: false, p1owns:""},
        {active: false, p1owns:""},
        {active: false, p1owns:""},
        {active: false, p1owns:""}]; 
        self.board.$save();
      }     

      function addNames(){
        self.names.push(self.board.newName);
        self.board.$save();
      }

      function addNames2(){
        self.names2.push(self.board.newName2);
        self.board.$save();
      }

      function appearGame(){
       self.appear = !self.appear;
      }
}

    




