let quizData = [];
let num = 0;
let current_qstn = {};
let score = 0;


document.getElementById("game_score").innerHTML = score;
document.getElementById("submit").style.display = "none";
document.getElementById("next").disabled = true;

async function playGame() {
    let id = 1;
    let fetchdata = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
    let response = await fetchdata.json();
    let quizQuestions = response.results.map((result) => {
        result.id = id;
        id++;
        return result;
    })
    quizData.push(quizQuestions);
    displayQuestion(quizData[0][num]);
    current_qstn = quizData[0][num];
    num++;
}

playGame();

function displayQuestion(data) {

    document.getElementById("next").disabled = true;
    document.getElementById("qstn_num").innerHTML = `${data.id}/10`;

    document.getElementById("qstn_name").innerHTML = data.question;

    let setoptions = [data.correct_answer, ...data.incorrect_answers];
    let options = shuffleOptions(setoptions);

    document.getElementById("qstn_options").innerHTML = `
    <div class="row opt_row">
        <div class="col-md-4 col-xs-8 opt_col">
            <button class="btn opt" onclick="verify(event)">${options[0]}</button>
        </div>
        <div class="col-md-4 col-xs-8">
            <button class="btn opt" onclick="verify(event)">${options[1]}</button>
        </div>
    </div>
    <div class="row opt_row">
        <div class="col-md-4 col-xs-8">
            <button class="btn opt" onclick="verify(event)">${options[2]}</button>
        </div>
        <div class="col-md-4 col-xs-8">
            <button class="btn opt" onclick="verify(event)">${options[3]}</button>
        </div>
    </div>    
    `
}

function next() {
    if (num <= 9) {
        current_qstn = quizData[0][num];
        displayQuestion(quizData[0][num]);
        num++;
    } else {
        document.getElementById("submit").style.display = "block";
        document.getElementById("next").style.display = "none";
        localStorage.setItem("score", score);
    }

}

function shuffleOptions(arr) {
    for (let i = 0; i < arr.length; i++) {
        let randNum = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[randNum]] = [arr[randNum], arr[i]];
    }
    return arr;
}

function verify(e) {
    document.getElementById("next").disabled = false;
    let opt = e.target.innerHTML;
    if (opt === current_qstn.correct_answer) {
        e.target.style.backgroundColor = "green";
        score += 10;
        document.getElementById("game_score").innerHTML = score;
    } else {
        e.target.style.backgroundColor = "crimson";
    }

    let btn_disable = document.getElementsByClassName("opt");
    for (let i = 0; i < btn_disable.length; i++) {
        btn_disable[i].disabled = true;
    }
}