"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var readline_1 = require("readline");
function isValid(maze, visited, row, col) {
    return (row >= 0) && (row < maze.length) && (col >= 0) && (col < maze[0].length) && (maze[row][col] === ' ' && !visited[row][col]);
}
function bfs(maze, start, end) {
    var rowNum = [-1, 0, 0, 1];
    var colNum = [0, -1, 1, 0];
    var visited = Array.from({ length: maze.length }, function () { return Array(maze[0].length).fill(false); });
    visited[start.x][start.y] = true;
    var queue = [{ point: start, distance: 0 }];
    while (queue.length > 0) {
        var curr = queue.shift();
        var point = curr.point;
        if (point.x === end.x && point.y === end.y) {
            return curr.distance;
        }
        for (var i = 0; i < 4; i++) {
            var row = point.x + rowNum[i];
            var col = point.y + colNum[i];
            if (isValid(maze, visited, row, col)) {
                visited[row][col] = true;
                queue.push({ point: { x: row, y: col }, distance: curr.distance + 1 });
            }
        }
    }
    return -1; // Retourne -1 si aucun chemin n'est trouvé
}
function solveMaze(inputFilename, outputFilename) {
    var maze = [];
    var rl = (0, readline_1.createInterface)({
        input: fs.createReadStream(inputFilename),
        output: process.stdout,
        terminal: false
    });
    rl.on('line', function (line) {
        maze.push(line.split(''));
    });
    rl.on('close', function () {
        var start = { x: 0, y: 0 };
        var end = { x: maze.length - 1, y: maze[0].length - 1 };
        var result = bfs(maze, start, end);
        if (result !== -1) {
            fs.writeFileSync(outputFilename, "La longueur du chemin le plus court est : ".concat(result));
        }
        else {
            fs.writeFileSync(outputFilename, "Aucun chemin trouv\u00E9 dans le labyrinthe.");
        }
    });
}
// Appel de la fonction avec vos fichiers d'entrée et de sortie
solveMaze('maze.txt', 'output.txt');
