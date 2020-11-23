const BASE_URL = 'https://pixabay.com/api';

let numberOfpage, prevQuery;
const KEY = '19207978-b8cc5d5178f1c84e5ac39b1c7';
const perPage = 12;

function page() {
    return numberOfpage + 1 || 0;
}
 
function fetchImages(searchQuery) { 
    if (searchQuery !== prevQuery) numberOfpage = 0;
    prevQuery = searchQuery;
    numberOfpage++;
    return fetch(`${BASE_URL}/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${numberOfpage}&per_page=${perPage}&key=${KEY}`)
        .then(response => {
            return response.json();
        })
        .catch(error => console.log(error));
}

export { fetchImages, page };