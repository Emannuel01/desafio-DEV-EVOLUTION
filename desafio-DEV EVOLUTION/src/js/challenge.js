const next = document.getElementById('next');
next.addEventListener('click', next_question);

let dataRankingStart = JSON.parse(localStorage.getItem('usersRankings'));
if (dataRankingStart == null) {
    localStorage.setItem('usersRankings', JSON.stringify([]));
}
let timeResponse = 0;
let buttonInit = document.getElementById('start-game');
buttonInit.addEventListener('click', () => {
    let t = 0;
    time = setInterval(() => {
        t++;
        timeResponse = t / 100;
    }, 10);
});

/**
 * 
 * @param {string} tag 
 * @returns 
 */
function createElement(tag) {
    return document.createElement(tag);
}
/**
 * 
 * @param {number} a 
 * @param {number} b 
 * @returns -1 se o primeiro valor for maior, 1 se o segundo valor for maior
 */
function orderByScore(a, b) {
    return a[0].score > b[0].score ? -1 : a[0].score < b[0].score ? 1 : 0;
}


function start() {
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('user').style.display = 'block';
}

function startGame() {
    let nameUser = document.getElementById('data-user').value;
    if (nameUser == '') {
        document.getElementById('alert').style.display = 'block'
        return;
    }
    document.getElementById('user').style.display = 'none';
    document.getElementById('container-1').style.display = 'block';
    document.getElementById('next').style.display = 'block';
}

function goToBack() {
    window.location.href = './challenge.html'
}

let indexDiv = 1;

function next_question() {
    document.getElementById('container-' + indexDiv).style.display = 'none';
    indexDiv++;
    document.getElementById('container-' + indexDiv).style.display = 'block';

    if (indexDiv == 5) {
        next.style.display = 'none';
        document.getElementById('finalize').style.display = 'block';
    }
    return;
}
/**
 * 
 * @param {bolean} userResponse 
 * @returns number
 */
function verifyResponse(userResponse) {
    if (userResponse == 'true') {
        return 100;
    }
    return 0;
}
/**
 * 
 * @param { indice} id
 * @returns bolean
 */
function verifyInputResponse(id) {
    return document.querySelector(`input[name="question-${id}"]:checked`).value;

}
/**
 * 
 * @returns number
 */
function calculateGrade() {
    let firstNoteQuestion = verifyResponse(verifyInputResponse(1));
    let secondNoteQuestion = verifyResponse(verifyInputResponse(2));
    let thirdNoteQuestion = verifyResponse(verifyInputResponse(3));
    let fourthNoteQuestion = verifyResponse(verifyInputResponse(4));
    let fifthNoteQuestion = verifyResponse(verifyInputResponse(5));

    let finalGrate = firstNoteQuestion + secondNoteQuestion + thirdNoteQuestion + fourthNoteQuestion + fifthNoteQuestion - Math.trunc(timeResponse);

    if (finalGrate < 0) {
        return 0;
    }

    return finalGrate;
}

function assembleUserObject() {
    let nameUser = document.getElementById('data-user').value;
    let score = calculateGrade();
    let objUserRanking = [{ name: nameUser, score: score, time: timeResponse }]
    saveToRanking(objUserRanking);
    let dataUsers = getToRanking();
    fillRanking();
}

function fillRanking() {
    let tableRanking = document.getElementById('tableRanking');
    let dataRanking = getToRanking();
    dataRanking.sort(orderByScore);
    for (let i = 0; i < dataRanking.length; i++) {
        let tr = createElement('tr');
        let tdName = createElement('td');
        let tdScore = createElement('td');
        let tdTime = createElement('td');

        tdName.textContent = dataRanking[i][0].name;
        tr.appendChild(tdName);
        tdScore.textContent = dataRanking[i][0].score;
        tr.appendChild(tdScore);
        tdTime.textContent = dataRanking[i][0].time;
        tr.appendChild(tdTime);
        tr.class
        tableRanking.appendChild(tr);
    }
}

function getToRanking() {
    dataRanking = JSON.parse(localStorage.getItem('usersRankings'));
    return dataRanking;
}
/**
 * 
 * @param {{name: string, score: number, time: number}} data 
 */
function saveToRanking(data) {
    let users = getToRanking();
    users.push(data)
    localStorage.setItem('usersRankings', JSON.stringify(users));
}

function concluded() {
    document.getElementById('container-5').style.display = 'none';
    document.getElementById('finalize').style.display = 'none';
    document.getElementById('ranking').style.display = 'block'

    assembleUserObject();
}
