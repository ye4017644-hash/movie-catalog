// ============================================
// API Configuration
// ============================================
const OMDB_API_KEY = '7fa8063c';
const OMDB_API_URL = 'https://www.omdbapi.com/';
const TMDB_API_KEY = '8265bd1679663a7ea12ac168da84d2e8';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

// إخفاء رسائل Tracking Prevention
const originalWarn = console.warn;
console.warn = function (...args) {
    if (args[0]?.includes?.('Tracking Prevention')) return;
    originalWarn.apply(console, args);
};

// ============================================
// الترجمات
// ============================================
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
        loading: 'Загрузка фильмов...',
        searching: 'Поиск фильмов...',
        noResults: 'Фильмы не найдены',
        error: 'Ошибка подключения',
        enterTitle: 'Введите название фильма!',
        addMovieTitle: '➕ Добавить свой фильм',
        addMovieSubtitle: 'Добавьте фильм вручную в базу данных',
        fieldTitle: 'Название фильма *',
        fieldYear: 'Год выпуска *',
        fieldGenre: 'Жанр',
        fieldDesc: 'Описание',
        fieldRating: 'Рейтинг (0-10)',
        fieldCountry: 'Страна',
        fieldDirector: 'Режиссёр',
        fieldPoster: 'Ссылка на постер (URL)',
        btnAdd: '💾 Добавить в базу данных',
        btnClear: '🗑 Очистить',
        addSuccess: '✅ Фильм успешно добавлен!',
        addError: '❌ Ошибка при добавлении!',
        fillRequired: '⚠️ Заполните обязательные поля!',
        customBadge: '📌 Мой фильм',
        deleteSuccess: '🗑 Фильм удалён',
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
        loading: 'جاري تحميل الأفلام...',
        searching: 'جاري البحث...',
        noResults: 'لم نجد نتائج',
        error: 'خطأ في الاتصال',
        enterTitle: 'من فضلك اكتب اسم فيلم!',
        addMovieTitle: '➕ أضف فيلمك الخاص',
        addMovieSubtitle: 'أضف أي فيلم يدويًا لقاعدة البيانات',
        fieldTitle: 'اسم الفيلم *',
        fieldYear: 'سنة الإنتاج *',
        fieldGenre: 'النوع',
        fieldDesc: 'الوصف',
        fieldRating: 'التقييم (0-10)',
        fieldCountry: 'الدولة',
        fieldDirector: 'المخرج',
        fieldPoster: 'رابط البوستر (URL)',
        btnAdd: '💾 أضف لقاعدة البيانات',
        btnClear: '🗑 مسح',
        addSuccess: '✅ تم إضافة الفيلم بنجاح!',
        addError: '❌ خطأ أثناء الإضافة!',
        fillRequired: '⚠️ اكتب الحقول الإلزامية!',
        customBadge: '📌 فيلمي',
        deleteSuccess: '🗑 تم حذف الفيلم',
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

// ============================================
// تشغيل التطبيق
// ============================================
window.addEventListener('DOMContentLoaded', async () => {
    console.log('%c🎬 Киноприложение запущено!', 'color: #e50914; font-size: 20px; font-weight: bold;');
    console.log('%c🔥 Firebase + Firestore активны!', 'color: #FFA000; font-size: 14px;');

    initializeLanguage();
    initializeTheme();
    setupSearchInterface();
    setupAddMovieForm();
    loadAllMovies();
});

// ============================================
// اللغة
// ============================================
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
    setupAddMovieForm();
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });
}

// ============================================
// الثيم
// ============================================
function initializeTheme() {
    document.body.classList.toggle('light-mode', currentTheme === 'light');
    updateThemeIcon();
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
}

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

