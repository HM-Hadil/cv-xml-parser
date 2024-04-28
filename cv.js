document.addEventListener("DOMContentLoaded", function() {
    fetch('cv.xml') 
      .then(response => response.text())
      .then(xmlString => {
        console.log(xmlString); 
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
        console.log(xmlDoc); 
        const imageFilename = xmlDoc.querySelector('image').textContent;


          // Updating the src attribute of the img element
          const imgElement = document.querySelector('.profile img');
          imgElement.src = `assets/img/${imageFilename}`;
        // Accessing data from XML
        const nomElement = xmlDoc.querySelector('Nom');
        const prénomElement = xmlDoc.querySelector('Prénom');
        const adresseElement = xmlDoc.querySelector('Adresse');
        const téléphoneElement = xmlDoc.querySelector('Téléphone');
        const emailElement = xmlDoc.querySelector('Email');
        const resume = xmlDoc.querySelector('resume');
        const profile = xmlDoc.querySelector('profile');


        const nom = nomElement.textContent;
        const prénom = prénomElement.textContent;
        const adresse = adresseElement.textContent;
        const téléphone = téléphoneElement.textContent;
        const email = emailElement.textContent;
        const resumee = resume.textContent;
        const profilee = profile.textContent;
        
        document.getElementById("namee").innerHTML=nom +" "+ prénom;
        document.getElementById("name").innerHTML=nom +" "+ prénom;

        document.getElementById("resume").innerHTML=resumee;
        document.getElementById("profile").innerHTML=profilee;
          // Accessing skills data from XML
          var skillsElements = xmlDoc.getElementsByTagName("Langage");

          // Extracting and displaying skills
          for (let i = 0; i < skillsElements.length; i++) {
              let skillName = skillsElements[i].childNodes[0].nodeValue;
              displaySkill(skillName, i);
          }
  

        // Displaying data in the HTML
        const xmlDataContainer = document.getElementById('xmlData');
        xmlDataContainer.innerHTML += `
          <div class="col-lg-6">
            <ul>
              <li><i class="bi bi-chevron-right"></i> <strong>Nom:</strong> <span>${nom}</span></li>
              <li><i class="bi bi-chevron-right"></i> <strong>Prénom:</strong> <span>${prénom}</span></li>
              <li><i class="bi bi-chevron-right"></i> <strong>Adresse:</strong> <span>${adresse}</span></li>
              <li><i class="bi bi-chevron-right"></i> <strong>Téléphone:</strong> <span>${téléphone}</span></li>
              <li><i class="bi bi-chevron-right"></i> <strong>Email:</strong> <span>${email}</span></li>
            </ul>
          </div>
        `;


        
      // Accessing data from XML for Education
      const educationDegrees = xmlDoc.querySelectorAll('Education degree');
      const educationContainer = document.querySelector('#resume .container .row');

      // Displaying education data in the HTML
      educationDegrees.forEach(degree => {
          const diplome = degree.querySelector('Diplôme').textContent;
          const établissement = degree.querySelector('Établissement').textContent;
          const année = degree.querySelector('Année').textContent;

          const educationHTML = `
              <div class="col-lg-6" data-aos="fade-up">
                  <div class="resume-item">
                      <h3 class="resume-title">Education</h3>
                      <h4>${diplome}</h4>
                      <h5>${année}</h5>
                      <p><em>${établissement}</em></p>
                  </div>
              </div>
          `;
          educationContainer.insertAdjacentHTML('beforeend', educationHTML);

          
      });

      
      // Accessing data from XML for Professional Experience
      const experiences = xmlDoc.querySelectorAll('Expérience_Professionnelle Experience');
      const experienceContainer = document.querySelector('#resume .container .row');

      // Displaying professional experience data in the HTML
      experiences.forEach(experience => {
          const poste = experience.querySelector('Poste').textContent;
          const institution = experience.querySelector('Institution').textContent;
          const période = experience.querySelector('Période').textContent;
          const description = experience.querySelector('Description').textContent;

          const experienceHTML = `
              <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                  <div class="resume-item">
                      <h3 class="resume-title">Professional Experience</h3>
                      <h4>${poste}</h4>
                      <h5>${période}</h5>
                      <p><em>${institution}</em></p>
                      <ul>
                          <li>${description}</li>
                      </ul>
                  </div>
              </div>
          `;
          experienceContainer.insertAdjacentHTML('beforeend', experienceHTML);
      });

      

      })
      .catch(error => console.error('Error fetching XML:', error));
      
  });
  function displaySkill(skillName, index) {
      let skillsContainer = document.getElementById("skillsContent");
      let skillElement = document.createElement("div");
      skillElement.className = "progress";
      skillElement.innerHTML = `
          <span class="skill">${skillName}</span>
          <div class="progress-bar-wrap">
              <div class="progress-bar" role="progressbar"></div>
          </div>
      `;
      skillsContainer.appendChild(skillElement);
  }
