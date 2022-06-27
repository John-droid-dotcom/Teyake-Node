("use strict");
import { Exam } from "./core.js";

const dashboardHome = document.querySelector(".dashboard-home");
const examListPage = document.querySelector(".exam-list");
const addExamContainer = document.querySelector(".add-exam-container");
const requiredPage = document.querySelector(".required-page");
const resultPage = document.querySelector(".results-page");
const links = document.querySelectorAll(".list-item");
const logoutBtn = document.querySelector("#logout");
let pages = [
  dashboardHome,
  examListPage,
  addExamContainer,
  resultPage,
  requiredPage,
];

// let testExam = new Exam("testing");

//
// Grabbing all the necessary data from local storage
//
let currentSignin = -1;
if (!!localStorage.getItem("current"));
currentSignin = localStorage.getItem("current");
if (currentSignin === -1 || currentSignin === 0) {
  alert("please login");
  console.log("not logged in");
}

let allExams = [];
if (!!localStorage.getItem("exams")) {
  allExams = JSON.parse(localStorage.getItem("exams"));
}
let allStudents = [];
if (!!localStorage.getItem("students")) {
  allStudents = JSON.parse(localStorage.getItem("students"));
}
let allTeachers = [];
if (!!localStorage.getItem("teachers")) {
  allTeachers = JSON.parse(localStorage.getItem("teachers"));
}

//Selecting the current logged in teacher
let currentTeacher = allTeachers[1];
console.log(allTeachers);
console.log(currentTeacher);
let currentTeacherStudents = allStudents.filter((student) => {
  return currentTeacher.exams.includes(student.examkey);
});
//
//Functions executed at page load
//
window.onload = function () {
  links[0].click();
  console.log("sth");
};
//
//event handlers for all navigation links
//
links.forEach((link, i) => {
  link.addEventListener("click", function () {
    links.forEach((el) => {
      el.classList.remove("active");
    });
    pages.forEach((page) => {
      page.classList.add("hidden");
    });
    pages[i].classList.remove("hidden");
    link.classList.add("active");
  });
});
logoutBtn.addEventListener("click", function () {
  localStorage.setItem("current", -1);
});
