function displayAboutUsData(data) {
    const aboutUsDataContainer = document.getElementById('aboutUsData');

    if (data && data.status) {
        aboutUsDataContainer.innerHTML = `<p>${data.AboutUs[0].About}</p>`;
    } else {
        aboutUsDataContainer.innerHTML = '<p>Error fetching data</p>';
    }
}
async function about01(){
    const data = await getAbout01()
    displayAboutUsData(data)
}

window.onload = function() {
    about01()
};