// ============================================
// API Configuration
// ============================================
const OMDB_API_KEY = '7fa8063c';
const OMDB_API_URL = 'https://www.omdbapi.com/';
const TMDB_API_KEY = '8265bd1679663a7ea12ac168da84d2e8';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// التعديل السحري عشان الصور تفتح في روسيا من غير VPN 
const TMDB_IMAGE_URL = 'https://tmdb.de.anuok.ru/t/p/w500';

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
        searchPlaceholder: 'Введите название фильма...',
        searchButton: '🔍 Найти',
        popularTitle: 'Мои фильмы',
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
        addMovieTitle: 'Добавить свой фильм',
        addMovieSubtitle: 'Добавьте фильм вручную в базу данных',
        fieldTitle: 'Название фильма *',
        fieldYear: 'Год выпуска *',
        fieldGenre: 'Жанр',
        fieldDesc: 'Описание',
        fieldRating: 'Рейтинг (0-10)',
        fieldCountry: 'Страна',
        fieldDirector: 'Режиссёр',
        fieldPoster: 'Ссылка на постер (необязательно)',
        btnAdd: 'Добавить в базу данных',
        btnClear: 'Очистить',
        addSuccess: '✅ Фильм успешно добавлен!',
        addError: '❌ Ошибка при добавлении!',
        fillRequired: '⚠️ Заполните обязательные поля!',
        customBadge: 'Мой фильм',
        deleteSuccess: '🗑 Фильм удалён',
        editSuccess: '✅ Фильм обновлён!',
        editError: '❌ Ошибка при редактировании!',
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
        searchPlaceholder: 'اكتب اسم الفيلم...',
        searchButton: '🔍 بحث',
        popularTitle: 'أفلامي',
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
        addMovieTitle: 'أضف فيلمك الخاص',
        addMovieSubtitle: 'أضف أي فيلم يدويًا لقاعدة البيانات',
        fieldTitle: 'اسم الفيلم *',
        fieldYear: 'سنة الإنتاج *',
        fieldGenre: 'النوع',
        fieldDesc: 'الوصف',
        fieldRating: 'التقييم (0-10)',
        fieldCountry: 'الدولة',
        fieldDirector: 'المخرج',
        fieldPoster: 'رابط البوستر (اختياري)',
        btnAdd: 'أضف لقاعدة البيانات',
        btnClear: 'مسح',
        addSuccess: '✅ تم إضافة الفيلم بنجاح!',
        addError: '❌ خطأ أثناء الإضافة!',
        fillRequired: '⚠️ اكتب الحقول الإلزامية!',
        customBadge: 'فيلمي',
        deleteSuccess: '🗑 تم حذف الفيلم',
        editSuccess: '✅ تم تعديل الفيلم!',
        editError: '❌ خطأ في التعديل!',
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
    console.log('%c🎬 Киноприложение запущено!', 'color:#e50914; font-size:20px; font-weight:bold;');
    console.log('%c🔥 Firebase + Firestore активны!', 'color:#FFA000; font-size:14px;');

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
    if (currentLang === lang) return; 
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
    loadAllMovies(); 
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) el.textContent = translations[currentLang][key];
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
    document.querySelector('.theme-icon').textContent = currentTheme === 'dark' ? '🌙' : '☀️';
}

