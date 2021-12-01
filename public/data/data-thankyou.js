import getLocalStorage from "./utils/localStorage.js";
import search from "./utils/search.js";
import hover from "./utils/hover.js";
import { addFBLoginToMemberBtn } from "./utils/FBLogin.js";

getLocalStorage();
search();
hover();
addFBLoginToMemberBtn();

const queryStringThankyou = window.location.search;
const urlParamsThankyou = new URLSearchParams(queryStringThankyou);
const typeThankyou = urlParamsThankyou.get("number");

const number = document.querySelector("#number");
number.textContent = typeThankyou;
