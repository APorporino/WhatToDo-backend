import axios from 'axios'

export const getProjects = async(token)=>{
    try {
        const res = await axios.get('/users/projects', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return(res.data)
    }catch(e){
        return e
    }
}