// ============================================
// واجهة البحث
// ============================================
function setupSearchInterface() {
    const addSection = document.querySelector('.add-movie-section');
    if (!addSection) return;

    const oldSearch = addSection.querySelector('.search-box-container');
    if (oldSearch) oldSearch.remove();

    if (addSection.querySelector('.search-header')) {
        const searchBox = document.createElement('div');
        searchBox.className = 'search-box-container';
        searchBox.style.cssText = 'display:flex; gap:15px; justify-content:center; flex-wrap:wrap; margin-top:30px;';
        searchBox.innerHTML = `
            <input type="text" id="movieSearchInput"
                   placeholder="${translations[currentLang].searchPlaceholder}"
                   style="flex:1; min-width:280px; max-width:500px; padding:18px 25px;
                          border:2px solid var(--primary-color); background:var(--input-bg);
                          color:var(--text-color); border-radius:50px; font-size:1.15rem;
                          outline:none; transition:0.3s;">
            <button id="movieSearchBtn"
                    style="padding:18px 40px; background:var(--primary-color); color:white;
                           border:none; border-radius:50px; cursor:pointer; font-weight:bold;
                           font-size:1.15rem; transition:0.3s; box-shadow:0 4px 15px var(--shadow-color);">
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
        searchInput.addEventListener('keypress', e => { if (e.key === 'Enter') handleSearch(); });
    }
}

// ============================================
// فورم إضافة فيلم
// ============================================
function setupAddMovieForm() {
    const formSection = document.getElementById('addMovieSection');
    if (!formSection) return;

    formSection.innerHTML = `
        <div class="add-form-container">
            <div class="add-form-header">
                <div class="form-header-badge">FIRESTORE DATABASE</div>
                <h2 class="form-main-title">🎬 ${translations[currentLang].addMovieTitle}</h2>
                <p class="form-main-subtitle">${translations[currentLang].addMovieSubtitle}</p>
            </div>
            <div class="form-cinema-wrap">
                <div class="form-deco">
                    <div class="form-deco-circle">🎬</div>
                    <div class="form-deco-line"></div>
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
                        <input type="text" id="newMovieGenre" class="form-input" placeholder="Drama, Action">
                    </div>
                    <div class="form-group">
                        <label class="form-label">⭐ ${translations[currentLang].fieldRating}</label>
                        <input type="number" id="newMovieRating" class="form-input" placeholder="8.1" min="0" max="10" step="0.1">
                    </div>
                    <div class="form-group">
                        <label class="form-label">🎥 ${translations[currentLang].fieldDirector}</label>
                        <input type="text" id="newMovieDirector" class="form-input" placeholder="Алексей Балабанов / المخرج">
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
                                  placeholder="اكتب وصف الفيلم..."></textarea>
                    </div>
                    <div class="form-group form-group-full">
                        <label class="form-label">🖼 ${translations[currentLang].fieldPoster}
                            <span style="color:#4CAF50; font-size:0.75rem; margin-right:8px;">
                                ✨ اتركه فاضي وسيتم جلب الصورة تلقائياً
                            </span>
                        </label>
                        <input type="url" id="newMoviePoster" class="form-input"
                               placeholder="https://...poster.jpg (اختياري)">
                    </div>
                </div>
                <div class="form-buttons">
                    <button id="addMovieBtn" class="btn-add">
                        <span class="btn-icon">💾</span>
                        ${translations[currentLang].btnAdd}
                    </button>
                    <button id="clearFormBtn" class="btn-clear">
                        <span class="btn-icon">🗑</span>
                        ${translations[currentLang].btnClear}
                    </button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('addMovieBtn').addEventListener('click', addCustomMovie);
    document.getElementById('clearFormBtn').addEventListener('click', clearForm);
}

// ============================================
// إضافة فيلم - الترجمة والجلب التلقائي 
// ============================================
async function addCustomMovie() {
    const title = document.getElementById('newMovieTitle').value.trim();
    const year = document.getElementById('newMovieYear').value.trim();
    const genre = document.getElementById('newMovieGenre').value.trim();
    const userDesc = document.getElementById('newMovieDesc').value.trim(); 
    const rating = document.getElementById('newMovieRating').value.trim();
    const director = document.getElementById('newMovieDirector').value.trim();
    const country = document.getElementById('newMovieCountry').value;
    let poster = document.getElementById('newMoviePoster').value.trim();

    if (!title || !year) {
        showNotification(translations[currentLang].fillRequired, 'warning');
        return;
    }

    const addBtn = document.getElementById('addMovieBtn');
    addBtn.disabled = true;
    addBtn.innerHTML = '⏳ جاري الإضافة والترجمة...';

    let ruTitle = title;
    let arTitle = title;
    let ruDesc = userDesc; 
    let arDesc = userDesc; 

    try {
        const resRu = await fetch(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}&language=ru-RU`);
        const dataRu = await resRu.json();
        if (dataRu.results?.length > 0) {
            ruTitle = dataRu.results[0].title || title;
            if (!userDesc) ruDesc = dataRu.results[0].overview || '';

            if (!poster && dataRu.results[0].poster_path) {
                poster = `${TMDB_IMAGE_URL}${dataRu.results[0].poster_path}`;
            }
        }

        const resAr = await fetch(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}&language=ar-AE`);
        const dataAr = await resAr.json();
        if (dataAr.results?.length > 0) {
            arTitle = dataAr.results[0].title || title;
            if (!userDesc) arDesc = dataAr.results[0].overview || '';
        }

        if (!poster) {
            const omdbRes = await fetch(`${OMDB_API_URL}?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(title)}`);
            const omdbData = await omdbRes.json();
            if (omdbData.Poster && omdbData.Poster !== 'N/A') poster = omdbData.Poster;
        }
    } catch (e) {
        console.log('Auto fetch failed:', e);
    }

    try {
        await db.collection('movies').add({
            title_ru: ruTitle || title,
            title_ar: arTitle || title,
            title: title,
            year,
            genre: genre || 'N/A',
            description_ru: ruDesc || userDesc || '',
            description_ar: arDesc || userDesc || '',
            description: userDesc || '',
            rating: rating || 'N/A',
            director: director || 'N/A',
            country: country || 'OTHER',
            poster: poster || '',
            source: 'custom',
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        showNotification(translations[currentLang].addSuccess, 'success');
        clearForm();
        loadAllMovies();

    } catch (error) {
        console.error('Firestore Error:', error);
        showNotification(translations[currentLang].addError, 'error');
    } finally {
        addBtn.disabled = false;
        addBtn.innerHTML = `<span class="btn-icon">💾</span> ${translations[currentLang].btnAdd}`;
    }
}

// ============================================
// تحميل أفلام Firestore
// ============================================
async function loadAllMovies() {
    showLoadingMessage(translations[currentLang].loading);

    try {
        const snapshot = await db.collection('movies').get();
        const movies = [];

        snapshot.forEach(doc => {
            movies.push({ id: doc.id, ...doc.data(), isCustom: true });
        });

        movies.length === 0
            ? showErrorMessage(translations[currentLang].noResults)
            : renderMovies(movies);

    } catch (error) {
        console.error('Firestore load error:', error);
        showErrorMessage(translations[currentLang].error);
    }
}

// ============================================
// البحث في Firestore مع الحماية من أخطاء النص ✅
// ============================================
async function handleSearch() {
    const rawQuery = document.getElementById('movieSearchInput')?.value.trim();
    if (!rawQuery) {
        showNotification(translations[currentLang].enterTitle, 'warning');
        return;
    }
    
    // التعديل السحري لحماية البحث
    const safeQuery = rawQuery?.toLowerCase() || "";

    showLoadingMessage(translations[currentLang].searching);

    try {
        const snapshot = await db.collection('movies').get();
        const results = [];

        snapshot.forEach(doc => {
            const data = doc.data();
            
            // التأكد من أن جميع الحقول موجودة قبل تطبيق toLowerCase()
            const safeTitle = data.title?.toLowerCase() || "";
            const safeTitleRu = data.title_ru?.toLowerCase() || "";
            const safeTitleAr = data.title_ar?.toLowerCase() || "";

            if (
                safeTitle.includes(safeQuery) ||
                safeTitleRu.includes(safeQuery) ||
                safeTitleAr.includes(safeQuery)
            ) {
                results.push({ id: doc.id, ...data, isCustom: true });
            }
        });

        results.length > 0
            ? renderMovies(results)
            : showErrorMessage(translations[currentLang].noResults);

    } catch (error) {
        showErrorMessage(translations[currentLang].error);
    }
}

// ============================================
// عرض الأفلام
// ============================================
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

    movies.forEach(movie => grid.appendChild(createMovieCard(movie)));
}

// ============================================
// تحديث البوستر تلقائياً لو الرابط انكسر
// ============================================
async function refreshPosterOnError(imgEl, encodedTitle, docId) {
    imgEl.onerror = null;
    const title = decodeURIComponent(encodedTitle);

    try {
        let newPoster = '';
        const res1 = await fetch(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}&language=ru-RU`);
        const data1 = await res1.json();
        if (data1.results?.[0]?.poster_path) {
            newPoster = `${TMDB_IMAGE_URL}${data1.results[0].poster_path}`;
        }

        if (!newPoster) {
            const res2 = await fetch(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}&language=en-US`);
            const data2 = await res2.json();
            if (data2.results?.[0]?.poster_path) {
                newPoster = `${TMDB_IMAGE_URL}${data2.results[0].poster_path}`;
            }
        }

        if (!newPoster) {
            const res3 = await fetch(`${OMDB_API_URL}?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(title)}`);
            const data3 = await res3.json();
            if (data3.Poster && data3.Poster !== 'N/A') {
                newPoster = data3.Poster;
            }
        }

        if (newPoster) {
            imgEl.src = newPoster;
            await db.collection('movies').doc(docId).update({ poster: newPoster });
        } else {
            imgEl.style.display = 'none';
            imgEl.nextElementSibling.style.display = 'flex';
        }
    } catch (e) {
        imgEl.style.display = 'none';
        imgEl.nextElementSibling.style.display = 'flex';
    }
}

