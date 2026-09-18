async function loadCarreras() {
    const response = await fetch("/carreras");
    const carreras = await response.json();
    const container = document.getElementById("carreras");

    carreras.forEach(carrera => {
        const article = document.createElement("article");
        article.innerHTML = `
            <h3>${carrera.carrera}</h3>
            <p><span>Duration: </span>${carrera.durationYears} años</p>
            <p><span>Type: </span>${carrera.type}</p>
            <p><span>Email: </span>${carrera.mail}</p>
        `;
        container.appendChild(article);
    });
}

loadCarreras();