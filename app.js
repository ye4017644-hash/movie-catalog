// OMDb API Configuration
const OMDB_API_KEY = '7fa8063c';
const OMDB_API_URL = 'https://www.omdbapi.com/';

window.addEventListener('DOMContentLoaded', async () => {
    console.log('%c🎬 Киноприложение запущено!', 'color: #e50914; font-size: 20px; font-weight: bold;');

    // Скрыть старые секции
    const filtersSection = document.querySelector('.filters-section');
    if (filtersSection) filtersSection.style.display = 'none';

    applyNetflixStyles();
    setupSearchInterface();
    loadPopularMovies();
});

// تطبيق تصميم Netflix
function applyNetflixStyles() {
    document.body.style.background = '#141414';
    document.body.style.color = '#fff';

    const header = document.querySelector('header') || document.querySelector('.header');
    if (header) {
        header.style.background = 'linear-gradient(90deg, #000000 0%, #e50914 100%)';
        header.style.boxShadow = '0 4px 20px rgba(229, 9, 20, 0.3)';
    }
}

function setupSearchInterface() {
    const addSection = document.querySelector('.add-movie-section');
    if (!addSection) return;

    addSection.style.background = 'rgba(0,0,0,0.6)';
    addSection.style.padding = '40px 20px';
    addSection.style.borderRadius = '15px';

    addSection.innerHTML = `
        <div style="text-align: center; max-width: 900px; margin: 0 auto;">
            <h2 style="margin-bottom: 30px; color: #e50914; font-size: 2.5rem; text-shadow: 0 0 20px rgba(229,9,20,0.5);">
                🎬 Поиск фильмов
            </h2>
            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <input type="text" id="movieSearchInput" 
                       placeholder="Введите название (The Matrix, Avatar, Inception...)" 
                       style="flex: 1; min-width: 350px; padding: 18px 25px; border: 2px solid #e50914; background: rgba(0,0,0,0.8); color: white; border-radius: 50px; font-size: 1.15rem; outline: none; transition: 0.3s;">
                <button id="movieSearchBtn" 
                        style="padding: 18px 40px; background: #e50914; color: white; border: none; border-radius: 50px; cursor: pointer; font-weight: bold; font-size: 1.15rem; transition: 0.3s; box-shadow: 0 4px 15px rgba(229,9,20,0.4);">
                    🔍 Найти
                </button>
            </div>
            <p style="margin-top: 20px; color: #999; font-size: 1rem;">Например: Avengers, Harry Potter, Joker</p>
        </div>
    `;

    const searchBtn = document.getElementById('movieSearchBtn');
    const searchInput = document.getElementById('movieSearchInput');

    searchBtn.addEventListener('mouseenter', () => {
        searchBtn.style.background = '#b20710';
        searchBtn.style.transform = 'scale(1.05)';
    });
    searchBtn.addEventListener('mouseleave', () => {
        searchBtn.style.background = '#e50914';
        searchBtn.style.transform = 'scale(1)';
    });

    searchInput.addEventListener('focus', () => {
        searchInput.style.boxShadow = '0 0 20px rgba(229,9,20,0.5)';
    });
    searchInput.addEventListener('blur', () => {
        searchInput.style.boxShadow = 'none';
    });

    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
}

async function handleSearch() {
    const query = document.getElementById('movieSearchInput').value.trim();
    if (!query) {
        showNotification('Введите название фильма!', 'warning');
        return;
    }

    showLoadingMessage('Ищем фильмы...');

    try {
        const response = await fetch(`${OMDB_API_URL}?apikey=${OMDB_API_KEY}&s=${query}`);
        const data = await response.json();

        if (data.Response === "True") {
            const detailedMovies = await Promise.all(
                data.Search.slice(0, 12).map(movie => getMovieDetails(movie.Title))
            );
            renderMovies(detailedMovies.filter(m => m));
        } else {
            showErrorMessage('Фильмы не найдены');
        }
    } catch (error) {
        showErrorMessage('Ошибка подключения');
    }
}

async function getMovieDetails(title) {
    try {
        const response = await fetch(`${OMDB_API_URL}?apikey=${OMDB_API_KEY}&t=${title}`);
        const data = await response.json();
        return data.Response === "True" ? data : null;
    } catch {
        return null;
    }
}

