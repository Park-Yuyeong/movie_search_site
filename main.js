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
    const res = response['results'];

    res.forEach(element => {

      let temp_html = `
      <div class="card" onclick="alert('영화 id: ${element['id']}')">
        <img src="https://image.tmdb.org/t/p/w500${element['poster_path']}" alt="이미지 오류">
        <h3>${element['title']}</h3>
        <p>${element['overview']}</p>
        <p>Rating: ${element['vote_average']}</p>
      </div>`;

      card_section.innerHTML += temp_html;
    });
  })
  .catch(err => console.error(err));

const search_btn = document.getElementById('search_btn');
const card = document.getElementsByClassName('card'); 

const find_movie = () => {
  const search_input = document.getElementById('search_input').value.toLowerCase();

  Array.from(card).forEach(item => { // 카드는 유사배열객체
    let find_title = item.getElementsByTagName('h3')[0].innerText.toLowerCase();
    if (find_title.indexOf(search_input) === -1) item.style = 'display: none';
    else item.style = 'display: inline';
  });
};