// ============================================
// كارت الفيلم 
// ============================================
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card custom-card';

    const title = currentLang === 'ar'
        ? (movie.title_ar || movie.title_ru || movie.title)
        : (movie.title_ru || movie.title);

    let plot = currentLang === 'ar'
        ? (movie.description_ar || movie.description || movie.description_ru)
        : (movie.description_ru || movie.description || movie.description_ar);

    if (!plot || plot === 'N/A' || plot.trim() === '') {
        plot = currentLang === 'ar' ? 'الوصف غير متاح' : 'Нет описания';
    }

    const year = movie.year;
    const genre = movie.genre;
    const rating = movie.rating;
    const poster = movie.poster;
    const isRu = movie.country === 'RU';

    const hasPoster = poster && poster !== 'N/A' && poster !== '';
    const gradientBg = currentTheme === 'dark'
        ? 'linear-gradient(135deg, #1a1a2e, #16213e)'
        : 'linear-gradient(135deg, #f0f0f0, #e0e0e0)';

    card.innerHTML = `
        <div class="custom-badge">
            ${isRu ? '🇷🇺' : '📌'} ${translations[currentLang].customBadge}
        </div>

        <div style="position:relative; height:450px; overflow:hidden;
                    background:${hasPoster ? '#000' : gradientBg};">
            ${hasPoster ? `
                <img src="${poster}" alt="${title}"
                     style="width:100%; height:100%; object-fit:cover; transition:0.4s;"
                     onerror="refreshPosterOnError(this, '${encodeURIComponent(movie.title)}', '${movie.id}')">
                <div style="display:none; position:absolute; top:0; left:0; right:0; bottom:0;
                            background:${gradientBg}; justify-content:center; align-items:center;
                            flex-direction:column; gap:15px;">
                    <div style="font-size:4rem;">🎬</div>
                    <div style="font-size:1.2rem; font-weight:bold; color:var(--text-color);
                                text-align:center; padding:0 20px;">${title}</div>
                </div>
            ` : `
                <div style="display:flex; position:absolute; top:0; left:0; right:0; bottom:0;
                            background:${gradientBg}; justify-content:center; align-items:center;
                            flex-direction:column; gap:15px;">
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
                ${plot.length > 120 ? plot.substring(0, 120) + '...' : plot}
            </p>
            <div style="display:flex; gap:10px; margin-top:15px; flex-wrap:wrap;">
                <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(title + ' trailer')}"
                   target="_blank"
                   style="flex:1; display:block; text-align:center; background:var(--primary-color);
                          color:white; padding:12px; border-radius:8px; text-decoration:none;
                          font-weight:bold; transition:0.3s; min-width:120px;">
                    ${translations[currentLang].watchTrailer}
                </a>
                <button onclick="openEditModal('${movie.id}')"
                        style="background:rgba(255,165,0,0.15); border:1.5px solid orange;
                               color:orange; padding:12px 16px; border-radius:8px;
                               cursor:pointer; font-weight:bold; transition:0.3s; font-size:1rem;">
                    ✏️
                </button>
                <button onclick="deleteCustomMovie('${movie.id}')"
                        style="background:rgba(229,9,20,0.15); border:1.5px solid var(--primary-color);
                               color:var(--primary-color); padding:12px 16px; border-radius:8px;
                               cursor:pointer; font-weight:bold; transition:0.3s; font-size:1rem;">
                    🗑
                </button>
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
// Modal التعديل 
// ============================================
function openEditModal(docId) {
    const oldModal = document.getElementById('editModal');
    if (oldModal) oldModal.remove();

    const modal = document.createElement('div');
    modal.id = 'editModal';
    modal.style.cssText = `
        position:fixed; top:0; left:0; right:0; bottom:0; z-index:99999;
        background:rgba(0,0,0,0.85); display:flex;
        align-items:center; justify-content:center; padding:20px;
        backdrop-filter:blur(5px);
    `;

    modal.innerHTML = `
        <div style="background:#141414; border:1px solid rgba(229,9,20,0.4);
                    border-radius:20px; padding:40px; width:100%; max-width:550px;
                    box-shadow:0 25px 60px rgba(0,0,0,0.8); position:relative;
                    max-height:90vh; overflow-y:auto;">

            <button onclick="document.getElementById('editModal').remove()"
                    style="position:absolute; top:15px; right:20px; background:rgba(229,9,20,0.2);
                           border:1px solid rgba(229,9,20,0.4); color:white; width:35px; height:35px;
                           border-radius:50%; cursor:pointer; font-size:1.1rem;">✕</button>

            <div style="text-align:center; margin-bottom:30px;">
                <div style="display:inline-block; background:rgba(229,9,20,0.15);
                            border:1px solid rgba(229,9,20,0.4); color:#e50914;
                            padding:5px 18px; border-radius:30px; font-size:0.75rem;
                            font-weight:bold; letter-spacing:2px; margin-bottom:12px;">
                    EDIT MOVIE
                </div>
                <h3 style="color:white; font-size:1.5rem; margin:0;">✏️ تعديل الفيلم</h3>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
                <div>
                    <label style="color:#aaa; font-size:0.8rem; font-weight:700;
                                  text-transform:uppercase; display:block; margin-bottom:6px;">🎬 الاسم *</label>
                    <input id="editTitle" class="form-input" type="text" placeholder="اسم الفيلم">
                </div>
                <div>
                    <label style="color:#aaa; font-size:0.8rem; font-weight:700;
                                  text-transform:uppercase; display:block; margin-bottom:6px;">📅 السنة *</label>
                    <input id="editYear" class="form-input" type="number" placeholder="1997">
                </div>
                <div>
                    <label style="color:#aaa; font-size:0.8rem; font-weight:700;
                                  text-transform:uppercase; display:block; margin-bottom:6px;">🎭 الجانر</label>
                    <input id="editGenre" class="form-input" type="text" placeholder="Drama, Action">
                </div>
                <div>
                    <label style="color:#aaa; font-size:0.8rem; font-weight:700;
                                  text-transform:uppercase; display:block; margin-bottom:6px;">⭐ الرايتنج</label>
                    <input id="editRating" class="form-input" type="number"
                           placeholder="8.1" min="0" max="10" step="0.1">
                </div>
                <div>
                    <label style="color:#aaa; font-size:0.8rem; font-weight:700;
                                  text-transform:uppercase; display:block; margin-bottom:6px;">🎥 المخرج</label>
                    <input id="editDirector" class="form-input" type="text" placeholder="المخرج">
                </div>
                <div>
                    <label style="color:#aaa; font-size:0.8rem; font-weight:700;
                                  text-transform:uppercase; display:block; margin-bottom:6px;">🌍 البلد</label>
                    <select id="editCountry" class="form-input">
                        <option value="OTHER">🌐 Other</option>
                        <option value="RU">🇷🇺 Россия</option>
                        <option value="EG">🇪🇬 مصر</option>
                        <option value="US">🇺🇸 USA</option>
                        <option value="AR">🇸🇦 العرب</option>
                    </select>
                </div>
                <div style="grid-column:1/-1;">
                    <label style="color:#aaa; font-size:0.8rem; font-weight:700;
                                  text-transform:uppercase; display:block; margin-bottom:6px;">📖 الوصف</label>
                    <textarea id="editDesc" class="form-input form-textarea" placeholder="وصف الفيلم..."></textarea>
                </div>
                <div style="grid-column:1/-1;">
                    <label style="color:#aaa; font-size:0.8rem; font-weight:700;
                                  text-transform:uppercase; display:block; margin-bottom:6px;">🖼 رابط البوستر</label>
                    <input id="editPoster" class="form-input" type="url" placeholder="https://...poster.jpg">
                </div>
            </div>

            <div style="display:flex; gap:12px; margin-top:25px; justify-content:center;">
                <button id="saveEditBtn"
                        style="display:flex; align-items:center; gap:8px; padding:14px 35px;
                               background:linear-gradient(135deg,#e50914,#b20710);
                               color:white; border:none; border-radius:50px; font-size:1rem;
                               font-weight:bold; cursor:pointer; transition:0.3s;
                               box-shadow:0 8px 25px rgba(229,9,20,0.4);">
                    💾 حفظ التعديلات
                </button>
                <button onclick="document.getElementById('editModal').remove()"
                        style="display:flex; align-items:center; gap:8px; padding:14px 25px;
                               background:rgba(255,255,255,0.05); color:#888;
                               border:1.5px solid rgba(255,255,255,0.1);
                               border-radius:50px; font-size:1rem; cursor:pointer;">
                    ✕ إلغاء
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    db.collection('movies').doc(docId).get().then(doc => {
        if (doc.exists) {
            const d = doc.data();
            document.getElementById('editTitle').value = d.title || '';
            document.getElementById('editYear').value = d.year || '';
            document.getElementById('editGenre').value = d.genre || '';
            document.getElementById('editRating').value = d.rating || '';
            document.getElementById('editDirector').value = d.director || '';
            document.getElementById('editCountry').value = d.country || 'OTHER';
            document.getElementById('editDesc').value = d.description || '';
            document.getElementById('editPoster').value = d.poster || '';
        }
    });

    document.getElementById('saveEditBtn').addEventListener('click', async () => {
        const title = document.getElementById('editTitle').value.trim();
        const year = document.getElementById('editYear').value.trim();
        const genre = document.getElementById('editGenre').value.trim();
        const rating = document.getElementById('editRating').value.trim();
        const director = document.getElementById('editDirector').value.trim();
        const country = document.getElementById('editCountry').value;
        const desc = document.getElementById('editDesc').value.trim();
        let poster = document.getElementById('editPoster').value.trim();

        if (!title || !year) {
            showNotification(translations[currentLang].fillRequired, 'warning');
            return;
        }

        const saveBtn = document.getElementById('saveEditBtn');
        saveBtn.disabled = true;
        saveBtn.textContent = '⏳ ...';

        try {
            await db.collection('movies').doc(docId).update({
                title,
                year,
                genre: genre || 'N/A',
                description: desc || '',
                rating: rating || 'N/A',
                director: director || 'N/A',
                country: country || 'OTHER',
                poster: poster || ''
            });

            showNotification(translations[currentLang].editSuccess, 'success');
            document.getElementById('editModal').remove();
            loadAllMovies();

        } catch (error) {
            console.error('Edit error:', error);
            showNotification(translations[currentLang].editError, 'error');
            saveBtn.disabled = false;
            saveBtn.textContent = '💾 حفظ التعديلات';
        }
    });

    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
}

// ============================================
// حذف فيلم ✅
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
// مسح الفورم
// ============================================
function clearForm() {
    ['newMovieTitle', 'newMovieYear', 'newMovieGenre', 'newMovieDesc',
        'newMovieRating', 'newMovieDirector', 'newMoviePoster'].forEach(id => {
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
    showNotification('🎲 تحميل...', 'success');
    loadAllMovies();
    scrollToSearch();
}

function loadTopRated() {
    showNotification('🏆 تحميل...', 'success');
    loadAllMovies();
    scrollToSearch();
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
// الرسائل والإشعارات
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
        position:fixed; top:30px; ${currentLang === 'ar' ? 'left' : 'right'}:30px; z-index:100000;
        background:${colors[type] || colors.error}; color:white;
        padding:20px 30px; border-radius:10px;
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
        from { transform: translateX(${currentLang === 'ar' ? '-' : ''}400px); opacity:0; }
        to   { transform: translateX(0); opacity:1; }
    }
`;
document.head.appendChild(style);

// =================================================
// 🔥 إضافات الأزرار الجديدة (مع دعم اللغتين الروسية والعربية)
// =================================================

function getCurrentLanguage() {
    const htmlLang = document.documentElement.lang;
    return htmlLang === 'ar' ? 'ar' : 'ru';
}

// 1. وظيفة النزول للبحث والتركيز عليه
function scrollToSearch() {
    const searchSection = document.getElementById('searchSection');
    if (searchSection) {
        searchSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            const searchInput = document.getElementById('movieSearchInput');
            if (searchInput) searchInput.focus();
        }, 800);
    }
}

