import getLocalStorage from "./utils/localStorage.js";
import search from "./utils/search.js";
import hover from "./utils/hover.js";
import { saveUserdata, addFBLoginToMemberBtn } from "./utils/FBLogin.js";

getLocalStorage();
search();
hover();

const FBLogout = () => {
  FB.logout((res) => {
    console.log(res);
  });
  sessionStorage.removeItem("bearerAccessToken");
  window.alert("登出成功！");
  window.location.replace("./");
};

export const loadProfile = (user) => {
  const member = document.querySelector("#member");

  const memberImg = document.createElement("img");
  const memberDetail = document.createElement("div");
  const memberName = document.createElement("h3");
  const memberEmail = document.createElement("h3");
  const logoutBtn = document.createElement("button");

  memberImg.src = user.picture;
  memberImg.alt = "Facebook 大頭貼";
  memberDetail.className = "member__detail";
  memberDetail.src = user.picture;
  memberName.textContent = user.name;
  memberEmail.textContent = user.email;
  logoutBtn.textContent = "登出";
  logoutBtn.onclick = function () {
    FBLogout();
  };

  memberDetail.appendChild(memberName);
  memberDetail.appendChild(memberEmail);
  memberDetail.appendChild(logoutBtn);

  member.appendChild(memberImg);
  member.appendChild(memberDetail);
};

window.fbAsyncInit = function () {
  FB.init({
    appId: "1043285483106412",
    xfbml: true,
    version: "v11.0",
  });

  FB.getLoginStatus(
    (res) => {
      console.log(res);
      if (res.status === "connected") {
        const { accessToken } = res.authResponse;
        saveUserdata("facebook", accessToken);

        addFBLoginToMemberBtn();
      } else {
        window.alert("請先登入會員才能查看會員頁面！");
        window.location.href = "./";
      }
    },
    { scope: "email", auth_type: "rerequest" }
  );
};
