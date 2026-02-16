// OMDb API Configuration
const API_KEY = '7fa8063c'; // مفتاحك السحري
const API_URL = 'https://www.omdbapi.com/';

// المتغيرات العامة
let db = null;

// عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', async () => {
    console.log('%c🎬 Movie App Started!', 'color: #ffd700; font-size: 16px; font-weight: bold;');
    
    // محاولة الاتصال بـ Firebase (اختياري، لن يؤثر على الـ API)
    if (typeof firebase !== 'undefined') {
        try {
            db = firebase.firestore();
            console.log('✅ Firebase Connected');
            showNotification('✅ Подключено к Firebase!', 'success');
        } catch (e) {
            console.warn('⚠️ Firebase not connected (Local Mode)');
        }
    }

    // تعديل واجهة المستخدم لتناسب البحث
    setupSearchUI();

    // عرض أفلام مقترحة فورًا
    loadFeaturedMovies();
});

// تحميل أفلام مقترحة عند الفتح
async function loadFeaturedMovies() {
    // قائمة أفلام مشهورة تظهر في البداية
    const featuredTitles = ["Inception", "Interstellar", "The Dark Knight", "Avengers", "Joker", "Titanic", "Avatar", "Matrix"];
    const moviesGrid = document.getElementById('moviesGrid');
    
    if(moviesGrid) {
        moviesGrid.innerHTML = '<div class="loading" style="grid-column: 1/-1; text-align: center; font-size: 1.2rem; padding: 20px;">⏳ Загрузка популярных фильмов...</div>';
    }

    let movies = [];
    for (const title of featuredTitles) {
        const movie = await fetchMovieFromAPI(title);
        if (movie) movies.push(movie);
    }
    
    displayMovies(movies);
}

// البحث في API
async function searchMovies(query) {
    if (!query) return;
    
    showLoader();
    try {
        // البحث عن قائمة أفلام
        const response = await fetch(`${API_URL}?apikey=${API_KEY}&s=${query}`);
        const data = await response.json();

        if (data.Response === "True") {
            // جلب تفاصيل أول 8 أفلام (عشان التقييم والقصة تكون دقيقة)
            const detailedMovies = await Promise.all(
                data.Search.slice(0, 8).map(m => fetchMovieFromAPI(m.Title))
            );
            // فلترة النتائج اللي ملهاش بوستر
            const validMovies = detailedMovies.filter(m => m && m.Poster !== 'N/A');
            displayMovies(validMovies.length > 0 ? validMovies : detailedMovies);
        } else {
            showError('Фильмы не найдены (Movies not found)');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('Ошибка сети (Network Error)');
    }
}

// جلب تفاصيل فيلم واحد
async function fetchMovieFromAPI(title) {
    try {
        const response = await fetch(`${API_URL}?apikey=${API_KEY}&t=${title}`);
        const data = await response.json();
        return data.Response === "True" ? data : null;
    } catch (error) {
        return null;
    }
}

// عرض الأفلام
function displayMovies(movies) {
    const moviesGrid = document.getElementById('moviesGrid');
    const movieCount = document.getElementById('movieCount');
    
    if (!moviesGrid) return;
    
    moviesGrid.innerHTML = '';
    if(movieCount) movieCount.textContent = `(${movies.length})`;

    if (movies.length === 0) {
        showError('Нет результатов');
        return;
    }

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        // تحسين مظهر الكارت
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        card.style.height = '100%';

        const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster';
        
        card.innerHTML = `
            <div class="poster-container" style="position: relative; overflow: hidden; border-radius: 12px 12px 0 0;">
                <img src="${posterUrl}" 
                     alt="${movie.Title}" class="movie-poster" style="width: 100%; height: 400px; object-fit: cover;">
                <span class="rating-badge" style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.8); color: #ffd700; padding: 5px 10px; border-radius: 20px; font-weight: bold;">
                    ⭐ ${movie.imdbRating || 'N/A'}
                </span>
            </div>
            <div class="movie-card-content" style="padding: 15px; flex-grow: 1; display: flex; flex-direction: column;">
                <h3 class="movie-title" style="margin: 0 0 10px 0; font-size: 1.2rem;">${movie.Title}</h3>
                <div class="movie-info">📅 <strong>Год:</strong> ${movie.Year}</div>
                <div class="movie-info">🎬 <strong>Жанр:</strong> ${movie.Genre}</div>
                <div class="movie-info">⏱️ <strong>Время:</strong> ${movie.Runtime}</div>
                <p class="movie-description" style="font-size: 0.9rem; color: #666; margin-top: 10px; flex-grow: 1;">
                    ${movie.Plot !== 'N/A' ? (movie.Plot.length > 100 ? movie.Plot.substring(0, 100) + '...' : movie.Plot) : 'Описание недоступно'}
                </p>
                <a href="https://www.youtube.com/results?search_query=${movie.Title}+trailer" target="_blank" class="watch-btn" 
                   style="display: block; width: 100%; padding: 10px; margin-top: 15px; background: #ff0000; color: white; text-align: center; text-decoration: none; border-radius: 6px; font-weight: bold; transition: 0.3s;">
                    ▶ Смотреть трейлер
                </a>
            </div>
        `;
        moviesGrid.appendChild(card);
    });
}

// تحويل واجهة "إضافة فيلم" لواجهة "بحث"
function setupSearchUI() {
    // نخفي قسم الفلترة القديم لأنه مش متوافق مع API البحث الحر
    const filtersSection = document.querySelector('.filters-section');
    if (filtersSection) filtersSection.style.display = 'none';

    // نغير عنوان وقسم الإضافة
    const addSection = document.querySelector('.add-movie-section');
    if (addSection) {
        addSection.innerHTML = `
            <div style="text-align: center; max-width: 800px; margin: 0 auto;">
                <h2 style="margin-bottom: 20px;">🔍 Поиск фильмов (Search Movies)</h2>
                <div class="search-box" style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                    <input type="text" id="searchInput" placeholder="Введите название (например: Harry Potter)..." 
                           style="flex: 1; min-width: 250px; padding: 15px; border: 2px solid #ddd; border-radius: 8px; font-size: 1rem;">
                    <button id="searchBtn" class="btn-primary" style="padding: 15px 30px; font-size: 1rem; cursor: pointer;">Найти (Search)</button>
                </div>
                <p style="margin-top: 10px; color: #666;">Например: <em>Batman, Avengers, Spider-Man, Joker</em></p>
            </div>
        `;

        const searchBtn = document.getElementById('searchBtn');
        const searchInput = document.getElementById('searchInput');

        if (searchBtn && searchInput) {
            searchBtn.addEventListener('click', () => searchMovies(searchInput.value));
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') searchMovies(searchInput.value);
            });
        }
    }
}

// أدوات مساعدة
function showLoader() {
    const grid = document.getElementById('moviesGrid');
    if(grid) grid.innerHTML = '<div class="loading" style="grid-column: 1/-1; text-align:center; padding:40px;">⏳ Ищем фильмы...</div>';
}

function showError(msg) {
    const grid = document.getElementById('moviesGrid');
    if(grid) grid.innerHTML = `<div class="error" style="grid-column: 1/-1; text-align:center; color: #d32f2f; padding:20px; font-size: 1.2rem;">❌ ${msg}</div>`;
}

// نظام الإشعارات
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

// إضافة CSS للرسوم المتحركة
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    .watch-btn:hover {
        background: #cc0000 !important;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
`;
document.head.appendChild(style);
