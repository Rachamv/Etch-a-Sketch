// Function to create a grid dynamically
function createGrid(size) {
    const container = document.querySelector(".container");
    container.innerHTML = ""; // Clear the container

    for (let i = 0; i < size; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        row.style.display = "flex";

        for (let j = 0; j < size; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.style.flex = "1";
            cell.style.border = "1px solid black";
            cell.style.backgroundColor = "white";
            row.appendChild(cell);
        }

        container.appendChild(row);
    }
}

// Function to apply hover effect on grid cells
function applyHoverEffect() {
    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => {
        cell.addEventListener("mouseover", () => {
            cell.style.backgroundColor = "black";
        });
    });
}

// Function to get a random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to apply random color effect
function applyRandomColorEffect() {
    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => {
        cell.addEventListener("mouseover", () => {
            cell.style.backgroundColor = getRandomColor();
        });
    });
}

// Event listener for resizing the grid
const resizeButton = document.querySelector("#resize");
resizeButton.addEventListener("click", () => {
    let gridSize = parseInt(prompt("Enter grid size (between 2 and 100):"));

    if (gridSize >= 2 && gridSize <= 100) {
        createGrid(gridSize);
        applyHoverEffect();
    } else {
        alert("Please enter a valid number between 2 and 100.");
    }
});

// Initial grid setup
createGrid(16);
applyHoverEffect();
