// OMDb API Configuration
const OMDB_API_KEY = '7fa8063c';
const OMDB_API_URL = 'https://www.omdbapi.com/';

// TMDb API (للصور الأفضل)
const TMDB_API_KEY = '8265bd1679663a7ea12ac168da84d2e8';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

// إخفاء رسائل Tracking Prevention
const originalWarn = console.warn;
console.warn = function (...args) {
    if (args[0]?.includes?.('Tracking Prevention')) return;
    originalWarn.apply(console, args);
};

// الترجمات
const translations = {
    ru: {
        heroTitle: 'Откройте мир кино',
        heroSubtitle: 'Тысячи фильмов в одном месте',
        statMovies: 'Миллионы фильмов',
        statRating: 'Высокий рейтинг',
        statWorld: 'Весь мир',
        scrollText: 'Начните поиск',
        btnSearch: 'Поиск фильмов',
        btnRandom: 'Случайный фильм',
        btnTop: 'Топ рейтинг',
        searchTitle: 'Поиск фильмов',
        searchSubtitle: 'Найдите любой фильм по названию',
        searchPlaceholder: 'Введите название (Batman, Joker, Avengers...)',
        searchButton: '🔍 Найти',
        popularTitle: 'Популярные фильмы',
        noResultsTitle: 'Фильмы не найдены',
        noResultsText: 'Попробуйте изменить параметры поиска',
        year: 'Год',
        genre: 'Жанр',
        watchTrailer: '▶ Смотреть трейлер',
        loading: 'Загрузка популярных фильмов...',
        searching: 'Поиск фильмов...',
        noResults: 'Фильмы не найдены',
        error: 'Ошибка подключения',
        enterTitle: 'Введите название фильма!',
        footerTagline: 'Ваш проводник в мир кино',
        footerAbout: 'О проекте',
        footerProject: 'Курсовая работа 2026',
        footerDev: 'Веб-разработка',
        footerTech: 'Технологии',
        footerCopyright: '© 2026 Кинопортал. Все права защищены.'
    },
    ar: {
        heroTitle: 'اكتشف عالم السينما',
        heroSubtitle: 'آلاف الأفلام في مكان واحد',
        statMovies: 'ملايين الأفلام',
        statRating: 'تقييمات عالية',
        statWorld: 'من العالم كله',
        scrollText: 'ابدأ البحث',
        btnSearch: 'بحث عن أفلام',
        btnRandom: 'فيلم عشوائي',
        btnTop: 'أعلى تقييم',
        searchTitle: 'بحث عن الأفلام',
        searchSubtitle: 'ابحث عن أي فيلم بالاسم',
        searchPlaceholder: 'اكتب اسم الفيلم (Batman, Joker, Avengers...)',
        searchButton: '🔍 بحث',
        popularTitle: 'الأفلام الشائعة',
        noResultsTitle: 'لم نجد أفلام',
        noResultsText: 'جرب تغيير كلمات البحث',
        year: 'السنة',
        genre: 'النوع',
        watchTrailer: '▶ شاهد الإعلان',
        loading: 'جاري تحميل الأفلام الشائعة...',
        searching: 'جاري البحث...',
        noResults: 'لم نجد نتائج',
        error: 'خطأ في الاتصال',
        enterTitle: 'من فضلك اكتب اسم فيلم!',
        footerTagline: 'دليلك لعالم السينما',
        footerAbout: 'عن المشروع',
        footerProject: 'مشروع تخرج 2026',
        footerDev: 'تطوير الويب',
        footerTech: 'التقنيات',
        footerCopyright: '© 2026 بوابة السينما. جميع الحقوق محفوظة.'
    }
};

let currentLang = localStorage.getItem('language') || 'ru';
let currentTheme = localStorage.getItem('theme') || 'dark';

// Инициализация приложения
window.addEventListener('DOMContentLoaded', async () => {
    console.log('%c🎬 Киноприложение запущено!', 'color: #e50914; font-size: 20px; font-weight: bold;');

    initializeLanguage();
    initializeTheme();
    setupSearchInterface();
    loadPopularMovies();
});

// تهيئة اللغة
function initializeLanguage() {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
        btn.addEventListener('click', () => switchLanguage(btn.dataset.lang));
    });

    document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', currentLang);

    applyTranslations();
}

// تبديل اللغة
function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);

    applyTranslations();
    setupSearchInterface();
}

// تطبيق الترجمات
function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });
}

// تهيئة الثيم
function initializeTheme() {
    document.body.classList.toggle('light-mode', currentTheme === 'light');
    updateThemeIcon();

    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
}

// تبديل الثيم
function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
    document.body.classList.toggle('light-mode');
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = document.querySelector('.theme-icon');
    icon.textContent = currentTheme === 'dark' ? '🌙' : '☀️';
}

