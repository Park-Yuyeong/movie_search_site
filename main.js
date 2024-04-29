const card_section = document.querySelector("main");

const options = {
  // TMDB Open API
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmI5ZmUzY2QxNmEzNmRiMGQ1Y2IxMjBlNjk2YjExOCIsInN1YiI6IjY2MmEwMGY1NTBmN2NhMDBiM2M4NzY0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1vVYyhiXV07kPNTPB9TUmJZqhpB9JYrZpjs9pI_XUKE",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    const res = response["results"];

    res.forEach((element) => {
      let temp_html = `
        <div class="card" id="${element["id"]}">
          <img src="https://image.tmdb.org/t/p/w500${element["poster_path"]}" alt="이미지 오류">
          <h3>${element["title"]}</h3>
          <p>${element["overview"]}</p>
          <p>Rating: ${element["vote_average"]}</p>
        </div>`;

      card_section.innerHTML += temp_html;
    });
  })
  .catch((err) => console.error(err));

// 카드 클릭 시 카드 이미지 alert
// 매개변수 id를 필요로 하는 화살표 함수
const alert_id = ({ target }) => {
  if (target === card_section) return null;
  if (target.matches(".card")) alert(`영화 id: ${target.id}`);
  else alert(`영화 id: ${target.parentNode.id}`);
};

// card click event handler
card_section.addEventListener("click", alert_id);

const search = document.querySelector("form");
const card = document.getElementsByClassName("card");

// 검색 기능
const find_movie = (search_input) => {
  Array.from(card).filter((item) => {
    // 콜백함수
    const find_title = item.querySelector("h3").innerText.toLowerCase();

    if (find_title.indexOf(search_input) === -1) item.style = "display: none";
    else item.style = "display: inline";
  });
};

// 검색창 event handler
search.addEventListener("submit", (event) => {
  const search_input = document.querySelector("input").value.toLowerCase();

  event.preventDefault(); // 새로 고침 x
  find_movie(search_input);
});
