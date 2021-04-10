const astrosUrl = 'https://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');

// Make an AJAX request
function getJSON(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = () => {
    if(xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      return callback(data);
    }
  };
  xhr.send();
}

// Generate the markup for each profile
function generateHTML(data) {
  console.log(data);
  const section = document.createElement('section');
  peopleList.appendChild(section);
  // Check if request returns a 'standard' page from Wiki
  if (data.type === 'standard') {
    const thumbnail = data.thumbnail !== undefined ? data.thumbnail.source :  "img/profile.jpg";
    section.innerHTML = `
      <img src=${thumbnail}>
      <h2>${data.title}</h2>
      <p>${data.description}</p>
      <p>${data.extract}</p>
    `;
  } else {
    section.innerHTML = `
      <img src="img/profile.jpg" alt="ocean clouds seen from space">
      <h2>${data.title}</h2>
      <p>Results unavailable for ${data.title}</p>
      ${data.extract_html}
    `;
  }
}

btn.addEventListener('click', (e => {
  getJSON(astrosUrl, (json) => {
    json.people.map((person) => {
      getJSON(wikiUrl + person.name, generateHTML);
      console.log(wikiUrl + person.name);
    });
  });
  e.target.remove();
}));