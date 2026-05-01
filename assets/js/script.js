'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    if (this.classList.contains("achievement-post-item")) {
      modalContainer.classList.add("achievement-modal");
    } else {
      modalContainer.classList.remove("achievement-modal");
    }

    testimonialsModalFunc();

  });

}

// add click event to modal close button
if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const selects = document.querySelectorAll("[data-select]");

for (let i = 0; i < selects.length; i++) {
  const select = selects[i];
  const selectItems = select.parentNode.querySelectorAll("[data-select-item]");
  const selectValue = select.querySelector("[data-selecct-value]");

  select.addEventListener("click", function () { elementToggleFunc(this); });

  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue, select.closest('article'));
    });
  }
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue, parent = document) {
  const items = parent.querySelectorAll("[data-filter-item]");
  for (let i = 0; i < items.length; i++) {
    if (selectedValue === "all") {
      items[i].classList.add("active");
    } else if (selectedValue === items[i].dataset.category) {
      items[i].classList.add("active");
    } else {
      items[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
const filterBtns = document.querySelectorAll("[data-filter-btn]");

for (let i = 0; i < filterBtns.length; i++) {
  filterBtns[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    filterFunc(selectedValue, this.closest('article'));

    // Find the parent list and update active state only for buttons in that list
    const parentList = this.closest('.filter-list');
    if (parentList) {
      const sibs = parentList.querySelectorAll("[data-filter-btn]");
      for (let j = 0; j < sibs.length; j++) {
        sibs[j].classList.remove("active");
      }
      this.classList.add("active");
    }
  });
}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
if (form) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {

      // check form validation
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }

    });
  }
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

// theme toggle functionality
const themeBtn = document.querySelector("[data-theme-btn]");

themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("light-mode");
  
  // save preference
  if (document.body.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
});

// check for saved theme on load
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
}