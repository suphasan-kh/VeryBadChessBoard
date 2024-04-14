const w = window.innerWidth;
const h = window.innerHeight;
const size = Math.min(h,w);
const realsize = Math.floor(size*0.1);

let selectedPiece = null;
let selectedCell = null;
let canCapture = true;

const pos_dict = {"a8":1, "b8":2, "c8":3, "d8":4, "e8":5, "f8":6, "g8":7, "h8":8,
"a7":9, "b7":10, "c7":11, "d7":12, "e7":13, "f7":14, "g7":15, "h7":16,
"a6":17, "b6":18, "c6":19, "d6":20, "e6":21, "f6":22, "g6":23, "h6":24,
"a5":25, "b5":26, "c5":27, "d5":28, "e5":29, "f5":30, "g5":31, "h5":32,
"a4":33, "b4":34, "c4":35, "d4":36, "e4":37, "f4":38, "g4":39, "h4":40,
"a3":41, "b3":42, "c3":43, "d3":44, "e3":45, "f3":46, "g3":47, "h3":48,
"a2":49, "b2":50, "c2":51, "d2":52, "e2":53, "f2":54, "g2":55, "h2":56,
"a1":57, "b1":58, "c1":59, "d1":60, "e1":61, "f1":62, "g1":63, "h1":64
};

const pos_arr = ["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8",
"a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7",
"a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6",
"a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5",
"a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4",
"a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3",
"a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2",
"a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"];

const kw = `<img class="piece k w" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Chess_klt45.svg/1920px-Chess_klt45.svg.png">`;
const kb = `<img class="piece k b" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chess_kdt45.svg/1920px-Chess_kdt45.svg.png">`;
const qw = `<img class="piece q w" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Chess_qlt45.svg/1920px-Chess_qlt45.svg.png">`;
const qb = `<img class="piece q b" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Chess_qdt45.svg/1920px-Chess_qdt45.svg.png">`;
const rw = `<img class="piece r w" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Chess_rlt45.svg/1920px-Chess_rlt45.svg.png">`;
const rb = `<img class="piece r b" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/1920px-Chess_rdt45.svg.png">`;
const bw = `<img class="piece b w" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chess_blt45.svg/1920px-Chess_blt45.svg.png">`;
const bb = `<img class="piece b b" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Chess_bdt45.svg/1920px-Chess_bdt45.svg.png">`;
const nw = `<img class="piece n w" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chess_nlt45.svg/1920px-Chess_nlt45.svg.png">`;
const nb = `<img class="piece n b" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Chess_ndt45.svg/1920px-Chess_ndt45.svg.png">`;
const pw = `<img class="piece p w" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/1920px-Chess_plt45.svg.png">`;
const pb = `<img class="piece p b" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/1920px-Chess_pdt45.svg.png">`;


function getWhiteBoard() {
    const board = document.getElementById("getBoard");
    document.documentElement.style.setProperty("--getsize", `${realsize}px`);
    document.documentElement.style.setProperty("--getfont", `${realsize/4}px`);
    board.innerHTML = `
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
    //addDetect();
}

function getBlackBoard() {
    const board = document.getElementById("getBoard");
    document.documentElement.style.setProperty("--getsize", `${realsize}px`);
    document.documentElement.style.setProperty("--getfont", `${realsize/4}px`);
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
    //addDetect();
}

function addMovable() {
    const board = document.getElementById("board");
    for (let i=0; i<64; i++) {
        const id = pos_arr[i];
        const piece = document.querySelector(`#${id} > img`);
        let down = false;
        if (piece != null) {
            piece.addEventListener("mouseenter", function() {console.log("Enter")});
            piece.addEventListener("mousedown", function() {down = true;selectedPiece=piece;piece.style.zIndex="2"});
            piece.addEventListener("mousemove", function() {moveWithPointer(down, piece, event)});
            piece.addEventListener("mouseup", function() {down = false;changeParent();piece.style.zIndex="1";selectedPiece=null;});
            piece.addEventListener("mouseleave", function() {down = false;if(selectedPiece!=null){selectedPiece.style.transform=`translate(${selectedPiece.offsetLeft}px,${selectedPiece.offsetTop})`};selectedPiece=null});

            document.addEventListener("mousemove", function() {getElement(event)});
        }
    }
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
            console.log(selectedCell)
            while (selectedCell.firstChild) {
                selectedCell.removeChild(selectedCell.firstChild);
            }
            console.log("outer" + selectedCell.outerHTML);
        }
    }
    console.log(selectedCell);
    newParent = selectedCell;
    console.log(newParent);
    console.log(selectedPiece);
    newParent.appendChild(selectedPiece);
    console.log(`Changed: ${newParent}`);
    selectedPiece.style.transform = `translate(${selectedPiece.offsetLeft}px,${selectedPiece.offsetTop})`;
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

/*
function addDetect() {
    for (let i=0; i<64; i++) {
        const id = pos_arr[i];
        const box = document.getElementById(id);
        let on = false;
        box.addEventListener("mouseover", function() {on = true;console.log(`enter ${id} ` + on)});
        box.addEventListener("mouseleave", function() {on = false;console.log(`leave ${id} ` + on)});
        box.addEventListener("mouseup", function() {console.log(`up ${id}`);detectRelease(on, id)});
    }
}

function detectRelease(on, id) {
    if (on) {
        console.log("box " + id)
        console.log(selectedPiece);
        const box = document.getElementById(id);
        console.log(box);
        box.appendChild(selectedPiece);
        let rect = box.getBoundingClientRect();
        let xdist = selectedPiece.offsetLeft;
        let ydist = selectedPiece.offsetTop;
        selectedPiece.style.transform = `translate(${xdist}px,${ydist}px)`;
        selectedPiece = null;
    }
    
}*/

//match (:hover?)