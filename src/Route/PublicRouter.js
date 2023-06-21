import Home from "../Component/Home/Home"
import MovieDetail from "../Component/MovieDetail/MovieDetail"
import Movie from "../Component/Movies/Movie"
export const PublicRouter=[
    {
        path:"/",
        component:Home
    },
    {
        path:"/movies",
        component:Movie
    },
    {
        path:"/movie/:movieId",
        component:MovieDetail
    },
]