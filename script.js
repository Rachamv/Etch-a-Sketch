// DOM Elements
const container = document.getElementById("container");
const rowSlider = document.getElementById("rowRange");
const colSlider = document.getElementById("colRange");
const rowOutput = document.getElementById("rowOutput");
const colOutput = document.getElementById("colOutput");
const colorPicker = document.getElementById("color");
const isRandom = document.getElementById("random");
const resetButton = document.querySelector(".btn");
const hoverModeToggle = document.getElementById("hoverMode");

// Update the number display for sliders
rowSlider.addEventListener("input", () => {
    rowOutput.textContent = rowSlider.value;
    createGrid(rowSlider.value, colSlider.value);
});
colSlider.addEventListener("input", () => {
    colOutput.textContent = colSlider.value;
    createGrid(rowSlider.value, colSlider.value);
});

// Add event listener for hover mode toggle
hoverModeToggle.addEventListener("change", () => {
    createGrid(rowSlider.value, colSlider.value);
});

// Function to generate a random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to handle cell coloring
function colorCell(cell) {
    cell.style.backgroundColor = isRandom.checked ? getRandomColor() : colorPicker.value;
}

// Function to create the grid
function createGrid(rows, cols) {
    // Clear the container
    container.innerHTML = "";

    // Set the container's CSS grid properties
    container.style.display = "grid";
    container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    // Create grid cells
    for (let i = 0; i < rows * cols; i++) {
        const cell = document.createElement("div");
        cell.classList.add("colDiv");
        container.appendChild(cell);

        if (hoverModeToggle.checked) {
            // Hover mode: color on mouseover
            cell.addEventListener("mouseover", () => colorCell(cell));
        } else {
            // Click mode: only color when mouse is down
            let isDrawing = false;

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

        // Add touch events for mobile responsiveness
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

// Add mouseup event listener to window for click mode
window.addEventListener("mouseup", () => {
    isDrawing = false;
});

// Reset the grid with default values
resetButton.addEventListener("click", () => {
    rowSlider.value = 16;
    colSlider.value = 16;
    rowOutput.textContent = 16;
    colOutput.textContent = 16;
    colorPicker.value = "#ff0000";
    isRandom.checked = false;
    hoverModeToggle.checked = true;
    createGrid(16, 16);
});

// Initialize the grid
createGrid(16, 16);