// ============================================
// واجهة البحث
// ============================================
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
                   style="flex: 1; min-width: 280px; max-width: 500px; padding: 18px 25px;
                          border: 2px solid var(--primary-color); background: var(--input-bg);
                          color: var(--text-color); border-radius: 50px; font-size: 1.15rem;
                          outline: none; transition: 0.3s;">
            <button id="movieSearchBtn"
                    style="padding: 18px 40px; background: var(--primary-color); color: white;
                           border: none; border-radius: 50px; cursor: pointer; font-weight: bold;
                           font-size: 1.15rem; transition: 0.3s; box-shadow: 0 4px 15px var(--shadow-color);">
                ${translations[currentLang].searchButton}
            </button>
        `;
        addSection.appendChild(searchBox);

        const searchBtn = document.getElementById('movieSearchBtn');
        const searchInput = document.getElementById('movieSearchInput');

        searchBtn.addEventListener('mouseenter', () => searchBtn.style.transform = 'scale(1.05)');
        searchBtn.addEventListener('mouseleave', () => searchBtn.style.transform = 'scale(1)');
        searchInput.addEventListener('focus', () => searchInput.style.boxShadow = '0 0 20px var(--shadow-color)');
        searchInput.addEventListener('blur', () => searchInput.style.boxShadow = 'none');
        searchBtn.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSearch(); });
    }
}

// ============================================
// فورم إضافة فيلم يدوي
// ============================================
function setupAddMovieForm() {
    const formSection = document.getElementById('addMovieSection');
    if (!formSection) return;

    formSection.innerHTML = `
        <div class="add-form-container">
            <div class="add-form-header">
                <h2 class="section-title">
                    <span class="title-icon">➕</span>
                    ${translations[currentLang].addMovieTitle}
                </h2>
                <p class="section-subtitle">${translations[currentLang].addMovieSubtitle}</p>
            </div>
            <div class="add-form-grid">
                <div class="form-group">
                    <label class="form-label">🎬 ${translations[currentLang].fieldTitle}</label>
                    <input type="text" id="newMovieTitle" class="form-input" placeholder="Брат / برات">
                </div>
                <div class="form-group">
                    <label class="form-label">📅 ${translations[currentLang].fieldYear}</label>
                    <input type="number" id="newMovieYear" class="form-input" placeholder="1997" min="1900" max="2030">
                </div>
                <div class="form-group">
                    <label class="form-label">🎭 ${translations[currentLang].fieldGenre}</label>
                    <input type="text" id="newMovieGenre" class="form-input" placeholder="Драма / دراما">
                </div>
                <div class="form-group">
                    <label class="form-label">⭐ ${translations[currentLang].fieldRating}</label>
                    <input type="number" id="newMovieRating" class="form-input" placeholder="8.1" min="0" max="10" step="0.1">
                </div>
                <div class="form-group">
                    <label class="form-label">🎥 ${translations[currentLang].fieldDirector}</label>
                    <input type="text" id="newMovieDirector" class="form-input" placeholder="Алексей Балабанов">
                </div>
                <div class="form-group">
                    <label class="form-label">🌍 ${translations[currentLang].fieldCountry}</label>
                    <select id="newMovieCountry" class="form-input">
                        <option value="OTHER">🌐 Other</option>
                        <option value="RU">🇷🇺 Россия</option>
                        <option value="EG">🇪🇬 مصر</option>
                        <option value="US">🇺🇸 USA</option>
                        <option value="AR">🇸🇦 العرب</option>
                    </select>
                </div>
                <div class="form-group form-group-full">
                    <label class="form-label">📖 ${translations[currentLang].fieldDesc}</label>
                    <textarea id="newMovieDesc" class="form-input form-textarea"
                              placeholder="اكتب وصف الفيلم هنا..."></textarea>
                </div>
                <div class="form-group form-group-full">
                    <label class="form-label">🖼 ${translations[currentLang].fieldPoster}</label>
                    <input type="url" id="newMoviePoster" class="form-input"
                           placeholder="https://image.url/poster.jpg">
                </div>
            </div>
            <div class="form-buttons">
                <button id="addMovieBtn" class="btn-add">${translations[currentLang].btnAdd}</button>
                <button id="clearFormBtn" class="btn-clear">${translations[currentLang].btnClear}</button>
            </div>
        </div>
    `;

    document.getElementById('addMovieBtn').addEventListener('click', addCustomMovie);
    document.getElementById('clearFormBtn').addEventListener('click', clearForm);
}

// ============================================
// إضافة فيلم لـ Firestore ✅ (Collection: movies)
// ============================================
async function addCustomMovie() {
    const title    = document.getElementById('newMovieTitle').value.trim();
    const year     = document.getElementById('newMovieYear').value.trim();
    const genre    = document.getElementById('newMovieGenre').value.trim();
    const desc     = document.getElementById('newMovieDesc').value.trim();
    const rating   = document.getElementById('newMovieRating').value.trim();
    const director = document.getElementById('newMovieDirector').value.trim();
    const country  = document.getElementById('newMovieCountry').value;
    const poster   = document.getElementById('newMoviePoster').value.trim();

    if (!title || !year) {
        showNotification(translations[currentLang].fillRequired, 'warning');
        return;
    }

    const addBtn = document.getElementById('addMovieBtn');
    addBtn.disabled = true;
    addBtn.textContent = '⏳ ...';

    try {
        await db.collection('movies').add({
            title,
            year,
            genre:       genre    || 'N/A',
            description: desc     || 'N/A',
            rating:      rating   || 'N/A',
            director:    director || 'N/A',
            country:     country  || 'OTHER',
            poster:      poster   || '',
            source:      'custom',
            timestamp:   firebase.firestore.FieldValue.serverTimestamp()
        });

        showNotification(translations[currentLang].addSuccess, 'success');
        clearForm();
        loadAllMovies();
        console.log('%c✅ فيلم جديد اتضاف لـ Firestore!', 'color: #4CAF50; font-size: 14px;');

    } catch (error) {
        console.error('Firestore Error:', error);
        showNotification(translations[currentLang].addError, 'error');
    } finally {
        addBtn.disabled = false;
        addBtn.textContent = translations[currentLang].btnAdd;
    }
}

// ============================================
// تحميل أفلام من Firestore ✅ (Collection: movies)
// ============================================
async function loadCustomMovies() {
    try {
        const snapshot = await db.collection('movies')
            .orderBy('timestamp', 'desc')
            .get();

        const customMovies = [];
        snapshot.forEach(doc => {
            customMovies.push({ id: doc.id, ...doc.data(), isCustom: true });
        });

        console.log(`%c📌 تم تحميل ${customMovies.length} فيلم من Firestore`, 'color: #FFA000;');
        return customMovies;
    } catch (error) {
        console.error('Firestore load error:', error);
        return [];
    }
}

// ============================================
// تحميل كل الأفلام (Firestore + API) ✅
// ============================================
async function loadAllMovies() {
    showLoadingMessage(translations[currentLang].loading);

    const popularTitles = [
        "Inception", "The Dark Knight", "Interstellar", "The Avengers",
        "Joker", "Titanic", "Avatar", "Gladiator", "The Matrix",
        "Pulp Fiction", "Fight Club", "The Shawshank Redemption"
    ];

    const [customMovies, ...apiMoviesRaw] = await Promise.all([
        loadCustomMovies(),
        ...popularTitles.map(title => getMovieDetails(title))
    ]);

    const seenIds = new Set();
    const apiMovies = apiMoviesRaw.filter(m => {
        if (!m || seenIds.has(m.imdbID)) return false;
        seenIds.add(m.imdbID);
        return true;
    });

    // أفلام Firestore أولاً ثم API
    renderMovies([...customMovies, ...apiMovies]);
}

// ============================================
// البحث (Firestore + OMDb)
// ============================================
async function handleSearch() {
    const query = document.getElementById('movieSearchInput')?.value.trim();
    if (!query) {
        showNotification(translations[currentLang].enterTitle, 'warning');
        return;
    }

    showLoadingMessage(translations[currentLang].searching);

    try {
        // بحث في Firestore
        const snapshot = await db.collection('movies').get();
        const customResults = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            if (data.title?.toLowerCase().includes(query.toLowerCase())) {
                customResults.push({ id: doc.id, ...data, isCustom: true });
            }
        });

        // بحث في OMDb
        const response = await fetch(`${OMDB_API_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}`);
        const data = await response.json();

        let apiResults = [];
        if (data.Response === "True") {
            const seenTitles = new Set();
            for (const movie of data.Search.slice(0, 15)) {
                if (!seenTitles.has(movie.Title)) {
                    seenTitles.add(movie.Title);
                    const details = await getMovieDetails(movie.Title);
                    if (details) apiResults.push(details);
                    if (apiResults.length >= 10) break;
                }
            }
        }

        const allResults = [...customResults, ...apiResults];
        allResults.length > 0
            ? renderMovies(allResults)
            : showErrorMessage(translations[currentLang].noResults);

    } catch (error) {
        showErrorMessage(translations[currentLang].error);
    }
}

// ============================================
// TMDb + OMDb
// ============================================
async function getTMDbPoster(movieTitle) {
    try {
        const res = await fetch(
            `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movieTitle)}&language=en-US`
        );
        const data = await res.json();
        if (data.results?.length > 0 && data.results[0].poster_path) {
            return `${TMDB_IMAGE_URL}${data.results[0].poster_path}`;
        }
        return null;
    } catch { return null; }
}

async function getMovieDetails(title) {
    try {
        const res = await fetch(`${OMDB_API_URL}?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(title)}`);
        const data = await res.json();
        if (data.Response === "True") {
            const tmdbPoster = await getTMDbPoster(title);
            if (tmdbPoster) data.Poster = tmdbPoster;
            return data;
        }
        return null;
    } catch { return null; }
}

// ============================================
// عرض الأفلام
// ============================================
function renderMovies(movies) {
    const grid  = document.getElementById('moviesGrid');
    const count = document.getElementById('movieCount');
    if (!grid) return;

    grid.innerHTML = '';
    if (count) count.textContent = `(${movies.length})`;

    if (movies.length === 0) {
        showErrorMessage(translations[currentLang].noResults);
        return;
    }

    movies.forEach(movie => grid.appendChild(createMovieCard(movie)));
}

// ============================================
// كارت الفيلم
// ============================================
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = movie.isCustom ? 'movie-card custom-card' : 'movie-card';

    // توحيد الحقول بين Firestore وAPI
    const title   = movie.isCustom ? movie.title  : movie.Title;
    const year    = movie.isCustom ? movie.year   : movie.Year;
    const genre   = movie.isCustom ? movie.genre  : movie.Genre;
    const plot    = movie.isCustom ? (movie.description || movie.plot) : movie.Plot;
    const rating  = movie.isCustom ? movie.rating : movie.imdbRating;
    const poster  = movie.isCustom ? movie.poster : movie.Poster;
    const isRu    = movie.isCustom && movie.country === 'RU';

    const hasPoster = poster && poster !== 'N/A' && poster !== '';
    const gradientBg = currentTheme === 'dark'
        ? 'linear-gradient(135deg, #1a1a2e, #16213e)'
        : 'linear-gradient(135deg, #f0f0f0, #e0e0e0)';

    card.innerHTML = `
        ${movie.isCustom ? `
            <div class="custom-badge">
                ${isRu ? '🇷🇺' : '📌'} ${translations[currentLang].customBadge}
            </div>
        ` : ''}

        <div style="position: relative; height: 450px; overflow: hidden;
                    background: ${hasPoster ? '#000' : gradientBg};">
            ${hasPoster ? `
                <img src="${poster}" alt="${title}"
                     style="width: 100%; height: 100%; object-fit: cover; transition: 0.4s;"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div style="display:none; position:absolute; top:0; left:0; right:0; bottom:0;
                            background:${gradientBg};
                            justify-content:center; align-items:center; flex-direction:column; gap:15px;">
                    <div style="font-size:4rem;">🎬</div>
                    <div style="font-size:1.2rem; font-weight:bold; color:var(--text-color);
                                text-align:center; padding:0 20px;">${title}</div>
                </div>
            ` : `
                <div style="display:flex; position:absolute; top:0; left:0; right:0; bottom:0;
                            background:${gradientBg};
                            justify-content:center; align-items:center; flex-direction:column; gap:15px;">
                    <div style="font-size:4rem;">🎬</div>
                    <div style="font-size:1.2rem; font-weight:bold; color:var(--text-color);
                                text-align:center; padding:0 20px;">${title}</div>
                </div>
            `}
            <div style="position:absolute; top:0; left:0; right:0; bottom:0;
                        background:linear-gradient(to top,
                        ${currentTheme === 'dark' ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)'}
                        0%, transparent 50%);"></div>
            <span style="position:absolute; top:15px; ${currentLang === 'ar' ? 'left' : 'right'}:15px;
                         background:var(--primary-color); color:white; padding:8px 15px;
                         border-radius:30px; font-weight:bold; font-size:1rem; z-index:10;">
                ⭐ ${rating || 'N/A'}
            </span>
        </div>

        <div style="padding:20px; background:var(--card-bg);">
            <h3 style="margin:0 0 12px 0; color:var(--text-color); font-size:1.3rem;">${title}</h3>
            <div style="color:var(--text-secondary); margin-bottom:8px; font-size:0.9rem;">
                <strong style="color:var(--primary-color);">${translations[currentLang].year}:</strong>
                ${year || 'N/A'} |
                <strong style="color:var(--primary-color);">${translations[currentLang].genre}:</strong>
                ${genre || 'N/A'}
            </div>
            <p style="color:var(--text-secondary); font-size:0.9rem; line-height:1.6;
                      margin:15px 0; min-height:55px;">
                ${plot && plot !== 'N/A'
                    ? (plot.length > 120 ? plot.substring(0, 120) + '...' : plot)
                    : '—'}
            </p>
            <div style="display:flex; gap:10px; margin-top:15px; flex-wrap:wrap;">
                <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(title + ' trailer')}"
                   target="_blank"
                   style="flex:1; display:block; text-align:center; background:var(--primary-color);
                          color:white; padding:12px; border-radius:8px; text-decoration:none;
                          font-weight:bold; transition:0.3s; min-width:120px;">
                    ${translations[currentLang].watchTrailer}
                </a>
                ${movie.isCustom ? `
                    <button onclick="deleteCustomMovie('${movie.id}')"
                            style="background:rgba(229,9,20,0.15); border:1px solid var(--primary-color);
                                   color:var(--primary-color); padding:12px 18px; border-radius:8px;
                                   cursor:pointer; font-weight:bold; transition:0.3s; font-size:1rem;">
                        🗑
                    </button>
                ` : ''}
            </div>
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

