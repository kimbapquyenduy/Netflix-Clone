const key = "7452c219263bf44f619c3120bc2b3e4d"
const requests = {
    requestPopulerMovie:`https://api.themoviedb.org/3/discover/tv?api_key=${key}&with_networks=213`,
    requestTopRate :`https://api.themoviedb.org/3/movie/top_rated?api_key=${key}`,
    requestAction :`https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=28`,
    requestNowPlaying:`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}`,
    requestTrendingWeek:`https://api.themoviedb.org/3/trending/all/week?api_key=${key}&language=en-US`,
    requestHorror:`https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=27`,
    requestRomance:`https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=10749`

}
export default requests