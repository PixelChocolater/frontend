const darkModeBtn = document.getElementById('btn-dark');

darkModeBtn.addEventListener('click', () => {
    if (darkModeBtn.classList.contains('btn__darkmode--dark')) {
        darkModeBtn.classList.remove('btn__darkmode--dark');
        document.documentElement.setAttribute("data-theme", "dark");
        darkModeBtn.innerHTML('Dark');
    } else {
        darkModeBtn.classList.add('btn__darkmode--dark');
        document.documentElement.removeAttribute("data-theme");
        darkModeBtn.innerHTML('Light');
    }
});

const form = document.querySelector('.form');
const formInputs = document.querySelectorAll('.form__input');
const formData = {};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    formInputs.forEach(input => {
        let dataTitle = input.name;

        if (input.name === 'file') {
            formData[dataTitle] = input.files[0];
            return;
        }

        formData[dataTitle] = input.value;
    });

    handleSubmit(formData);
})

const handleSubmit = (formData) => {
    const itemData = {
        title: formData.title,
        description: formData.description
    }
    const fileData = new FormData();
    fileData.append('image', formData.file);

    itemFetchHandler(itemData, fileData);
}

const itemFetchHandler = (itemData, fileData) => {
    fetch('http://localhost:8080/items', {
        method: 'post',
        body: JSON.stringify(itemData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.id) {
            fileData.append('name', data.id);
            fileFetchHandler(fileData);
        } else {
            window.alert("Une erreur est survenue lors de l'insertion");
        }
    })
    .catch(error => {
        console.log(error);
    });
}

const fileFetchHandler = (fileData) => {
    fetch('http://localhost:8080/upload', {
        method: 'post',
        body: fileData
    })
    .catch(error => {
        console.log(error);
    });
}