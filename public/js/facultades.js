async function loadFacultades() {
    const response = await fetch("/facultades");
    const facultades = await response.json();
    const container = document.getElementById("facultades");

    facultades.forEach(facultad => {
        const article = document.createElement("article");
        article.innerHTML = `
            <a href="${facultad.web}" target="blanc"><h3>${facultad.name}</h3></a>
            <p><span>Location: </span>${facultad.location} años</p>
            <p><span>Social: </span><a href="${facultad.social}" target="blanc">${facultad.social}</a></p>
            <p><span>Contact: </span>${facultad.phone}</p>
        `;
        container.appendChild(article);
    });
}

loadFacultades();