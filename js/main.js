import DisplayContent from "./display.js";
import FetchData from "./fetch.js";
//<--------------------------variables and general methods------------------------------>
const rowData = document.getElementById("rowData");
let boxWidth = $(".nav-tab").outerWidth();

// update nav bar position accrording to boxwidth method
function updateNavbarPosition() {
  boxWidth = $(".nav-tab").outerWidth();
  $("#navbar").css({ left: `-${boxWidth}px` });
}

//animate and open nav method
function openNavBar() {
  $(".open-btn").addClass("d-none");
  $("#navbar").animate({ left: "0" });
  $(".close-btn").removeClass("d-none");
  $("#navbar .nav-tab .links").animate({ top: "0" });
  $(".first-link-in-links").animate({ top: "0" }, 50, function () {
    $(".second-link-in-links").animate({ top: "0" }, 70, function () {
      $(".third-link-in-links").animate({ top: "0" }, 90, function () {
        $(".fourth-link-in-links").animate({ top: "0" }, 110, function () {
          $(".fifth-link-in-links").animate({ top: "0" }, 130);
        });
      });
    });
  });
}

//animate and close nav method
function closeNavBar() {
  $(".close-btn").addClass("d-none");
  $("#navbar").animate({ left: `-${boxWidth}px` });
  $(".open-btn").removeClass("d-none");
  $("#navbar .nav-tab .links li").animate({ top: "12.5rem" });
  $("#navbar .nav-tab .links").animate({ top: "12.5rem" });
}

//inner spiner start method
function innerSpinnerStartMethod() {
  $(".inner-loading-screen").removeClass("d-none");
  $("#parentOfcontent").css({ overflow: "hidden" });
}

//inner spiner end method
function innerSpinnerEndMethod() {
  $(".inner-loading-screen").addClass("d-none");
  $("#parentOfcontent").css({ overflow: "visible" });
}

//<--------------------------navbar------------------------------>

//positioning the nav at every resize to screen
$(window).resize(function () {
  updateNavbarPosition();
});

//event to open navbar
$(".open-btn").click(function () {
  openNavBar();
});

//event to close navbar
$(".close-btn").click(function () {
  closeNavBar();
});
//<--------------------------/navbar------------------------------>

//--------------------- home page----------------------
//run this at the first home page
$(document).ready(() => {
  searchByName("").then(() => {
    $(".outer-loading-screen").addClass("d-none");
    $("#website-container").css({ overflow: "visible" });
  });
});
//-------------------- /home page--------------------

//-------------------- search page--------------------
//if search link is clicked
$(".first-link-in-links").click(function () {
  closeNavBar();
  $("#searchContainer").removeClass("d-none");
  rowData.innerHTML = ``;
});

async function searchByName(term) {
  innerSpinnerStartMethod();

  closeNavBar();

  const getMeals = new FetchData();

  const displayedContent = new DisplayContent();

  const data = await getMeals.getData(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );

  const content = displayedContent.displaySearchedMeals(data.meals);

  rowData.innerHTML = content;

  innerSpinnerEndMethod();

  $(".meal").click(function (e) {
    let id = $(this).data("id");
    mealDetails(id);
  });
}

async function searchByFLetter(term) {
  innerSpinnerStartMethod();

  closeNavBar();

  const getMeals = new FetchData();

  const displayedContent = new DisplayContent();

  const data = await getMeals.getData(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );

  const content = displayedContent.displaySearchedMeals(data.meals);

  rowData.innerHTML = content;
  innerSpinnerEndMethod();

  $(".meal").click(function (e) {
    let id = $(this).data("id");
    mealDetails(id);
  });
}

$("#searchByNameInput").on("keyup", function () {
  searchByName($(this).val());
});

$("#searchByLetterInput").on("keyup", function () {
  if ($(this).val()) {
    searchByFLetter($(this).val());
  }
});
//-------------------- /search page--------------------

