const main = document.querySelector('#main');
const qna = document.querySelector('#qna');
const endPoint = qnaList.length;        // 직접 숫자를 지정해주는 것이 아닌 데이터값에 따라 다르게 설정되게 해 두었음

function addAnswer(answerText, questionIndex) {
    let a = document.querySelector('.answerBox');
    let answer = document.createElement('Button');
    answer.classList.add('answerList');     // 나중에 버튼 삭제를 위해 클래스 지정
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');

    a.appendChild(answer);
    answer.innerHTML = answerText;

    // answer버튼에 익명 함수를 이용해 클릭 이벤트 추가
    answer.addEventListener("click", function (params) {
        let children = document.querySelectorAll('.answerList');
        for (let i = 0; i < children.length; i++) {
            // 여러 개의 답 중 하나만 눌러도 버튼들 모두가 사라지고 선택될 수 없게 됨
            children[i].disabled = true;
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
        }

        // 버튼이 바로 사라져버리면 안되므로 setTimeout 설정
        setTimeout(() => {
            for (let i = 0; i < children.length; i++) {
                children[i].style.display = 'none';
            }
            goNext(++questionIndex);
        }, 450)
    }, false);
}

function goNext(questionIndex) {
    let q = document.querySelector('.qBox');
    q.innerHTML = qnaList[questionIndex].q;     // qna 첫 번째 문장 넣어줌
    for (let i in qnaList[questionIndex].a) {
        // for문 돌아가며 qnaList[questionIndex].a에 몇 개의 원소가 들어있는지 보고,이를 각각의 answer button으로 만들음
        //for (let index = 0; index < qnaList[question_index].a.size(); index++)랑 같을듯
        addAnswer(qnaList[questionIndex].a[i].answer, questionIndex);      // 각각의 지문 parameter로 전달
    }
    let status = document.querySelector('.statusBar');
    status.style.width = (100 / endPoint) * (questionIndex + 1) + '%';
}

function begin() {
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    setTimeout(() => {
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";
        }, 450);
        // 페이지 로드되고 이제 qna에 문제 시작해줌
        let question_index = 0;
        goNext(question_index);
    }, 450);
}