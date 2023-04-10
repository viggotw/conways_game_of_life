// Constants
const COLOR_MAP = {
    0: 'white',
    1: '#333'
};

// Global variables
const speedSlider = document.getElementById("speedSlider");

let intervalTime = 1000 / (1+parseInt(speedSlider.value)); // set initial interval time based on slider value
let painting = false;
let paintValue = 0;
let intervalId;

// Global event listeners
window.addEventListener('load', function () {
    let defaultSize = 10; // set your default grid size here
    document.getElementById("size").value = defaultSize;
    document.addEventListener("mousedown", startPainting);
    document.addEventListener("mouseup", stopPainting);
    document.addEventListener("mouseover", applyPainting);
    createGrid();
});

speedSlider.addEventListener("input", () => {
    intervalTime = 1000 / (1+parseInt(speedSlider.value))
});

function createGrid() {
    // This function creates a grid based on the size input
    let size = document.getElementById("size").value;
    let grid = document.getElementById("grid");
    grid.innerHTML = "";
    grid.style.setProperty('--size', size);
    for (let i = 0; i < size; i++) {
        let row = document.createElement("div");
        for (let j = 0; j < size; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("data-col", i);
            cell.setAttribute("data-row", j);
            cell.setAttribute("data-value", 0);
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
}

function clearGrid() {
    // This function clears the grid
    let cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].setAttribute("data-value", 0);
        cells[i].style.backgroundColor = COLOR_MAP[0];
    }
}

function startPainting(event) {
    // This function start painting on the grid
    if (event.target.classList.contains("cell")) {
        painting = true;
        paintValue = toggleColor(event);
        event.target.removeEventListener("mouseover", applyPainting);
    }
}

function stopPainting(event) {
    // This function stop painting on the grid
    painting = false;
    event.target.addEventListener("mouseover", applyPainting);
}

function applyPainting(event) {
    // This function, while painting, applies paint to cells on the grid
    let cell = event.target;
    if (painting && cell.classList.contains("cell")) {
        cell.setAttribute("data-value", paintValue);
        cell.style.backgroundColor = COLOR_MAP[paintValue];
    }
}

function toggleColor(event) {
    // This function toggles the color of a cell
    let cell = event.target;
    let currentValue = parseInt(cell.getAttribute('data-value'));
    let newValue;

    if (!currentValue || currentValue === 0) {
        newValue = 1;
    } else {
        newValue = 0;
    }
    cell.setAttribute('data-value', newValue);
    cell.style.backgroundColor = COLOR_MAP[newValue];
    return newValue;
}

function getNextGeneration(matrix) {
    // This function creates the next generation of the matrix
    const nextMatrix = [];

    // Loop through the matrix and get the next generation
    matrix.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const nextValue = getNextCellValue(matrix, rowIndex, colIndex);
            if (!nextMatrix[rowIndex]) {
                nextMatrix[rowIndex] = [];
            }
            nextMatrix[rowIndex][colIndex] = nextValue;
        });
    });

    return nextMatrix;

}

function getNextCellValue(matrix, rowIndex, cellIndex) {
    // This function gets the next value for a cell
    const currentValue = matrix[rowIndex][cellIndex];
    const liveNeighbors = getLiveNeighbors(matrix, rowIndex, cellIndex);

    // If the current cell is alive
    if (currentValue) {
        if (liveNeighbors === 2 || liveNeighbors === 3) {
            return 1;
        } else {
            return 0;
        }
    } else {
        if (liveNeighbors === 3) {
            return 1;
        }
    }

    return 0;
}

function getLiveNeighbors(matrix, rowIndex, cellIndex) {
    // This function gets the number of live neighbors for a cell
    let liveNeighbors = 0;

    // Check the top row
    if (matrix[rowIndex - 1]) {
        if (matrix[rowIndex - 1][cellIndex - 1]) {
            liveNeighbors++;
        }
        if (matrix[rowIndex - 1][cellIndex]) {
            liveNeighbors++;
        }
        if (matrix[rowIndex - 1][cellIndex + 1]) {
            liveNeighbors++;
        }
    }

    // Check the middle row
    if (matrix[rowIndex][cellIndex - 1]) {
        liveNeighbors++;
    }
    if (matrix[rowIndex][cellIndex + 1]) {
        liveNeighbors++;
    }

    // Check the bottom row
    if (matrix[rowIndex + 1]) {
        if (matrix[rowIndex + 1][cellIndex - 1]) {
            liveNeighbors++;
        }
        if (matrix[rowIndex + 1][cellIndex]) {
            liveNeighbors++;
        }
        if (matrix[rowIndex + 1][cellIndex + 1]) {
            liveNeighbors++;
        }
    }

    return liveNeighbors;
}

function updateGrid(matrix) {
    // This function updates the HTML grid with the next generation
    const grid = document.getElementById('grid');
    const cells = grid.querySelectorAll('.cell');

    // Loop through the cells and update the values
    cells.forEach((cell) => {
        const row = parseInt(cell.getAttribute('data-row'));
        const col = parseInt(cell.getAttribute('data-col'));
        const value = matrix[row][col];

        cell.setAttribute('data-value', value);
        cell.style.backgroundColor = COLOR_MAP[value];
    });
}

function pressPlay() {
    // This function starts the game when a player presses the play button
    togglePlayBtn();
    clearInterval(intervalId);
    // your logic for updating the grid for the next iteration
    console.log(intervalTime)
    intervalId = setInterval(play, intervalTime);
    play();
}

function pressPause() {
    // This function pauses the game when a player presses the pause button
    togglePlayBtn();
    clearInterval(intervalId);
}

function play() {
    // This function plays one iteration of the game
    // Get the grid element and all of its cells
    const grid = document.getElementById('grid');
    const cells = grid.querySelectorAll('.cell');

    // Create a matrix to store the values of the cells
    const matrix = [];

    // Loop through the cells and store their values in the matrix
    cells.forEach((cell) => {
        const row = parseInt(cell.getAttribute('data-row'));
        const col = parseInt(cell.getAttribute('data-col'));
        const value = parseInt(cell.getAttribute('data-value'));

        if (!matrix[row]) {
            matrix[row] = [];
        }
        matrix[row][col] = value;
    });

    const nextMatrix = getNextGeneration(matrix);
    updateGrid(nextMatrix);
}

function togglePlayBtn() {
    // This function toggles the play button to a pause button and vice versa
    const playButton = document.getElementById('play-btn');
    const btnContent = playButton.children[0];
    if (btnContent.classList.contains('fa-play')) {
        btnContent.classList.remove('fa-play');
        btnContent.classList.add('fa-stop');
        playButton.setAttribute('onclick', 'pressPause()');
    } else {
        btnContent.classList.remove('fa-stop');
        btnContent.classList.add('fa-play');
        playButton.setAttribute('onclick', 'pressPlay()');
    }
}