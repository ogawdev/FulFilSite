let form__box = document.querySelector('.form-box');
let btn = document.querySelector('.btn');
let fa__x = document.querySelector('.fa-x');

btn.addEventListener('click', () => {
    form__box.classList.add('active')
})
fa__x.addEventListener('click', () => {
    form__box.classList.remove('active')
})

// edit
let button__card__btn = document.querySelector(".button-card__btn");

button__card__btn.addEventListener("click", () => {
  form__box.classList.add("active");
});
// edit