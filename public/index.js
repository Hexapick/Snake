let brd = new Array(20).fill(0);
let tick = 0;
let dir = "Down";
let pastDir = "Right";
let GameStarted = false;
let FruitExists = false;
let Fruit;
let FruitCords = [];
let FruitEaten = false;
const StartingSnake = [
  [4, 4],
  [4, 5],
  [4, 6],
  [4, 7],
  [4, 8],
];

var snake = [...StartingSnake];
brd = brd.map((obj) => {
  return new Array(20).fill(0);
});

console.log(brd);
const board = document.querySelector("#board");
function CheckLose() {
  const tempSnake = snake;
  let SortedSet = [...tempSnake].sort(([a, b], [c, d]) => c - a || b - d);
  SortedSet.forEach((obj, i) => {
    if (arraysEqual(obj, SortedSet[LoopAround(i - 1, SortedSet.length)])) {
      console.log(obj, SortedSet[LoopAround(i - 1, SortedSet.length)]);
      snake = [...StartingSnake];
      dir = "Down";
      pastDir = "Right";
    } else {
    }
  });
}
function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
function LoopAround(x, l) {
  let newx = x;
  while (newx < 0) {
    newx += l;
  }
  return newx % l;
}
function Refresh() {
  board.innerHTML = "";
  brd = new Array(20).fill(0);
  brd = brd.map((obj) => {
    return new Array(20).fill(0);
  });
  if (!FruitExists) {
    FruitCords = [
      Math.floor(Math.random() * 20),
      Math.floor(Math.random() * 20),
    ];
    FruitExists = true;
  } else {
    brd[FruitCords[1]][FruitCords[0]] = 2;
  }
  snake.forEach((cords, index) => {
    brd[cords[1]][cords[0]] = 1;
  });

  brd.forEach((arr, i) => {
    let htmlArr = document.createElement("div");
    htmlArr.className = "row";
    arr.forEach((arr, j) => {
      const element = document.createElement("div");
      element.className = "element";
      if (arr === 1) {
        element.className = "element test";
      } else if (arr === 2) {
        element.className = "element food";
      } else {
        element.className = "element";
      }
      htmlArr.appendChild(element);
    });
    board.appendChild(htmlArr);
  });
}

document.addEventListener("keydown", (e) => {
  pastDir = dir;
  switch (e.key) {
    case "ArrowDown":
      dir = "Down";
      break;
    case "ArrowLeft":
      dir = "Left";
      break;
    case "ArrowUp":
      dir = "Up";
      break;
    case "ArrowRight":
      dir = "Right";
      break;
    default:
      break;
  }
});
function Movement() {
  const lastItem = snake[snake.length - 1];
  const ly = lastItem[0];
  const lx = lastItem[1];
  const firstItem = snake[0];
  const fy = firstItem[0];
  const fx = firstItem[1];
  if (
    (dir === "Left" && pastDir === "Right") ||
    (dir === "Right" && pastDir === "Left") ||
    (dir === "Up" && pastDir=== "Down")     ||
    (dir === "Down" && pastDir=== "Up")
  ) {
    dir = pastDir;
  }
  switch (dir) {
    case "Down":
      snake.unshift([LoopAround(fy + 1, 20), fx]);
      snake.pop();
      if (FruitEaten) {
        snake.push([LoopAround(fy + 2, 20), fx]);
        FruitExists = false;
        FruitEaten = false;
      }
      break;
    case "Up":
      snake.unshift([LoopAround(fy - 1, 20), fx]);
      snake.pop();
      if (FruitEaten) {
        snake.push([LoopAround(fy - 2, 20), fx]);
        FruitExists = false;
        FruitEaten = false;
      }
      break;
    case "Left":
      snake.unshift([fy, LoopAround(fx - 1, 20)]);
      snake.pop();
      if (FruitEaten) {
        snake.push([fy, LoopAround(fx - 2, 20)]);
        FruitExists = false;
        FruitEaten = false;
      }
      break;
    case "Right":
      snake.unshift([fy, LoopAround(fx + 1, 20)]);
      if (FruitEaten) {
        snake.push([fy, LoopAround(fx + 2, 20)]);
        FruitExists = false;
        FruitEaten = false;
      }
      snake.pop();
      break;
    default:
      break;
  }

  if (arraysEqual(snake[0], FruitCords)) {
    console.log(23);
    FruitEaten = true;
  }
}
setInterval(() => {
  Movement();
  CheckLose();
  Refresh();
}, 100);
