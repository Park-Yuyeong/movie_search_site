const cardSection = document.querySelector("main");

// <main> 부분에 영화 카드리스트 추가
const drawCard = (element) => {
  let tempHtml = `
        <div class="card" id="${element["id"]}">
          <img src="https://image.tmdb.org/t/p/w500${element["poster_path"]}" alt="이미지 오류">
          <h3>${element["title"]}</h3>
          <p>${element["overview"]}</p>
          <p>Rating: ${element["vote_average"]}</p>
        </div>`;

  cardSection.insertAdjacentHTML("beforeend", tempHtml);
};

// TMDB 데이터 가져오기
const fetchData = async () => {
  const options = {
    // TMDB Open API
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmI5ZmUzY2QxNmEzNmRiMGQ1Y2IxMjBlNjk2YjExOCIsInN1YiI6IjY2MmEwMGY1NTBmN2NhMDBiM2M4NzY0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1vVYyhiXV07kPNTPB9TUmJZqhpB9JYrZpjs9pI_XUKE",
    },
  };

  const response = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  );

  const res = await response.json();
  return res["results"];
};

const movies = await fetchData();
movies.forEach((element) => drawCard(element));

// 카드 클릭 시 카드 이미지 alert
const alertId = ({ target }) => {
  if (target === cardSection) return null;
  if (target.matches(".card")) alert(`영화 id: ${target.id}`);
  else alert(`영화 id: ${target.parentNode.id}`);
};

// card click event handler
// 이벤트 위임 : 하위요소에서 발생한 이벤트를 상위요소에서 처리할 수 있도록 위임하는 것
cardSection.addEventListener("click", alertId);

const search = document.querySelector("form");
const cards = document.getElementsByClassName("card");

// 검색 기능
const findMovie = (searchInput) => {
  const findMovieList = movies.filter(
    (element) => element["title"].toLowerCase().indexOf(searchInput) !== -1
  );

  cardSection.innerHTML = "";
  findMovieList.forEach((element) => drawCard(element));
};

// 검색창 event handler
search.addEventListener("submit", (event) => {
  const searchInput = document.querySelector("input").value.toLowerCase();

  event.preventDefault(); // 새로 고침 x
  findMovie(searchInput);
});
