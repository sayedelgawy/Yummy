export default class DisplayContent {
  constructor() {
    this.content = ``;
  }

  displayMeals = (arr) => {
    if (arr) {
      let newArr = arr.splice(0, 20);

      for (let i = 0; i < newArr.length; i++) {
        this.content += `
        <div class="col-md-3">
            <div data-id="${newArr[i].idMeal}"  class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${newArr[i].strMealThumb}" alt="${newArr[i].strMeal}">
                <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                    <h3>${newArr[i].strMeal}</h3>
                </div>
            </div>
        </div>
    `;
      }
    }

    return this.content;
  };

  displaySearchedMeals = (arr) => {
    if (arr) {
        let newArr = arr.splice(0, 20);
      for (let i = 0; i < newArr.length; i++) {
        this.content += `<div class="col-md-3">
              <div data-id="${newArr[i].idMeal}" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                  <img class="w-100" src="${newArr[i].strMealThumb}" alt="${newArr[i].strMeal}">
                  <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                      <h3>${newArr[i].strMeal}</h3>
                  </div>
              </div>
          </div>`;
      }
    }

    return this.content;
  };

  displayMealDetails(meal) {
    let ingredients = ``;

    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients += `<li class="alert alert-info m-2 p-1">${
          meal[`strMeasure${i}`]
        } ${meal[`strIngredient${i}`]}</li>`;
      }
    }

    let tags = meal.strTags?.split(",");
    // let tags = meal.strTags.split(",")
    if (!tags) tags = [];

    let tagsStr = "";
    for (let i = 0; i < tags.length; i++) {
      tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
    }

    this.content = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2 class="text-white">${meal.strMeal}</h2>
            </div>
            <div class="col-md-8 text-white">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`;

    return this.content;
  };

  displayCategories(arr) {
    if (arr) {
      for (let i = 0; i < arr.length; i++) {
        this.content += `
            <div class="col-md-3">
                    <div data-id="${
                      arr[i].strCategory
                    }" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img class="w-100" src="${
                          arr[i].strCategoryThumb
                        }" alt="" srcset="">
                        <div class="meal-layer position-absolute text-center text-black p-2">
                            <h3>${arr[i].strCategory}</h3>
                            <p>${arr[i].strCategoryDescription
                              .split(" ")
                              .slice(0, 20)
                              .join(" ")}</p>
                        </div>
                    </div>
            </div>
            `;
      }
    }

    return this.content;
  };

  displayAreas(arr) {
    if (arr) {
      for (let i = 0; i < arr.length; i++) {
        this.content += `
            <div class="col-md-3">
                    <div data-id="${arr[i].strArea}" class="area rounded-2 text-center cursor-pointer text-white">
                            <i class="fa-solid fa-house-laptop fa-4x"></i>
                            <h3>${arr[i].strArea}</h3>
                    </div>
            </div>
            `;
      }
    }
    return this.content;
  };

  displayIngredients(arr){
    let newArr = arr.splice(0,20)
    if(newArr){
        for (let i = 0; i < newArr.length; i++) {
            this.content += `
            <div class="col-md-3">
                    <div data-id="${newArr[i].strIngredient}" class="ingredient rounded-2 text-center cursor-pointer text-white">
                            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                            <h3>${newArr[i].strIngredient}</h3>
                            <p>${newArr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
            </div>
            `
        }
    }
    return this.content;
  };

  displayCon(){
    this.content =` <div
    class="contact min-vh-100 d-flex justify-content-center align-items-center"
  >
    <div class="container w-75 text-center">
      <div class="row g-4">
        <div class="col-md-6">
          <input
            id="nameInput"
            
            type="text"
            class="form-control"
            placeholder="Enter Your Name"
          />
          <div
            id="nameAlert"
            class="alert alert-danger w-100 mt-2 d-none"
          >
            Special characters and numbers not allowed
          </div>
        </div>
        <div class="col-md-6">
          <input
            id="emailInput"
           
            type="email"
            class="form-control"
            placeholder="Enter Your Email"
          />
          <div
            id="emailAlert"
            class="alert alert-danger w-100 mt-2 d-none"
          >
            Email not valid *exemple@yyy.zzz
          </div>
        </div>
        <div class="col-md-6">
          <input
            id="phoneInput"
           
            type="text"
            class="form-control"
            placeholder="Enter Your Phone"
          />
          <div
            id="phoneAlert"
            class="alert alert-danger w-100 mt-2 d-none"
          >
            Enter valid Phone Number
          </div>
        </div>
        <div class="col-md-6">
          <input
            id="ageInput"
           
            type="number"
            class="form-control"
            placeholder="Enter Your Age"
          />
          <div
            id="ageAlert"
            class="alert alert-danger w-100 mt-2 d-none"
          >
            Enter valid age
          </div>
        </div>
        <div class="col-md-6">
          <input
            id="passwordInput"
            
            type="password"
            class="form-control"
            placeholder="Enter Your Password"
          />
          <div
            id="passwordAlert"
            class="alert alert-danger w-100 mt-2 d-none"
          >
            Enter valid password *Minimum eight characters, at least one
            letter and one number:*
          </div>
        </div>
        <div class="col-md-6">
          <input
            id="repasswordInput"
            
            type="password"
            class="form-control"
            placeholder="Repassword"
          />
          <div
            id="repasswordAlert"
            class="alert alert-danger w-100 mt-2 d-none"
          >
            Enter valid repassword
          </div>
        </div>
      </div>
      <button
        id="submitBtn"
        disabled=""
        class="btn btn-outline-danger px-2 mt-3"
      >
        Submit
      </button>
    </div>
  </div>`;
    return this.content;
  };
}
