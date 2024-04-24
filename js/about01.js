function displayAboutUsData(data) {
    const aboutUsDataContainer = document.getElementById('aboutUsData');

    if (data && data.status) {
        aboutUsDataContainer.innerHTML = `<p>${data.Description[0].value}</p>`;
    } else {
        aboutUsDataContainer.innerHTML = '<p>Error fetching data</p>';
    }
}
function renderOfficeLocation(data){
    let officeLocationData = []

    const registerdOffilceLocationSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.812037030497!2d91.8187924743465!3d22.360725040704335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd88fed100001%3A0xbcfc2eb540c77d83!2sGolden%20Plaza!5e0!3m2!1sen!2sbd!4v1711783990415!5m2!1sen!2sbd"
    const businessOffilceLocationSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.795860882531!2d91.81038917434653!3d22.361335640682125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd9ce9730d49d%3A0x7354414937c0c947!2s01%20Limited!5e0!3m2!1sen!2sbd!4v1711784176671!5m2!1sen!2sbd"

    if(data.status === true){
        officeLocationData = data.officeList
    }
    const div = document.getElementById('officeLocation')
    officeLocationData.forEach(item => {
        const newDiv = document.createElement('div')
        newDiv.classList.add('officaLocationItem')
        newDiv.innerHTML = `
            <h4 style='text-align:center; margin: 0; padding: 10px 0px;'>${item.Name}</h4>
            <p>${item.Address}</p>
            <div class='locationBox'>
                <iframe src=${item.Name === 'Registered Office' ? registerdOffilceLocationSrc : businessOffilceLocationSrc} width=100% height=auto style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        `
        div.appendChild(newDiv)
    });

}
function renderFooter(data){
    const div = document.getElementById('aboutFooter')
    const newP = document.createElement('p')
    newP.innerHTML= `${data.status === true ? data.Certificate[0].value : ''}`
    div.appendChild(newP)
}
async function about01(){
    const data = await getAbout01()
    displayAboutUsData(data)
    renderOfficeLocation(data)
    renderFooter(data)
}

window.onload = function() {
    about01()
};