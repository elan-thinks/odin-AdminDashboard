function JSONData() {
    fetch('./projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();  
        })
        .then(data => {
            renderCards(data);
            colorizeCards(); 
        })  
        .catch(error => console.error('Failed to fetch data:', error)); 
}

function renderCards(projects) {
    const cards = document.querySelector('.cards');
    const search = document.getElementById('search').value.toLowerCase();

    cards.innerHTML = projects.map(project => {
        const isMatch = search && project.projectName.toLowerCase().includes(search);
        return `
            <div class="card" style="${isMatch ? 'transform: scale(1.05); boxShadow: 0 0 40px white' : ''}">
                <div class="text">
                    <h3>${project.projectName}</h3>
                    <p>${project.description}</p>
                </div>
                <div class="b-img">
                    <img src="${project.star}" alt="star icon">
                    <img src="${project.seen}" alt="seen icon">
                    <img src="${project.share}" alt="share icon">
                </div>
            </div>
        `;
    }).join('');
}

function colorizeCards() {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        card.style.borderLeft = `8px solid rgb(${red}, ${green}, ${blue})`;
    });
}

JSONData();

// OPTIONAL: Refresh cards on search input
document.getElementById('search').addEventListener('input', JSONData);