// 2. وظيفة الفيلم العشوائي
function loadRandomMovie() {
    const grid = document.getElementById('moviesGrid');
    const cards = document.querySelectorAll('.movie-card');

    if (cards.length > 0) {
        grid.scrollIntoView({ behavior: 'smooth' });

        cards.forEach(card => {
            card.style.display = 'none';
        });

        const random = Math.floor(Math.random() * cards.length);
        cards[random].style.display = 'flex';

        const currentLang = getCurrentLanguage();
        const titleText = currentLang === 'ar' ? 'اخترنا لك عشوائياً' : 'Случайный выбор';

        const title = document.querySelector('.movies-section .section-title');
        if (title) {
            title.innerHTML = `<span class="title-icon">🎲</span> <span>${titleText}</span>`;
        }
    } else {
        scrollToSearch();
    }
}

// 3. وظيفة الأعلى تقييماً
function loadTopRated() {
    const grid = document.getElementById('moviesGrid');
    const cards = document.querySelectorAll('.movie-card');

    if (cards.length > 0) {
        grid.scrollIntoView({ behavior: 'smooth' });
        let count = 0;

        cards.forEach(card => {
            const text = card.innerText || "";
            const rating = text.match(/(\d+\.\d+)|\b10\b|\b[8-9]\b/);

            if (rating && parseFloat(rating[0]) >= 8.0) {
                card.style.display = 'flex';
                count++;
            } else {
                card.style.display = 'none';
            }
        });

        const currentLang = getCurrentLanguage();
        const titleText = currentLang === 'ar' ? `الأعلى تقييماً (${count})` : `Топ рейтинг (${count})`;

        const title = document.querySelector('.movies-section .section-title');
        if (title) {
            title.innerHTML = `<span class="title-icon">🏆</span> <span>${titleText}</span>`;
        }
    } else {
        scrollToSearch();
    }
}

