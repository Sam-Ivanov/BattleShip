let boardSize = 10;
let numShips = 4;
let shipsLenght = 4;
let shipsKilled = 0;
let ships = [];

createBattleField(boardSize);
createShips();

window.addEventListener('click', function (e) {
    if (e.target.localName === 'td') {
        let areaId = e.target.id;
        for (let i = 0; i < numShips; i++) {
            for (let j = 0; j < shipsLenght; j++) {
                if (ships[i].locations[j].indexOf(areaId) >= 0 && ships[i].hits[j] === '') {
                    ships[i].hits[j] = 'hit';
                    document.getElementById(areaId).setAttribute('class', 'hit');
                    return;
                }
            }
        }
        document.getElementById(areaId).setAttribute('class', 'miss');
    }
})

//==================================================================================================

function createBattleField(fieldSize) {
    document.querySelector('.playing-board').appendChild(document.createElement('table'));
    for (let i = 0; i < fieldSize; i++) {
        document.querySelector('table').appendChild(document.createElement('tr'));
        for (let j = 0; j < fieldSize; j++) {
            document.querySelector('table > tr:last-child').appendChild(document.createElement('td'));
            document.querySelector('table > tr:last-child > td:last-child').setAttribute('id', i + '' + j);
            document.querySelector('tr:last-child >td:last-child').innerHTML = i + '' + j;
        }
    }
}

function createShips() {
    let loc_dir;
    let loc;
    let dir;
    for (let i = 0; i < numShips; i++) {
        ships.push({ locations: [], hits: [] });
        for (j = 0; j < shipsLenght; j++) {
            ships[i].locations.push('');
            ships[i].hits.push('');
        }
    }
    for (let i = 0; i < numShips; i++) {
        do {
            loc_dir = generateShipLocation();
            loc = loc_dir.location;
            dir = loc_dir.direction;
        } while (isCollision(loc, dir));
        ships[i].locations = loc;
    }
}

function generateShipLocation() {
    let direction = Math.floor(Math.random() * 2);
    let row, col;
    let location = [];
    row = Math.floor(Math.random() * (boardSize + 1 - shipsLenght));
    col = Math.floor(Math.random() * (boardSize + 1 - shipsLenght));
    if (direction === 0) {
        for (let i = 0; i < shipsLenght; i++) {
            location[i] = (row + i) + '' + col;
        }
    } else {
        for (let i = 0; i < shipsLenght; i++) {
            location[i] = row + '' + (col + i);
        }
    }
    return ({ location, direction });
}

function isCollision(location, localDir) {
    let locPlus;
    let locMin;
    for (let i = 0; i < numShips; i++) {
        for (let j = 0; j < shipsLenght; j++) {
            if (ships[i].locations.indexOf(location[j]) >= 0) {
                return true;
            } else if (localDir === 0) {
                locPlus = parseInt(location[j]) + 1;
                locMin = parseInt(location[j]) - 1;
                if (ships[i].locations.indexOf(locPlus.toString()) >= 0 || ships[i].locations.indexOf(locMin.toString()) >= 0) {
                    return true;
                }
            } else {
                locPlus = parseInt(location[j]) + 10;
                locMin = parseInt(location[j]) - 10;
                if (locMin < 10 && locMin > 0) {
                    locMin = '0' + locMin;
                }
                if (ships[i].locations.indexOf(locPlus.toString()) >= 0 || ships[i].locations.indexOf(locMin.toString()) >= 0) {
                    return true;
                }
            }
        }
    }
    return false;
}
