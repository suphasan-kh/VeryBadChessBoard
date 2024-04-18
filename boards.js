const w = window.innerWidth;
const h = window.innerHeight;
const size = Math.min(h,w);
const realsize = Math.floor(size*0.1);
document.documentElement.style.setProperty("--getsize", `${realsize}px`);
document.documentElement.style.setProperty("--getfont", `${realsize/4}px`);

let latestPiece = null;
let selectedPiece = null;
let selectedCell = null;
let canCapture = true;
let clicked = false;

let startState = [
'r','n','b','q','k','b','n','r',
'p','p','p','p','p','p','p','p',
'-','-','-','-','-','-','-','-',
'-','-','-','-','-','-','-','-',
'-','-','-','-','-','-','-','-',
'-','-','-','-','-','-','-','-',
'P','P','P','P','P','P','P','P',
'R','N','B','Q','K','B','N','R'];

const pos_dictp1 = {
"a8":1, "b8":2, "c8":3, "d8":4, "e8":5, "f8":6, "g8":7, "h8":8,
"a7":9, "b7":10, "c7":11, "d7":12, "e7":13, "f7":14, "g7":15, "h7":16,
"a6":17, "b6":18, "c6":19, "d6":20, "e6":21, "f6":22, "g6":23, "h6":24,
"a5":25, "b5":26, "c5":27, "d5":28, "e5":29, "f5":30, "g5":31, "h5":32,
"a4":33, "b4":34, "c4":35, "d4":36, "e4":37, "f4":38, "g4":39, "h4":40,
"a3":41, "b3":42, "c3":43, "d3":44, "e3":45, "f3":46, "g3":47, "h3":48,
"a2":49, "b2":50, "c2":51, "d2":52, "e2":53, "f2":54, "g2":55, "h2":56,
"a1":57, "b1":58, "c1":59, "d1":60, "e1":61, "f1":62, "g1":63, "h1":64};

const pos_dict = {
"a8":0, "b8":1, "c8":2, "d8":3, "e8":4, "f8":5, "g8":6, "h8":7,
"a7":8, "b7":9, "c7":10, "d7":11, "e7":12, "f7":13, "g7":14, "h7":15,
"a6":16, "b6":17, "c6":18, "d6":19, "e6":20, "f6":21, "g6":22, "h6":23,
"a5":24, "b5":25, "c5":26, "d5":27, "e5":28, "f5":29, "g5":30, "h5":31,
"a4":32, "b4":33, "c4":34, "d4":35, "e4":36, "f4":37, "g4":38, "h4":39,
"a3":40, "b3":41, "c3":42, "d3":43, "e3":44, "f3":45, "g3":46, "h3":47,
"a2":48, "b2":49, "c2":50, "d2":51, "e2":52, "f2":53, "g2":54, "h2":55,
"a1":56, "b1":57, "c1":58, "d1":59, "e1":60, "f1":61, "g1":62, "h1":63};

const pos_arr = [
"a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8",
"a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7",
"a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6",
"a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5",
"a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4",
"a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3",
"a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2",
"a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"];

const kw = `<img class="piece K w" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Chess_klt45.svg/1920px-Chess_klt45.svg.png">`;
const kb = `<img class="piece K b" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chess_kdt45.svg/1920px-Chess_kdt45.svg.png">`;
const qw = `<img class="piece Q w" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Chess_qlt45.svg/1920px-Chess_qlt45.svg.png">`;
const qb = `<img class="piece Q b" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Chess_qdt45.svg/1920px-Chess_qdt45.svg.png">`;
const rw = `<img class="piece R w" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Chess_rlt45.svg/1920px-Chess_rlt45.svg.png">`;
const rb = `<img class="piece R b" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/1920px-Chess_rdt45.svg.png">`;
const bw = `<img class="piece B w" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chess_blt45.svg/1920px-Chess_blt45.svg.png">`;
const bb = `<img class="piece B b" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Chess_bdt45.svg/1920px-Chess_bdt45.svg.png">`;
const nw = `<img class="piece N w" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chess_nlt45.svg/1920px-Chess_nlt45.svg.png">`;
const nb = `<img class="piece N b" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Chess_ndt45.svg/1920px-Chess_ndt45.svg.png">`;
const pw = `<img class="piece P w" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/1920px-Chess_plt45.svg.png">`;
const pb = `<img class="piece P b" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/1920px-Chess_pdt45.svg.png">`;