// Настройка интерфейса поиска
function setupSearchInterface() {
    const addSection = document.querySelector('.add-movie-section');
    if (!addSection) return;

    const oldSearch = addSection.querySelector('.search-box-container');
    if (oldSearch) oldSearch.remove();

    const searchContent = addSection.querySelector('.search-header');
    if (searchContent) {
        const searchBox = document.createElement('div');
        searchBox.className = 'search-box-container';
        searchBox.style.cssText = 'display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; margin-top: 30px;';
        searchBox.innerHTML = `
            <input type="text" id="movieSearchInput" 
                   placeholder="${translations[currentLang].searchPlaceholder}" 
                   style="flex: 1; min-width: 280px; max-width: 500px; padding: 18px 25px; border: 2px solid var(--primary-color); background: var(--input-bg); color: var(--text-color); border-radius: 50px; font-size: 1.15rem; outline: none; transition: 0.3s;">
            <button id="movieSearchBtn" 
                    style="padding: 18px 40px; background: var(--primary-color); color: white; border: none; border-radius: 50px; cursor: pointer; font-weight: bold; font-size: 1.15rem; transition: 0.3s; box-shadow: 0 4px 15px var(--shadow-color);">
                ${translations[currentLang].searchButton}
            </button>
        `;
        addSection.appendChild(searchBox);

        const searchBtn = document.getElementById('movieSearchBtn');
        const searchInput = document.getElementById('movieSearchInput');

        searchBtn.addEventListener('mouseenter', () => {
            searchBtn.style.transform = 'scale(1.05)';
        });
        searchBtn.addEventListener('mouseleave', () => {
            searchBtn.style.transform = 'scale(1)';
        });

        searchInput.addEventListener('focus', () => {
            searchInput.style.boxShadow = '0 0 20px var(--shadow-color)';
        });
        searchInput.addEventListener('blur', () => {
            searchInput.style.boxShadow = 'none';
        });

        searchBtn.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSearch();
        });
    }
}

// الحصول على بوستر من TMDb
async function getTMDbPoster(movieTitle) {
    try {
        const searchResponse = await fetch(
            `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movieTitle)}&language=en-US`
        );
        const searchData = await searchResponse.json();

        if (searchData.results && searchData.results.length > 0) {
            const posterPath = searchData.results[0].poster_path;
            if (posterPath) {
                return `${TMDB_IMAGE_URL}${posterPath}`;
            }
        }
        return null;
    } catch (error) {
        console.error('TMDb error:', error);
        return null;
    }
}

// Обработка поиска
async function handleSearch() {
    const query = document.getElementById('movieSearchInput').value.trim();
    if (!query) {
        showNotification(translations[currentLang].enterTitle, 'warning');
        return;
    }

    showLoadingMessage(translations[currentLang].searching);

    try {
        const response = await fetch(`${OMDB_API_URL}?apikey=${OMDB_API_KEY}&s=${query}`);
        const data = await response.json();

        if (data.Response === "True") {
            // 🆕 إزالة التكرارات
            const uniqueMovies = [];
            const seenTitles = new Set();

            for (const movie of data.Search.slice(0, 20)) {
                if (!seenTitles.has(movie.Title)) {
                    seenTitles.add(movie.Title);
                    const details = await getMovieDetails(movie.Title);
                    if (details) uniqueMovies.push(details);
                    if (uniqueMovies.length >= 12) break;
                }
            }

            renderMovies(uniqueMovies);
        } else {
            showErrorMessage(translations[currentLang].noResults);
        }
    } catch (error) {
        showErrorMessage(translations[currentLang].error);
    }
}

// الحصول على تفاصيل الفيلم مع البوستر من TMDb
async function getMovieDetails(title) {
    try {
        const response = await fetch(`${OMDB_API_URL}?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(title)}`);
        const data = await response.json();

        if (data.Response === "True") {
            const tmdbPoster = await getTMDbPoster(title);
            if (tmdbPoster) {
                data.Poster = tmdbPoster;
            }
            return data;
        }
        return null;
    } catch {
        return null;
    }
}

// Загрузка популярных фильмов
async function loadPopularMovies() {
    showLoadingMessage(translations[currentLang].loading);

    // 🆕 قائمة أفلام متنوعة بدون تكرار
    const popularTitles = [
        "Inception", "The Dark Knight", "Interstellar", "The Avengers",
        "Joker", "Titanic", "Avatar", "Gladiator", "The Matrix",
        "Pulp Fiction", "Fight Club", "The Shawshank Redemption"
    ];

    const movies = [];
    const seenIds = new Set();

    for (const title of popularTitles) {
        const movie = await getMovieDetails(title);
        if (movie && !seenIds.has(movie.imdbID)) {
            seenIds.add(movie.imdbID);
            movies.push(movie);
        }
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
        showErrorMessage(translations[currentLang].noResults);
        return;
    }

    movies.forEach(movie => {
        const card = createMovieCard(movie);
        grid.appendChild(card);
    });
}

