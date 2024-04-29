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
        <div class="card" id="${element['id']}" onclick={alert_id(id)}>
          <img src="https://image.tmdb.org/t/p/w500${element['poster_path']}" alt="이미지 오류">
          <h3>${element['title']}</h3>
          <p>${element['overview']}</p>
          <p>Rating: ${element['vote_average']}</p>
        </div>`;

      card_section.innerHTML += temp_html;
    });
  })
  .catch(err => console.error(err));

// 카드 클릭 시 카드 이미지 alert
// 매개변수 id를 필요로 하는 화살표 함수
const alert_id = (id) => {
  alert(`영화 id: ${id}`);
}

const search_btn = document.getElementById('search_btn');
const card = document.getElementsByClassName('card'); 

// 검색 기능
const find_movie = () => Array.from(card).filter((item) => { // 콜백함수
  const search_input = document.getElementById('search_input').value.toLowerCase();
  const find_title = item.getElementsByTagName('h3')[0].innerText.toLowerCase();

  if (find_title.indexOf(search_input) === -1) item.style = 'display: none';
  else item.style = 'display: inline';
});