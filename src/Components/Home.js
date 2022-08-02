import styled from 'styled-components'
import React from 'react'
import Main from './Main'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
function Home(props) {
    return (
        <div>
         <Container>
            {!props.user && <Redirect to ='/'/>}
            <Section>
                <Main/>
            </Section>
         </Container>
        </div>
    )
}
const Container=styled.div`
    margin-top:10vh;
`
const Section=styled.div`
    display:grid;
    place-items:center;
`
const mapStateToProps = (state) => {
    return {
        user:state.userState.user,
    }
}
export default connect(mapStateToProps)(Home)
