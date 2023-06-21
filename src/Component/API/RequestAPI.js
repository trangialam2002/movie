import axios from 'axios'

const request=axios.create({
    baseURL:"https://api.themoviedb.org/3/movie/"
})

export const customGet=async(path,option={})=>{
    const data=await request.get(path,option)
    return data.data
}
export default request
