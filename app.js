let searchInp = document.querySelector("#search");
let mainDiv = document.querySelector(".mainDiv");

let searchValue = "pakistan";


const fetchData = (query) => {
    mainDiv.innerHTML = "";

    fetch(`https://newsdata.io/api/1/latest?apikey=pub_8e9f90bf71f849e299e9af4688020c7b&q=${query}`)
        .then((data) => data.json())
        .then((data) => {
            console.log(data);
            
            if (data.results.length === 0) {
                mainDiv.innerHTML = `<h3 class="text-center text-danger">No news found for "${query}"</h3>`;
                return;
            }

            data.results.map((news) => {
                mainDiv.innerHTML += `
                    <div class="col-md-4">
                        <div class="card h-100 shadow-sm">
                            <img src="${news.image_url}" class="card-img-top" alt="News Image" style="height: 200px; object-fit: cover;">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${news.title}</h5>
                                <p class="card-text">${news.description}</p>
                                <a href="${news.source_url}" target="_blank" class="btn btn-custom mt-auto text-white">Read More</a>
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
