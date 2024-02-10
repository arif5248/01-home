function displayAboutUsData(data) {
    const aboutUsDataContainer = document.getElementById('aboutUsData');

    if (data && data.status) {
        aboutUsDataContainer.innerHTML = `<p>${data.AboutUs[0].About}</p>`;
    } else {
        aboutUsDataContainer.innerHTML = '<p>Error fetching data</p>';
    }
}

window.onload = function() {
    
    fetchData("about01_api", displayAboutUsData);
};