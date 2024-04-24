async function executeB_careerWith01(){
    let careerData= [];
    const fetchedData = await getCareer()
    if(fetchedData.status === true){
        careerData = fetchedData.jobList
    }
    function B_careerWith01(){
        document.getElementById('page_heading').innerHTML=`Career With 01`
        document.getElementById('beforeMain').innerHTML = `
            <div class="career-section">
                <div class="container">
                    <div class="noti-content" id="careerContent"></div>
                </div>
            </div>
        `
    }

    function renderAllJob(){
        const selectedDiv = document.getElementById('careerContent')
        careerData.forEach(data => {
            const newDiv = document.createElement('div')
            newDiv.classList.add('jobBox')
            newDiv.innerHTML = `
                <div class='jobHeading'>
                    <h4>${data.title}</h4>
                </div>
                <hr style='opacity: 1; width: 100%'>
                <div class='jobDetails'>
                    <div class='items'>
                        <p>Basic Requirements:  </p>
                        <p>${data.basic_req}</p>
                    </div>
                    <div class='items'>
                        <p>Experiencec: </p>
                        <p>${data.experience}</p>
                    </div>
                    <div class='items'>
                        <p>Salary Range: </p>
                        <p>${data.salary_range}</p>
                    </div>
                    <div class='items'>
                        <p>Last Day of Apply: </p>
                        <p>${data.last_date}</p>
                    </div>
                </div>
                <div class='jobBtn'>
                    <div class='jobDetailsBtn'>
                        <a href=${data.details_link}>SEE DETAILS</a>
                    </div>
                    <div class='jobApplyFormBtn'>
                        <a href="template.html?case=B_jobApply&data=${data.ID}_${data.title}">APPLY NOW</a>
                    </div>
                </div>
            `
            selectedDiv.appendChild(newDiv)
            
        });
    }

    B_careerWith01()
    renderAllJob()
}
