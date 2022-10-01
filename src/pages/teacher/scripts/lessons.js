console.log("planed lessons");

const data = JSON.parse(localStorage.getItem("login"));

const { name, email } = data;

const planedLessons = document.getElementById("planedLessons");

const cardBox = planedLessons.querySelectorAll(".card-box");
const headerTitleElem = document.querySelector("#headerTitle");
headerTitleElem.innerHTML = "asdasdsasa";

console.log(headerTitleElem.textContent);

cardBox[0].style.display = "none";
cardBox[1].style.display = "none";
cardBox[2].style.display = "none";

const lessons = JSON.parse(localStorage.getItem("lessons")) || [
  {
    name: "Анна Перминова (default)",
    day: "Завтра",
    exactTime: "16:00 - 17:00",
    title: "Новый урок",
    tomorrow: true,
  },
];

const getReview = (lesson) => {
  const { name, time, title, tomorrow, duration } = lesson;

  const day = tomorrow ? "Завтра" : "Сегодня";

  const exactTime = convertMinsToHrsMins(duration, time);

  return `    <div class="card-box">
                <div class="card-illustration">
                  <img src="./images/user_04.png" alt="">
                </div>
                <div class="info">
                  <p class="sub-title">${day}, ${exactTime}</p>
                  <p class="info-title">${name}</p>
                  <p class="info-desc">${title}</p>
                </div>
              </div>`;
};

const generateHTML = () => {
  const reviewsHTML = lessons
    .map((lesson) => {
      return getReview(lesson);
    })
    .join("");

  planedLessons.insertAdjacentHTML("afterend", reviewsHTML);
};

const convertMinsToHrsMins = (mins, time) => {
  let h = Math.floor(mins / 60);
  let m = mins % 60;

  m = m < 10 ? "0" + m : m;

  return `${time}:00 - ${time + h}:${m}`;
};

// генерируем разметку при первом заходе на страничку teacher.html
generateHTML();

// для динамического изменения времени в отзывах
// перерисовывает отзывы каждые 15 секунд

// setInterval(() => {
//   document
//     .querySelectorAll(".block__scheduled-lessons div.card-box")
//     .forEach((el) => el.remove());

//   generateHTML();
// }, 15 * 1000);
