const main = document.querySelector('#main');
const qna = document.querySelector('#qna');
const result = document.querySelector("#result");
const endPoint = qnaList.length;        // 직접 숫자를 지정해주는 것이 아닌 데이터값에 따라 다르게 설정되게 해 두었음
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function calculateResult() {
    // let resultArray = pointArray.sort(function (a, b) {
    //     // value 기준으로 정렬하기 위한 규칙을 설정해줌 (value이 높은 순서대로 정렬)
    //     if (a.value > b.value) {
    //         return -1;
    //     } else if (a.value < b.value) {
    //         return 1;
    //     }
    //     return 0;
    // });

    let result = select.indexOf(Math.max(...select));
    return result;
}

function setResult() {
    let point = calculateResult();
    const resultName = document.querySelector('.resultName');
    resultName.innerHTML = infoList[point].name;

    let resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    let imgURL = 'img/image-' + point + '.png';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
}

function goResult() {
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    setTimeout(() => {
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block";
        }, 450);
    }, 450);

    setResult();
}

function addAnswer(answerText, questionIndex, idx) {
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
            let target = qnaList[questionIndex].a[idx].type;
            for (let j = 0; j < target.length; j++) {
                select[target[j]] += 1;
            }

            for (let i = 0; i < children.length; i++) {
                children[i].style.display = 'none';
            }

            goNext(++questionIndex);
        }, 450)
    }, false);
}

function goNext(questionIndex) {
    if (questionIndex === endPoint) {
        // questionIndex가 0부터 시작하고 11까지 진행되므로 마지막 질문임을 알기 위해서는 questionIndex가 12인지 구분해서 비교해줘야함!
        goResult();
        return;
    }
    let q = document.querySelector('.qBox');
    q.innerHTML = qnaList[questionIndex].q;     // qna 첫 번째 문장 넣어줌
    for (let i in qnaList[questionIndex].a) {
        // for문 돌아가며 qnaList[questionIndex].a에 몇 개의 원소가 들어있는지 보고,이를 각각의 answer button으로 만들음
        //for (let index = 0; index < qnaList[question_index].a.size(); index++)랑 같을듯
        addAnswer(qnaList[questionIndex].a[i].answer, questionIndex, i);      // 각각의 지문 parameter로 전달
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