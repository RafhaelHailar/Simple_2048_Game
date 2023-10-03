const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.width = innerWidth * 0.4;
canvas.height = innerHeight * 0.8;

const grid_rows = 4;
const grid_columns = 4;

const padding = 15;

const width = (canvas.width - padding) / grid_rows - padding;
const height = (canvas.height - padding) / grid_columns - padding;

let number = 2;

const grid = [
    2,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,2
];



displayGrid();

function addNumber() {  
    const available_box = grid.map((_,index) => index).filter(index => grid[index] == 0);
    if (available_box.length == 0) {
        alert("No Box Available");
        return;
    }

    const index = Math.floor(Math.random() * available_box.length);
    grid[available_box[index]] = number;
}

function moveDownNumbers() {
    for (let y = grid_rows - 1;y >= 0;y--) {
        for (let x = 0;x < grid_columns;x++) {
            let index = (y * grid_rows) + x;
            if (grid[index] == 0) continue;
            let move_to;
            for (let iy = y + 1;iy < grid_rows;iy++) {
                let next = (iy * grid_rows) + x;
                if (grid[next] == grid[index]) {
                    move_to = next;
                    break;
                }
                if (grid[next] != 0) break;
                move_to = next;
            }

            if (move_to != undefined) {
                grid[move_to] += grid[index];
                grid[index] = 0;
            }
        }
    }
}

function moveLeftNumbers() {
    for (let x = 0;x < grid_columns;x++) {
        for (let y = 0;y < grid_rows;y++) {
            let index = (y * grid_rows) + x;
            if (grid[index] == 0) continue;
            let move_to;
            for (let ix = x - 1;ix >= 0;ix--) {
                let next = (y * grid_columns) + ix;
                if (grid[next] == grid[index]) {
                    move_to = next;
                    break;
                }
                if (grid[next] != 0) break;
                move_to = next;
            }

            if (move_to != undefined) {
                grid[move_to] += grid[index];
                grid[index] = 0;
            }
        }
    }
}

function moveUpNumbers() {
    for (let y = 0;y < grid_rows;y++) {
        for (let x = 0;x < grid_columns;x++) {
            let index = (y * grid_rows) + x;
            if (grid[index] == 0) continue;
            let move_to;
            for (let iy = y - 1;iy >= 0;iy--) {
                let next = (iy * grid_columns) + x;
                if (grid[next] == grid[index]) {
                    move_to = next;
                    break;
                }
                if (grid[next] != 0) break;
                move_to = next;
            }

            if (move_to != undefined) {
                grid[move_to] += grid[index];
                grid[index] = 0;
            }
        }
    }
}

function moveRightNumbers() {
    for (let x = grid_columns - 1;x >= 0;x--) {
        for (let y = 0;y < grid_rows;y++) {
            let index = (y * grid_rows) + x;
            if (grid[index] == 0) continue;
            let move_to;
            for (let ix = x + 1;ix < grid_columns;ix++) {
                let next = (y * grid_columns) + ix;
                if (grid[next] == grid[index]) {
                    move_to = next;
                    break;
                }
                if (grid[next] != 0) break;
                move_to = next;
            }

            if (move_to != undefined) {
                grid[move_to] += grid[index];
                grid[index] = 0;
            }
        }
    }
}

function displayGrid() {
    context.clearRect(0,0,canvas.width,canvas.height);
    context.fillStyle = "#0A5C36";
    context.fillRect(0,0,canvas.width,canvas.height);
    for (let i = 0;i < grid_rows * grid_columns;i++) {
        let x = padding + (i % grid_rows) * (width + padding);
        let y = padding + Math.floor(i / grid_rows) * (height + padding);

        if (grid[i] != 0) {
            context.fillStyle = `#21D375`;
            context.fillRect(x,y,width,height);
            context.fillStyle = "white";
            context.font = "30px monospace";
            context.fillText(grid[i],x + width / 2 - String(grid[i]).length * 5,y + height / 2 + 10);
        } else {
            context.fillStyle = `#14452F`;
            context.fillRect(x,y,width,height);
        }

    }    
}

window.addEventListener("keydown",function(event) {
    switch (event.key) {
        case "ArrowDown" :
                moveDownNumbers();
            break;
            case "ArrowLeft" :
                moveLeftNumbers();
            break;
            case "ArrowUp" :
                moveUpNumbers();
            break;
            case "ArrowRight" :
                moveRightNumbers();
            break;
    }
    addNumber();
    displayGrid();
});