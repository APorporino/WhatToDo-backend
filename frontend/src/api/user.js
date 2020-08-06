import axios from 'axios'

export const signup = async ({firstName, lastName, email, password})=>{
    console.log("here")
    try {
        console.log("heree")
        alert("k")
        const res = await axios.post('/newuser', {
            firstName,
            lastName,
            email,
            password
        })
        alert("j")
        if (res.status !== 201) {
            throw new Error("Error: l")
        }
        console.log("hereee")
        console.log(res)
        return res.data
    }catch(e){
        alert("d")
        console.log("yup")
        return e.message
    }
}

export const getProjects = async(token)=>{
    try {
        const res = await axios.post('/users/projects', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(res)
        return(res)
    }catch(e){
        console.log(e)
        return e
    }
}