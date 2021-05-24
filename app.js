const sizeButtons = document.querySelectorAll('.size');
const modeButtons = document.querySelectorAll('.mode');
let lastX = -1;
let lastY = -1;
let xRotation = 0;
let yRotation = 0;
let rotateDegrees = 15;
let currentMode = '';
let mouseDown = 0;
document.body.onmousedown = () => mouseDown = 1;
document.body.onmouseup = () => mouseDown = 0;

function makeGrid(size = 32 * 44, cssClass = 'medium-grid-default') {
    const gameContainer = document.getElementById('container');
    gameContainer.innerHTML = '';
    gameContainer.classList.remove('small-grid', 'medium-grid-default', 'big-grid');
    gameContainer.classList.add(cssClass);

    for (let i = 0; i < size; i += 1) {
        const div = document.createElement('div');
        gameContainer.appendChild(div);
        div.setAttribute('class', 'square-grid');

        let j = i;

        div.setAttribute("x-coord", j);
        div.setAttribute("y-coord", i);
}}

function erase() {
    const gridItems = document.querySelectorAll('#container > div');
  
    gridItems.forEach((item) => {
      item.style.backgroundColor = '#D8D8D8';
      item.style.opacity = '1';
    });
  }

 function startPainting(mode) {
    const gridItems = document.querySelectorAll('#container > div');
    gridItems.forEach((item) => {    
    item.addEventListener('mouseover', function() {
    if (mouseDown) {   
        if (mode === 'classic' || currentMode === 'classic' || currentMode === '') {
        item.style.backgroundColor = '#707070';
        item.style.opacity = 1;
        let xCoord = Number(item.getAttribute('x-coord'));
        let yCoord = Number(item.getAttribute('y-coord'));
        rotateKnobs(xCoord, yCoord);
        
      } else if (mode === 'psychedelic' || currentMode === 'psychedelic') {
        const psychedelicPallete = ['#EF476F', '#FFD166', '#06D6A0', '#118AB2', '#073B4C'];
        const randomColor = Math.floor(Math.random() * psychedelicPallete.length);
        item.style.backgroundColor = psychedelicPallete[randomColor];
        item.style.opacity = 1;
        let xCoord = Number(item.getAttribute('x-coord'));
        let yCoord = Number(item.getAttribute('y-coord'));
        rotateKnobs(xCoord, yCoord);
      }
      else {
          return;
      }
    }
    });
  });
}

function selectButton(button) {
    if (button.classList.contains('mode')) {
      modeButtons.forEach((selection) => {
        selection.classList.remove('active-button');
      });
    } else {
      sizeButtons.forEach((selection) => {
        selection.classList.remove('active-button');
      });
    }
    button.classList.add('active-button');
  }

function changeSize() {
    const small = 16 * 22;
    const medium = 32 * 44;
    const big = 64 * 88;
  
    sizeButtons[1].classList.add('active-button');
  
    sizeButtons.forEach((selection) => {
      selection.addEventListener('click', () => {
        if (selection.classList.contains('small')) {
          erase();
          makeGrid(small, 'small-grid');
          startPainting();
          selectButton(selection);
        } else if (selection.classList.contains('medium')) {
          erase();
          makeGrid(medium, 'medium-grid-default');
          startPainting();
          selectButton(selection);
        } else {
          erase();
          makeGrid(big, 'big-grid');
          startPainting();
          selectButton(selection);
        }
      });
    });
  }
function changeMode() {
    modeButtons[0].classList.add('active-button');
  
    modeButtons.forEach((selection) => {
      selection.addEventListener('click', () => {
        if (selection.classList.contains('classic')) {
          startPainting('classic');
          selectButton(selection);
          currentMode = 'classic';
        } else {
          startPainting('psychedelic');
          selectButton(selection);
          currentMode = 'psychedelic';
        }
      });
    });
  }    
function eraseListener() {
    const eraseButton = document.querySelector('.erase');
  
    eraseButton.addEventListener('click', erase);
  }
  
  function startGame() {
    makeGrid();
    startPainting('classic');
    changeSize();
    changeMode();
    eraseListener();
  }
  
function rotateKnobs(x, y) {
    const leftKnob = document.querySelector('#leftKnob');

    if (x > lastX) {
        xRotation += rotateDegrees;
        leftKnob.style.transform = 'rotate(${yRotation}deg)';
    } else if (x < lastY) {
        xRotation -= rotateDegrees;
        leftKnob.style.transform = 'rotate(${yRotation}deg)';
    }
    lastX = x;

    const rightKnob = document.querySelector('#rightKnob');

    if (y > lastY) {
        yRotation += rotateDegrees;
        rightKnob.style.transform = 'rotate(${yRotation}deg)';
    } else if (y < lastY) {
        yRotation -= rotateDegrees;
        rightKnob.style.transform = 'rotate(${yRotation}deg)';
    }
    lastY = y;
}



  startGame();