const key = "7452c219263bf44f619c3120bc2b3e4d"
const requests = {
    requestPopulerMovie:`https://api.themoviedb.org/3/movie/popular?api_key=${key}`,
    requestTopRate :`https://api.themoviedb.org/3/movie/top_rated?api_key=${key}`,
    requestAction :`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=action`,
    requestPopulerTvShow:`https://api.themoviedb.org/3/tv/popular?api_key=${key}`,
    requestTrendingWeek:`https://api.themoviedb.org/3/trending/all/week?api_key=${key}`
}
export default requests