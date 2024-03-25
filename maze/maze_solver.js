"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var readline_1 = require("readline");
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
        var visited = Array.from({ length: maze.length }, function () { return Array(maze[0].length).fill(false); });
        var parent = Array.from({ length: maze.length }, function () { return Array(maze[0].length).fill(null); });
        var queue = [start];
        while (queue.length > 0) {
            var point = queue.shift();
            if (point.x === end.x && point.y === end.y) {
                var pathPoint = end;
                while (pathPoint) {
                    maze[pathPoint.x][pathPoint.y] = '*';
                    pathPoint = parent[pathPoint.x][pathPoint.y];
                }
                fs.writeFileSync(outputFilename, maze.map(function (row) { return row.join(''); }).join('\n'));
                console.log('Path found and written to ' + outputFilename);
                return;
            }
            var directions = [{ x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }];
            for (var _i = 0, directions_1 = directions; _i < directions_1.length; _i++) {
                var direction = directions_1[_i];
                var newX = point.x + direction.x;
                var newY = point.y + direction.y;
                if (newX >= 0 && newY >= 0 && newX < maze.length && newY < maze[0].length && maze[newX][newY] === ' ' && !visited[newX][newY]) {
                    queue.push({ x: newX, y: newY });
                    visited[newX][newY] = true;
                    parent[newX][newY] = point;
                }
            }
        }
        console.log('No path found');
    });
}
solveMaze('maze.txt', 'solution.txt');
