// OMDb API Configuration
const API_KEY = '7fa8063c'; 
const API_URL = 'https://www.omdbapi.com/';

// تغيير اسم المتغير لتجنب التعارض مع Firebase
let movieAppDb = null; 

// عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', async () => {
    console.log('%c🎬 Movie App Started!', 'color: #ffd700; font-size: 16px; font-weight: bold;');
    
    // محاولة الاتصال بـ Firebase
    if (typeof firebase !== 'undefined') {
        try {
            movieAppDb = firebase.firestore();
            console.log('✅ Firebase Connected');
        } catch (e) {
            console.warn('⚠️ Firebase not connected (Local Mode)');
        }
    }

    // تجهيز واجهة البحث
    setupSearchUI();

    // عرض أفلام مقترحة فورًا عشان الصفحة ماتبقاش فاضية
    loadFeaturedMovies();
});

// تحميل أفلام مقترحة عند الفتح
async function loadFeaturedMovies() {
    const featuredTitles = ["Inception", "Interstellar", "The Dark Knight", "Avengers", "Joker", "Titanic", "Avatar", "Matrix"];
    const moviesGrid = document.getElementById('moviesGrid');
    
    if(moviesGrid) {
        moviesGrid.innerHTML = '<div class="loading" style="grid-column: 1/-1; text-align: center; font-size: 1.2rem; padding: 20px;">⏳ جارٍ تحميل الأفلام المقترحة...</div>';
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
        const response = await fetch(`${API_URL}?apikey=${API_KEY}&s=${query}`);
        const data = await response.json();

        if (data.Response === "True") {
            // جلب تفاصيل الأفلام (عشان التقييم والقصة)
            const detailedMovies = await Promise.all(
                data.Search.slice(0, 8).map(m => fetchMovieFromAPI(m.Title))
            );
            const validMovies = detailedMovies.filter(m => m && m.Poster !== 'N/A');
            displayMovies(validMovies.length > 0 ? validMovies : detailedMovies);
        } else {
            showError('عذراً، لم نجد نتائج لهذا الفيلم');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('خطأ في الاتصال بالإنترنت');
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

// عرض الأفلام في الصفحة
function displayMovies(movies) {
    const moviesGrid = document.getElementById('moviesGrid');
    const movieCount = document.getElementById('movieCount');
    
    if (!moviesGrid) return;
    
    moviesGrid.innerHTML = '';
    if(movieCount) movieCount.textContent = `(${movies.length})`;

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.style.cssText = 'display: flex; flex-direction: column; height: 100%; background: #fff; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); overflow: hidden;';

        const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster';
        
        card.innerHTML = `
            <div class="poster-container" style="position: relative; overflow: hidden; height: 400px;">
                <img src="${posterUrl}" alt="${movie.Title}" style="width: 100%; height: 100%; object-fit: cover;">
                <span style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.8); color: #ffd700; padding: 5px 10px; border-radius: 20px; font-weight: bold;">
                    ⭐ ${movie.imdbRating || 'N/A'}
                </span>
            </div>
            <div style="padding: 15px; flex-grow: 1; display: flex; flex-direction: column;">
                <h3 style="margin: 0 0 10px 0; color: #333;">${movie.Title}</h3>
                <div style="font-size: 0.9rem; color: #666; margin-bottom: 5px;">📅 <b>السنة:</b> ${movie.Year}</div>
                <div style="font-size: 0.9rem; color: #666; margin-bottom: 5px;">🎬 <b>النوع:</b> ${movie.Genre}</div>
                <p style="font-size: 0.85rem; color: #777; margin-top: 10px; flex-grow: 1;">
                    ${movie.Plot !== 'N/A' ? (movie.Plot.substring(0, 100) + '...') : 'وصف غير متاح'}
                </p>
                <a href="https://www.youtube.com/results?search_query=${movie.Title}+trailer" target="_blank" class="watch-btn" 
                   style="display: block; width: 100%; padding: 10px; margin-top: 15px; background: #ff0000; color: white; text-align: center; text-decoration: none; border-radius: 6px; font-weight: bold;">
                   ▶ شاهد التريلر
                </a>
            </div>
        `;
        moviesGrid.appendChild(card);
    });
}

// تحويل واجهة "إضافة فيلم" لواجهة "بحث"
function setupSearchUI() {
    const filtersSection = document.querySelector('.filters-section');
    if (filtersSection) filtersSection.style.display = 'none';

    const addSection = document.querySelector('.add-movie-section');
    if (addSection) {
        addSection.innerHTML = `
            <div style="text-align: center; max-width: 800px; margin: 0 auto; padding: 20px;">
                <h2 style="margin-bottom: 20px; color: #2c3e50;">🔍 ابحث عن أفلامك المفضلة</h2>
                <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                    <input type="text" id="searchInput" placeholder="اكتب اسم الفيلم بالإنجليزية (مثلاً: Batman)..." 
                           style="flex: 1; min-width: 250px; padding: 15px; border: 2px solid #ddd; border-radius: 8px; font-size: 1rem;">
                    <button id="searchBtn" style="padding: 15px 30px; background: #4a90e2; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">بحث</button>
                </div>
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

function showLoader() {
    const grid = document.getElementById('moviesGrid');
    if(grid) grid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding:40px;">⏳ جارٍ البحث...</div>';
}

function showError(msg) {
    const grid = document.getElementById('moviesGrid');
    if(grid) grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; color: #d32f2f; padding:20px; font-size: 1.2rem;">❌ ${msg}</div>`;
}