function getWhiteBoard() {
    const board = document.getElementById("getBoard");
    board.innerHTML = `
    <text class="inlight" style="top:${realsize/20}px; left:${realsize/15}px">8</text>
    <text class="indark" style="top:${realsize + realsize/20}px; left:${realsize/15}px">7</text>
    <text class="inlight" style="top:${2*realsize + realsize/20}px; left:${realsize/15}px">6</text>
    <text class="indark" style="top:${3*realsize + realsize/20}px; left:${realsize/15}px">5</text>
    <text class="inlight" style="top:${4*realsize + realsize/20}px; left:${realsize/15}px">4</text>
    <text class="indark" style="top:${5*realsize + realsize/20}px; left:${realsize/15}px">3</text>
    <text class="inlight" style="top:${6*realsize + realsize/20}px; left:${realsize/15}px">2</text>
    <text class="indark" style="top:${7*realsize + realsize/20}px; left:${realsize/15}px">1</text>

    <text class="indark" style="top:${8*realsize - realsize/20 - realsize/4}px; left:${realsize - realsize/5}px">a</text>
    <text class="inlight" style="top:${8*realsize - realsize/20 - realsize/4}px; left:${2*realsize - realsize/5}px">b</text>
    <text class="indark" style="top:${8*realsize - realsize/20 - realsize/4}px; left:${3*realsize - realsize/5}px">c</text>
    <text class="inlight" style="top:${8*realsize - realsize/20 - realsize/4}px; left:${4*realsize - realsize/5}px">d</text>
    <text class="indark" style="top:${8*realsize - realsize/20 - realsize/4}px; left:${5*realsize - realsize/5}px">e</text>
    <text class="inlight" style="top:${8*realsize - realsize/20 - realsize/4}px; left:${6*realsize - realsize/5}px">f</text>
    <text class="indark" style="top:${8*realsize - realsize/20 - realsize/4}px; left:${7*realsize - realsize/5}px">g</text>
    <text class="inlight" style="top:${8*realsize - realsize/20 - realsize/4}px; left:${8*realsize - realsize/5}px">h</text>

    <table id="board" cellspacing="0" cellpadding="0" width="${realsize*8}px">
        <tr height="${realsize}px">
            <td class="light" id="a8"> ${rb} </td>
            <td class="dark" id="b8"> ${nb} </td>
            <td class="light" id="c8"> ${bb} </td>
            <td class="dark" id="d8"> ${qb} </td>
            <td class="light" id="e8"> ${kb} </td>
            <td class="dark" id="f8"> ${bb} </td>
            <td class="light" id="g8"> ${nb} </td>
            <td class="dark" id="h8"> ${rb} </td>
        </tr>
        <tr height="${realsize}px">
            <td class="dark" id="a7"> ${pb} </td>
            <td class="light" id="b7"> ${pb} </td>
            <td class="dark" id="c7"> ${pb} </td>
            <td class="light" id="d7"> ${pb} </td>
            <td class="dark" id="e7"> ${pb} </td>
            <td class="light" id="f7"> ${pb} </td>
            <td class="dark" id="g7"> ${pb} </td>
            <td class="light" id="h7"> ${pb} </td>
        </tr>
        <tr height="${realsize}px">
            <td class="light" id="a6">  </td>
            <td class="dark" id="b6">  </td>
            <td class="light" id="c6">  </td>
            <td class="dark" id="d6">  </td>
            <td class="light" id="e6">  </td>
            <td class="dark" id="f6">  </td>
            <td class="light" id="g6">  </td>
            <td class="dark" id="h6">  </td>
        </tr>
        <tr height="${realsize}px">
            <td class="dark" id="a5">  </td>
            <td class="light" id="b5">  </td>
            <td class="dark" id="c5">  </td>
            <td class="light" id="d5">  </td>
            <td class="dark" id="e5">  </td>
            <td class="light" id="f5">  </td>
            <td class="dark" id="g5">  </td>
            <td class="light" id="h5">  </td>
        </tr>
        <tr height="${realsize}px">
            <td class="light" id="a4">  </td>
            <td class="dark" id="b4">  </td>
            <td class="light" id="c4">  </td>
            <td class="dark" id="d4">  </td>
            <td class="light" id="e4">  </td>
            <td class="dark" id="f4">  </td>
            <td class="light" id="g4">  </td>
            <td class="dark" id="h4">  </td>
        </tr>
        <tr height="${realsize}px">
            <td class="dark" id="a3">  </td>
            <td class="light" id="b3">  </td>
            <td class="dark" id="c3">  </td>
            <td class="light" id="d3">  </td>
            <td class="dark" id="e3">  </td>
            <td class="light" id="f3">  </td>
            <td class="dark" id="g3">  </td>
            <td class="light" id="h3">  </td>
        </tr>
        <tr height="${realsize}px">
            <td class="light" id="a2"> ${pw} </td>
            <td class="dark" id="b2"> ${pw} </td>
            <td class="light" id="c2"> ${pw} </td>
            <td class="dark" id="d2"> ${pw} </td>
            <td class="light" id="e2"> ${pw} </td>
            <td class="dark" id="f2"> ${pw} </td>
            <td class="light" id="g2"> ${pw} </td>
            <td class="dark" id="h2"> ${pw} </td>
        </tr>
        <tr height="${realsize}px">
            <td class="dark" id="a1"> ${rw} </td>
            <td class="light" id="b1"> ${nw} </td>
            <td class="dark" id="c1"> ${bw} </td>
            <td class="light" id="d1"> ${qw} </td>
            <td class="dark" id="e1"> ${kw} </td>
            <td class="light" id="f1"> ${bw} </td>
            <td class="dark" id="g1"> ${nw} </td>
            <td class="light" id="h1"> ${rw} </td>
        </tr>
    </table>`
    addMovable();
    documentListener();
    //addDetect();
}