async function loadPopularMovies() {
    showLoadingMessage('Загрузка популярных фильмов...');

    const popularTitles = ["Inception", "The Dark Knight", "Interstellar", "Avengers", "Joker", "Titanic", "Avatar", "Gladiator", "Matrix", "Pulp Fiction", "Fight Club", "Shawshank Redemption"];
    const movies = [];

    for (const title of popularTitles) {
        const movie = await getMovieDetails(title);
        if (movie) movies.push(movie);
    }

    renderMovies(movies);
}

function renderMovies(movies) {
    const grid = document.getElementById('moviesGrid');
    const count = document.getElementById('movieCount');

    if (!grid) return;

    // تعديل شكل الـ Grid
    grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
    grid.style.gap = '30px';
    grid.style.padding = '30px 0';

    grid.innerHTML = '';
    if (count) count.textContent = `(${movies.length})`;

    if (movies.length === 0) {
        showErrorMessage('Нет результатов');
        return;
    }

    movies.forEach(movie => {
        const card = createMovieCard(movie);
        grid.appendChild(card);
    });
}

function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.style.cssText = `
        background: #1c1c1c;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 8px 25px rgba(0,0,0,0.5);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        cursor: pointer;
        position: relative;
    `;

    const poster = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450/141414/e50914?text=No+Poster';

    card.innerHTML = `
        <div style="position: relative; height: 420px; overflow: hidden;">
            <img src="${poster}" alt="${movie.Title}" 
                 style="width: 100%; height: 100%; object-fit: cover; transition: 0.4s;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 50%);"></div>
            <span style="position: absolute; top: 15px; right: 15px; background: #e50914; color: white; padding: 8px 15px; border-radius: 30px; font-weight: bold; font-size: 1rem; box-shadow: 0 4px 10px rgba(229,9,20,0.5);">
                ⭐ ${movie.imdbRating || 'N/A'}
            </span>
            <h3 style="position: absolute; bottom: 15px; left: 15px; right: 15px; margin: 0; color: white; font-size: 1.4rem; text-shadow: 0 2px 10px rgba(0,0,0,0.8);">
                ${movie.Title}
            </h3>
        </div>
        <div style="padding: 20px;">
            <div style="color: #aaa; margin-bottom: 8px; font-size: 0.95rem;">
                <strong style="color: #e50914;">Год:</strong> ${movie.Year} | 
                <strong style="color: #e50914;">Жанр:</strong> ${movie.Genre || 'N/A'}
            </div>
            <p style="color: #999; font-size: 0.9rem; line-height: 1.6; margin: 15px 0;">
                ${movie.Plot && movie.Plot !== 'N/A' ? (movie.Plot.length > 100 ? movie.Plot.substring(0, 100) + '...' : movie.Plot) : 'Описание недоступно'}
            </p>
            <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(movie.Title + ' trailer')}" 
               target="_blank" 
               style="display: block; text-align: center; background: #e50914; color: white; padding: 14px; border-radius: 8px; text-decoration: none; font-weight: bold; transition: 0.3s; margin-top: 15px; box-shadow: 0 4px 15px rgba(229,9,20,0.3);">
                ▶ Смотреть трейлер
            </a>
        </div>
    `;

    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.03)';
        card.style.boxShadow = '0 15px 40px rgba(229,9,20,0.4)';
        const img = card.querySelector('img');
        if (img) img.style.transform = 'scale(1.1)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 8px 25px rgba(0,0,0,0.5)';
        const img = card.querySelector('img');
        if (img) img.style.transform = 'scale(1)';
    });

    return card;
}

function showLoadingMessage(msg) {
    const grid = document.getElementById('moviesGrid');
    if (grid) grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 80px; font-size: 1.5rem; color: #e50914;">⏳ ${msg}</div>`;
}

function showErrorMessage(msg) {
    const grid = document.getElementById('moviesGrid');
    if (grid) grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 80px; font-size: 1.5rem; color: #999;">❌ ${msg}</div>`;
}

function showNotification(msg, type) {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed; top: 30px; right: 30px; z-index: 10000;
        background: ${type === 'warning' ? '#ff9800' : '#e50914'};
        color: white; padding: 20px 30px; border-radius: 10px;
        box-shadow: 0 8px 30px rgba(0,0,0,0.5);
        font-weight: bold; font-size: 1.1rem;
        animation: slideIn 0.5s ease;
    `;
    notif.textContent = msg;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);
