const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);

function arenaSweep() {

        const row = arena.splice(19, 1)[0].fill(0);
        arena.unshift(row);

}

function collide(arena, player) {
    const m = player.matrix;
    const o = player.pos;
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
               (arena[y + o.y] &&
                arena[y + o.y][x + o.x]) !== 0 || o.y == 10) {
                
                return true;
            }
        }
    }
    return false;
}

function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

function createPiece(type)
{
    //player.score += 1;
    if (type === 'I') {
        return [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ];
    } else if (type === 'L') {
        return [
            [0, 2, 0],
            [0, 2, 0],
            [0, 2, 2],
        ];
    } else if (type === 'U') {
        return [
            [3, 0, 3],
            [3, 0, 3],
            [3, 3, 3],
        ];
    } else if (type === 'O') {
        return [
            [4, 4],
            [4, 4],
        ];
    } else if (type === 'Z') {
        return [
            [5, 5, 0],
            [0, 5, 5],
            [0, 0, 0],
        ];
    } else if (type === 'N') {
        return [
            [6, 0, 0, 6],
            [6, 6, 0, 6],
            [6, 0, 6, 6],
            [6, 0, 0, 6],
        ];
    } else if (type === 'T') {
        return [
            [7, 7, 7],
            [0, 7, 0],
            [0, 7, 0],
        ];
    }
}

function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = colors[value];
                context.fillRect(x + offset.x,
                                 y + offset.y,
                                 1, 1);
            }
        });
    });
}

function draw() {
    context.fillStyle = '#222';
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawMatrix(arena, {x: 0, y: 0});
    drawMatrix(player.matrix, player.pos);
}
function restart(){
    player.score = 0;
    const pieces = 'ILUOZNT';
    if(player.score == 0){player.matrix = createPiece('N'); }
    else if(player.score == 1){player.matrix = createPiece('T'); }
    else if(player.score == 2){player.matrix = createPiece('U'); }
    else if(player.score == 3){player.matrix = createPiece('T'); }
    else {player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);}
    player.score += 1;
    updateScore();
    for (let i = 0;i<20;i++){
        arenaSweep();
    }
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);
}
function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                matrix[y][x],
                matrix[x][y],
            ];
        }
    }

    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

function playerDrop() {
    player.pos.y++;
    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        playerReset();
        arenaSweep();
        updateScore();
    }
    
}

function playerMove(offset) {
    player.pos.x += offset;
    if (collide(arena, player)) {
        player.pos.x -= offset;
    }
}

function playerReset() {
    const pieces = 'ILUOZNT';
    if(player.score == 0){player.matrix = createPiece('N'); }
    else if(player.score == 1){player.matrix = createPiece('T'); }
    else if(player.score == 2){player.matrix = createPiece('U'); }
    else if(player.score == 3){player.matrix = createPiece('T'); }
    else {player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);}
    player.score += 1;
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) -
                   (player.matrix[0].length / 2 | 0);
    if (collide(arena, player)) {
        arena.forEach(row => row.fill(0));
        player.score = 0;
        updateScore();
    }
}

function playerRotate(dir) {
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    while (collide(arena, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
            rotate(player.matrix, -dir);
            player.pos.x = pos;
            return;
        }
    }
}

let dropCounter = 0;
let dropcou = 0;
let dropInterval = 1000;
let lastTime = 0;
function update(time = 0) {
    const deltaTime = time - lastTime;
    dropcou += deltaTime;
    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
        dropCounter = 0;
    }
    if (dropcou > dropInterval ){
        dropcou = 0;
        arenaSweep();
    }

    lastTime = time;

    draw();
    requestAnimationFrame(update);
}

function updateScore() {
    document.getElementById('score').innerText = "score:" + player.score;
}


const colors = [
    'white',
    'blue',
    'fuchsia',
    'blueviolet',
    'yellow',
    'cyan',
    'green',
    'orange',
];

const arena = createMatrix(12, 20);

const player = {
    pos: {x: 0, y: 0},
    matrix: null,
    score: 0,
};
var a = 0;
function start(){
    if(a == 0){
        playerReset();
        updateScore();
        update();
        a = 1;
    }
}
updateScore();
update();