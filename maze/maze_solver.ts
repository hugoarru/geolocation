import * as fs from "fs";

interface Point {
  x: number;
  y: number;
}

function solveMaze(inputFilename: string, outputFilename: string): void {
  const fileContent = fs.readFileSync(inputFilename, { encoding: "utf8" });
  let maze: string[][] = fileContent
    .split("\n")
    .map((line) => line.split(""))
    .slice(0, -1);
  const start = { x: 0, y: 0 };
  const end = { y: maze.length - 1, x: maze[0].length - 1 };

  maze[start.y][start.x] = (0).toString();

  let distance = 0;
  let outputFound = false;
  do {
    const currentPosition = { x: 0, y: 0 };
    for (
      currentPosition.y = 0;
      currentPosition.y < maze.length;
      currentPosition.y++
    ) {
      for (
        currentPosition.x = 0;
        currentPosition.x < maze[currentPosition.y].length;
        currentPosition.x++
      ) {
        if (
          maze[currentPosition.y][currentPosition.x] ===
          (distance - 1).toString()
        ) {
          if (
            currentPosition.y === end.y &&
            currentPosition.x === end.x &&
            maze[currentPosition.y]?.[currentPosition.x] !== "."
          ) {
            outputFound = true;
          } else {
            checkNeighbor(maze, currentPosition, distance);
          }
        }
      }
    }
    distance = distance + 1;
  } while (!outputFound && distance < 1000);

  traceBack(maze, end, distance - 1, start);

  maze = maze.map((line) => {
    return line.map((char) => (parseInt(char) ? "." : char));
  });
  const outputMaze = maze.map((line) => line.join("")).join("\n");
  console.log(outputMaze);
  fs.writeFileSync(outputFilename, outputMaze, { encoding: "utf8" });
}

function traceBack(
  maze: string[][],
  end: Point,
  distance: number,
  start,
): void {
  let currentPos = { x: end.x, y: end.y };
  while (distance > 0) {
    [
      [0, -1],
      [-1, 0],
      [1, 0],
      [0, 1],
    ].forEach(([dx, dy]) => {
      const newX = currentPos.x + dx,
        newY = currentPos.y + dy;
      if (maze[newY]?.[newX] === distance.toString()) {
        maze[newY][newX] = "X"; // Marking the path
        currentPos = { x: newX, y: newY };
      }
    });
    distance -= 1;
  }
  console.log(end);
  maze[end.y][end.x] = "E"; // Mark the end
  maze[start.y][start.x] = "S"; // Mark the start
}

solveMaze("maze.txt", "solution.txt");

function checkNeighbor(maze: string[][], position: Point, distance: number) {
  if (maze[position.y - 1]?.[position.x] === ".") {
    maze[position.y - 1][position.x] = (distance + 1).toString();
  }
  if (maze[position.y][position.x - 1] === ".") {
    maze[position.y][position.x - 1] = (distance + 1).toString();
  }
  if (maze[position.y + 1]?.[position.x] === ".") {
    maze[position.y + 1][position.x] = (distance + 1).toString();
  }
  if (maze[position.y][position.x + 1] === ".") {
    maze[position.y][position.x + 1] = (distance + 1).toString();
  }
}
