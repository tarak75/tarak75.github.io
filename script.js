document.addEventListener("DOMContentLoaded", function () {
  // Мобильное меню
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      mainNav.classList.toggle("open");
    });

    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
      });
    });
  }

  // Кнопки проектов
  const projectButtons = document.querySelectorAll(".project-btn");
  projectButtons.forEach(btn => {
    btn.addEventListener("click", function () {
      const projectName = this.dataset.project || "Проект";
      alert(`Открытие проекта: ${projectName}\n\nСюда можно поставить ссылку на реальную страницу проекта.`);
    });
  });

  // Форма контактов
  const contactForm = document.getElementById("contactForm");
  const contactMessage = document.getElementById("contactMessage");
  
  if (contactForm) {
    contactForm.addEventListener("submit", function () {
      if (contactMessage) {
        contactMessage.textContent = "Сообщение отправляется...";
        contactMessage.style.color = "#0f8f75";
      }
    });
  }
  
  // Показ/скрытие пароля
  const toggleButtons = document.querySelectorAll(".toggle-password");
  toggleButtons.forEach(btn => {
    btn.addEventListener("click", function () {
      const targetId = this.dataset.target;
      const input = document.getElementById(targetId);

      if (!input) return;

      if (input.type === "password") {
        input.type = "text";
        this.textContent = "🙈";
      } else {
        input.type = "password";
        this.textContent = "👁";
      }
    });
  });

  // Password validation function
  function validatePassword(password) {
    const rules = {
      minLength: /^.{8,}$/,
      uppercase: /[A-Z]/,
      lowercase: /[a-z]/,
      digit: /\d/,
      special: /[!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~]/,
      noSpaces: /^\S+$/,
      allowedChars: /^[A-Za-z\d!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~]+$/
    };

    const errors = [];

    if (!rules.minLength.test(password)) {
      errors.push("Минимум 8 символов");
    }
    if (!rules.uppercase.test(password)) {
      errors.push("Хотя бы 1 заглавная буква");
    }
    if (!rules.lowercase.test(password)) {
      errors.push("Хотя бы 1 строчная буква");
    }
    if (!rules.digit.test(password)) {
      errors.push("Хотя бы 1 цифра");
    }
    if (!rules.special.test(password)) {
      errors.push("Хотя бы 1 специальный символ");
    }
    if (!rules.noSpaces.test(password)) {
      errors.push("Пароль не должен содержать пробелы");
    }
    if (!rules.allowedChars.test(password)) {
      errors.push("Используйте только латинские буквы, цифры и символы");
    }

    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }

  // Вход
  const loginForm = document.getElementById("loginForm");
  const loginMessage = document.getElementById("loginMessage");

  if (loginForm) {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      const emailInput = document.getElementById("loginEmail");
      const remember = document.getElementById("rememberMe");
      emailInput.value = savedEmail;
      remember.checked = true;
    }

    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();
      const remember = document.getElementById("rememberMe").checked;

      if (!email || !password) {
        loginMessage.textContent = "Пожалуйста, заполните email и пароль.";
        loginMessage.style.color = "#d63939";
        return;
      }

      const passwordCheck = validatePassword(password);

      if (!passwordCheck.isValid) {
        loginMessage.innerHTML = "Пароль не соответствует требованиям:<br>• " + passwordCheck.errors.join("<br>• ");
        loginMessage.style.color = "#d63939";
        return;
      }

      if (remember) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      loginMessage.textContent = "Вход выполнен успешно! Форма отправлена.";
      loginMessage.style.color = "#0f8f75";

      alert("Подтверждение: вход выполнен успешно!");

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    });
  }

  // Регистрация
  const registerForm = document.getElementById("registerForm");
  const registerMessage = document.getElementById("registerMessage");

  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("registerName").value.trim();
      const email = document.getElementById("registerEmail").value.trim();
      const password = document.getElementById("registerPassword").value.trim();
      const confirmPassword = document.getElementById("registerConfirmPassword").value.trim();

      if (!name || !email || !password || !confirmPassword) {
        registerMessage.textContent = "Пожалуйста, заполните все поля.";
        registerMessage.style.color = "#d63939";
        return;
      }

      const passwordCheck = validatePassword(password);

      if (!passwordCheck.isValid) {
        registerMessage.innerHTML = "Пароль не соответствует требованиям:<br>• " + passwordCheck.errors.join("<br>• ");
        registerMessage.style.color = "#d63939";
        return;
      }

      if (password !== confirmPassword) {
        registerMessage.textContent = "Пароли не совпадают.";
        registerMessage.style.color = "#d63939";
        return;
      }

      registerMessage.textContent = "Аккаунт успешно создан! Форма отправлена.";
      registerMessage.style.color = "#0f8f75";

      alert("Подтверждение: регистрация прошла успешно!");

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1000);
    });
  }

  // Education buttons
  const educationButtons = document.querySelectorAll(".education-btn");

  educationButtons.forEach(btn => {
    btn.addEventListener("click", function () {
      const type = this.dataset.edu;

      if (type === "school") {
        alert("Школа: Principal Kazi Faruki School\nМестоположение: Lakshmipur\nНаправление: Science");
      }

      if (type === "college") {
        alert("Колледж: Monipur College, Dhaka\nМестоположение: Dhaka\nНаправление: Science");
      }

      if (type === "university") {
        alert("Университет: Российский государственный университет имени А. Н. Косыгина\nМестоположение: Москва\nНаправление: IT в дизайне");
      }
    });
  });

});

function activateTransportButton(button, shouldScroll) {
  rtButtons.forEach(btn => btn.classList.remove("active"));
  button.classList.add("active");

  const city = button.dataset.city;
  renderTransport(city);

  if (shouldScroll) {
      document.getElementById("rtDetailCard").scrollIntoView({
          behavior: "smooth",
          block: "start"
      });
  }
}

rtButtons.forEach(button => {
  button.addEventListener("click", function () {
      activateTransportButton(this, true);
  });

  button.addEventListener("mouseenter", function () {
      activateTransportButton(this, false);
  });
});