// ============================================
// حذف فيلم من Firestore ✅
// ============================================
async function deleteCustomMovie(docId) {
    if (!confirm('🗑 تأكيد الحذف؟')) return;
    try {
        await db.collection('movies').doc(docId).delete();
        showNotification(translations[currentLang].deleteSuccess, 'success');
        loadAllMovies();
    } catch (error) {
        console.error('Delete error:', error);
    }
}

// ============================================
// مساعد: مسح الفورم
// ============================================
function clearForm() {
    ['newMovieTitle','newMovieYear','newMovieGenre','newMovieDesc',
     'newMovieRating','newMovieDirector','newMoviePoster'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    const country = document.getElementById('newMovieCountry');
    if (country) country.value = 'OTHER';
}

// ============================================
// التنقل
// ============================================
function scrollToSearch() {
    document.getElementById('searchSection')?.scrollIntoView({ behavior: 'smooth' });
}

function loadRandomMovie() {
    const titles = ["Inception","Matrix","Interstellar","Joker","Avatar","Titanic","Gladiator"];
    const input = document.getElementById('movieSearchInput');
    if (input) {
        input.value = titles[Math.floor(Math.random() * titles.length)];
        handleSearch();
        scrollToSearch();
    }
}

function loadTopRated() {
    const tops = ["The Shawshank Redemption","The Godfather","The Dark Knight","Pulp Fiction"];
    const input = document.getElementById('movieSearchInput');
    if (input) {
        input.value = tops[Math.floor(Math.random() * tops.length)];
        handleSearch();
        scrollToSearch();
    }
}

function changeView(viewType) {
    const grid = document.getElementById('moviesGrid');
    document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
    event.target.closest('.view-btn').classList.add('active');
    grid.style.gridTemplateColumns = viewType === 'list'
        ? '1fr'
        : 'repeat(auto-fill, minmax(300px, 1fr))';
}

// ============================================
// الرسائل
// ============================================
function showLoadingMessage(msg) {
    const grid = document.getElementById('moviesGrid');
    if (grid) grid.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:80px;
                    font-size:1.5rem; color:var(--primary-color);">⏳ ${msg}</div>`;
}

function showErrorMessage(msg) {
    const grid = document.getElementById('moviesGrid');
    if (grid) grid.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:80px;
                    font-size:1.5rem; color:var(--text-secondary);">❌ ${msg}</div>`;
}

function showNotification(msg, type) {
    const colors = { success: '#4CAF50', warning: '#ff9800', error: '#e50914' };
    const notif = document.createElement('div');
    notif.style.cssText = `
        position:fixed; top:30px; ${currentLang === 'ar' ? 'left' : 'right'}:30px; z-index:10000;
        background:${colors[type] || colors.error};
        color:white; padding:20px 30px; border-radius:10px;
        box-shadow:0 8px 30px rgba(0,0,0,0.5);
        font-weight:bold; font-size:1.1rem;
        animation:slideIn 0.5s ease;
    `;
    notif.textContent = msg;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(${currentLang === 'ar' ? '-' : ''}400px); opacity: 0; }
        to   { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);
