// DOM Elements
const container = document.getElementById("container");
const rowSlider = document.getElementById("rowRange");
const colSlider = document.getElementById("colRange");
const rowOutput = document.getElementById("rowOutput");
const colOutput = document.getElementById("colOutput");
const colorPicker = document.getElementById("color");
const hoverModeToggle = document.getElementById("hoverMode");
const gridLinesToggle = document.getElementById("gridLines");
const brushSizeSlider = document.getElementById("brushSize");
const brushOutput = document.getElementById("brushOutput");
const resetButton = document.querySelector(".btn.reset");
const clearButton = document.querySelector(".btn.clear");
const drawModeInputs = document.querySelectorAll('input[name="drawMode"]');

// State
let isDrawing = false;
let currentHue = 0;

// Update displays for sliders
rowSlider.addEventListener("input", () => {
    rowOutput.textContent = rowSlider.value;
    createGrid(rowSlider.value, colSlider.value);
});

colSlider.addEventListener("input", () => {
    colOutput.textContent = colSlider.value;
    createGrid(rowSlider.value, colSlider.value);
});

brushSizeSlider.addEventListener("input", () => {
    brushOutput.textContent = brushSizeSlider.value;
});

// Toggle grid lines
gridLinesToggle.addEventListener("change", () => {
    container.classList.toggle("no-grid", !gridLinesToggle.checked);
});

// Event listeners for mode changes
hoverModeToggle.addEventListener("change", () => {
    createGrid(rowSlider.value, colSlider.value);
});

// Function to get current draw mode
function getDrawMode() {
    return document.querySelector('input[name="drawMode"]:checked').value;
}

// Function to get rainbow color
function getRainbowColor() {
    currentHue = (currentHue + 2) % 360;
    return `hsl(${currentHue}, 100%, 50%)`;
}

// Function to get cells in brush size range
function getCellsInRange(centerCell, size) {
    const cells = [];
    const centerIndex = Array.from(container.children).indexOf(centerCell);
    const cols = parseInt(colSlider.value);
    const radius = Math.floor(size / 2);

    for (let r = -radius; r <= radius; r++) {
        for (let c = -radius; c <= radius; c++) {
            const targetIndex = centerIndex + (r * cols) + c;
            const targetCell = container.children[targetIndex];

            // Check if cell exists and is in the same row
            if (targetCell &&
                Math.floor(centerIndex / cols) === Math.floor(targetIndex / cols) + r) {
                cells.push(targetCell);
            }
        }
    }
    return cells;
}

// Function to handle cell coloring
function colorCell(cell) {
    const mode = getDrawMode();
    const color = mode === 'rainbow' ? getRainbowColor() :
                 mode === 'eraser' ? 'white' :
                 colorPicker.value;

    const brushSize = parseInt(brushSizeSlider.value);
    const cellsToColor = getCellsInRange(cell, brushSize);

    cellsToColor.forEach(targetCell => {
        targetCell.style.backgroundColor = color;
    });
}

// Function to create the grid
function createGrid(rows, cols) {
    container.innerHTML = "";
    container.style.display = "grid";
    container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    for (let i = 0; i < rows * cols; i++) {
        const cell = document.createElement("div");
        cell.classList.add("colDiv");
        container.appendChild(cell);

        if (hoverModeToggle.checked) {
            cell.addEventListener("mouseover", () => colorCell(cell));
        } else {
            cell.addEventListener("mousedown", (e) => {
                e.preventDefault();
                isDrawing = true;
                colorCell(cell);
            });

            cell.addEventListener("mouseover", () => {
                if (isDrawing) {
                    colorCell(cell);
                }
            });
        }

        // Touch events for mobile
        cell.addEventListener("touchstart", (e) => {
            e.preventDefault();
            colorCell(cell);
        });

        cell.addEventListener("touchmove", (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const cellsUnderTouch = document.elementsFromPoint(touch.clientX, touch.clientY);
            cellsUnderTouch.forEach(element => {
                if (element.classList.contains('colDiv')) {
                    colorCell(element);
                }
            });
        });
    }
}

// Window event listeners
window.addEventListener("mouseup", () => {
    isDrawing = false;
});

// Reset and Clear buttons
resetButton.addEventListener("click", () => {
    rowSlider.value = 16;
    colSlider.value = 16;
    rowOutput.textContent = 16;
    colOutput.textContent = 16;
    brushSizeSlider.value = 1;
    brushOutput.textContent = 1;
    colorPicker.value = "#ff0000";
    hoverModeToggle.checked = true;
    gridLinesToggle.checked = true;
    container.classList.remove("no-grid");
    document.querySelector('input[value="normal"]').checked = true;
    createGrid(16, 16);
});

clearButton.addEventListener("click", () => {
    Array.from(container.children).forEach(cell => {
        cell.style.backgroundColor = "white";
    });
});

// Initialize the grid
createGrid(16, 16);