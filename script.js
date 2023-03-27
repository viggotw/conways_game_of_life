window.addEventListener('load', function () {
    var defaultSize = 5; // set your default grid size here
    document.getElementById("size").value = defaultSize;
    createGrid();
});

function createGrid() {
    var size = document.getElementById("size").value;
    var grid = document.getElementById("grid");
    grid.innerHTML = "";
    for (var i = 0; i < size; i++) {
        var row = document.createElement("tr");
        for (var j = 0; j < size; j++) {
            var cell = document.createElement("td");
            cell.setAttribute("data-row", i);
            cell.setAttribute("data-col", j);
            cell.addEventListener("click", toggleColor);
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
}

function toggleColor(event) {
    var cell = event.target;
    var currentColor = cell.style.backgroundColor;
    if (!currentColor || currentColor === "white") {
        cell.style.backgroundColor = "black";
    } else {
        cell.style.backgroundColor = "white";
    }
}
