import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../../store/post";
import PostCard from "../Post/PostCard/PostCard";
import './Home.css'
import { NavLink, useLocation } from 'react-router-dom'


const Home = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const currentPath = location.pathname
  const allPostsObj = useSelector(state => state.posts.Posts)
  console.log(allPostsObj)

  useEffect(() => {
    dispatch(fetchAllPosts())
  }, [dispatch])


  if (!allPostsObj || Object.values(allPostsObj).length === 0) {
    return null
  }
  const allPosts = Object.values(allPostsObj)
  console.log(allPosts)


  return (
 
      
       
        <div id='all-post-div' >
          {allPosts && allPosts.map(post => {
            console.log(post)
            return <PostCard post={post} />
          })}
        </div>
    
   
      )
}

      export default Home