import { requestURL } from "./utils/apiURL.js";
import getLocalStorage from "./utils/localStorage.js";
import search from "./utils/search.js";
import hover from "./utils/hover.js";
import { addFBLoginToMemberBtn } from "./utils/FBLogin.js";

getLocalStorage();
search();
hover();
addFBLoginToMemberBtn();

const titleCount = document.querySelector(".title__count");
const noItem = document.querySelector(".item__empty");

if (!localStorage.getItem("inCart")) {
  localStorage.setItem("inCart", JSON.stringify([]));
  titleCount.textContent = "(0)";
} else {
  titleCount.textContent = `(${
    JSON.parse(localStorage.getItem("inCart")).length
  })`;
}

const inCartArray = JSON.parse(localStorage.getItem("inCart"));

const loadCart = (inCart) => {
  const cartItems = document.querySelector("#items");

  inCart.forEach((item) => {
    const createItem = () => {
      const cartItem = document.createElement("div");
      cartItem.className = "item";

      const createCartItemImg = () => {
        const cartItemImg = document.createElement("img");
        cartItemImg.className = "item__image";
        cartItemImg.src = `${item.img}`;
        cartItemImg.alt = `${item.name}`;
        cartItem.appendChild(cartItemImg);
      };
      createCartItemImg();

      const createCartItemDetail = () => {
        const cartItemDetail = document.createElement("div");
        const cartItemDetailName = document.createElement("div");
        const cartItemDetailId = document.createElement("div");
        const cartItemDetailColor = document.createElement("div");
        const cartItemDetailSize = document.createElement("div");

        cartItemDetail.className = "item__detail";
        cartItemDetailName.className = "item__name";
        cartItemDetailName.textContent = `${item.name}`;
        cartItemDetailId.className = "item__id";
        cartItemDetailId.textContent = `${item.id}`;
        cartItemDetailColor.className = "item__color";
        cartItemDetailColor.textContent = `顏色｜${item.color.name}`;
        cartItemDetailSize.className = "item__size";
        cartItemDetailSize.textContent = `尺寸｜${item.size}`;

        cartItemDetail.appendChild(cartItemDetailName);
        cartItemDetail.appendChild(cartItemDetailId);
        cartItemDetail.appendChild(cartItemDetailColor);
        cartItemDetail.appendChild(cartItemDetailSize);
        cartItem.appendChild(cartItemDetail);
      };
      createCartItemDetail();

      const createCartItemQuantity = () => {
        const cartItemQty = document.createElement("div");
        const cartItemQtyTitle = document.createElement("div");
        const cartItemQtySelect = document.createElement("select");

        cartItemQty.className = "item__quantity";
        cartItemQtyTitle.className = "mobile-text";
        cartItemQtyTitle.textContent = "數量";

        const options = (stock, qty) => {
          for (let i = 1; i <= stock; i += 1) {
            const qtyOption = document.createElement("option");

            qtyOption.value = i;
            qtyOption.textContent = i;
            if (i === Number(qty)) {
              qtyOption.selected = "selected";
            }
            cartItemQtySelect.appendChild(qtyOption);
          }
        };
        options(item.stock, item.qty);

        cartItemQty.appendChild(cartItemQtyTitle);
        cartItemQty.appendChild(cartItemQtySelect);
        cartItem.appendChild(cartItemQty);
      };
      createCartItemQuantity();

      const createCartItemPrice = () => {
        const cartItemPrice = document.createElement("div");
        const cartItemPriceTitle = document.createElement("div");

        cartItemPrice.className = "item__price";
        cartItemPrice.textContent = `NT.${item.price}`;
        cartItemPriceTitle.className = "mobile-text";
        cartItemPriceTitle.textContent = "單價";

        cartItemPrice.insertAdjacentElement("afterbegin", cartItemPriceTitle);
        cartItem.appendChild(cartItemPrice);
      };
      createCartItemPrice();

      const createCartItemSubtotal = () => {
        const cartItemSubtotal = document.createElement("div");
        const cartItemSubtotalPrice = document.createElement("span");
        const cartItemSubtotalTitle = document.createElement("div");

        cartItemSubtotal.className = "item__subtotal";
        cartItemSubtotalPrice.textContent = `NT.${item.price * item.qty}`;
        cartItemSubtotalTitle.className = "mobile-text";
        cartItemSubtotalTitle.textContent = "小計";

        cartItemSubtotal.insertAdjacentElement(
          "afterbegin",
          cartItemSubtotalTitle
        );
        cartItemSubtotal.appendChild(cartItemSubtotalPrice);
        cartItem.appendChild(cartItemSubtotal);
      };
      createCartItemSubtotal();

      const createCartItemRemove = () => {
        const cartItemRemove = document.createElement("div");
        const cartItemRemoveImg = document.createElement("img");

        cartItemRemove.className = "item__remove";
        cartItemRemoveImg.src = "./images/cart-remove.png";
        cartItemRemoveImg.alt = "刪除";

        cartItemRemove.appendChild(cartItemRemoveImg);
        cartItem.appendChild(cartItemRemove);
      };
      createCartItemRemove();

      cartItems.appendChild(cartItem);
    };
    createItem();
  });
};
loadCart(inCartArray);

