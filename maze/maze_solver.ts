import * as fs from 'fs';
import { createInterface } from 'readline';

interface Point {
    x: number;
    y: number;
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
        const visited: boolean[][] = Array.from({ length: maze.length }, () => Array(maze[0].length).fill(false));
        const parent: Point[][] = Array.from({ length: maze.length }, () => Array(maze[0].length).fill(null));
        const queue: Point[] = [start];

        while (queue.length > 0) {
            const point = queue.shift() as Point;
            if (point.x === end.x && point.y === end.y) {
                let pathPoint = end;
                while (pathPoint) {
                    maze[pathPoint.x][pathPoint.y] = '*';
                    pathPoint = parent[pathPoint.x][pathPoint.y];
                }
                fs.writeFileSync(outputFilename, maze.map(row => row.join('')).join('\n'));
                console.log('Path found and written to ' + outputFilename);
                return;
            }

            const directions: Point[] = [{ x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }];
            for (const direction of directions) {
                const newX = point.x + direction.x;
                const newY = point.y + direction.y;
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