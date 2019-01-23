//We got the original code from Tutorial 04, week 4 slides from Peter Tolstrup Aagesen
//We have removed parts of the code and added functionality
//Group 4
//Felix Blomqvist, Patrik Svensson, Bahr Srebrenica

//(Peter) setup canvas
const canvas = document.getElementById("graphics");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
const context = canvas.getContext("2d");

//Add the checkbox to the variable doubleTreeButton
let doubleTreeButton = document.getElementById("is-double-tree-checked");

//Add the different season from the form to the variable seasonButtons
let seasonButtons = document.getElementsByName("season");

//Colors for the season
let seasonColors = ['green', 'yellow', 'grey', 'pink'];

//Default color for the leafs
let leafColor = 'grey';

//Put the value of the checkbox to false
let isDoubleTreeChecked = false;

//(Peter) Variables for trees randomness
let maxRadian = Math.PI / 4;
let minHeightFactor = 0.5;
let maxHeightFactor = 0.8;
// (Peter) Variable to hold last place mouse was clicked
let lastX = canvas.width / 40;
let lastY = canvas.height / 40;

//(Peter) Handle mouse events
function handleMouseClick(event) {

  //Set last position variables
  lastX = event.clientX;
  lastY = event.clientY;

  //Draw frame
  window.requestAnimationFrame(draw);
}

// (Peter) Event handler for Mouse click
document.addEventListener("click", handleMouseClick, false);

// Loop to see which radio button is pressed
for(let i = 0; i < seasonButtons.length; i++) {
    seasonButtons[i].addEventListener('change', function() {

        if (this.value == "summer"){
            leafColor = seasonColors[(i - 1)];
            clearCanvas ();
        } else if( this.value=="autumn") {
            leafColor = seasonColors[(i - 1)];
            clearCanvas ();
        } else if( this.value=="winter") {
            leafColor = seasonColors[(i - 1)];
            clearCanvas ();
        } else if( this.value=="spring") {
            leafColor = seasonColors[(i - 1)];
            clearCanvas ();
        } else if(this.value == "random") {
            clearCanvas ();
            leafColor = getRandomColor();
        };
    });
}

function getRandomColor() {
  let x = (Math.floor((Math.random() * 4) + 1));
  return seasonColors[(x - 1)];
}

//(Peter) Drawing the branches
function drawBranch(height) {
    //set width of branch changed from divided by 20 to 4
    context.lineWidth = height / 4;

    //Last branch
    if (height < 10) {
      //We changed the color of the last branch
        context.strokeStyle = leafColor;

        //Draw branch
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(0, - height);
        context.stroke();

    //If branch is not "too small" draw two more
    } else  {
        //Color changed for the tree trunk to brown
        context.strokeStyle = 'rgba(51, 25, 0, 1)';

        //Draw branch
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(0, - height);
        context.stroke();

        //Move to end of branch
        context.translate(0, - height);

        //Save matrix and rotate
        context.save();
        context.rotate(- maxRadian * Math.random());
        //Draw first branch
        drawBranch(height * (minHeightFactor + (maxHeightFactor - minHeightFactor) * Math.random()));
        drawBranch(height * 0.7);

        //Restore rotation
        context.restore();

        //Draw second branch
        context.save();
        context.rotate(maxRadian * Math.random());
        drawBranch(height * (minHeightFactor + (maxHeightFactor - minHeightFactor) * Math.random()));

        drawBranch(height * 0.7);
        context.restore();
    }
}

//(Peter) Draw a tree
function drawTree(x, y) {
    let treePerspective = 10;

    //Save matrix and move to position
    context.save();
    context.translate(x, y);

    context.rotate(maxRadian / 6 - maxRadian / 3 * Math.random());

    //Draw branch
    drawBranch(y / treePerspective);

    //Restore position
    context.restore();
}
//(Peter)Draw function (called by handleMouseClick)
function draw() {
  // first if-statement is our own
    if (isDoubleTreeChecked){
      drawTree(lastX + 10, lastY);
      drawTree(lastX - 10, lastY);
    } else {
      drawTree(lastX, lastY);
    }
}

// When checkbox is clicked, this function is called
function handleClick(checkbox){
  isDoubleTreeChecked = checkbox.checked;
}

function clearCanvas () {
  context.clearRect(0, 0, canvas.width, canvas.height);
}
