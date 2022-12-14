import React from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {signOutAPI} from '../actions'
function Header(props) {
    return (
        <Container>
            <Elements>
                <Logo>
                    <a href="/home">
                        <img src="img/l.png" alt="AU" />
                    </a>
                </Logo>
                <Nav>
                
                <NavList className="active">
                  <a href="/home">
                    <img src="/img/nav-home.svg" alt="" />
                    <span>Home</span>
                  </a>
                </NavList>
                    <User>
                        <a>
                          { props.user && props.user.photoURL ?
                            (<img src={props.user.photoURL} alt=""/>)
                            :
                            (<img src="/img/user.svg" alt="" />)
                          }
                            <span>Me
                            <img src='img/down-icon.svg' alt=""/>
                            </span>
                        </a>

                        <SignOut onClick={()=> props.signOut()}>
                            <a>Sign Out</a>
                        </SignOut>
                    </User>
                </Nav>
            </Elements>
        </Container>
    )
}

const Container = styled.div`
    top:0;
    left:0;
    z-index:1000;
    padding:0 10px;
    position:fixed;
    width:100vw;
    margin-bottom:10px;
    background-color:whitesmoke;

  
`
const Elements = styled.div`
    display:flex;
    align-items:center;
    margin:0 auto;
    justify-content:space-between;
    min-height:100%;
    max-width:970px;
`
const Logo = styled.span`
    & > a > img{
        height:60px;
        outline:none;
    }
`
const Nav = styled.nav`
   margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`
const NavList = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  a {
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 52px;
    min-width: 80px;
    position: relative;
    text-decoration: none;
    span {
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
    }
    @media (max-width: 768px) {
      min-width: 70px;
    }
  }
  &:hover, &:active {
    a {
      span {
        color: rgba(0, 0, 0, 0.9);
      }
    }
  }
`
const SignOut = styled.div`
 position: absolute;
  top: 55px;
  background: white;
  border-radius:5px;
  width: 70px;
  height: 40px;
  font-size: 16px;
  transition-duration: 167ms;
  text-align: center;
  display: none;
  cursor: pointer;
  border:1px solid black;
  `
const User = styled(NavList)`
    cursor: pointer;
      a > svg {
    width: 24px;
    border-radius: 50%;
  }
  a > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  span {
    display: flex;
    align-items: center;
  }
  &:hover {
    ${SignOut} {
      align-items: center;
      display: flex;
      justify-content: center;
    }
  }

`
 const mapStateToProps = (state ) => {
  return {
    user:state.userState.user,
  }
}
const mapDispatchToProps = (dispatch) => ({
  signOut : ()=> dispatch(signOutAPI()),
})

export default connect(mapStateToProps,mapDispatchToProps)(Header)