function getBlackBoard() {
    const board = document.getElementById("getBoard");
    board.innerHTML = `

    <table id="board" cellspacing="0" cellpadding="0" width="${realsize*8}px">
        <tr height="${realsize}px">
            <td class="light" id="h1"> ${rw} </td>
            <td class="dark" id="g1"> ${nw} </td>
            <td class="light" id="f1"> ${bw} </td>
            <td class="dark" id="e1"> ${kw} </td>
            <td class="light" id="d1"> ${qw} </td>
            <td class="dark" id="c1"> ${bw} </td>
            <td class="light" id="b1"> ${nw} </td>
            <td class="dark" id="a1"> ${rw} </td>
        </tr>
        <tr height="${realsize}px">
            <td class="dark" id="h2"> ${pw} </td>
            <td class="light" id="g2"> ${pw} </td>
            <td class="dark" id="f2"> ${pw} </td>
            <td class="light" id="e2"> ${pw} </td>
            <td class="dark" id="d2"> ${pw} </td>
            <td class="light" id="c2"> ${pw} </td>
            <td class="dark" id="b2"> ${pw} </td>
            <td class="light" id="a2"> ${pw} </td>
        </tr>
        <tr height="${realsize}px">
            <td class="light" id="h3">  </td>
            <td class="dark" id="g3">  </td>
            <td class="light" id="f3">  </td>
            <td class="dark" id="e3">  </td>
            <td class="light" id="d3">  </td>
            <td class="dark" id="c3">  </td>
            <td class="light" id="b3">  </td>
            <td class="dark" id="a3">  </td>
        </tr>
        <tr height="${realsize}px">
            <td class="dark" id="h4">  </td>
            <td class="light" id="g4">  </td>
            <td class="dark" id="f4">  </td>
            <td class="light" id="e4">  </td>
            <td class="dark" id="d4">  </td>
            <td class="light" id="c4">  </td>
            <td class="dark" id="b4">  </td>
            <td class="light" id="a4">  </td>
        </tr>
        <tr height="${realsize}px">
            <td class="light" id="h5">  </td>
            <td class="dark" id="g5">  </td>
            <td class="light" id="f5">  </td>
            <td class="dark" id="e5">  </td>
            <td class="light" id="d5">  </td>
            <td class="dark" id="c5">  </td>
            <td class="light" id="b5">  </td>
            <td class="dark" id="a5">  </td>
        </tr>
        <tr height="${realsize}px">
            <td class="dark" id="h6">  </td>
            <td class="light" id="g6">  </td>
            <td class="dark" id="f6">  </td>
            <td class="light" id="e6">  </td>
            <td class="dark" id="d6">  </td>
            <td class="light" id="c6">  </td>
            <td class="dark" id="b6">  </td>
            <td class="light" id="a6">  </td>
        </tr>
        <tr height="${realsize}px">
            <td class="light" id="h7"> ${pb} </td>
            <td class="dark" id="g7"> ${pb} </td>
            <td class="light" id="f7"> ${pb} </td>
            <td class="dark" id="e7"> ${pb} </td>
            <td class="light" id="d7"> ${pb} </td>
            <td class="dark" id="c7"> ${pb} </td>
            <td class="light" id="b7"> ${pb} </td>
            <td class="dark" id="a7"> ${pb} </td>
        </tr>
        <tr height="${realsize}px">
            <td class="dark" id="h8"> ${rb} </td>
            <td class="light" id="g8"> ${nb} </td>
            <td class="dark" id="f8"> ${bb} </td>
            <td class="light" id="e8"> ${kb} </td>
            <td class="dark" id="d8"> ${qb} </td>
            <td class="light" id="c8"> ${bb} </td>
            <td class="dark" id="b8"> ${nb} </td>
            <td class="light" id="a8">${rb}</td>
        </tr>
    </table>`
    addMovable();
    documentListener();
    //addDetect();
}

