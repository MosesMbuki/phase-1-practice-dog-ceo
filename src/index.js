console.log('%c HI', 'color: firebrick')
document.addEventListener('DOMContentLoaded', function () {
    // Challenge 1: Fetch and display random dog images
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const dogImageContainer = document.getElementById('dog-image-container');

    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            data.message.forEach(imgUrl => {
                const img = document.createElement('img');
                img.src = imgUrl;
                img.alt = "Cute dog";
                dogImageContainer.appendChild(img);
            });
        })
        .catch(error => console.error('Error loading images:', error));

    // Challenge 2 & 3: Fetch breeds and make them clickable
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const dogBreedsList = document.getElementById('dog-breeds');
    let allBreeds = []; // Store all breeds for filtering

    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            allBreeds = Object.keys(data.message);
            renderBreeds(allBreeds);

            // Challenge 3: Change color on click
            dogBreedsList.addEventListener('click', function (e) {
                if (e.target.tagName === 'LI') {
                    e.target.style.color = '#ff69b4'; // Change to pink
                }
            });
        })
        .catch(error => console.error('Error loading breeds:', error));

    // Challenge 4: Filter breeds by letter
    const breedDropdown = document.getElementById('breed-dropdown');
    breedDropdown.addEventListener('change', function (e) {
        const letter = e.target.value;
        const filteredBreeds = allBreeds.filter(breed => breed.startsWith(letter));
        renderBreeds(filteredBreeds);
    });

    // Helper function to render breeds list
    function renderBreeds(breeds) {
        dogBreedsList.innerHTML = '';
        breeds.forEach(breed => {
            const li = document.createElement('li');
            li.textContent = breed;
            dogBreedsList.appendChild(li);
        });
    }
});