const getLocalStorage = () => {
  const count = document.querySelectorAll(".count");
  const cartCounts = [...count];

  if (!localStorage.getItem("inCart")) {
    localStorage.setItem("inCart", JSON.stringify([]));
    cartCounts.forEach((el) => {
      const cartCount = el;
      cartCount.textContent = 0;
    });
  } else {
    cartCounts.forEach((el) => {
      const cartCount = el;
      cartCount.textContent = JSON.parse(localStorage.getItem("inCart")).length;
    });
  }
};

export default getLocalStorage;
