let form__box = document.querySelector('.form-box');
let btn = document.querySelector('.btn');
let fa__x = document.querySelector('.fa-x');

btn.addEventListener('click', () => {
    form__box.classList.add('active')
})
fa__x.addEventListener('click', () => {
    form__box.classList.remove('active')
})