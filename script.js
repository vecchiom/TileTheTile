
// VARIABLES ASSIGNMENT
var availableSpace = [];
var tile = [];
var index;
var assignTile = document.querySelectorAll("div");
var button = document.querySelector(".btn");
var firstSelect, secondSelect, swap;
var message = document.querySelectorAll("p");
var selected = false;
var completed = false;

// RESET BUTTON FUNCTIONALITY
button.addEventListener('click', function(){
  randomThat();
  hideComplete();
})

// MAIN PROGRAM
  hideComplete();
  randomThat();
  mainLogic();

function hideComplete(){
  message[0].style.visibility = "hidden";
}

function randomThat(){
  availableSpace = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for(var i = 0; i < 9; i++){
    index = randomizeIndex(availableSpace.length);
    tile[i] = availableSpace[index];
    availableSpace.splice(index, 1);
    assignTile[i].className="tile"+tile[i];
  }
}

function mainLogic(){
  for(var i = 0; i < 9; i++){
      assignTile[i].addEventListener('click', function(el){
        // Checking that the "selection" is not the SPACE. Also there must not be anothere "selection" pending
        if(!completed && !selected && this.className !== "tile9"){
          // Match the selected class with the childNodes element so to look in other
          //parent element for that child
          var position = associating(el.target);

          // HORIZONTAL CHECK & VERTICAL CHECK for tiles adjacent to tile 9 (aka SPACE)
           if((this.previousElementSibling && this.previousElementSibling.className === "tile9") ||
               (this.nextElementSibling && this.nextElementSibling.className === "tile9") ||
              (this.parentElement.previousElementSibling && this.parentElement.previousElementSibling.childNodes[position].className === "tile9") ||
              (this.parentElement.nextElementSibling && this.parentElement.nextElementSibling.childNodes[position].className === "tile9")){

                    // SELECT AND HIGHLIGHT A CELL THAT'S HORIZONTALLY OR VERTICALLY ADJACENT TO tile9 (aka SPACE)
                    firstSelect = this;
                    swap = this.className;
                    firstSelect.style.border = "2px solid red";
                    selected = true;
          }

          // If there is a pending "selection" then swap it with tile9 (aka SPACE)
        } else if(selected && this.className === "tile9"){
          secondSelect = this;
          firstSelect.style.border = "1px solid grey";
          firstSelect.classList.remove(firstSelect.className);
          firstSelect.classList.add(secondSelect.className);
          secondSelect.classList.remove(secondSelect.className);
          secondSelect.classList.add(swap);
          selected = false;
        }

        // Check if all tiles are correctly lined up to end the game
        if (checkCompleted()){
          message[0].style.visibility = "visible";
          completed = true;
        };
      });
  }
}


function randomizeIndex(b){
  return Math.floor(Math.random() * b);
}

function sectioning(a, x){
    return a.splice(x, 1);
}

function checkCompleted(){
  var count = 0;
    for(var i = 0; i < 9; i++){
      if (assignTile[i].className === "tile"+[i+1]){
        count++;
        };
    }
    if (count === 9 ){
      return true;
    }
}

function associating(e){
  var elParent = e.parentElement;
  var elClass = e.className;
  for(var i = 1; i <=5; i+=2){
    var elLookFor = elParent.childNodes[i].className;
    if(elClass === elLookFor){
      console.log("You clicked on " + elClass + " and that's the " + i + " element");
      var pos= i;
    }
  }
 return pos;
}
