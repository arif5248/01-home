function displayAboutUsData(data) {
    const aboutUsDataContainer = document.getElementById('aboutUsData');

    if (data && data.status) {
        aboutUsDataContainer.innerHTML = `<p>${data.AboutUs[0].About}</p>`;
    } else {
        aboutUsDataContainer.innerHTML = '<p>Error fetching data</p>';
    }
}

function getViewportDimensions() {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    return { height: windowHeight, width: windowWidth };
}
function displayDimensions() {
    const dimensions = getViewportDimensions();
    document.documentElement.style.setProperty('--vh', `${dimensions.height}px`);
    document.documentElement.style.setProperty('--vw', `${dimensions.width}px`);
    console.log(`Height: ${dimensions.height}px`);
    console.log(`Width: ${dimensions.width}px`);
}
window.onload = function() {
    displayDimensions();
    fetchData("about01_api", displayAboutUsData);
};