// =================================================
// 🎬 دالة الفلترة بالنوع (Genre Filter) مع الحماية من أخطاء النص ✅
// =================================================
function filterByGenre(genre) {
    const cards = document.querySelectorAll('.movie-card');
    const grid = document.getElementById('moviesGrid');
    const noResults = document.getElementById('noResults');
    let count = 0;

    if (cards.length === 0) {
        const input = document.getElementById('movieSearchInput');
        if (input && typeof handleSearch === 'function') {
            input.value = genre;
            handleSearch();
        }
        return;
    }

    // التعديل السحري هنا برضه
    const safeGenre = genre?.toLowerCase() || "";

    cards.forEach(card => {
        const cardText = card.innerText?.toLowerCase() || "";

        if (cardText.includes(safeGenre)) {
            card.style.display = 'flex';
            count++;
        } else {
            card.style.display = 'none';
        }
    });

    const lang = getCurrentLanguage();
    const titleEl = document.querySelector('.movies-section .section-title span:nth-child(2)');
    if (titleEl) {
        titleEl.textContent = lang === 'ar'
            ? `${genre} (${count})`
            : `${genre} (${count})`;
    }

    if (noResults) {
        noResults.style.display = count === 0 ? 'block' : 'none';
    }

    grid.scrollIntoView({ behavior: 'smooth' });
}

