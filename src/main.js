const card_section = document.getElementsByClassName('card_section')[0];

const options = { // TMDB Open API
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmI5ZmUzY2QxNmEzNmRiMGQ1Y2IxMjBlNjk2YjExOCIsInN1YiI6IjY2MmEwMGY1NTBmN2NhMDBiM2M4NzY0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1vVYyhiXV07kPNTPB9TUmJZqhpB9JYrZpjs9pI_XUKE'
  }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => response.json())
  .then(response => {
    let res = response['results'];
    // console.log(res); // API Data 확인용 

    res.forEach(element => {
      
      let temp_tag = document.createElement('div');
      temp_tag.className = 'card';
      temp_tag.id = element['id'];
      temp_tag.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${element['poster_path']}" alt="이미지 오류">
        <h3>${element['title']}</h3>
        <p>${element['overview']}</p>
        <p>Rating: ${element['vote_average']}</p>`;
      
      temp_tag.onclick = function () {alert(`영화 id: ${this.id}`)};
      card_section.appendChild(temp_tag);
    });
  })
  .catch(err => console.error(err));