import { timeSlots, lessons } from "./constants.js";

console.log("lessons form");

const lesson = {};
const lessonsArr = [];

const headerTitleElem = document.querySelector("#greeting");
const profileNameElem = document.querySelector("#profileName");
const profileEmailElem = document.querySelector("#profileEmail");

const formLessonsElem = document.querySelector("#formLessons");

const data = localStorage.getItem("login");
const parseData = JSON.parse(data);

const { name, email } = parseData;

headerTitleElem.innerHTML = name;
profileNameElem.innerHTML = name;
profileEmailElem.innerHTML = email;

formLessonsElem.addEventListener("submit", (e) => {
  e.preventDefault();

  const lessonType = formLessonsElem.querySelector(
    'input[name="type"]:checked'
  ).id;

  const lessonTime = formLessonsElem.querySelector(
    'input[name="time"]:checked'
  );

  const timeDesc = lessonTime
    .closest(".time-slot-row")
    .querySelector(".time-desc").dataset.time;

  lesson.name = name;
  lesson.title = lessons[lessonType].title;
  lesson.duration = lessons[lessonType].duration;
  lesson.time = timeSlots[lessonTime.id];
  lesson.tomorrow = timeDesc !== "today";

  if (localStorage.getItem("lessons")) {
    const data = localStorage.getItem("lessons");
    const dataParse = JSON.parse(data);
    dataParse.push(lesson);
    localStorage.setItem("lessons", JSON.stringify(dataParse));
  } else {
    lessonsArr.push(lesson);
    localStorage.setItem("lessons", JSON.stringify(lessonsArr));
  }
});
