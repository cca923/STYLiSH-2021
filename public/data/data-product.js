import { requestURL } from "./utils/apiURL.js";
import getLocalStorage from "./utils/localStorage.js";
import search from "./utils/search.js";
import hover from "./utils/hover.js";
import parseColor from "./utils/parseColor.js";
import { addFBLoginToMemberBtn } from "./utils/FBLogin.js";

getLocalStorage();
search();
hover();
addFBLoginToMemberBtn();

const loadProduct = (res) => {
  const product = document.querySelector("#product");
  const detailData = res.data;

  const createMainImg = () => {
    const productMainImg = document.createElement("img");
    productMainImg.className = "product__main-image";
    productMainImg.src = detailData.main_image;
    productMainImg.alt = detailData.title;
    product.appendChild(productMainImg);
  };
  createMainImg();

  const createProductDetail = () => {
    const productDetail = document.createElement("div");
    productDetail.className = "product__detail";

    const createProductTitle = () => {
      const productTitle = document.createElement("div");
      productTitle.className = "product__title";
      productTitle.textContent = detailData.title;
      productDetail.appendChild(productTitle);
    };
    createProductTitle();

    const createProductID = () => {
      const productID = document.createElement("div");
      productID.className = "product__id";
      productID.textContent = detailData.id;
      productDetail.appendChild(productID);
    };
    createProductID();

    const createProductPrice = () => {
      const productPrice = document.createElement("div");
      productPrice.className = "product__price";
      productPrice.textContent = `TWD.${detailData.price}`;
      productDetail.appendChild(productPrice);
    };
    createProductPrice();

    const createProductVariants = () => {
      const productVariants = document.createElement("div");
      productVariants.className = "product__variants";

      const createProductColorVariant = () => {
        const productColorVariant = document.createElement("div");
        const productColorVariantName = document.createElement("div");
        const productColors = document.createElement("div");

        productColorVariant.className = "product__variant";
        productColorVariantName.className = "product__variant-name";
        productColorVariantName.textContent = "顏色";
        productColors.className = "product__colors";
        productColors.id = "colors";

        const productColor = detailData.colors;
        for (let i = 0; i < productColor.length; i += 1) {
          const color = document.createElement("div");
          color.className = "product__color";
          color.style = `background-color: #${productColor[i].code}`;
          productColors.appendChild(color);
        }

        productColorVariant.append(productColorVariantName, productColors);
        productVariants.appendChild(productColorVariant);
      };
      createProductColorVariant();

      const createProductSizeVariant = () => {
        const productSizeVariant = document.createElement("div");
        const productSizeVariantName = document.createElement("div");
        const productSizes = document.createElement("div");

        productSizeVariant.className = "product__variant";
        productSizeVariantName.className = "product__variant-name";
        productSizeVariantName.textContent = "尺寸";
        productSizes.className = "product__sizes";
        productSizes.id = "sizes";

        const productSize = detailData.sizes;
        for (let i = 0; i < productSize.length; i += 1) {
          const size = document.createElement("div");
          size.className = "product__size";
          size.textContent = productSize[i];
          productSizes.appendChild(size);
        }

        productSizeVariant.append(productSizeVariantName, productSizes);
        productVariants.appendChild(productSizeVariant);
      };
      createProductSizeVariant();

      const createProductQuantityVariant = () => {
        const productQuantityVariant = document.createElement("div");
        const productQuantityVariantName = document.createElement("div");
        const productQuantity = document.createElement("div");
        const decreaseProduct = document.createElement("button");
        const quantity = document.createElement("div");
        const increaseProduct = document.createElement("button");

        productQuantityVariant.className = "product__variant";
        productQuantityVariantName.className = "product__variant-name";
        productQuantityVariantName.textContent = "數量";
        productQuantity.className = "product__quantity";

        decreaseProduct.id = "decrement";
        decreaseProduct.textContent = "-";
        quantity.id = "quantity";
        quantity.textContent = "1";
        increaseProduct.id = "increment";
        increaseProduct.textContent = "+";

        productQuantity.append(decreaseProduct, quantity, increaseProduct);
        productQuantityVariant.append(
          productQuantityVariantName,
          productQuantity
        );
        productVariants.append(productQuantityVariant);
      };
      createProductQuantityVariant();

      productDetail.appendChild(productVariants);
    };
    createProductVariants();

    const createAddToCartBtn = () => {
      const addToCart = document.createElement("button");
      addToCart.id = "add-to-cart";
      addToCart.textContent = "加入購物車";
      productDetail.appendChild(addToCart);
    };
    createAddToCartBtn();

    const createProductNote = () => {
      const productNote = document.createElement("div");
      productNote.className = "product__note";
      productNote.textContent = detailData.note;
      productDetail.appendChild(productNote);
    };
    createProductNote();

    const createProductTexture = () => {
      const productTexture = document.createElement("div");
      productTexture.className = "product__texture";
      productTexture.textContent = detailData.texture;
      productDetail.appendChild(productTexture);
    };
    createProductTexture();

    const createProductDescription = () => {
      const productDescription = document.createElement("div");
      productDescription.className = "product__description";
      productDescription.textContent = detailData.description;
      productDetail.appendChild(productDescription);
    };
    createProductDescription();

    const createProductWash = () => {
      const productWash = document.createElement("div");
      productWash.className = "product__wash";
      productWash.textContent = `清洗：${detailData.wash}`;
      productDetail.appendChild(productWash);
    };
    createProductWash();

    const createProductPlace = () => {
      const productPlace = document.createElement("div");
      productPlace.className = "product__place";
      productPlace.textContent = `產地：${detailData.place}`;
      productDetail.appendChild(productPlace);
    };
    createProductPlace();

    product.appendChild(productDetail);
  };
  createProductDetail();

  const createSeperator = () => {
    const seperator = document.createElement("div");
    seperator.className = "seperator";
    seperator.textContent = "更多產品資訊";
    product.appendChild(seperator);
  };
  createSeperator();

  const createStory = () => {
    const productStory = document.createElement("div");
    productStory.className = "product__story";
    productStory.textContent = detailData.story;
    product.appendChild(productStory);
  };
  createStory();

  const createBottomImg = () => {
    const productImg = detailData.images;
    for (let i = 0; i < productImg.length; i += 1) {
      const img = document.createElement("img");
      img.className = "product__image";
      img.src = productImg[i];
      img.alt = detailData.title;
      product.appendChild(img);
    }
  };
  createBottomImg();
};

