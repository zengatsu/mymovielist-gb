async function getSuggestions(lang, sort_by) {
    const query = `langauge=${lang}&sort_by=${sort_by}`;
    const res = await fetch('/.netlify/functions/discover-movies?' + query, {
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
    });
    const content = await res.json();

    // TODO Make a place holder image instead of empty img url
    const posters = content.results
        .slice(0, 3)
        .map((result) => {
            return {
                id: result.id,
                poster: result.poster_path ? 'https://image.tmdb.org/t/p/w500' + result.poster_path : '',
                title: result.title,
                overview: result.overview,
                releaseDate: result.release_date,
            };
        });

    return posters;
}

async function findMovies(query) {
    const res = await fetch('/.netlify/functions/search-movies?query=' + query, {
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
    });
    const content = await res.json();

    // TODO Make a place holder image instead of empty img url
    const posters = content.results
        .slice(0, 3)
        .map((result) => {
            return {
                id: result.id,
                poster: result.poster_path ? 'https://image.tmdb.org/t/p/w500' + result.poster_path : '',
                title: result.title,
                overview: result.overview,
                releaseDate: result.release_date,
            };
        });

    return posters;
}

export default {
    getSuggestions,
    findMovies,
}