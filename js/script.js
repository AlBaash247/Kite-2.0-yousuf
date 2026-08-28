// ==========================================
// THEME SWITCHER
// ==========================================

const root = document.documentElement;
const themeToggle = document.querySelector("#themeToggle");

const savedTheme = localStorage.getItem("softly-theme");

if (savedTheme) {
    root.dataset.theme = savedTheme;
}

function updateThemeButton() {
    const darkTheme = root.dataset.theme === "dark";

    themeToggle.textContent = darkTheme ? "☀" : "☾";

    themeToggle.setAttribute(
        "aria-label",
        `Switch to ${darkTheme ? "light" : "dark"} theme`
    );
}

themeToggle.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";

    localStorage.setItem(
        "softly-theme",
        root.dataset.theme
    );

    updateThemeButton();
});

updateThemeButton();


// ==========================================
// SHOW AND HIDE PASSWORD
// ==========================================

const passwordInput = document.querySelector("#loginPassword");

const showPasswordButton = document.querySelector("#showPasswordButton");

showPasswordButton.addEventListener("click", () => {
    const passwordIsVisible = passwordInput.type === "text";

    passwordInput.type = passwordIsVisible ? "password" : "text";

    showPasswordButton.textContent = passwordIsVisible ? "◉" : "◌";

    showPasswordButton.setAttribute(
        "aria-label",
        passwordIsVisible ? "Show password" : "Hide password"
    );
});
