let players = [];
let finished, loser, interval, dt, last, step, now;

function init() {
  players = [
    {
      player: 1,
      health: 3,
      dead: false
    },
    {
      player: 2,
      health: 3,
      dead: false
    }
  ];
  console.log(players);
  finished = false;

  dt = 0;
  last = Date.now();
  step = 1 / 60; //60fps

  document.getElementById("winner").innerHTML = "";
  document.getElementById("fight").disabled = false;
}
window.onload = init();

function frame() {
  now = Date.now();
  dt = dt + Math.min(1, (now - last) / 1000); //delta
  update(step);
  render(dt);
  last = now;
  requestAnimationFrame(frame);
}
//runs each frame
requestAnimationFrame(frame);

function update(step) {
  players.forEach(player => {
    if (player.health <= 0) {
      player.dead = true;
    }
  });
  // console.log(step);
}

function render(dt) {
  players.forEach(player => {
    if (player.dead) {
      document.getElementById("winner").innerHTML = `${whichPlayer(
        player
      )} has won!`;
      document.getElementById("fight").disabled = true;
    }
  });
  document.getElementById("playerOne").innerHTML = `Player 1 health: ${
    players[0].health
  }`;
  document.getElementById("playerTwo").innerHTML = `Player 2 health: ${
    players[1].health
  }`;
  // console.log(dt);
}

function whichPlayer(player) {
  if (player.player === 1) {
    return "Player 2";
  } else {
    return "Player 1";
  }
}

function handleClick() {
  doTurn();
  console.log(
    `Player 1 hp: ${players[0].health} \nPlayer 2 hp: ${players[1].health}`
  );
}

function doTurn() {
  if (Math.random() <= 0.5) {
    players[0].health--;
  } else {
    players[1].health--;
  }
}