// إنشاء كارت الفيلم مع معالجة أفضل للصور
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';

    let poster = movie.Poster;
    const hasPoster = poster && poster !== 'N/A' && !poster.includes('placehold');

    const gradientBg = currentTheme === 'dark'
        ? 'linear-gradient(135deg, #1a1a2e, #16213e)'
        : 'linear-gradient(135deg, #f0f0f0, #e0e0e0)';

    card.innerHTML = `
        <div style="position: relative; height: 450px; overflow: hidden; background: ${hasPoster ? '#000' : gradientBg};">
            ${hasPoster ? `
                <img src="${poster}" 
                     alt="${movie.Title}" 
                     style="width: 100%; height: 100%; object-fit: cover; transition: 0.4s;"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div style="display: none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; 
                            background: ${gradientBg}; 
                            justify-content: center; align-items: center; flex-direction: column; gap: 15px;">
                    <div style="font-size: 4rem;">🎬</div>
                    <div style="font-size: 1.3rem; font-weight: bold; color: var(--text-color); text-align: center; padding: 0 20px;">
                        ${movie.Title}
                    </div>
                </div>
            ` : `
                <div style="display: flex; position: absolute; top: 0; left: 0; right: 0; bottom: 0; 
                            justify-content: center; align-items: center; flex-direction: column; gap: 15px;">
                    <div style="font-size: 4rem;">🎬</div>
                    <div style="font-size: 1.3rem; font-weight: bold; color: var(--text-color); text-align: center; padding: 0 20px;">
                        ${movie.Title}
                    </div>
                </div>
            `}
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; 
                        background: linear-gradient(to top, ${currentTheme === 'dark' ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)'} 0%, transparent 50%);"></div>
            <span style="position: absolute; top: 15px; ${currentLang === 'ar' ? 'left' : 'right'}: 15px; 
                         background: var(--primary-color); color: white; padding: 8px 15px; border-radius: 30px; 
                         font-weight: bold; font-size: 1rem; box-shadow: 0 4px 10px var(--shadow-color); z-index: 10;">
                ⭐ ${movie.imdbRating || 'N/A'}
            </span>
        </div>
        <div style="padding: 20px; background: var(--card-bg);">
            <h3 style="margin: 0 0 12px 0; color: var(--text-color); font-size: 1.4rem;">${movie.Title}</h3>
            <div style="color: var(--text-secondary); margin-bottom: 8px; font-size: 0.95rem;">
                <strong style="color: var(--primary-color);">${translations[currentLang].year}:</strong> ${movie.Year} | 
                <strong style="color: var(--primary-color);">${translations[currentLang].genre}:</strong> ${movie.Genre || 'N/A'}
            </div>
            <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin: 15px 0;">
                ${movie.Plot && movie.Plot !== 'N/A' ? (movie.Plot.length > 100 ? movie.Plot.substring(0, 100) + '...' : movie.Plot) : translations[currentLang].noResults}
            </p>
            <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(movie.Title + ' trailer')}" 
               target="_blank" 
               style="display: block; text-align: center; background: var(--primary-color); color: white; 
                      padding: 14px; border-radius: 8px; text-decoration: none; font-weight: bold; 
                      transition: 0.3s; margin-top: 15px; box-shadow: 0 4px 15px var(--shadow-color);">
                ${translations[currentLang].watchTrailer}
            </a>
        </div>
    `;

    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.03)';
        card.style.boxShadow = '0 15px 40px var(--shadow-hover)';
        const img = card.querySelector('img');
        if (img && img.style.display !== 'none') img.style.transform = 'scale(1.1)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 8px 25px var(--shadow-card)';
        const img = card.querySelector('img');
        if (img) img.style.transform = 'scale(1)';
    });

    return card;
}

// Сообщения
function showLoadingMessage(msg) {
    const grid = document.getElementById('moviesGrid');
    if (grid) grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 80px; font-size: 1.5rem; color: var(--primary-color);">⏳ ${msg}</div>`;
}

function showErrorMessage(msg) {
    const grid = document.getElementById('moviesGrid');
    if (grid) grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 80px; font-size: 1.5rem; color: var(--text-secondary);">❌ ${msg}</div>`;
}

function showNotification(msg, type) {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed; top: 30px; ${currentLang === 'ar' ? 'left' : 'right'}: 30px; z-index: 10000;
        background: ${type === 'warning' ? '#ff9800' : 'var(--primary-color)'};
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
        from { transform: translateX(${currentLang === 'ar' ? '-' : ''}400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);
