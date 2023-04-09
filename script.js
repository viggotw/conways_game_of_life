let painting = false;
let paintColor = "black";

window.addEventListener('load', function () {
    let defaultSize = 10; // set your default grid size here
    document.getElementById("size").value = defaultSize;
    createGrid();
});

function createGrid() {
    let size = document.getElementById("size").value;
    let grid = document.getElementById("grid");
    grid.innerHTML = "";
    grid.style.setProperty('--size', size); 
    for (let i = 0; i < size; i++) {
        let row = document.createElement("div");
        for (let j = 0; j < size; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("data-row", i);
            cell.setAttribute("data-col", j);
            // cell.addEventListener("click", toggleColor);
            cell.addEventListener("mousedown", startPainting);
            cell.addEventListener("mouseup", stopPainting);
            // cell.addEventListener("mouseover", applyPainting);
            row.appendChild(cell);
        }
        grid.appendChild(row);  
    }
    grid.addEventListener("mouseover", applyPainting);
}

function startPainting(event) {
    console.log("start painting");
    let cell = event.target;
    painting = true;
    toggleColor(event);
    paintColor = cell.style.backgroundColor;
    console.log(painting);
    console.log(paintColor);
    event.target.removeEventListener("mouseover", applyPainting);
}

function stopPainting() {
    console.log("stop painting");
    console.log(painting);
    console.log(paintColor);
    painting = false;
    event.target.addEventListener("mouseover", applyPainting);
}

function applyPainting(event) {
    let cell = event.target;
    if (painting && cell.classList.contains("cell")) {
        console.log("apply painting");
        console.log(painting);
        console.log(paintColor);
        cell.style.backgroundColor = paintColor;
    }
}

function toggleColor(event) {
    let cell = event.target;
    let currentColor = cell.style.backgroundColor;
    if (!currentColor || currentColor === "white") {
        cell.style.backgroundColor = "black";
    } else {
        cell.style.backgroundColor = "white";
    }
}