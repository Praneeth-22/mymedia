import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { signInAPI } from '../actions'
import { Redirect } from 'react-router'

function Login(props) {
    return (
        <Container>
            {props.user && <Redirect to='/home' />}
            <Element>
                <img src="img/login.jpg" alt="" />
                <div className="text">
                    <h1>Sign In</h1>
                </div>
                <button onClick={() => props.signIn()}>
                    <a>Sign In via Google</a>&nbsp;&nbsp;
                   <img src="img/google.svg" />
                </button>
            </Element>
        </Container>
    )
}
const Container = styled.div`
    display:grid;
    place-items: center;
    width:100vw;
    height: 100vh;
    background-color: #f8f8f8;
`
const Element = styled.div`
    text-align: center;
    padding: 100px;
   text-align: center;
   background-color: white;
   border-radius: 30px;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   box-shadow: 5px 5px 5px rgba(0,0,0,0.12);
    img{
    object-fit: contain;
   height: 27vh;
   margin-bottom: 36px;
   border-radius: 20px;
    }
    button{
        margin-top: 50px;
        text-transform: inherit !important;
        align-items: center;
        height: 50px;
        width: 200px;
        outline:none;
        border-radius: 20px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        font-weight: 500;
    }
    button:hover{
        background-color: antiquewhite;
    }
    button >img{
        object-fit: contain;
        width: 30px;
        height: 30px;
        margin:0;
    }
   h1{
       font-size: 36px;
   }
   @media (max-width:800px){
       width:100vw;
       height: 100vh;
       border-radius: 0;
   }
`
const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    }
}
const mapDispatchToProps = (dispatch) => ({

    signIn: () => dispatch(signInAPI()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
