const data = async () => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const jsonData = await res.json();
    return jsonData;
  } catch (err) {
    console.error(err);
  }
};

const fetchData = async () => {
  const result = await data();
  return result;
};

const accordionWrapper = document.querySelector(".accordion");

const createAccordionData = async () => {
  const fetchedData = await fetchData();

  if (!fetchedData) {
    console.error("Failed to fetch data.");
    return;
  }

  accordionWrapper.innerHTML = fetchedData
    .map(
      (dataItem) => `
          <div class="accordionItem">
            <div class="accordionTitle">
              <h4>${dataItem.username}</h4>
              <i class="fa-solid fa-arrow-up"></i>
            </div>
            <div class="accordion_content">
              <p>Street: ${dataItem.address.street}</p>
              <p>Zip code: ${dataItem.address.zipcode}</p>
            </div>
          </div>
        `
    )
    .join("");

  const getTitles = document.querySelectorAll(".accordionTitle");
  getTitles.forEach((currentItem) => {
    currentItem.addEventListener("click", () => {
      const content = currentItem.nextElementSibling;
      const icon = currentItem.querySelector("i");

      if (currentItem.classList.contains("active")) {
        currentItem.classList.remove("active");
        content.style.maxHeight = "0";
        content.style.opacity = "0";
      } else {
        getTitles.forEach((item) => {
          item.classList.remove("active");
          item.nextElementSibling.style.maxHeight = "0";
          item.nextElementSibling.style.opacity = "0";
        });
        currentItem.classList.add("active");
        content.style.maxHeight = `${content.scrollHeight}px`;
        content.style.opacity = "1";
      }
    });
  });
};

createAccordionData();
