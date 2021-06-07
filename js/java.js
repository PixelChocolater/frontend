const darkModeBtn = document.getElementById('btn-dark');

darkModeBtn.addEventListener('click', () => {
    if (darkModeBtn.classList.contains('btn__darkmode--dark')) {
        darkModeBtn.classList.remove('btn__darkmode--dark');
        document.documentElement.setAttribute("data-theme", "dark");
        darkModeBtn.innerText('Dark');
    } else {
        darkModeBtn.classList.add('btn__darkmode--dark');
        document.documentElement.removeAttribute("data-theme");
        darkModeBtn.innerText('Light');
    }
});