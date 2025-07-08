let searchInp = document.querySelector("#search");
let mainDiv = document.querySelector(".mainDiv");

let searchValue = "gaza";


const fetchData = (query) => {
    mainDiv.innerHTML = "";

    fetch(`https://newsapi.org/v2/everything?q=${query}&from=2025-06-03&sortBy=publishedAt&apiKey=004d10e6017345b0a33ee2c5c64a4eaa`)
        .then((data) => data.json())
        .then((data) => {
            console.log(data);
            
            if (data.articles.length === 0) {
                mainDiv.innerHTML = `<h3 class="text-center text-danger">No news found for "${query}"</h3>`;
                return;
            }

            data.articles.map((news) => {
                mainDiv.innerHTML += `
                    <div class="col-md-4">
                        <div class="card h-100 shadow-sm">
                            <img src="${news.urlToImage}" class="card-img-top" alt="News Image" style="height: 200px; object-fit: cover;">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${news.title}</h5>
                                <p class="card-text">${news.description}</p>
                                <a href="${news.url}" target="_blank" class="btn btn-custom mt-auto text-white">Read More</a>
                            </div>
                        </div>
                    </div>
                `;
            });
        })
        .catch((err) => {
            console.log(err);
        });
}


fetchData(searchValue);


const search = () => {
    let query = searchInp.value.trim() || searchValue;
    fetchData(query);
}
