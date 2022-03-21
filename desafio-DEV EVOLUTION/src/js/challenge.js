const next = document.getElementById('next');
next.addEventListener('click', next_question)

let dataRankingStart = JSON.parse(localStorage.getItem('usersRankings'));
if (dataRankingStart == null) {
    localStorage.setItem('usersRankings', JSON.stringify([]));
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
 * @returns number
 */
function calculateGrade() {
    let firstNoteQuestion = verifyResponse(document.querySelector('input[name="question-one"]:checked').value);
    let secondNoteQuestion = verifyResponse(document.querySelector('input[name="question-two"]:checked').value);
    let thirdNoteQuestion = verifyResponse(document.querySelector('input[name="question-three"]:checked').value);
    let fourthNoteQuestion = verifyResponse(document.querySelector('input[name="question-four"]:checked').value);
    let fifthNoteQuestion = verifyResponse(document.querySelector('input[name="question-five"]:checked').value);

    return firstNoteQuestion + secondNoteQuestion + thirdNoteQuestion + fourthNoteQuestion + fifthNoteQuestion;
}
/**
 * 
 * @param {string} tag 
 * @returns 
 */
function createElement(tag) {
    return document.createElement(tag);
}

function assembleUserObject() {
    let nameUser = document.getElementById('data-user').value;
    let score = calculateGrade();
    let objUserRanking = [{ name: nameUser, score: score }]
    saveToRanking(objUserRanking);
    let dataUsers = getToRanking();
    fillRanking();
}

function fillRanking() {
    let tableRanking = document.getElementById('tableRanking');
    let dataRanking = getToRanking();
    for (let i = 0; i < dataRanking.length; i++) {
        let tr = createElement('tr');
        let td = createElement('td');
        let td2 = createElement('td');

        td.textContent = dataRanking[i][0].name;
        tr.appendChild(td);
        td2.textContent = dataRanking[i][0].score;
        tr.appendChild(td2);
        tableRanking.appendChild(tr);
    }
}

function getToRanking() {
    dataRanking = JSON.parse(localStorage.getItem('usersRankings'));
    return dataRanking;
}
/**
 * 
 * @param {objeto} data 
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
