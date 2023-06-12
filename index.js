//находим элементы
const result = document.querySelector(".result"); //создаем переменную, куда будет добавляться результат поиска
const error = document.querySelector(".error"); //создаем переменную, куда будет добавляться ошибка
const btn = document.querySelector(".form__button"); //находим кнопку поиска и присваиваем переменную

const spinner = document.querySelector(".spinner"); //находим разметку для спиннера во время загрузки
spinner.style.display = "none"; //убираем отображение спиннера в обычном режиме

// вешаем обработчик события на кнопку для отправки информации
btn.addEventListener("click", () => {
  spinner.style.display = "block"; //отображаем спиннер загрузки при клике на кнопку
  //очищаем поле вывода результата поиска
  result.innerHTML = "";
  //очищаем поле с сообщением об ошибке
  error.innerHTML = "";

  let find = document.querySelector(".form__find-item").value; //задаем переменную для значения поля option
  let num = document.querySelector(".form__number-item").value; //задаем переменную для значения input number
  //если хотя бы одно из полей незаполнено, выводим сообщение
  if (find === "-Выберите объект-" || num === "") {
    document.querySelector(
      ".form__error"
    ).innerHTML = `<div class="form__error_empty">Пожалуйста, выберите объект и его номер!</div>`;
    spinner.style.display = "none"; //убираем отображение спиннера загрузки
    document.querySelector(".result").innerHTML = ""; //очищаем поле вывода результата поиска
  } else if (num > 10) {
    document.querySelector(
      ".form__error"
    ).innerHTML = `<div class="form__error_empty">Номер объекта должен быть меньше 10! Пожалуйста, выберите другой номер!</div>`;
    spinner.style.display = "none"; //убираем отображение спиннера загрузки
    document.querySelector(".result").innerHTML = ""; //очищаем поле вывода результата поиска
  } else {
    //если оба поля заполнены, очищаем поле вывода ошибки
    document.querySelector(".form__error").innerHTML = "";
  }

  //создаем запрос в API
  fetch("https://swapi.dev/api/" + `${find}` + `/${num}`) //GET запрос по адресу
    .then((response) => {
      //обрабатываем полученные данные
      if (!response.ok) {
        //проверяем, если с данными произошла ошибка
        throw new Error( //создаем новую ошибку и сообщение о ней
          "Извините, мы не смогли ничего найти! Попробуйте еще раз!"
        );
      }
      return response.json(); //возвращаем json с данными
    })
    .then((response) => {
      result.innerHTML = `<p class="result__text">Результат: <span class="result__text-span">${response.name}</span></p>`;
      error.innerHTML = ""; //очищаем сообщение об ошибке
    })
    .catch((error) => {
      //если произошла ошибка, выводим сообщение о ней
      error.innerHTML = `<p class="error__text">${error.message}</p>`;
      document.querySelector(".result").innerHTML = ""; //очищаем поле вывода результата поиска
    })
    .finally(() => {
      spinner.style.display = "none"; //оключаем отображение спиннера загрузки
      document.getElementById("form__find-item").value = "-Выберите объект-"; // возвращаем исходное значение поля
      document.querySelector(".form__number-item").value = ""; // возвращаем исходное значение поля
    });
});
