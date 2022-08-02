import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Post from './Post'
import { useState, useEffect } from 'react'
import { getArticleAPI } from '../actions'
import ReactPlayer from 'react-player'
function Main(props) {

    const [show, setShow] = useState("close")
    useEffect(() => {
        props.getArticles()
    }, [])
    const Click = (e) => {
        e.preventDefault()
        if (e.target !== e.currentTarget) return;
        switch (show) {
            case 'open':
                setShow("close")
                break;
            case 'close':
                setShow("open")
                break;
            default:
                setShow("close")
                break;
        }
    }
    
    return (
        <div>
            {  props.articles.length === 0 ?
                (<Container>
                    <Box>

                        <div >
                            {props.user && props.user.photoURL ?
                                (<img className="pop" src={props.user.photoURL} alt="" />)
                                :
                                (<img className="pop" src="img/user.svg" alt="" />)
                            }
                            <button onClick={Click}
                                disabled={props.loading ? true : false}
                            >Start a Post</button>
                        </div>
                        <div>

                            <button>
                                <img src="img/gallery.svg" alt="Gallery" />
                                <span>Photo</span>
                            </button>
                            <button>
                                <img src="img/video-camera.svg" alt="Video" />
                                <span>video</span>
                            </button>
                            <button>
                                <img src="img/event.svg" alt="Event" />
                                <span>Event</span>
                            </button>
                            <button>
                                <img src="img/main article.svg" alt="Article" />
                                <span>Write Article</span>
                            </button>
                        </div>
                    </Box>
                </Container>)
                :
                (<Container>
                    <Box>

                        <div >
                            {props.user && props.user.photoURL ?
                                (<img className="pop" src={props.user.photoURL} alt="" />)
                                :
                                (<img className="pop" src="img/user.svg" alt="" />)
                            }
                            <button onClick={Click}
                                disabled={props.loading ? true : false}
                            >Start a Post</button>
                        </div>
                        <div className="block">
                            <button onClick={Click}
                                disabled={props.loading ? true : false}>
                                <img src="img/gallery.svg" alt="Gallery" onClick={Click}
                                    disabled={props.loading ? true : false} />
                                <span onClick={Click}
                                    disabled={props.loading ? true : false}>Photo</span>
                            </button>
                            <button onClick={Click}
                                disabled={props.loading ? true : false}>
                                <img src="img/video-camera.svg" alt="Video" onClick={Click}
                                    disabled={props.loading ? true : false} />
                                <span onClick={Click}
                                    disabled={props.loading ? true : false}>video</span>
                            </button>
                            <button onClick={Click}
                                disabled={props.loading ? true : false}>
                                <img src="img/event.svg" alt="Event" onClick={Click}
                                    disabled={props.loading ? true : false} />
                                <span onClick={Click}
                                    disabled={props.loading ? true : false}>Event</span>
                            </button>
                            <button onClick={Click}
                                disabled={props.loading ? true : false}>
                                <img src="img/main article.svg" alt="Article" onClick={Click}
                                    disabled={props.loading ? true : false} />
                                <span onClick={Click}
                                    disabled={props.loading ? true : false}>Write Article</span>
                            </button>
                        </div>
                    </Box>
                    <Load>
                        {
                            props.loading && <img src="img/spinner.svg" alt="Spinner" />

                        }
                        {
                            props.articles && props.articles.length > 0 &&
                            props.articles.map((article, key) =>
                            (<Article key={key}>
                                <Head>
                                    <a >
                                        {props.user && props.user.photoURL ?
                                            (<img className="pop" src={article.User.image} alt="" />)
                                            :
                                            (<img className="pop" src="img/user.svg" alt="" />)
                                        }
                                        <div>
                                            <span>{article.User.title}</span>
                                            <span>{article.User.mail}</span>
                                           
                                            {/*<span>{.User.date.toUTCString()}</span>*/}
                                        </div>
                                    </a>
                                    <button>
                                        <img src="img/ellipses.svg" alt="ellipses" />
                                    </button>
                                </Head>
                                <Info>
                                    {article.description}
                                </Info>
                                <Content>
                                    <a>
                                        {
                                            !article.sharedImg && article.video ?
                                                <ReactPlayer width={'100%'} url={article.video} /> : (
                                                    article.sharedImg && <img src={article.sharedImg} />
                                                )}
                                           
                                        
                                    </a>
                                </Content>
                                <SocialCount>
                                    <li>
                                        <button>
                                            <img src="img/like.svg" alt="" />
                                            <span>10</span>
                                        </button>
                                    </li>
                                    <li>
                                        <a>comments</a>
                                    </li>
                                </SocialCount>
                                <SocialAction>
                                    <button>
                                        <img src="img/like.svg" alt="" />
                                        <span>Like</span>
                                    </button>
                                    <button>
                                        <img src="img/comment.svg" alt="" />
                                        <span>comment</span>
                                    </button>
                                    <button>
                                        <img src="img/share-1.svg" alt="" />
                                        <span>Share</span>
                                    </button>
                                </SocialAction>
                            </Article>))}
                    </Load>
                    <Post show={show} Click={Click} />
                </Container>
                )}
        </div>
    )
}
const Container = styled.div`
    margin:0px auto;
    max-width:950px;
    width:100vw;
    .pop{
        border-radius: 30px;
    }
    @media (max-width:770px){
        width:98vw;
    }
`
const Card = styled.div`
    text-align:center;
    overflow:hidden;
    margin-bottom:8px;
    background-color:#fff;
    border-radius:6px;
    position: relative;
    border:none;
    box-shadow: 0 0 0 1px rgb(0 0 0/15%),0 0 0 rgb(0 0 0/20%);
`
const Box = styled(Card)`
    display:flex;
    flex-direction:column;
    margin:0 0 8px;
    background-color: white;
    div{
        outline: none;
        color:rgba(0,0,0,0.6);
        font-size:14px;
        line-height: 1.5;
        min-height:48px;
        background: transparent;
        border:none;
        display:flex;
        align-items: center;
        font-weight: 600;
        
    }
    div:nth-child(1){
        display: flex;
        align-items: center;
        padding:8px 16px 0px 16px;
        img{
            width:48px;
            margin-right: 8px;
        }
        .pop{
            border-radius: 30px;
        }
    button{
        cursor: pointer;
        flex-grow: 1;
        border-radius: 25px;
        margin:4px 0;
        border:1px solid rgba(0,0,0,0.15);
        text-align: left;
        background-color:white;
        font-weight: 600;
        border:none;
        color:grey;
        line-height: 2.5;
        padding-left: 10px;
        }
        button:hover{
            background-color: #77CDFF;
            color:white
        }
    }
    div:nth-child(2){
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding-bottom: 4px;
        align-items: center;
        img{
            width:48px;
            margin-right: 8px;
            border-radius:20px;
        }
        button > span{
            color:#70b5f9;
        }
        button > img{
                margin:0 4px 0 -2px;
            }
        button{
            cursor: pointer;
        
        border-radius: 25px;
        margin:4px 0;
        border:1px solid rgba(0,0,0,0.15);
        text-align: center;
        background-color:white;
        font-weight: 600;
       border:none;
        color:grey;
        }
     }
     @media (max-width:770px){
        button{
            margin-right: 0px;
        }
        
    }    
`;
const Article = styled(Card)`
    padding:0px;
    overflow: visible;
    margin:0 0 10px;
    
`
const Head = styled.div`
padding-right:30px ;
flex-wrap: nowrap;
padding:12px 16px 0;
margin-bottom: 10px;
align-items: center;
display: flex;
a{
    margin-right: 12px;
    flex-grow:1;
    overflow: hidden;
    display: flex;
    img{
        width:50px;
        height:50px;
    }
    & > div{
        display:flex;
        flex-direction: column;
        flex-grow:1;
        flex-basis:0;
        margin-left: 8px;
        overflow: hidden;
        span{
            text-align: left;
            &:first-child{
                font-size:16px;
                font-weight:700;
            }
            &:nth-child(n+1){
                font-size: 14px;
                color:grey;
            }
        }
    }
}
    button{
        position: absolute;
        right: 12px;
        top:0;
        background:transparent;
        border:none;
        outline:none;
        cursor: pointer;
        width:30px;
    }
`
const Info = styled.div`
    padding: 0 16px;
    overflow: hidden;
    font-size: 16px;
    text-align:left;

`
const Content = styled.div`
    margin-top: 8px;
    width:100%;
    margin:0 auto;
    display: block;
    position: relative;
    
    img{
        object-fit: contain;
        width: 100%;
        height: 100%;
    }
    @media (max-width:850px){
        width:100%;
    }
`
const SocialCount = styled.ul`
    line-height: 1.3;
    display: flex;
    align-items:flex-start ;
    overflow: auto;
    margin:0 16px;
    padding:8px 0;
    border-bottom: 1px solid #e9e5df;
    list-style:none;
    li{
        margin-right: 19px;
        font-size:14px;
        button{
            display:flex;
            border:none;
            outline: none;
           
        }
    }
`
const SocialAction = styled.div`
    align-items:center;
    display: flex;
    justify-content: space-between;
    margin:0;
    min-height: 40px;
    padding:4px 8px;
    button{
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        padding: 8px;
        border: none;
        outline: none;
        color:#0a66c2;
        margin:0 auto;
        & >img{
            height:30px;
        }
    }
    button:hover{
        background-color: whitesmoke;
    }
    @media (min-width:770px){
        span{
            margin-left: 8px;
        }
    }
`
const Load = styled.div`
    text-align: center;
    & > img{
        width: 50px;
    }
`
const mapStateToProps = (state) => ({
    user: state.userState.user,
    loading: state.articleState.loading,
    articles: state.articleState.articles,
})
const mapDispatchToProps = (dispatch) => ({
    getArticles: () => dispatch(getArticleAPI())
})
export default connect(mapStateToProps, mapDispatchToProps)(Main)
