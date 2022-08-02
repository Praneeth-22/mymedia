import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import ReactPlayer from 'react-player'
import {connect} from 'react-redux'
import firebase from '../firebase_data'
import {postArticleAPI} from '../actions'
function Post(props) {
    const [text, EditText] = useState("")
    const [img, setImg] = useState("")
    const [videoLink, setVideoLink] = useState("")
    const [assert, setAssertArea] = useState("")
    const handleChange = (e) => {
        const image = e.target.files[0];
        if (image === "" || image === undefined) {
            alert(`not a image,the file is a ${typeof image}`)
            return;
        }
        setImg(image)
    }
    const switchAssert = (area) => {
        setImg("")
        setVideoLink("")
        setAssertArea(area)
    }
    const postArticle=(e)=>{
        e.preventDefault()
        if(e.target!== e.currentTarget){
            return;}
        const payload={
            image:img,
            video:videoLink,
            user:props.user,
            description:text,
            
        }
        props.postArticle(payload)
        reset(e)
    }
    const reset = (e) => {
        EditText("")
        setImg("")
        setVideoLink("")
        setAssertArea("")
        props.Click(e)
    }
    return (
        <div>
            {   props.show === 'open' &&
                <Container>
                    <Content>
                        <Header>
                            <h2>Create a Post</h2>
                            <button onClick={(e) => reset(e)}>
                                <img src="img/close.svg" alt="" />
                            </button>
                        </Header>
                        <Info>
                            <UserInfo>
                            { props.user && props.user.photoURL ?
                                (<img  src={props.user.photoURL} alt=""/>)
                                :
                                (<img src="img/user.svg" alt="" />)
                            }
                                <span>{props.user.displayName}</span>
                            </UserInfo>
                            <Editor>
                                <textarea
                                    value={text}
                                    onChange={(e) => { EditText(e.target.value) }}
                                    placeholder="Pull in text and Image/Video Link.."
                                    autoFocus={true}
                                    required
                                />
                                {assert === "image" ?
                                    (<UploadImg>
                                        <input type="file"
                                            accept='image/gif,image/jpeg,iamge/png'
                                            name="image"
                                            id="file"
                                            style={{
                                                display: "none",
                                            }}
                                            onChange={handleChange}
                                        />
                                        <p>
                                            <label htmlFor="file" style={{
                                                border:'1px solid black',
                                                borderRadius:24,
                                                padding:5,
            
                                            }}>
                                                Select an image to share
                               </label>
                                        </p>
                                        {img && <img src={URL.createObjectURL(img)} />}
                                    </UploadImg>) :
                                    (assert === 'media' &&
                                    <div>
                                    <input type="text"
                                        placeholder="Please input a Video Link"
                                        name="image"
                                        value={videoLink}
                                        onChange={(e) => setVideoLink(e.target.value)}
                                    />
                                    {videoLink && <ReactPlayer width={"100%"} url={videoLink} />}
                                    </div>)
                                }
                            </Editor>

                        </Info>
                        <Msg>
                            <Attach>
                                <AssetButton onClick={()=>{switchAssert("image")}}>
                                    <img src="img/gallery.svg" alt="" />
                                </AssetButton>
                                <AssetButton onClick={()=>{switchAssert("media")}}>
                                    <img src="img/video-camera.svg" alt="" />
                                </AssetButton>
                            </Attach>
                            
                            <PostButton 
                            disabled={!text ? true : false}
                            onClick={(e)=>postArticle(e)}
                            >
                                Post
                    </PostButton>
                        </Msg>
                    </Content>
                </Container>
            }
        </div>
    )
}
const Container = styled.div`
    position: fixed;
    top:0;
    left:0;
    right: 0;
    bottom:0;
    z-index: 999999;
    color:black;
    background-color: rgba(0,0,0,0.8);
`
const Content = styled.div`
    top:10%;    
    width: 100%;
    max-width:600px;
    background-color: whitesmoke;
    max-height: 90%;
    overflow: initial;
    border-radius: 5px;
    display: flex;
    position: relative;
    flex-direction: column;
    margin: 0px auto;
    animation: fadeIn 0.7s;
`
const Header = styled.div`
    padding:16px 20px;
    border:1px solid rgba(0,0,0,0.15);
    font-size:16px;
    line-height: 1.5;
    color:rgba(0,0,0,0.6);
    font-weight: normal;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button{
        height:40px;
        width:40px;
        min-width: auto;
        color:rgba(0,0,0,0.15);
        cursor: pointer;
       svg,img{
           pointer-events: none;
       }
    }
`
const Info = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow:1;
    overflow-y: auto;
    vertical-align: baseline;
    background: transparent;
    padding:8px 12px;
`
const UserInfo = styled.div`
    display: flex;
    align-items: center;
    padding:12px 24px;
    img{
        width:40px;
        height: 40px;
        background-clip: content-box;
        border:2px solid transparent;
        border-radius: 50%;

    }
    span{
        font-weight: 600;
        font-size:16px;
        line-height: 1.5;
        margin-left:5px;
        }
    
`
const Msg = styled.div`
    display: flex;
    justify-content: space-between;
    padding:12px 24px 12px 16px;
`
const AssetButton = styled.button`
    display: flex;
    align-items: center;
    height: 40px;
    min-width:auto;
    width:40px;
    img{
        width: 100%;
    }

`
const Attach = styled.div`
    display: flex;
    align-items: center;
    padding-right: 8px;
    ${AssetButton}{
        width:40px;
    }
`
const ShareCmt = styled.div`
    padding-left: 8px;
    margin-right:auto;
    border-left: 1px solid rgba(0,0,0,0.15);
    
`
const PostButton = styled.button`
    min-width: 60px;
    border-radius: 20px;
    padding:0 16px;
    background-color: ${props => props.disabled ? "rgba(0,0,0,0.8)" : "#0a66c2"};
    color:white;
    &:hover{
        background-color: ${props => props.disabled ? "rgba(0,0,0,0.08)" : "#004182"};
    }
`
const Editor = styled.div`
    padding:12px 24px;
    textarea{
        width:100%;
        resize: none;
        min-height: 100px;
        
    }
    input{
        width: 100%;
        height: 35px;font-size:16px;
        margin-bottom: 20px;
    }
`
const UploadImg = styled.div`
    text-align: center;
    img{
        width: 100%;

    }
`
const mapStateToProps = (state ) => {
    return {
      user:state.userState.user,
    }
  }
  const mapDispatchToProps = (dispatch) => ({
    postArticle:(payload)=> dispatch(postArticleAPI(payload)),
})
export default connect(mapStateToProps,mapDispatchToProps)(Post)
