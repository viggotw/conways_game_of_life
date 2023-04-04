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
    for (let i = 0; i < size; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < size; j++) {
            let cell = document.createElement("td");
            cell.setAttribute("data-row", i);
            cell.setAttribute("data-col", j);
            cell.classList.add("cell");
            cell.addEventListener("click", toggleColor);
            cell.addEventListener("mousedown", startPainting);
            cell.addEventListener("mouseup", stopPainting);
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }

    // Add event listener to the document object for the "mousemove" event
    document.addEventListener("mousemove", function (event) {
        // Check if the "painting" flag is set
        if (painting) {
            // Get the cell that the mouse is currently over
            const target = event.target;
            // Check if the cell is a grid cell (i.e., has the "cell" class)
            if (target.classList.contains("cell")) {
                console.log("mousemove+painting+cell")
                // Set the background color of the cell to the stored color
                target.style.backgroundColor = paintColor;
            }
        }
    });
}

function startPainting(event) {
    painting = true;
    paintColor = cell.style.backgroundColor;
    toggleColor(event);
}

function stopPainting() {
    painting = false;
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