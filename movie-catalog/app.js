// قاعدة بيانات الأفلام المبدئية
const initialMovies = [
    {
        title: "Брат",
        genre: "Драма",
        year: 1997,
        rating: 8.1,
        director: "Алексей Балабанов",
        country: "Россия",
        actors: "Сергей Бодров мл., Виктор Сухоруков",
        poster: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=500&h=750&fit=crop",
        description: "Демобилизовавшийся солдат приезжает в Петербург к старшему брату и оказывается втянутым в криминальный мир 90-х."
    },
    {
        title: "Движение вверх",
        genre: "Драма",
        year: 2017,
        rating: 7.6,
        director: "Антон Мегердичев",
        country: "Россия",
        actors: "Владимир Машков, Андрей Смоляков",
        poster: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&h=750&fit=crop",
        description: "История легендарной победы советской сборной по баскетболу на Олимпийских играх 1972 года."
    },
    {
        title: "Зеленая книга",
        genre: "Драма",
        year: 2018,
        rating: 8.2,
        director: "Питер Фаррелли",
        country: "США",
        actors: "Вигго Мортенсен, Махершала Али",
        poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=750&fit=crop",
        description: "История дружбы между афроамериканским пианистом и его водителем итальянского происхождения во время турне по американскому Югу в 1960-х."
    }
];

let moviesDatabase = [];
let currentMovies = [];

// تحميل الأفلام من Firebase
async function loadMoviesFromFirebase() {
    try {
        console.log('🔄 Загрузка из Firebase...');

        const snapshot = await db.collection('movies').orderBy('timestamp', 'desc').get();

        moviesDatabase = [];
        snapshot.forEach(doc => {
            moviesDatabase.push({
                id: doc.id,
                ...doc.data()
            });
        });

        console.log('✅ Загружено фильмов:', moviesDatabase.length);

        // إذا قاعدة البيانات فارغة، أضف الأفلام المبدئية
        if (moviesDatabase.length === 0) {
            console.log('📦 Добавление начальных фильмов...');
            await addInitialMovies();
        }

        return moviesDatabase;
    } catch (error) {
        console.error('❌ Ошибка Firebase:', error);
        showNotification('⚠️ Работа в локальном режиме', 'warning');
        moviesDatabase = [...initialMovies];
        return moviesDatabase;
    }
}

// إضافة الأفلام المبدئية
async function addInitialMovies() {
    for (const movie of initialMovies) {
        try {
            await db.collection('movies').add({
                ...movie,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }
    await loadMoviesFromFirebase();
}

// عرض الأفلام
function displayMovies(movies) {
    const moviesGrid = document.getElementById('moviesGrid');
    const noResults = document.getElementById('noResults');

    if (!moviesGrid) return;

    if (movies.length === 0) {
        moviesGrid.innerHTML = '';
        noResults.style.display = 'block';
        updateMovieCount(0);
        return;
    }

    noResults.style.display = 'none';

    moviesGrid.innerHTML = movies.map(movie => `
        <div class="movie-card">
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster" loading="lazy">
            <div class="movie-card-content">
                <div class="movie-title">${movie.title}</div>
                <div class="movie-info">📅 <strong>Год:</strong> ${movie.year}</div>
                <div class="movie-info">🎬 <strong>Режиссёр:</strong> ${movie.director}</div>
                <div class="movie-info">🌍 <strong>Страна:</strong> ${movie.country}</div>
                <div class="movie-info">🎭 <strong>Актёры:</strong> ${movie.actors}</div>
                <div class="movie-badges">
                    <span class="movie-genre">${movie.genre}</span>
                    <span class="movie-rating">⭐ ${movie.rating}</span>
                </div>
                <div class="movie-description">${movie.description}</div>
            </div>
        </div>
    `).join('');

    updateMovieCount(movies.length);
}

function updateMovieCount(count) {
    const movieCount = document.getElementById('movieCount');
    if (movieCount) movieCount.textContent = `(${count})`;
}

function setupEventListeners() {
    document.getElementById('applyFilters')?.addEventListener('click', applyFilters);
    document.getElementById('resetFilters')?.addEventListener('click', resetFilters);
    document.getElementById('addMovieForm')?.addEventListener('submit', addMovie);
}

function applyFilters() {
    const genre = document.getElementById('genreFilter').value;
    const year = document.getElementById('yearFilter').value;
    const rating = document.getElementById('ratingFilter').value;
    const country = document.getElementById('countryFilter').value;

    currentMovies = moviesDatabase.filter(movie => {
        if (genre && movie.genre !== genre) return false;
        if (year) {
            const [min, max] = year.split('-').map(Number);
            if (movie.year < min || movie.year > max) return false;
        }
        if (rating && movie.rating < parseFloat(rating)) return false;
        if (country && !movie.country.includes(country)) return false;
        return true;
    });

    displayMovies(currentMovies);
}

function resetFilters() {
    document.getElementById('genreFilter').value = '';
    document.getElementById('yearFilter').value = '';
    document.getElementById('ratingFilter').value = '';
    document.getElementById('countryFilter').value = '';
    currentMovies = [...moviesDatabase];
    displayMovies(currentMovies);
}

async function addMovie(e) {
    e.preventDefault();

    const newMovie = {
        title: document.getElementById('movieTitle').value.trim(),
        genre: document.getElementById('movieGenre').value,
        year: parseInt(document.getElementById('movieYear').value),
        rating: parseFloat(document.getElementById('movieRating').value),
        director: document.getElementById('movieDirector').value.trim(),
        country: document.getElementById('movieCountry').value.trim(),
        actors: document.getElementById('movieActors').value.trim(),
        poster: document.getElementById('moviePoster').value.trim() || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&h=750&fit=crop',
        description: document.getElementById('movieDescription').value.trim(),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    if (!newMovie.title || !newMovie.genre) {
        showNotification('⚠️ Заполните обязательные поля!', 'warning');
        return;
    }

    try {
        await db.collection('movies').add(newMovie);
        await loadMoviesFromFirebase();
        currentMovies = [...moviesDatabase];
        displayMovies(currentMovies);
        e.target.reset();
        showNotification('✅ Фильм добавлен в Firebase!', 'success');

        setTimeout(() => {
            document.querySelector('.movies-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    } catch (error) {
        console.error('Ошибка:', error);
        showNotification('❌ Ошибка добавления', 'error');
    }
}

function showNotification(message, type = 'success') {
    const colors = { success: '#4CAF50', warning: '#ff9800', error: '#f44336' };
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed; top: 20px; right: 20px; background: ${colors[type]};
        color: white; padding: 16px 24px; border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2); z-index: 10000;
        font-weight: 600; animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

// التهيئة
window.addEventListener('DOMContentLoaded', async function () {
    console.log('%c🎬 Запуск приложения...', 'color: #667eea; font-size: 18px; font-weight: bold;');

    try {
        await loadMoviesFromFirebase();
        currentMovies = [...moviesDatabase];
        displayMovies(currentMovies);
        setupEventListeners();
        showNotification('✅ Подключено к Firebase!', 'success');
    } catch (error) {
        console.error('Ошибка:', error);
        moviesDatabase = [...initialMovies];
        currentMovies = [...moviesDatabase];
        displayMovies(currentMovies);
        setupEventListeners();
    }
});
