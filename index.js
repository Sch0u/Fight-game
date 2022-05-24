const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 768;

ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "black";

let gameover = "<h1>Game Over</h1>" + '<button onclick="location.reload()">Restart</button>';

const gravity = 0.7;

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: "./assets/background/background.png",
})

const shop = new Sprite({
    position: {
        x: 650,
        y: 175,
    },
    imageSrc: "./assets/decorations/shop_anim.png",
    scale: 2.4,
    framesMax: 6
})

const player = new Fighter({
    position: {
        x: 100,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 0,
    },
    offset: {
        x: 0,
        y: 0,
    },
    color: "lightblue",
    scale: 2.5,
    sprites: {
      idle: {
          imageSrc: "./assets/character/Mac/Idle.png",
          framesMax: 8,
      },
      run: {
          imageSrc: "./assets/character/Mac/Run.png",
          framesMax: 8,
      },
      jump: {
          imageSrc: "./assets/character/Mac/Jump.png",
          framesMax: 2,
      },
      fall: {
          imageSrc: "./assets/character/Mac/Fall.png",
          framesMax: 2,
      },
      attack: {
          imageSrc: "./assets/character/Mac/Attack1.png",
          framesMax: 6,
      },
      death: {
          imageSrc: "./assets/character/Mac/Death.png",
          framesMax: 6,
      }
  }
});

const enemy = new Fighter({
    position: {
        x: 500,
        y: 100,
    },
    velocity: {
        x: 0,
        y: 0,
    },
    offset: {
        x: -50,
        y: 0,
    },
    color: 'blue',
    scale: 2.5,
    sprites: {
      idle: {
          imageSrc: "./assets/character/kenji/Idle.png",
          framesMax: 4,
      },
      run: {
        imageSrc: "./assets/character/kenji/Run.png",
        framesMax: 8,
      },
      jump: {
          imageSrc: "./assets/character/kenji/Jump.png",
          framesMax: 2,
      },
      fall: {
          imageSrc: "./assets/character/kenji/Fall.png",
          framesMax: 2,
      },
      attack: {
          imageSrc: "./assets/character/kenji/Attack1.png",
          framesMax: 4,
      },
      death: {
          imageSrc: "./assets/character/kenji/Death.png",
          framesMax: 7,
      }
    }
});

const keys = {
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    w: {
        pressed: false,
    },
    ArrowLeft: {
        pressed: false,
    },
    ArrowRight: {
        pressed: false,
    },
    ArrowUp: {
        pressed: false,
    },
};

let timer = 10;
decreaseTimer();
animate();

window.addEventListener("keydown", (event) => {
    console.log(event.key);
    switch (event.key) {
        //player keys
        case "d":
            keys.d.pressed = true;
            player.lastKey = "d";
            break;
        case "a":
            keys.a.pressed = true;
            player.lastKey = "a";
            break;
        case "w":
            player.velocity.y = -20;
            player.lastKey = "w";
            break;
        case " ":
            player.attack();
            break;

        // Enemy keys
        case "ArrowRight":
            keys.ArrowRight.pressed = true;
            enemy.lastKey = "ArrowRight";
            break;
        case "ArrowLeft":
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = "ArrowLeft";
            break;
        case "ArrowUp":
            enemy.velocity.y = -20;
            enemy.lastKey = "ArrowUp";
            break;
        case "ArrowDown":
            enemy.attack();
            break;
    }
});

window.addEventListener("keyup", (event) => {
    console.log(event.key);
    switch (event.key) {
        //player keys
        case "d":
            keys.d.pressed = false;
            break;
        case "a":
            keys.a.pressed = false;
            break;
        case "w":
            keys.w.pressed = false;
            break;
        case " ":
            player.isAttacking = false;
            break;

        // Enemy keys

        case "ArrowRight":
            keys.ArrowRight.pressed = false;
            break;
        case "ArrowLeft":
            keys.ArrowLeft.pressed = false;
            break;
        case "ArrowUp":
            keys.ArrowUp.pressed = false;
            break;
        case "ArrowDown":
            enemy.isAttacking = false;
            break;
    }
});