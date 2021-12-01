import { requestURL } from "./apiURL.js";

const banner = () => {
  const loadBanner = (res) => {
    const banners = document.querySelector("#banners");

    const createBanners = (response) => {
      const bannerData = response.data;

      for (let i = 0; i < bannerData.length; i += 1) {
        const banner = document.createElement("a");
        const bannerCaption = document.createElement("div");

        banner.className = "banner";
        banner.id = bannerData[i].id;
        banner.style = `background-image: url(${bannerData[i].picture})`;
        banner.href = `./product.html?id=${bannerData[i].product_id}`;

        bannerCaption.className = "banner__caption";
        bannerCaption.textContent = bannerData[i].story;

        banner.appendChild(bannerCaption);
        banners.appendChild(banner);
      }
    };
    createBanners(res);

    const createDots = (response) => {
      const bannerData = response.data;
      const dots = document.createElement("div");
      dots.className = "dots";

      for (let j = 0; j < bannerData.length; j += 1) {
        const dot = document.createElement("div");
        dot.className = "dot";
        dot.id = bannerData[j].id;
        dots.appendChild(dot);
      }
      banners.appendChild(dots);
    };
    createDots(res);
  };

  const fetchBanner = (category, type) => {
    fetch(`${requestURL.host}/${category}/${type}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        loadBanner(res);

        let bannerIndex = 0;
        const banners = document.querySelectorAll(".banner");
        const dots = document.querySelectorAll(".dot");

        const autoBanner = () => {
          for (let i = 0; i < dots.length; i += 1) {
            banners[i].classList.remove("banner--active");
            dots[i].classList.remove("dot--active");
          }
          bannerIndex += 1;

          if (bannerIndex > banners.length) {
            bannerIndex = 1;
          }
          banners[bannerIndex - 1].classList.add("banner--active");
          dots[bannerIndex - 1].classList.add("dot--active");
          setTimeout(autoBanner, 5000);
        };
        autoBanner();

        const handleBanner = () => {
          for (let i = 0; i < dots.length; i += 1) {
            const handleSlider = () => {
              const curDot = document.querySelector(".dot--active");
              const curBanner = document.querySelector(".banner--active");
              curDot.classList.remove("dot--active");
              curBanner.classList.remove("banner--active");

              dots[i].classList.add("dot--active");
              banners[i].classList.add("banner--active");
            };
            dots[i].addEventListener("click", handleSlider);
          }
        };
        handleBanner();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchBanner(
    requestURL.request.category.marketing,
    requestURL.request.type.campaigns
  );
};

export default banner;
