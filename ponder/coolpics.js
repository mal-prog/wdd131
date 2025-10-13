
const gallery = document.querySelector('.gallery');
const coolpics = document.querySelector('dialog');
const coolpicsImage = coolpics.querySelector('img');
const closeButton = coolpics.querySelector('.close-viewer');

// Event listener for opening the modal
gallery.addEventListener('click', openModal);

function openModal(e) {
    console.log(e.target);
    const img = e.target;

    const src =img.getAttribute('src');
    const alt =img.getAttribute('alt');
    const full = src.replace('sm', 'full');

    coolpicsImage.src = full;
    coolpicsImage.alt = alt;

    coolpics.showModal();
// Code to show modal  - Use event parameter 'e'   
    
}
// Close modal on button click
closeButton.addEventListener('click', () => {
    coolpics.close();
});

// Close modal if clicking outside the image
coolpics.addEventListener('click', (event) => {
    if (event.target === modal) {
        coolpics.close();
    }
});