import React from 'react'
const axios = require('axios').create({
    baseURL: 'https://what-to-do-task-manager.herokuapp.com/users',
    headers: {"Access-Control-Allow-Origin": "*"},
  });

class Signup extends React.Component {
    state = {
        name: "",
        email: "",
        age: 20,
        password: ""
    }

    AXIOS = axios.create({

    })

    signupNewUser(profile) {
        console.log(profile)
        axios.post('https://what-to-do-task-manager.herokuapp.com/users',{
            name: profile.name,
            headers: {"Access-Control-Allow-Origin": "*"},
            email: profile.email,
            age: 20,
            password: profile.password
          }).then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
          });
    }

    handleInputChange = (event)=> {
        console.log(event.target)
        // const target = event.target;
        // const value = target.name === 'isGoing' ? target.checked : target.value;
        const name = event.target.name;
        const val = event.target.value
        this.setState({
          [name]: val
        });
    }

    render() {
        this.signupNewUser({name:"a", email:"a", password:"dckdncidncidni"})
        console.log(this.state)
        return (
            <div>
                <form onSubmit={this.signupNewUser}>
                    <label>Enter your name:</label>
                    <input name="name" type="text" placeholder="Name" onChange={this.handleInputChange}></input>
                    <label>Enter your email:</label>
                    <input name="email" type="text" placeholder="Email" onChange={this.handleInputChange}></input>
                    <label>Enter your password:</label>
                    <input name="password" type="text" placeholder="Password" onChange={this.handleInputChange}></input>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default Signup