const items = document.querySelector(".items");
const subtotal = document.querySelector(".subtotal__price");
const freight = document.querySelector(".freight__price");
const total = document.querySelector(".total__price");

const calculator = () => {
  const sum = inCartArray.reduce((acc, item) => acc + item.price * item.qty, 0);

  if (inCartArray.length === 0) {
    subtotal.textContent = 0;
    freight.textContent = 0;
    total.textContent = 0;
  } else {
    subtotal.textContent = sum;
    freight.textContent = 60;
    total.textContent = sum + 60;
  }
};
calculator();

const updateWhenChanging = () => {
  titleCount.textContent = `(${inCartArray.length})`;
  getLocalStorage();

  calculator();
};

const handleChangingQty = (e) => {
  const select = e.target;
  const option = select.value;
  const itemQuantity = select.parentElement;
  const itemChanging = itemQuantity.parentElement;

  const selectOption = document.getElementsByTagName("select");
  const item = document.querySelectorAll(".item");
  const oldCartArray = [...item];

  if (selectOption) {
    const itemChangingIndex = oldCartArray.indexOf(itemChanging);

    const newItemArray = inCartArray.slice(
      itemChangingIndex,
      itemChangingIndex + 1
    );
    const newItem = newItemArray[0];
    newItem.qty = option;
    const newSubtotal = `NT.${newItem.price * newItem.qty}`;

    const newInCartArray = [...inCartArray];
    localStorage.setItem("inCart", JSON.stringify(newInCartArray));

    const itemChangingChildNodes = itemChanging.childNodes;
    itemChangingChildNodes.forEach((el) => {
      const itemChangingChildNode = el;
      if (itemChangingChildNode.classList.contains("item__subtotal")) {
        itemChangingChildNode.childNodes[1].textContent = newSubtotal;
      }
    });

    updateWhenChanging();
  }
};

const handleRemove = (e) => {
  const removeImg = e.target;
  const remove = removeImg.parentElement;
  const itemRemovng = remove.parentElement;

  if (remove.classList.contains("item__remove")) {
    const removeFromCart = window.confirm("確定要從購物車移除嗎？");
    if (removeFromCart) {
      const item = document.querySelectorAll(".item");
      const oldCartArray = [...item];

      const itemRemovngIndex = oldCartArray.indexOf(itemRemovng);
      itemRemovng.remove();
      inCartArray.splice(itemRemovngIndex, 1);
      localStorage.setItem("inCart", JSON.stringify(inCartArray));

      updateWhenChanging();
    }
  }
};

const removeImgUI = () => {
  const removeImg = document.querySelectorAll(".item__remove img");
  removeImg.forEach((el) => {
    const img = el;
    img.addEventListener("mouseenter", () => {
      img.src = "./images/cart-remove-hover.png";
    });

    img.addEventListener("mouseleave", () => {
      img.src = "./images/cart-remove.png";
    });
  });
};
removeImgUI();

items.addEventListener("change", handleChangingQty);
items.addEventListener("click", handleRemove);

const checkoutBtn = document.querySelector("#checkout");
const inputName = document.querySelector("#name");
const inputEmail = document.querySelector("#email");
const inputPhone = document.querySelector("#phone");
const inputAddress = document.querySelector("#address");
const inputTimeGroup = document.querySelectorAll(".time");
const inputTimeGroupArr = [...inputTimeGroup];

const handleSelectingInputTime = () => {
  const selectTime = (e) => {
    inputTimeGroupArr.forEach((item) => item.removeAttribute("checked"));
    e.target.setAttribute("checked", "checked");
  };
  inputTimeGroupArr.forEach((radio) => {
    radio.addEventListener("change", selectTime);
  });
};
handleSelectingInputTime();

const inputTime = () => {
  const checked = inputTimeGroupArr.find((radio) =>
    radio.hasAttribute("checked")
  ).value;
  return checked;
};

const isEmail = (email) => {
  if (email.search(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/) !== -1) {
    return true;
  }
  return false;
};

const isPhone = (phone) => {
  if (!/^09[0-9]{8}$/.test(phone)) {
    return false;
  }
  return true;
};

