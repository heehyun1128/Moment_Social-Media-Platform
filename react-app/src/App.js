import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation"
import Home from "./components/Home/Home";
import PostDetail from "./components/Post/PostDetail/PostDetail";
import CreatePostForm from "./components/Post/PostForm/CreatePostForm";
import EditPostForm from "./components/Post/PostForm/EditPostForm";
import UserProfile from "./components/UserProfile/UserProfile";
import PageNotFound from './components/PageNotFound/PageNotFound'
import Search from "./components/Search/Search";
import AllPost from "./components/Post/AllPost/AllPost";
import { useLocation } from 'react-router-dom';
import Footer from "./components/Footer/Footer";
import Loading from "./components/Loading/Loading";
import { LineWave } from "react-loader-spinner";
import PageLoader from "./components/PageLoader/PageLoader";

// import UserPost from "./components/Post/UserPost/UserPost";
// import Like from "./components/Like/Like";

function App() {
  const dispatch = useDispatch();
  const location = useLocation()
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  if(!isLoaded){
    return <PageLoader/>
  }
  return (
    <>
      {location.pathname !== '/' && <Navigation isLoaded={isLoaded} />}
      {isLoaded && (
        <Switch>
          <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/posts/new">
            <CreatePostForm />
          </Route>
          <Route exact path="/posts/all">
            <AllPost />
          </Route>
          <Route exact path="/posts/:postId/edit">
            <EditPostForm />
          </Route>
          <Route exact path="/posts/:postId">
            <PostDetail />
          </Route>
          {/* <Route exact path="/profile/:userId/liked-posts">
            <Like />
          </Route> */}
          {/* <Route exact path="/profile/:userId/posts">
            <UserPost />
          </Route> */}
          <Route exact path="/profile/:userId">
            <UserProfile />
          </Route>
          <Route path="/search" >
            <Search />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path='404'>
            <PageNotFound />
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      )}
      {isLoaded && <Footer />}
    </>
  );
}

export default App;
