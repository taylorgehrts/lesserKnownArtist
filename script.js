document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.querySelector('button');
    const searchResults = document.getElementById('search-results');
    const countryDropdown = document.querySelector('select:nth-of-type(1)');
    const yearsDropdown = document.querySelector('select:nth-of-type(2)');

    // Array of random YouTube video URLs
    const videoUrls = [
        "https://www.youtube.com/embed/Wy-v-FgiUD8",
        "https://www.youtube.com/embed/4vZJTBR1tS0?list=PLRg6tOhZiiNdynAdtC976TlJrMoMU2HdZ"  
    ];


    generateButton.addEventListener('click', function() {
        const selectedCountry = countryDropdown.value;
        const selectedYears = yearsDropdown.value;
        
        fetch('mock_data.json')
            .then(response => response.json())
            .then(data => {
                const filteredSongs = data.songs.filter(song => {
                    return (selectedCountry === '' || song.country === selectedCountry) &&
                           (selectedYears === 'years' || song.year === selectedYears);
                });
                displayResults(filteredSongs);
            });
    });

    function displayResults(songs) {
        searchResults.innerHTML = '';
        if (songs.length === 0) {
            searchResults.innerHTML = '<p>No songs found</p>';
        } else {
            songs.forEach(song => {
                const randomVideoUrl = videoUrls[Math.floor(Math.random() * videoUrls.length)];

                const songElement = document.createElement('div');
                songElement.classList.add('song');
                songElement.innerHTML = `
                    <p class="artist">${song.artist}</p>
                    <p class="title">${song.title}</p>
                    <p><strong>Country:</strong> ${song.country}</p>
                    <p><strong>Year:</strong> ${song.year}</p>
                    <iframe class="video" src="${randomVideoUrl}" frameborder="0" allowfullscreen></iframe>
                    <div class="links">
                        <a href="#">Spotify</a>
                        <a href="#">YouTube</a>
                    </div>
                `;
                searchResults.appendChild(songElement);
            });
        }
    }
});