const convertCartData = (inCart) => {
  const listCartArray = inCart.map((item) => {
    const listItem = {};
    listItem.id = item.id;
    listItem.name = item.name;
    listItem.price = item.price;
    listItem.color = item.color;
    listItem.size = item.size;
    listItem.qty = item.qty;
    return listItem;
  });
  return listCartArray;
};

const loadingAnimation = () => {
  const loading = document.querySelector(".loading");
  const loadingGIF = document.querySelector(".loading__gif");
  loading.classList.add("loading--active");
  loadingGIF.classList.add("loading_gif--active");
  loadingGIF.classList.remove("loading__gif");
};

const removeLoadingAnimation = () => {
  const loading = document.querySelector(".loading");
  const loadingGIF = document.querySelector(".loading__gif");
  loading.classList.remove("loading--active");
  loadingGIF.classList.remove("loading_gif--active");
  loadingGIF.classList.add("loading__gif");
};

const tapPaySetUpSDK = () => {
  TPDirect.setupSDK(
    12348,
    "app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF",
    "sandbox"
  );
};
tapPaySetUpSDK();

const tapPayCardFieldSetUp = () => {
  TPDirect.card.setup({
    fields: {
      number: {
        element: "#card-number",
        placeholder: "**** **** **** ****",
      },
      expirationDate: {
        element: document.getElementById("card-expiration-date"),
        placeholder: "MM / YY",
      },
      ccv: {
        element: "#card-ccv",
        placeholder: "ccv",
      },
    },

    styles: {
      input: {
        color: "gray",
      },
      ":focus": {
        color: "black",
      },
      ".valid": {
        color: "green",
      },
      ".invalid": {
        color: "red",
      },
      "@media screen and (max-width: 400px)": {
        input: {
          color: "orange",
        },
      },
    },
  });
};
tapPayCardFieldSetUp();

const checkOutDetails = (body, bearerAccessToken) => {
  fetch(
    `${requestURL.host}/${requestURL.request.category.order}/${requestURL.request.description.checkout}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerAccessToken}`,
      },
      body: JSON.stringify(body),
    }
  )
    .then((res) => res.json())
    .then((res) => {
      localStorage.removeItem("inCart");
      window.location.href = `./thankyou.html?number=${res.data.number}`;

      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const type = urlParams.get("number");
      if (type) {
        removeLoadingAnimation();
      }
    })
    .catch((err) => {
      return err;
    });
};

const handleCheckOut = (e) => {
  e.preventDefault();

  // 步驟(1)：確認是否已登入會員
  FB.getLoginStatus((res) => {
    if (res.status === "connected") {
      // 步驟(2)：確認購物車及表單填寫狀況
      if (inCartArray.length === 0) {
        window.alert("購物車是空喔！");
      } else if (!inputName.value) {
        window.alert("請輸入收件人姓名");
      } else if (!isEmail(inputEmail.value)) {
        window.alert("Email 有誤");
      } else if (!isPhone(inputPhone.value)) {
        window.alert("手機號碼有誤");
      } else if (!inputAddress.value) {
        window.alert("請輸入收件地址");
      } else {
        // 步驟(3)：取得 TapPay Fields 的 status
        const tappayStatus = TPDirect.card.getTappayFieldsStatus();

        // 步驟(4)：確認是否可以 GetPrime
        if (tappayStatus.canGetPrime === false) {
          if (tappayStatus.status.number !== 0) {
            window.alert("信用卡號碼有誤");
          } else if (tappayStatus.status.expiry !== 0) {
            window.alert("有效期限有誤");
          } else if (tappayStatus.status.cvc !== 0) {
            window.alert("安全碼有誤");
          }
          return;
        }

        // 步驟(5)：確認完畢可以 GetPrime
        TPDirect.card.getPrime((result) => {
          if (result.status !== 0) {
            window.alert("結帳有誤，請洽詢客服");
            return;
          } else {
            const body = {
              prime: result.card.prime,
              order: {
                shipping: "delivery",
                payment: "credit_card",
                subtotal: subtotal.textContent,
                freight: freight.textContent,
                total: total.textContent,
                recipient: {
                  name: inputName.value,
                  phone: inputPhone.value,
                  email: inputEmail.value,
                  address: inputAddress.value,
                  time: inputTime(),
                },
                list: convertCartData(inCartArray),
              },
            };

            const bearerAccessToken =
              sessionStorage.getItem("bearerAccessToken");
            checkOutDetails(body, bearerAccessToken);
            loadingAnimation();
          }
        });
      }
    } else {
      window.alert("請先登入會員再進行結帳喔！");
    }
  });
};

checkoutBtn.addEventListener("click", handleCheckOut);
