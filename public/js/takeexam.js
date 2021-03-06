import { Student, Exam, Teacher } from "../core.js";

const inputKey = document.querySelector("#exam-key");
const enterBtn = document.querySelector("#enter-exam");
const examContainer = document.querySelector(".exam-container");
const studName = document.querySelector("#student-name");
const studEmail = document.querySelector("#student-email");
const studID = document.querySelector("#student-id");
const modal = document.querySelector(".modal");
const resultStudName = document.querySelector("#result-student-name");
const resultExamName = document.querySelector("#result-exam-name");
const score = document.querySelector("#score");
const resultMax = document.querySelector("#result-max");
const finishExam = document.querySelector("#finish-exam");
const warningModal = document.querySelector("#warning-modal");
const remainingSeconds = document.querySelector("#remainingSeconds");
const erorrLabel = document.getElementById("errorMsg");

let leaveExamWarningTimeout = null;
let warningTimerInterval = null;
let warningSeconds = 11;

let studKey = "-1";
if (!!localStorage.getItem("studKey")) {
  studKey = localStorage.getItem("studKey");
}

if (studKey == "-1") {
  alert("no key");
  console.log("no key");
}

let allExams = [];
if (!!localStorage.getItem("exams")) {
  allExams = JSON.parse(localStorage.getItem("exams"));
}
let totalExams = allExams.length;

let allStudents = [];
if (!!localStorage.getItem("students")) {
  allStudents = JSON.parse(localStorage.getItem("students"));
}
let totalStudents = allStudents.length;

let allTeachers = [];
if (!!localStorage.getItem("teachers")) {
  allTeachers = JSON.parse(localStorage.getItem("teachers"));
}

// if (studKey != "-1") {
//   document.querySelector("#exam-key").value = studKey;
// }
let student = new Student();
let currentExam;

console.log(currentExam);
console.log(JSON.stringify(allExams[0]));

currentExam = JSON.parse(document.getElementById("current-exam").textContent);
console.log(currentExam);
document.querySelector("#submit-exam").classList.remove("hidden");
document.querySelector("main").classList.remove("hidden");
showExam();

// enterBtn.addEventListener("click", function (evt) {
//   evt.preventDefault();
//   let key = inputKey.value;

//   const emailPattern = new RegExp(/\w+@\w+.\w+(\.\w+)?$/);
//   const namePattern = new RegExp(/^\w+.[ ]\w+.$/);

//   if (!emailPattern.test(studEmail.value)) {
//     erorrLabel.innerText = "Invalid Email Address.";
//     studEmail.focus();
//     return;
//   }

//   if (!namePattern.test(studName.value)) {
//     erorrLabel.innerText = "Invalid Full Name";
//     studName.focus();
//     return;
//   }

//   if (
//     inputKey.value == "" ||
//     studName.value == "" ||
//     studEmail.value == "" ||
//     studID.value == ""
//   ) {
//     erorrLabel.innerText = "Empty Fields";
//     return;
//   }
//   // console.log(key);
//   // allExams.forEach((exam) => {
//   //   if (key === String(exam.key)) {
//   //   }
//   // });
//   // console.log(currentExam);
//   if (!currentExam) {
//     alert("Exam does not exist");
//   } else {
//     modal.classList.add("hidden");
//     document.querySelector("#submit-exam").classList.remove("hidden");
//     document.querySelector("main").classList.remove("hidden");
//     student.email = studEmail.value;
//     student.id = studID.value;
//     student.examkey = key;
//     student.name = studName.value;
//     student.answers = new Array(currentExam.questions.length).fill(0);
//     student.marked = new Array(currentExam.questions.length).fill(0);
//     showExam();
//     // document.documentElement.requestFullscreen();
//     // document.forms[0].submit();
//   }
// });

// document.querySelector("#back-to-exam").addEventListener("click", function () {
//   document.documentElement.requestFullscreen();
// });

// document.querySelector("#exit-exam").addEventListener("click", exitExam);

// function exitExam() {
//   hideModal();
//   console.log("exitting Exam");
//   document.querySelector("#submit-exam").click();
//   clearTimers();
// }

// function hideModal() {
//   warningModal.classList.add("hidden");
// }

// function showModal() {
//   warningModal.classList.remove("hidden");
// }