//-------------------- meal detail page--------------------
async function mealDetails(id) {
  innerSpinnerStartMethod();

  closeNavBar();

  const getMeals = new FetchData();

  const displayedContent = new DisplayContent();

  const data = await getMeals.getData(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  const content = displayedContent.displayMealDetails(data.meals[0]);

  rowData.innerHTML = content;

  innerSpinnerEndMethod();
}
//-------------------- /meal detail page--------------------

//-------------------- Categories page--------------------
async function categories() {
  innerSpinnerStartMethod();

  closeNavBar();

  const getMeals = new FetchData();

  const displayedContent = new DisplayContent();

  const data = await getMeals.getData(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );

  const content = displayedContent.displayCategories(data.categories);

  rowData.innerHTML = content;

  $(".meal").click(function (e) {
    let id = $(this).data("id");
    singleCategory(id);
  });

  innerSpinnerEndMethod();
}

async function singleCategory(id) {
  innerSpinnerStartMethod();

  closeNavBar();

  const getMeals = new FetchData();

  const displayedContent = new DisplayContent();

  const data = await getMeals.getData(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`
  );

  const content = displayedContent.displayMeals(data.meals);

  rowData.innerHTML = content;

  $(".meal").click(function (e) {
    let id = $(this).data("id");
    mealDetails(id);
  });

  innerSpinnerEndMethod();
}

$(".second-link-in-links").click(function () {
  closeNavBar();
  $("#searchContainer").addClass("d-none");
  categories();
});
//-------------------- /Categories page--------------------

//-------------------- Area page--------------------
async function areas() {
  innerSpinnerStartMethod();

  closeNavBar();

  const getMeals = new FetchData();

  const displayedContent = new DisplayContent();

  const data = await getMeals.getData(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );

  const content = displayedContent.displayAreas(data.meals);

  rowData.innerHTML = content;

  $(".area").click(function (e) {
    let id = $(this).data("id");
    mealArea(id);
  });

  innerSpinnerEndMethod();
}

async function mealArea(id) {
  innerSpinnerStartMethod();

  closeNavBar();

  const getMeals = new FetchData();

  const displayedContent = new DisplayContent();

  const data = await getMeals.getData(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${id}`
  );

  const content = displayedContent.displayMeals(data.meals);

  rowData.innerHTML = content;

  $(".meal").click(function (e) {
    let id = $(this).data("id");
    mealDetails(id);
  });

  innerSpinnerEndMethod();
}

$(".third-link-in-links").click(function () {
  closeNavBar();
  $("#searchContainer").addClass("d-none");
  areas();
});

//-------------------- /Area page--------------------

//-------------------- ingredients page--------------------

async function ingredients() {
  innerSpinnerStartMethod();

  closeNavBar();

  const getMeals = new FetchData();

  const displayedContent = new DisplayContent();

  const data = await getMeals.getData(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );

  const content = displayedContent.displayIngredients(data.meals);

  rowData.innerHTML = content;

  $(".ingredient").click(function (e) {
    let id = $(this).data("id");
    IngredientMeals(id);
  });

  innerSpinnerEndMethod();
}

async function IngredientMeals(ingredient) {
  innerSpinnerStartMethod();

  closeNavBar();

  const getMeals = new FetchData();

  const displayedContent = new DisplayContent();

  const data = await getMeals.getData(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );

  const content = displayedContent.displayMeals(data.meals);

  rowData.innerHTML = content;

  $(".meal").click(function (e) {
    let id = $(this).data("id");
    mealDetails(id);
  });

  innerSpinnerEndMethod();
}
$(".fourth-link-in-links").click(function () {
  closeNavBar();
  $("#searchContainer").addClass("d-none");
  ingredients();
});
//-------------------- /ingredients page-----------------

//------------validation--------------------
function validateName(value) {
  return /^[a-zA-Z ]+$/.test(value);
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePhone(value) {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    value
  );
}

function validateAge(value) {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(value);
}

function validatePassword(value) {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(value);
}

function validateRepassword(value1, value2) {
  return value1 == value2;
}
//------------/validation--------------------

//-------------------- contact us--------------------
function displayContact() {
  innerSpinnerStartMethod();
  closeNavBar();
  const displayedContent = new DisplayContent();
  const content = displayedContent.displayCon();
  rowData.innerHTML = content;
  innerSpinnerEndMethod();
  let submitBtn = document.getElementById("submitBtn");

  $("#nameInput").on("keyup", function () {
    if (validateName($("#nameInput").val())) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  });

  $("#emailInput").on("keyup", function () {
    if (validateEmail($("#emailInput").val())) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  });

  $("#phoneInput").on("keyup", function () {
    if (validatePhone($("#phoneInput").val())) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  });

  $("#ageInput").on("keyup", function () {
    if (validateAge($("#ageInput").val())) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
    }
  });

  $("#passwordInput").on("keyup", function () {
    if (validatePassword($("#passwordInput").val())) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
    }
  });

  $("#repasswordInput").on("keyup", function () {
    if (
      validateRepassword($("#repasswordInput").val(), $("#passwordInput").val())
    ) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-none", "d-block");
    }
  });

  $(".form-control").on("keyup", function () {
    if (
      validateName($("#nameInput").val()) &&
      validateEmail($("#emailInput").val()) &&
      validatePhone($("#phoneInput").val()) &&
      validateAge($("#ageInput").val()) &&
      validatePassword($("#passwordInput").val()) &&
      validateRepassword($("#repasswordInput").val(), $("#passwordInput").val())
    ) {
      submitBtn.removeAttribute("disabled");
    } else {
      submitBtn.setAttribute("disabled", true);
    }
  });
}

$(".fifth-link-in-links").click(function () {
  closeNavBar();
  $("#searchContainer").addClass("d-none");
  displayContact();
});
//-------------------- /contact us--------------------


