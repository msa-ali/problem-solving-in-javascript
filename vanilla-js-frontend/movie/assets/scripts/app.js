const movies = [];

const showModal = () => {
    const addModal = document.getElementById("add-modal");

    if(addModal) {
        addModal.classList.add("visible");
        toggleBackdrop();
    }
};

const hideModal = () => {
    const addModal = document.getElementById("add-modal");

    if(addModal) {
        addModal.classList.remove("visible");
        toggleBackdrop();
    }
};

const toggleMovieModal = () => {
    const addModal = document.getElementById("add-modal");
    addModal.classList.toggle('visible');
    toggleBackdrop();
}

// selecting header button

// method 1 
// const addMovieHeaderButton = document.querySelector("header button");

// method 2 
// const addMovieHeaderButton = document.querySelector("header").lastElementChild;

// adding event listener
// addMovieHeaderButton.addEventListener('click', showModal);


const backdrop = document.getElementById('backdrop');
// const backdrop = document.body.firstElementChild;

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
}

backdrop.addEventListener('click', toggleBackdrop);

const inputs = document.querySelectorAll('input');

const addMovieHandler = () => {
    const titleValue = inputs[0].value;
    const imageURLValue = inputs[1].value;
    const ratingsValue = inputs[2].value;

    if(titleValue.trim() === '' || imageURLValue.trim() === '' || ratingsValue.trim() === '' || +ratingsValue < 1 || +ratingsValue > 5 ) {
        alert('Please enter the valid form values');
        return;
    }

    const newMovie = {
        title: titleValue,
        imageURL: imageURLValue,
        ratings: ratingsValue,
    }

    movies.push(newMovie);
    toggleMovieModal();
    clearMovieInputs();
}

const clearMovieInputs = () => {
    for(const input of inputs) {
        input.value = "";
    }
}

const updateUI = () => {
    
}

