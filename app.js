// OMDb API Configuration
const OMDB_API_KEY = '7fa8063c';
const OMDB_API_URL = 'https://www.omdbapi.com/';

// Инициализация приложения
window.addEventListener('DOMContentLoaded', async () => {
    console.log('%c🎬 Movie App Started!', 'color: #ffd700; font-size: 18px; font-weight: bold;');
    
    // Скрыть старые фильтры
    const filtersSection = document.querySelector('.filters-section');
    if (filtersSection) filtersSection.style.display = 'none';
    
    // Настроить интерфейс поиска
    setupSearchInterface();
    
    // Загрузить популярные фильмы
    loadPopularMovies();
});

// Настройка интерфейса поиска
function setupSearchInterface() {
    const addSection = document.querySelector('.add-movie-section');
    if (!addSection) return;
    
    addSection.innerHTML = `
        <div style="text-align: center; max-width: 800px; margin: 0 auto; padding: 30px;">
            <h2 style="margin-bottom: 25px; color: #2c3e50; font-size: 2rem;">🔍 Поиск фильмов</h2>
            <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                <input type="text" id="movieSearchInput" 
                       placeholder="Введите название фильма (Batman, Joker, Avengers...)" 
                       style="flex: 1; min-width: 300px; padding: 16px; border: 2px solid #ddd; border-radius: 10px; font-size: 1.1rem;">
                <button id="movieSearchBtn" 
                        style="padding: 16px 35px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 10px; cursor: pointer; font-weight: bold; font-size: 1.1rem; transition: 0.3s;">
                    Искать
                </button>
            </div>
            <p style="margin-top: 15px; color: #777;">Например: Spider-Man, Harry Potter, The Matrix</p>
        </div>
    `;
    
    document.getElementById('movieSearchBtn').addEventListener('click', handleSearch);
    document.getElementById('movieSearchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
}

// Обработка поиска
async function handleSearch() {
    const query = document.getElementById('movieSearchInput').value.trim();
    if (!query) {
        alert('Пожалуйста, введите название фильма!');
        return;
    }
    
    showLoadingMessage('Поиск фильмов...');
    
    try {
        const response = await fetch(`${OMDB_API_URL}?apikey=${OMDB_API_KEY}&s=${query}`);
        const data = await response.json();
        
        if (data.Response === "True") {
            const detailedMovies = await Promise.all(
                data.Search.slice(0, 8).map(movie => getMovieDetails(movie.Title))
            );
            renderMovies(detailedMovies.filter(m => m));
        } else {
            showErrorMessage('Фильмы не найдены 😔');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        showErrorMessage('Ошибка подключения к интернету');
    }
}

// Получение деталей фильма
async function getMovieDetails(title) {
    try {
        const response = await fetch(`${OMDB_API_URL}?apikey=${OMDB_API_KEY}&t=${title}`);
        const data = await response.json();
        return data.Response === "True" ? data : null;
    } catch {
        return null;
    }
}

// Загрузка популярных фильмов
async function loadPopularMovies() {
    showLoadingMessage('Загрузка популярных фильмов...');
    
    const popularTitles = ["Inception", "The Dark Knight", "Interstellar", "Avengers", "Joker", "Titanic", "Avatar", "Gladiator"];
    const movies = [];
    
    for (const title of popularTitles) {
        const movie = await getMovieDetails(title);
        if (movie) movies.push(movie);
    }
    
    renderMovies(movies);
}

// Отображение фильмов
function renderMovies(movies) {
    const grid = document.getElementById('moviesGrid');
    const count = document.getElementById('movieCount');
    
    if (!grid) return;
    
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

// Создание карточки фильма
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.style.cssText = 'background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.1); transition: 0.3s; cursor: pointer;';
    
    const poster = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image';
    
    card.innerHTML = `
        <div style="position: relative; height: 400px; overflow: hidden;">
            <img src="${poster}" alt="${movie.Title}" style="width: 100%; height: 100%; object-fit: cover;">
            <span style="position: absolute; top: 12px; right: 12px; background: rgba(0,0,0,0.85); color: #ffd700; padding: 8px 14px; border-radius: 25px; font-weight: bold; font-size: 0.95rem;">
                ⭐ ${movie.imdbRating || 'N/A'}
            </span>
        </div>
        <div style="padding: 18px;">
            <h3 style="margin: 0 0 12px 0; color: #2c3e50; font-size: 1.3rem;">${movie.Title}</h3>
            <div style="color: #555; margin-bottom: 6px;"><strong>📅 Год:</strong> ${movie.Year}</div>
            <div style="color: #555; margin-bottom: 6px;"><strong>🎬 Жанр:</strong> ${movie.Genre || 'N/A'}</div>
            <div style="color: #555; margin-bottom: 10px;"><strong>⏱️ Продолжительность:</strong> ${movie.Runtime || 'N/A'}</div>
            <p style="color: #777; font-size: 0.9rem; line-height: 1.5; margin-bottom: 15px;">
                ${movie.Plot && movie.Plot !== 'N/A' ? (movie.Plot.length > 120 ? movie.Plot.substring(0, 120) + '...' : movie.Plot) : 'Описание недоступно'}
            </p>
            <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(movie.Title + ' trailer')}" 
               target="_blank" 
               style="display: block; text-align: center; background: #e50914; color: white; padding: 12px; border-radius: 8px; text-decoration: none; font-weight: bold; transition: 0.3s;"
               onmouseover="this.style.background='#b20710'" 
               onmouseout="this.style.background='#e50914'">
                ▶ Смотреть трейлер
            </a>
        </div>
    `;
    
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    });
    
    return card;
}

// Сообщения загрузки и ошибок
function showLoadingMessage(msg) {
    const grid = document.getElementById('moviesGrid');
    if (grid) grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 60px; font-size: 1.3rem; color: #667eea;">⏳ ${msg}</div>`;
}

function showErrorMessage(msg) {
    const grid = document.getElementById('moviesGrid');
    if (grid) grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 60px; font-size: 1.3rem; color: #e53e3e;">❌ ${msg}</div>`;
}
