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


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
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
          <Route exact path="/posts/:postId/edit">
            <EditPostForm />
          </Route>
          <Route exact path="/posts/:postId">
            <PostDetail />
          </Route>
          <Route exact path="/profile/:userId">
            <UserProfile />
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
    </>
  );
}

export default App;
