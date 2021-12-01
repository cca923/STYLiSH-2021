import { requestURL } from "./apiURL.js";
import { loadProfile } from "../data-profile.js";

window.fbAsyncInit = function () {
  FB.init({
    appId: "1043285483106412",
    xfbml: true,
    version: "v11.0",
  });
};

const facebookJavaScriptSDK = function (document, script, id) {
  const fbJavaScriptSDK = document.getElementsByTagName(script)[0];
  if (document.getElementById(id)) {
    return;
  }
  const javaScriptTag = document.createElement(script);
  javaScriptTag.id = id;
  javaScriptTag.src = "https://connect.facebook.net/en_US/sdk.js";
  fbJavaScriptSDK.parentNode.insertBefore(javaScriptTag, fbJavaScriptSDK);
};
facebookJavaScriptSDK(document, "script", "facebook-jssdk");

export const saveUserdata = (graphDomain, accessToken) => {
  fetch(
    `${requestURL.host}/${requestURL.request.category.user}/${requestURL.request.description.signin}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        provider: graphDomain,
        access_token: accessToken,
      }),
    }
  )
    .then((res) => res.json())
    .then((res) => {
      const bearerAccessToken = res.data.access_token;
      sessionStorage.setItem("bearerAccessToken", bearerAccessToken);

      const { user } = res.data;
      loadProfile(user);
    })
    .catch((err) => {
      return err;
    });
};

const FBLogin = () => {
  const processChecker = () =>
    new Promise((resolve) => {
      FB.login(
        (res) => {
          resolve(res);
        },
        { scope: "email", auth_type: "rerequest" }
      );
    });

  processChecker().then((res) => {
    if (res.status === "connected") {
      const { accessToken } = res.authResponse;
      saveUserdata("facebook", accessToken);
      window.alert("登入成功！");
    } else if (res.status === "not_authorized" || res.status === "unknown") {
      window.alert("請同意使用 Facebook 登入會員！");
    }
  });
};

const checkLoginStatus = () => {
  const processChecker = () =>
    new Promise((resolve) => {
      FB.getLoginStatus(
        (res) => {
          resolve(res);
        },
        { scope: "email", auth_type: "rerequest" }
      );
    });

  processChecker().then((res) => {
    if (res.status === "connected") {
      const confirm = window.confirm(
        "已登入成功！是否要進入或重新載入會員頁面？"
      );
      if (confirm) {
        window.location.replace("./profile.html");
      }
    } else if (res.status === "not_authorized" || res.status === "unknown") {
      FBLogin();
    }
  });
};

export const addFBLoginToMemberBtn = () => {
  const loginBtn = document.querySelectorAll(".member");
  loginBtn.forEach((btn) => {
    btn.addEventListener("click", checkLoginStatus);
  });
};
