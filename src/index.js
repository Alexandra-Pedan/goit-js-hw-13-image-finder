import './styles.css';
import {fetchImages, page} from './js/apiService';
import photoCardTpl from './templates/photo-card.hbs';
import getRefs from './js/getRefs';

const refs = getRefs();
const debounce = require('lodash.debounce');
const loadMore = document.createElement('button');
loadMore.className = 'load-more';
loadMore.innerText = 'Load more';
loadMore.addEventListener('click', () => {
    searchImages();
    setTimeout(() => window.scrollTo(0, window.innerHeight * page()), 300);
});
document.body.appendChild(loadMore);

refs.searchInput.addEventListener(
    'input',
    debounce(() => {
        searchImages(true);
    }, 500)
);
 
function searchImages(isReset) { 
    fetchImages(refs.searchInput.value)
        .then(data => renderImagesList(data.hits, isReset))
        .catch(error => console.log(error));
}

function renderImagesList(images, isReset) {
    const markup = photoCardTpl(images);
    if (isReset) refs.gallery.innerHTML = markup;
    else refs.gallery.innerHTML += markup;
}