const handleVariant = (res) => {
  const pageColorsNodeList = document.querySelectorAll(".product__color");
  const pageSizesNodeList = document.querySelectorAll(".product__size");
  const colors = [...pageColorsNodeList];
  const sizes = [...pageSizesNodeList];
  const decrement = document.querySelector("#decrement");
  const increment = document.querySelector("#increment");
  const quantity = document.querySelector("#quantity");

  const productMainImgData = res.data.main_image;
  const productNameData = res.data.title;
  const productIdData = res.data.id;
  const productPriceData = res.data.price;
  const productColorsData = res.data.colors;
  const productVariantsData = res.data.variants;

  const defaultSelected = () => {
    for (let i = 0; i < colors.length; i += 1) {
      colors[0].classList.add("product__color--selected");
      sizes[0].classList.add("product__size--selected");
    }
    const checkForColorSelectedStock = () => {
      colors.forEach((color) => {
        if (color.classList.contains("product__color--selected"))
          productVariantsData.forEach((variant) => {
            if (
              parseColor(color.style.backgroundColor) === variant.color_code &&
              variant.stock === 0
            ) {
              sizes.forEach((noSize) => {
                if (variant.size === noSize.textContent) {
                  noSize.classList.add("product__size--disabled");
                  noSize.classList.remove("product__size--selected");

                  const selectableSize = sizes.filter(
                    (allSize) =>
                      !allSize.classList.contains("product__size--disabled")
                  );
                  const firstSelectableSize = selectableSize[0];
                  firstSelectableSize.classList.add("product__size--selected");
                }
              });
            }
          });
      });
    };
    checkForColorSelectedStock();
  };
  defaultSelected();

  const handleColorSelect = () => {
    colors.forEach((color) => {
      const selectingColor = () => {
        if (color.classList.contains("product__color--selected")) {
          return;
        } else {
          colors.forEach((allColor) => {
            allColor.classList.remove("product__color--selected");
          });
          color.classList.add("product__color--selected");

          const checkForColorSelectedStock = () => {
            if (color.classList.contains("product__color--selected")) {
              productVariantsData.forEach((variant) => {
                if (
                  parseColor(color.style.backgroundColor) ===
                    variant.color_code &&
                  variant.stock === 0
                ) {
                  sizes.forEach((noSize) => {
                    if (variant.size === noSize.textContent) {
                      noSize.classList.add("product__size--disabled");
                      quantity.textContent = 1;

                      const selectableSize = sizes.filter(
                        (allSize) =>
                          !allSize.classList.contains("product__size--disabled")
                      );

                      if (
                        noSize.classList.contains("product__size--selected")
                      ) {
                        noSize.classList.remove("product__size--selected");

                        const firstSelectableSize = selectableSize[0];
                        firstSelectableSize.classList.add(
                          "product__size--selected"
                        );
                      }
                    }
                  });
                } else if (
                  parseColor(color.style.backgroundColor) ===
                    variant.color_code &&
                  variant.stock !== 0
                ) {
                  sizes.forEach((haveSize) => {
                    if (variant.size === haveSize.textContent) {
                      haveSize.classList.remove("product__size--disabled");
                      quantity.textContent = 1;
                    }
                  });
                }
              });
            }
          };
          checkForColorSelectedStock();
        }
      };
      color.addEventListener("click", selectingColor);
    });
  };
  handleColorSelect();

  const handleSizeSelect = () => {
    sizes.forEach((size) => {
      const selectingSize = () => {
        if (!size.classList.contains("product__size--disabled")) {
          if (size.classList.contains("product__size--selected")) {
            return;
          } else {
            sizes.forEach((allSize) => {
              allSize.classList.remove("product__size--selected");
            });
            size.classList.add("product__size--selected");
            quantity.textContent = 1;
          }
        } else {
          return;
        }
      };
      size.addEventListener("click", selectingSize);
    });
  };
  handleSizeSelect();

  const addToCartItemColorCode = () => {
    const colorCodeSelectedArray = colors.filter((color) =>
      color.classList.contains("product__color--selected")
    );
    const colorCodeSelected = colorCodeSelectedArray[0];
    const cartColorCode = parseColor(colorCodeSelected.style.backgroundColor);
    return cartColorCode;
  };

  const addToCartItemColorName = () => {
    const colorNameSelectedArray = productColorsData.filter((color) => {
      if (addToCartItemColorCode() === color.code) {
        return color.name;
      }
      return false;
    });
    const colorNameSelected = colorNameSelectedArray[0];
    const cartColorName = colorNameSelected.name;
    return cartColorName;
  };

  const addToCartItemSize = () => {
    const sizeSelectedArray = sizes.filter((size) =>
      size.classList.contains("product__size--selected")
    );
    const sizeSelected = sizeSelectedArray[0];
    const cartSize = sizeSelected.textContent;
    return cartSize;
  };

  const addToCartItemQuantity = () => {
    const cartQty = Number(quantity.textContent);
    return cartQty;
  };

  const addToCartItemStock = () => {
    const itemSelectedStockArray = productVariantsData.filter((variant) => {
      if (
        addToCartItemColorCode() === variant.color_code &&
        addToCartItemSize() === variant.size
      ) {
        return Number(variant.stock);
      }
      return false;
    });
    const itemSelectedStock = itemSelectedStockArray[0];
    const itemStock = itemSelectedStock.stock;
    return itemStock;
  };

  const handleDecrement = () => {
    const decreaseQuantityNumber = () => {
      if (addToCartItemQuantity() > 1) {
        Number((quantity.textContent -= 1));
      }
    };
    decrement.addEventListener("click", decreaseQuantityNumber);
  };
  handleDecrement();

  const handleIncrement = () => {
    const increaseQuantityNumber = () => {
      if (addToCartItemQuantity() < addToCartItemStock()) {
        let qty = Number(quantity.textContent);
        qty += 1;
        quantity.textContent = qty;
      }
    };
    increment.addEventListener("click", increaseQuantityNumber);
  };
  handleIncrement();

  const handleCart = () => {
    const addToCartBtn = document.querySelector("#add-to-cart");
    const count = document.querySelectorAll(".count");
    const cartCounts = [...count];

    const addToCart = () => {
      const inCartArray = JSON.parse(localStorage.getItem("inCart"));

      const sameItem = () => {
        const itemSelectedIsAlreadyInCartArray = inCartArray.filter(
          (itemAlreadyInCart) => {
            if (
              productIdData === itemAlreadyInCart.id &&
              addToCartItemColorCode() === itemAlreadyInCart.color.code &&
              addToCartItemSize() === itemAlreadyInCart.size
            ) {
              return itemAlreadyInCart;
            }
            return false;
          }
        );

        const itemSelectedIsAlreadyInCart = itemSelectedIsAlreadyInCartArray[0];
        const isSameItem = itemSelectedIsAlreadyInCart;
        return isSameItem;
      };

      if (sameItem()) {
        sameItem().qty = addToCartItemQuantity();

        const diffItemInCartArray = inCartArray.filter(
          (itemAlreadyInCart) =>
            !(
              itemAlreadyInCart.id === productIdData &&
              itemAlreadyInCart.color.code === addToCartItemColorCode() &&
              itemAlreadyInCart.size === addToCartItemSize()
            )
        );

        const newInCartArray = [...diffItemInCartArray, sameItem()];
        localStorage.setItem("inCart", JSON.stringify(newInCartArray));
        window.alert("已加入購物車");
      } else {
        const itemAddToCart = {
          id: productIdData,
          name: productNameData,
          price: productPriceData,
          color: {
            name: addToCartItemColorName(),
            code: addToCartItemColorCode(),
          },
          size: addToCartItemSize(),
          qty: addToCartItemQuantity(),
          img: productMainImgData,
          stock: addToCartItemStock(),
        };

        inCartArray.push(itemAddToCart);
        localStorage.setItem("inCart", JSON.stringify(inCartArray));
        cartCounts.forEach((el) => {
          const cartCount = el;
          cartCount.textContent = inCartArray.length;
        });
        window.alert("已加入購物車");
      }
    };
    addToCartBtn.addEventListener("click", addToCart);
  };
  handleCart();
};

const fetchProduct = (category, description, id) => {
  fetch(`${requestURL.host}/${category}/${description}?id=${id}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      loadProduct(res);
      handleVariant(res);
    })
    .catch((err) => {
      return err;
    });
};

const queryStringProduct = window.location.search;
const urlParamsPro = new URLSearchParams(queryStringProduct);
const productId = urlParamsPro.get("id");

if (queryStringProduct.split("=")[0] === "?id") {
  fetchProduct(
    requestURL.request.category.products,
    requestURL.request.description.details,
    productId
  );
}
