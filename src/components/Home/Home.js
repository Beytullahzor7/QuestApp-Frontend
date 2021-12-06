import React, {useState, useEffect} from "react";
import Post from "../Post/Post";

import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PostForm from "../Post/PostForm";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d904c0",
        
    }
}));

function Home() {
    const [error, setError] = useState(null); //states
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);
    const classes = useStyles();

    const refreshPosts = () => {
        fetch("/posts")
        .then(res => res.json()) //gelen responsu parse et
        .then(
            (result) => {
                setIsLoaded(true);
                setPostList(result);
            },
            (error) => {
                console.log(error)
                setIsLoaded(true);
                setError(error);
            }
        )   
    }

    useEffect(() => { //api-call (componentDidMount)
        refreshPosts()
    }, [postList])

    if (error) {
        return <div> Error !!! </div>;
    } else if (!isLoaded) {
        return <div> Loading...</div>;
    } else { //loading succesfull
        return (

            <div className = {classes.container}>
                {localStorage.getItem("currentUser") == null? "":
                <PostForm userId = {localStorage.getItem("currentUser")} userName = {localStorage.getItem("userName")} refreshPosts = {refreshPosts}/>}
                {postList.map(post => (
                    <Post likes={post.postLikes} postId={post.id} userId={post.userId} userName={post.userName} 
                    title={post.title} text={post.text}></Post> 
                ))}
            </div> 
        );
    }
}

export default Home;