function documentListener() {
    document.addEventListener("mousemove", function() {getElement(event);setLatestPiece()});
    document.addEventListener("click", function() {
        console.log("click event");
        if (clicked && !isSameCell()) {
            console.log("changed?");
            console.log(selectedPiece);
            changeParent();
        }
    });
}

function getRandomBoard() {
    let randomNumber =  Math.floor(Math.random() * 2);
    if (randomNumber == 0) {
        getBlackBoard();
    } else {
        getWhiteBoard();
    }
}

function addMovable() {
    const board = document.getElementById("board");
    for (let i=0; i<64; i++) {
        const id = pos_arr[i];
        const piece = document.querySelector(`#${id} > img`);
        let down = false;
        let toggleClick = false;
        if (piece != null) {
            piece.addEventListener("mousedown", function() {down = true;selectedPiece=piece;setLatestPiece();moveSelectedToMouse();piece.style.zIndex="2"});
            piece.addEventListener("mousemove", function() {moveWithPointer(down, piece, event)});
            piece.addEventListener("mouseup", function() {
                if (isSameCell()) {
                    console.log("same cell")
                    down = false;
                    if (toggleClick) {
                        console.log("was clicked");
                        clicked = false;
                        toggleClick = false;
                        moveSelectedToParent();
                        selectedPiece = null;
                    } else {
                        console.log("was not clicked");
                        clicked = true;
                        toggleClick = true;
                        moveSelectedToParent();
                        selectedPiece = piece;
                        console.log(selectedPiece);
                    }
                } else {
                    down = false;
                    if(selectedPiece!=null){
                        changeParent()
                    };
                    piece.style.zIndex="1";
                    selectedPiece=null;
                }
            });
            // this null check is used in order to not cause error in console due to bug
            piece.addEventListener("mouseleave", function() {
                piece.style.zIndex="1";
                down = false;
                //if(selectedPiece!=null){moveSelectedToParent()};selectedPiece=null
            });

        }
    }
}

