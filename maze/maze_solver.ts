import * as fs from 'fs';
import { createInterface } from 'readline';

interface Point {
    x: number;
    y: number;
}

interface QueueNode {
    point: Point;
    distance: number;
}

function isValid(maze: string[][], visited: boolean[][], row: number, col: number): boolean {
    return (row >= 0) && (row < maze.length) && (col >= 0) && (col < maze[0].length) && (maze[row][col] === ' ' && !visited[row][col]);
}

function bfs(maze: string[][], start: Point, end: Point): number {
    const rowNum = [-1, 0, 0, 1];
    const colNum = [0, -1, 1, 0];

    const visited: boolean[][] = Array.from({ length: maze.length }, () => Array(maze[0].length).fill(false));
    visited[start.x][start.y] = true;

    const queue: QueueNode[] = [{ point: start, distance: 0 }];

    while (queue.length > 0) {
        const curr = queue.shift();

        const point = curr.point;
        if (point.x === end.x && point.y === end.y) {
            return curr.distance;
        }

        for (let i = 0; i < 4; i++) {
            const row = point.x + rowNum[i];
            const col = point.y + colNum[i];

            if (isValid(maze, visited, row, col)) {
                visited[row][col] = true;
                queue.push({ point: { x: row, y: col }, distance: curr.distance + 1 });
            }
        }
    }

    return -1; // Retourne -1 si aucun chemin n'est trouvé
}

function solveMaze(inputFilename: string, outputFilename: string): void {
    const maze: string[][] = [];
    const rl = createInterface({
        input: fs.createReadStream(inputFilename),
        output: process.stdout,
        terminal: false
    });

    rl.on('line', (line) => {
        maze.push(line.split(''));
    });

    rl.on('close', () => {
        const start = { x: 0, y: 0 };
        const end = { x: maze.length - 1, y: maze[0].length - 1 };
        const result = bfs(maze, start, end);
        if (result !== -1) {
            fs.writeFileSync(outputFilename, `La longueur du chemin le plus court est : ${result}`);
        } else {
            fs.writeFileSync(outputFilename, `Aucun chemin trouvé dans le labyrinthe.`);
        }
    });
}

// Appel de la fonction avec vos fichiers d'entrée et de sortie
solveMaze('maze.txt', 'output.txt');