// =================================================
// دالة إعادة عرض كل الأفلام (Reset) مع النزول تحت
// =================================================
function showAllMovies() {
    const grid = document.getElementById('moviesGrid');
    const cards = document.querySelectorAll('.movie-card');

    cards.forEach(card => card.style.display = 'flex');

    const noResults = document.getElementById('noResults');
    if (noResults) noResults.style.display = 'none';

    const titleEl = document.querySelector('.movies-section .section-title span:nth-child(2)');
    const lang = getCurrentLanguage();
    if (titleEl) {
        titleEl.textContent = lang === 'ar' ? 'الأفلام الشائعة' : 'Популярные фильмы';
    }

    if (grid) {
        grid.scrollIntoView({ behavior: 'smooth' });
    }
}

// =================================================
// 🔒 نظام الحماية السري (Admin Access Only) مع الحماية ✅
// =================================================
let secretKey = "";
const adminPassword = "elaraby"; 

document.addEventListener('keydown', function (e) {
    // التعديل السحري للـ key events 
    secretKey += e.key?.toLowerCase() || "";

    if (secretKey.length > adminPassword.length) {
        secretKey = secretKey.slice(-adminPassword.length);
    }

    if (secretKey === adminPassword) {
        const formSection = document.getElementById('addMovieSection');
        if (formSection) {
            formSection.classList.add('admin-mode');

            alert(getCurrentLanguage() === 'ar'
                ? "مرحباً يا يوسف! تم تفعيل وضع المسؤول. يمكنك الآن إضافة أفلام."
                : "Добро пожаловать, Юссеф! Режим администратора активирован.");

            formSection.scrollIntoView({ behavior: 'smooth' });
        }
        secretKey = ""; 
    }
});