function setLatestPiece() {
    if (selectedPiece != null) {
        latestPiece = selectedPiece;
    } 
}

function isSameCell() {
    //console.log(selectedCell);
    //console.log(latestPiece.parentNode);
    //console.log("-----")
    let theBool = selectedCell == latestPiece.parentNode;
    //console.log(theBool);
    return theBool;
    
}

function moveSelectedToMouse() {
    let parentX = selectedPiece.parentNode.getBoundingClientRect().left;
    let parentY = selectedPiece.parentNode.getBoundingClientRect().top;
    selectedPiece.style.transform=`translate(${event.clientX-parentX-realsize/2}px,${event.clientY-parentY-realsize/2}px)`
}

function moveSelectedToParent() {
    selectedPiece.style.transform=`translate(${selectedPiece.offsetLeft}px,${selectedPiece.offsetTop})`
}

function moveWithPointer(down, piece, event) {
    if (down) {
        let box = piece.parentNode;
        //const board = document.getElementById("board");
        //board.appendChild(piece);
        //box.removeChild(piece);
        let rect = box.getBoundingClientRect();
        let xc = event.clientX - rect.left - realsize/2;
        let yc = event.clientY - rect.top - realsize/2;
        let xpos = piece.offsetLeft;
        let ypos = piece.offsetTop;
        console.log(`xpos ${xpos} ypos ${ypos}`)
        xdist = (xc - xpos);
        ydist = (yc - ypos);
        piece.style.transform = `translate(${xdist}px,${ydist}px)`;
        selectedPiece = piece;
    }
}

function changeParent() {
    let newParent;
    if (selectedCell.innerHTML.trim()!="") {
        console.log("not null");
        if (canCapture) {
            //console.log(selectedCell)
            while (selectedCell.firstChild) {
                selectedCell.removeChild(selectedCell.firstChild);
            }
        }
    }
    //console.log(selectedCell);
    newParent = selectedCell;
    //console.log(newParent);
    //console.log(selectedPiece);
    newParent.appendChild(selectedPiece);
    console.log(`Changed: ${newParent.innerHTML}`);
    selectedPiece.style.transform = `translate(${selectedPiece.offsetLeft}px,${selectedPiece.offsetTop})`;
}

function changeLatestPieceParent() {
    let newParent;
    if (selectedCell.innerHTML.trim()!="") {
        // if the cell is not empty and can capture
        console.log("not null");
        if (canCapture) {
            //console.log(selectedCell)
            while (selectedCell.firstChild) {
                selectedCell.removeChild(selectedCell.firstChild);
            }
        }
    }
    //console.log(selectedCell);
    newParent = selectedCell;
    //console.log(newParent);
    //console.log(selectedPiece);
    newParent.appendChild(latestPiece);
    console.log(`Changed: ${newParent.innerHTML}`);
    latestPiece.style.transform = `translate(${latestPiece.offsetLeft}px,${latestPiece.offsetTop})`;
}

function getElement(event) {
    elements = document.elementsFromPoint(event.clientX, event.clientY);
    selectedCell = null;
    for (let i=0; i<elements.length; i++) {
        if (elements[i].nodeName == "TD") {
            selectedCell = elements[i];
            //console.log(selectedCell);
        }
    }
}


//match (:hover?)