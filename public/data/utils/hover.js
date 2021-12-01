const hover = () => {
  const cartImgUI = () => {
    const cartImg = document.querySelector(".laptop-header .cart img");
    cartImg.addEventListener("mouseenter", () => {
      cartImg.src = "./images/cart-hover.png";
    });

    cartImg.addEventListener("mouseleave", () => {
      cartImg.src = "./images/cart.png";
    });
  };
  cartImgUI();

  const memberImgUI = () => {
    const memberImg = document.querySelector(".laptop-header .member img");
    memberImg.addEventListener("mouseenter", () => {
      memberImg.src = "./images/member-hover.png";
    });

    memberImg.addEventListener("mouseleave", () => {
      memberImg.src = "./images/member.png";
    });
  };
  memberImgUI();
};

export default hover;
