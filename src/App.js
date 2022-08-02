import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './Components/Login'
import Home from './Components/Home'
import Header from './Components/Header'
import { useEffect } from 'react';
import {getUserAuth} from './actions'
import {connect} from 'react-redux'
function App(props) {
    useEffect(()=>{
        props.getUserAuth()
    },[])
    return (
        <div className="main">
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <Login />
                    </Route>
                    <Route path="/home" exact>
                        <Header />
                        <Home />
                    </Route>
                </Switch>
            </Router>

        </div>
    )

}
const mapStateToProps = (state) => {
    return {
        
    }
}
const mapDispatchToProps = (dispatch ) => ({
    getUserAuth:()=> dispatch(getUserAuth()),
})
export default connect(mapStateToProps,mapDispatchToProps)(App);