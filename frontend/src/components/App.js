import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

import Header from './Header'
import Login from './Login'
import Signup from './Signup'



class App extends React.Component {

    render() {
        return(
            <BrowserRouter>
                <Header />
                <Route path="/" exact component={Login}/>
                <Route path="/signup" exact component={Signup}/>
            </BrowserRouter>
            
        )
    }
}

export default App