const search = () => {
  const searchInput = document.querySelector(".search--inactive");
  document.body.addEventListener("click", (e) => {
    if (e.target !== searchInput) {
      searchInput.classList.add("search--inactive");
      searchInput.classList.remove("search-input");
    } else {
      searchInput.classList.remove("search--inactive");
      searchInput.classList.add("search-input");
    }
  });
};

export default search;