// function clearTimers() {
//   if (leaveExamWarningTimeout) {
//     clearTimeout(leaveExamWarningTimeout);
//   }
//   if (warningTimerInterval) {
//     clearInterval(warningTimerInterval);
//   }
// }

function showExam() {
  //   document.addEventListener("fullscreenchange", (event) => {
  //     if (document.fullscreenElement) {
  //       clearTimers();
  //       warningSeconds = 11;
  //       hideModal();
  //     } else {
  //       console.log("not full screen");
  //       remainingSeconds.textContent = 10;
  //       showModal();
  //       leaveExamWarningTimeout = setTimeout(() => {
  //         exitExam();
  //       }, warningSeconds * 1000);
  //       warningTimerInterval = setInterval(() => {
  //         warningSeconds--;
  //         remainingSeconds.textContent = warningSeconds;
  //       }, 1000);
  //     }
  //   });

  let examTitle = document.createElement("h1");
  examTitle.textContent = currentExam.name;
  examTitle.className = "exam-title";
  examContainer.appendChild(examTitle);

  currentExam.questions.forEach((question, i) => {
    var qcontainer = document.createElement("div");
    qcontainer.className = "q-container";
    let prompt = document.createElement("h2");
    prompt.id = "question-prompt";
    prompt.textContent = `${i + 1}.${question[0]}`;
    qcontainer.appendChild(prompt);

    for (let j = 1; j < question.length - 1 && question[j] != null; j++) {
      var choiceContainer = document.createElement("div");
      choiceContainer.className = "choice-container";
      let choice = document.createElement("input");
      choice.type = "radio";
      choice.name = `c${i}`;
      choice.id = `c${i}${j}`;
      let choiceText = document.createElement("p");
      let char = 64;
      choiceText.textContent = `${String.fromCharCode(char + j)}. ${
        question[j]
      }`;

      choiceContainer.appendChild(choice);
      choiceContainer.appendChild(choiceText);
      // console.log(choiceContainer);
      qcontainer.appendChild(choiceContainer);
    }

    qcontainer.appendChild(choiceContainer);
    examContainer.appendChild(qcontainer);
  });
  console.log(student);
}

document.querySelector("#submit-exam").addEventListener("click", function () {
  let ansContainer = document.querySelectorAll(".q-container");
  ansContainer.forEach((question, i) => {
    question.childNodes.forEach((choice, j) => {
      if (choice.childNodes[0].checked) {
        student.answers[i] = j;
      }
    });
  });
  console.log(student.answers);
  let checking = [];
  currentExam.questions.forEach((question) => {
    checking.push(question[6]);
  });
  for (let j = 0; j < student.answers.length; j++) {
    if (student.answers[j] == checking[j]) {
      student.marked[j] = 1;
    }
  }
  console.log(student.marked);
  console.log(student.marked.reduce((prev, next) => prev + next));
  allStudents.push(student);
  showResult();
  localStorage.setItem("students", JSON.stringify(allStudents));
  // student = null;
});
function showResult() {
  document.querySelector(".result").classList.remove("hidden");
  resultStudName.textContent = student.name;
  resultExamName.textContent = currentExam.name;
  resultMax.textContent = student.marked.length;
  score.textContent = student.marked.reduce((prev, next) => prev + next);
}

`{"name":"The New Test","questions":[["What is one of the big differences between traditional media and social media?","participatory production","social media reaches only a few people at a time","the management structure of the companies","traditional media offers no way for audiences to communicate with media producers",null,2],["Which of the following is NOT a fundamental area of change regarding people's media habits?","conversation","collaboration","choice","communication","curation",3],["An important lesson learned in online political campaigns in recent years and other collaborative efforts that had online components is...","people much prefer to do their own thing and not work in groups","there is always a couple people who disrupt the work of others in the group","people need to be able to meet face to face at times as well as online","social media has still not lived up to its promise of helping people collaborate",null,4],["A portable chunk of code that can be embedded in Web pages to give extra functionality is known as a","folksonomy","widget","curator","wiki",null,2],["Creating a website or group that looks like it originated from concerned grassroots efforts of citizens is known as","lurking","trolling","phishing","astroturfing","puppeting",3],["A website that lets anyone add, edit, or delete pages of content is called a forum","True","False",null,null,null,1]],"key":903,"teacherID":1,"date":"2/8/2022","status":"open"}`;
