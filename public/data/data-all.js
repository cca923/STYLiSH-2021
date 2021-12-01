import { requestURL } from "./utils/apiURL.js";
import getLocalStorage from "./utils/localStorage.js";
import search from "./utils/search.js";
import hover from "./utils/hover.js";
import banner from "./utils/banner.js";
import { addFBLoginToMemberBtn } from "./utils/FBLogin.js";

getLocalStorage();
search();
hover();
banner();
addFBLoginToMemberBtn();

const loadProducts = (res, category, type) => {
  let productCount = 0;

  const createProducts = (response) => {
    const products = document.querySelector("#products");
    const productData = response.data;

    if (!productData.length) {
      const noProduct = document.querySelector("#no-product");
      noProduct.style.height = "30vh";
      noProduct.textContent = "搜尋不到產品喔";
    }

    for (let i = 0; i < productData.length; i += 1) {
      const product = document.createElement("a");
      const productImg = document.createElement("img");
      const productColors = document.createElement("div");
      const productTitle = document.createElement("div");
      const productPrice = document.createElement("div");

      product.className = "product";
      product.href = `./product.html?id=${productData[i].id}`;

      productImg.src = productData[i].main_image;
      productImg.alt = productData[i].title;

      productColors.className = "product__colors";

      const productColor = productData[i].colors;
      for (let j = 0; j < productColor.length; j += 1) {
        const color = document.createElement("div");
        color.className = "product__color";
        color.style = `background-color: #${productColor[j].code}`;
        productColors.appendChild(color);
      }

      productTitle.className = "product__title";
      productTitle.textContent = productData[i].title;

      productPrice.className = "product__price";
      productPrice.textContent = `TWD.${productData[i].price}`;

      product.append(productImg, productColors, productTitle, productPrice);
      productCount += 1;

      products.appendChild(product);
    }
  };

  const loadMoreProducts = () => {
    const target = document.querySelector("#no-product");
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!productCount) {
            createProducts(res);
          } else if (res.next_paging) {
            // eslint-disable-next-line no-use-before-define
            fetchProducts(category, type, res.next_paging);
            observer.unobserve(entry.target);
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback, {
      root: null,
      threshold: 0.5,
    });
    observer.observe(target);
  };
  loadMoreProducts();
};

const fetchProducts = (category, type, option = 0) => {
  fetch(`${requestURL.host}/${category}/${type}?paging=${option}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      loadProducts(res, category, type);
    })
    .catch((err) => {
      return err;
    });
};

const searchProducts = (category, description, input, option = 0) => {
  fetch(
    `${requestURL.host}/${category}/${description}?keyword=${input}&paging=${option}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((res) => {
      loadProducts(res, category, description);
    })
    .catch((err) => {
      return err;
    });
};

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const type = urlParams.get("tag");

if (!queryString) {
  fetchProducts(
    requestURL.request.category.products,
    requestURL.request.type.all
  );
} else if (type === "women") {
  fetchProducts(
    requestURL.request.category.products,
    requestURL.request.type.women
  );
} else if (type === "men") {
  fetchProducts(
    requestURL.request.category.products,
    requestURL.request.type.men
  );
} else if (type === "accessories") {
  fetchProducts(
    requestURL.request.category.products,
    requestURL.request.type.accessories
  );
} else {
  searchProducts(
    requestURL.request.category.products,
    requestURL.request.description.search,
    type
  );
}

if (queryString.split("=")[0] === "?tag") {
  if (!type) {
    window.location.replace("./");
  }
}
