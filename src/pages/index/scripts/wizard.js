import { saveToStorage } from "./login";

// buttons
const regBtnElem = document.querySelector("#regBtn");
const continueBtnElem = document.querySelector("#toStep2Btn");
const createAccountElem = document.querySelector("#createAccount");

const btnPrevToLogin = document.querySelector("#toLoginSvg");
const btnPrevToStep1 = document.querySelector("#from3to2Svg");

const dotStep1 = document.querySelector("#from1to2");
const dotStep2 = document.querySelector("#from2to1");

// buttons

// bloks

const loginBlock = document.querySelector("#loginBlock");
const step1Block = document.querySelector("#step1Block");
const regBlock = document.querySelector("#regBlock");

// bloks

// forms
const loginFormElem = document.querySelector(".form-user-type");
const regForm = document.querySelector("#regForm");
// forms

// inputs

const inputName = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const passwordNext = document.querySelector("#password_next");

// inputs

const user = {};
const studentsArr = [];

function showStep1Block() {
  step1Block.style.display = "flex";
  regBlock.style.display = "none";
}
function showRegBlog() {
  regBlock.style.display = "flex";
  step1Block.style.display = "none";
}

regBtnElem.addEventListener("click", (e) => {
  step1Block.style.display = "flex";
  loginBlock.style.display = "none";
});

btnPrevToLogin.addEventListener("click", (e) => {
  loginBlock.style.display = "flex";
  step1Block.style.display = "none";
});

continueBtnElem.addEventListener("click", (e) => {
  showRegBlog();

  const userType = loginFormElem.querySelector("input:checked").value;

  if (userType === "student") {
    user.type = userType;
  } else {
    user.type = userType;
  }
});

btnPrevToStep1.addEventListener("click", (e) => {
  showStep1Block();
});

dotStep1.addEventListener("click", (e) => {
  showRegBlog();
});

dotStep2.addEventListener("click", (e) => {
  showStep1Block();
});

createAccountElem.addEventListener("click", (e) => {
  const formData = new FormData(regForm);

  user.name = formData.get("name");
  user.email = formData.get("email");
  user.password = formData.get("password");

  const nameValue = inputName.value.trim();
  const emailValue = email.value.trim();
  const emailRegExp = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gi;

  const [firstName, lastName] = nameValue.split(" ");

  const isValidFullName =
    hasValuesMinLength(3, firstName, lastName) && isString(nameValue);

  const isValidPassword =
    password.value === passwordNext.value &&
    password.value.length >= 3 &&
    passwordNext.value.length >= 3;
  const isValidEmail = emailRegExp.test(emailValue);

  if (!isValidFullName) {
    inputName.classList.add("error");
  } else {
    inputName.classList.remove("error");
  }

  if (!isValidPassword) {
    password.classList.add("error");
    passwordNext.classList.add("error");
  } else {
    password.classList.remove("error");
    passwordNext.classList.remove("error");
  }

  if (!isValidEmail) {
    email.classList.add("error");
  } else {
    email.classList.remove("error");
  }

  if (isValidFullName && isValidPassword && isValidEmail) {
    if (user.type === "teacher") {
      localStorage.setItem("teacher", JSON.stringify(user));
      localStorage.setItem("login", JSON.stringify(user));
      window.location.href = "teacher.html";
    } else if (localStorage.getItem("students")) {
      const data = localStorage.getItem("students");
      const dataParse = JSON.parse(data);
      dataParse.push(user);
      localStorage.setItem("students", JSON.stringify(dataParse));
      localStorage.setItem("login", JSON.stringify(user));
      window.location.href = "student.html";
    } else {
      studentsArr.push(user);
      localStorage.setItem("students", JSON.stringify(studentsArr));
      localStorage.setItem("login", JSON.stringify(user));
      window.location.href = "student.html";
    }

    regForm.reset();
  }
});

function isString(value) {
  return typeof value === "string";
}

const hasValuesMinLength = (len, ...values) => {
  return values.every((el) => el && el.length >= len);
};
