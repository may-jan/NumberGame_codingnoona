// 랜덤번호 지정
// 유저가 번호를 입력 -> go 버튼 클릭
// 유저가 랜덤번호를 맞추면 --> 맞췄습니다!
//        랜덤번호 < 유저번호 --> Down!
//        랜덤번호 > 유저번호 --> Up!
// 리셋버튼을 누르면 게임 리셋
// 5번의 기회를 다쓰면 게임 종료 (추측 불가, 버튼 비활성화)
// 유저가 1~100 범위 밖의 숫자를 입력하면 알려준다, 기회는 그대로
// 유저가 이미 입력한 숫자를 또 입력하면 알려준다, 기회는 그대로


let play_btn = document.getElementById("play_btn");
let user_input = document.getElementById("user_input");
let result_area = document.getElementById("result_area");
let reset_btn = document.getElementById("reset_btn");
let chance_area = document.getElementById("chance_area");

let computerNum = 0;
let chances = 5;
let gameOver = false;
let history = [];





// 컴퓨터의 랜덤번호 생성
function pickRandomNum(){
    computerNum = Math.floor(Math.random() * 100)+1;
    console.log("정답 : "+ computerNum);
};
pickRandomNum();



// Go! 버튼을 눌렀을 때
function play(){
    let user_value = user_input.value;

    // 유저가 입력한 값이 1~100 범위 내에 있는지 유효성 검사
    if(user_value<1 || user_value>100){
        result_area.textContent="1~100사이의 숫자를 입력해주세요.";
        return;
    }


    // 유저가 입력한 값이 이전과 같은 값인지 중복 체크 검사
    if(history.includes(user_value)){
        result_area.textContent="이미 입력한 숫자입니다. 다른 숫자를 입력해주세요."
        return;
    }


    // chances(입력기회)는 5에서 하나씩 줄어든다
    chances --;
    chance_area.textContent = `남은기회 : ${chances} 번`;


    if(user_value < computerNum){
        // 유저가 입력한 숫자가 com숫자보다 작으면
        result_area.textContent = "Up!!"
    }else if(user_value > computerNum){
        // 유저가 입력한 숫자가 com숫자보다 크면
        result_area.textContent = "Down!!"
    }else{
        // 유저가 입력한 숫자가 com숫자와 같으면
        result_area.textContent = "맞추셨습니다!"
        gameOver=true;
    }

    
    // history 배열에 유저가 입력한 숫자 저장
    history.push(user_value);
    

    // 기회가 1 미만이면 gameOver가 true
    if(chances < 1){
        gameOver = true;
    }


    // gameOver가 true이면 play_btn 비활성화시키기 (disabled)
    if(gameOver == true){
        play_btn.disabled = true;
    }
};



function reset(){
    // user_input창이 깨끗하게 정리되고
    user_input.value = "";

    // 새로운 번호 생성
    pickRandomNum();

    result_area.textContent = "결과 값이 여기 나옵니다!"
};



function focus(){
    user_input.value="";
}



play_btn.addEventListener("click", play);

reset_btn.addEventListener("click", reset);

user_input.addEventListener("focus", focus);