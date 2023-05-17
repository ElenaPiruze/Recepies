let hungryContainer = document.getElementById("wrapper");
let mealContainer = document.getElementById("meal");
let btn = document.getElementById("btn1");
let url = "https://www.themealdb.com/api/json/v1/1/random.php";

btn.addEventListener("click", () => {
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      createMeal(res.meals[0]);
    });
});

function createMeal(meal) {
  let ingredients = [];
  for (i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - 
                ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  mealContainer.innerHTML = `
       <div class="row">
       <div class="columns">
       <img src="${meal.strMealThumb}" alt="Meal Img">
       <p><strong>Category:<strong>${meal.strCategory}</p>
       <p><strong>Area:<strong>${meal.strArea}</p>
       <p><strong>Tags:<strong>${meal.strTags.split(`,`).join(`, `)}</p>

       <h2>Ingredients:</h2>
       <tbody>
       ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join(``)}
       </tbody>
    </div>
    <div class="columns_two">
    <h2>${meal.strMeal}</h2>
    <p>${meal.strInstructions}</p>
    </div>
</div>
<div class="row2">
      <h2>Video Recipe</h2>
      <div class="video">
      <iframe src="https://www.youtube.com/embed/${meal.strYoutube.slice(
        -11
      )}" width="550px" height="400px" />
      </div>
</div>`;
}
