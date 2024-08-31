import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../../../store/post";
import PostCard from "../PostCard/PostCard";
import "./AllPost.css";
import { NavLink, useLocation } from "react-router-dom";

const AllPost = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;
  const allPostsObj = useSelector((state) => state.posts?.Posts);
  const [isViewFollowing, setIsViewFollowing] = useState(false);
  const [followedUserIds,setFollowedUserIds]=useState([])
  // useEffect(() => {
  //   dispatch(fetchAllPosts())
  //   window.scrollTo(0, 0)
  // }, [dispatch])


  const sessionUser = useSelector((state) => state.session.user);
  console.log("sessionUser",sessionUser)

  const fetchFollowed=async ()=>{
    const res= await fetch(`/api/users/${sessionUser.id}/followed`)
    const data = await res.json()
    const followedUsersArr=Object.values(data)
    const followedUserIds=followedUsersArr.map(user=>user.id)
    setFollowedUserIds(followedUserIds)
    // followedUsersArr.forEach(user => {
    //   console.log("useruser",user.id)
    // });
  }
 
  useEffect(() => {
    dispatch(fetchAllPosts());
    fetchFollowed()
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
      sessionStorage.removeItem("scrollPosition"); // Clean up after restoring
    } else {
      window.scrollTo(0, 0);
    }
 
  }, [dispatch]);

  if (!allPostsObj || Object.values(allPostsObj).length === 0) {
    return null;
  }
  const allPosts = allPostsObj && Object.values(allPostsObj);

  return (
    <>
      <div className="post-nav" style={{ display: "flex", justifyContent: "center" }}>
        <p className={isViewFollowing?"underscore":""}
          onClick={() => setIsViewFollowing(true)}
          style={{
            textAlign: "center",
            marginTop: "50px",
            marginRight: "20px",
            cursor:"pointer",
            color:"black" 
          }}
        >
          FOLLOWING
        </p>
        <p
        className={!isViewFollowing?"underscore":""}
          style={{ textAlign: "center", marginTop: "50px", cursor:"pointer", color:"black" }}
          onClick={() => setIsViewFollowing(false)}
        >
          EXPLORE
        </p>
      </div>
      {isViewFollowing ? (
        <div id="all-post-container ">
        <div id="all-post-div">
          {allPosts &&
            allPosts.filter(post=>followedUserIds.includes(post.creator.id) ).map((post) => {
              return <PostCard post={post} />;
            })}
           
        </div>
      </div>
      ) : (
        <div id="all-post-container">
          <div id="all-post-div">
            {allPosts &&
              allPosts.map((post) => {
                return <PostCard post={post} />;
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default AllPost;
