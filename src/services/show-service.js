async function getShows() {
    const json = localStorage.getItem("shows");
    const shows = JSON.parse(json);

    if (!shows) {
        window.localStorage.setItem("shows", JSON.stringify([]));
        console.log("There is no shows list, an empty one is created!");
    }

    return shows;
}

async function saveShows(shows) {
    localStorage.setItem("shows", JSON.stringify(shows));
    return shows;
}

export default {
    saveShows,
    getShows,
}