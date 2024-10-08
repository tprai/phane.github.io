//login and get player info
var email = localStorage.getItem('email');
var password = localStorage.getItem('password');
var user;
firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    user = userCredential.user;
    console.log('User signed in:', user);
    localStorage.setItem('userInfo', user);
  if (user.displayName == null){
    holderDislpayName = prompt("Enter a display name");
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(result) {
    return result.user.updateProfile({
    displayName: holderDislpayName
    })
    }).catch(function(error) {
    console.log("eerrrrrorrr");
    });
  }
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert('Incorrect Credentials');
    console.log('Error signing in:', errorCode, errorMessage);
  });

//setting up canvas and stuff
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var playerposx = 0;
var playerposy = 0;
var tileset_meadow = document.getElementById("tileset_meadow_id");
var tileset_flatland = document.getElementById("tileset_flatland_id");
var TILESET = tileset_meadow
var map = "\
gggggggggggggggg\
gggqwwwwwwegqwwb\
ggqntsrxysdgatdg\
ggahstvwnhvwnhcg";
var maptop = "\
                \
              r \
                \
                ";
var mapUnderground = "\
qqqqqqqq\
wwqqqqqq\
wwwqqqee\
wwqqqeee\
qqqeeeee\
eeeeeeee"
  
function printTile(xtile, ytile, printx, printy) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext("2d");
  ctx.drawImage(TILESET, xtile * 64, ytile * 64, 64, 64, printx * (canvas.width / 16) - playerposx, printy * (canvas.height / 10) - playerposy, canvas.width / 16, canvas.height / 10);
}

function getTile(tile, j, i) {
  const tileMap = {
    'q': [0, 0], 'w': [1, 0], 'e': [2, 0], 'r': [3, 0], 't': [4, 0], 'y': [5, 0],
    'a': [0, 1], 's': [1, 1], 'd': [2, 1], 'f': [3, 1], 'g': [4, 1], 'h': [5, 1],
    'z': [0, 2], 'x': [1, 2], 'c': [2, 2], 'v': [3, 2], 'b': [4, 2], 'n': [5, 2]
  };

  if (tile in tileMap) {
    const [x, y] = tileMap[tile];
    printTile(x, y, j, i);
  }
}

function printMap() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext("2d");
  ctx.drawImage(TILESET, 64, 64, 64, 64, 0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 16; j++) {
      let tile = map[i * 16 + j];
      getTile(tile, j, i, TILESET);
    }
  }

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 16; j++) {
      let tile = maptop[i * 16 + j];
      if (tile.trim()) { // Ensure we handle non-empty tiles
        getTile(tile, j, i, TILESET);
      }
    }
  }
}
window.onload = function() {
  var key_w = 87;
  var key_a = 65;
  var key_s = 83;
  var key_d = 68;

  window.onkeydown = function(gfg) {
    if (gfg.keyCode === key_w) {
      playerposy = playerposy - 16;
    };
    if (gfg.keyCode === key_s) {
      playerposy = playerposy + 16;
    };
    if (gfg.keyCode === key_a) {
      playerposx = playerposx - 16;
    };
    if (gfg.keyCode === key_d) {
      playerposx = playerposx + 16;
    };
    writeData(playerposx, user.displayName+"/x/")
    writeData(playerposy, user.displayName+"/y/")
    printMap()
  };
};
