import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeletePost, fetchSinglePost } from "../../../store/post";
import { useParams, useHistory } from "react-router-dom";
import "./PostDetail.css";
import {
  fetchAddFollowed,
  fetchAddFollower,
  fetchFollowers,
  fetchRemoveFollowed,
  fetchRemoveFollower,
  fetchSingleUser,
} from "../../../store/user";
import CommentDetail from "../../Comment/CommentDetail/CommentDetail";
import CommentForm from "../../Comment/CommentForm/CommentForm";
import { fetchAllPostComments } from "../../../store/comment";
import OpenModalButton from "../../OpenModalButton";
import DeleteCommentModal from "../../Comment/CommentModal/DeleteCommentModal";
import DeletePostModal from "../../Comment/CommentModal/DeletePostModal";
import { useModal } from "../../../context/Modal";
import FollowModal from "../../Modal/FollowModal/FollowModal";
import Loading from "../../Loading/Loading";
import PageLoader from "../../PageLoader/PageLoader";

const PostDetail = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const post = useSelector((state) => state.posts?.singlePost);
  const postCreator = useSelector((state) => state.users?.singleUser);
  // comments
  const commentObj = useSelector((state) =>
    state.comments ? state.comments?.comments : {}
  );
  const commentArr = commentObj && Object.values(commentObj);

  // get post comments
  const postComments = commentArr
    ?.filter((comment) => Number(comment?.postId) === Number(post?.id))
    .sort((a, b) => new Date(b.id) - new Date(a.id));

  const sessionUser = useSelector((state) => state.session?.user);
  const postCreatorFollowers = postCreator && postCreator.followers;
  const postCreatorFollowerArr =
    postCreatorFollowers && Object.values(postCreatorFollowers);

  const [imageId, setImageId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // css
  const [isActive, setIsActive] = useState(["active", "", "", "", ""]);
  const [isHidden, setIsHidden] = useState([
    "hidden",
    "hidden",
    "hidden",
    "hidden",
    "hidden",
  ]);
  const [isImageClicked, setIsImageClicked] = useState([
    "no",
    "no",
    "no",
    "no",
    "no",
  ]);
  const [isFollowed, setIsFollowed] = useState(false);
  const { setModalContent, setOnModalClose } = useModal();
  const images = post?.postImages;

  const numOfComments = commentArr?.length;
  const handleMouseOver = (index) => {
    const activeDivs = [...isActive];
    for (let i = 0; i < activeDivs.length; i++) {
      activeDivs[i] = "";
    }
    activeDivs[index] = "active";

    setIsActive(activeDivs);
  };
  const handleImageClick = (index) => {
    const hiddenDivs = [...isHidden];

    hiddenDivs[index] = "";
    setIsHidden(hiddenDivs);
  };

  const handleEnlargedViewClick = (index) => {
    const hiddenDivs = [...isHidden];
    hiddenDivs[index] = "hidden";
    setIsHidden(hiddenDivs);
  };

  const handleDeletePost = async (e) => {
    e.preventDefault();
    await dispatch(fetchDeletePost(post.id));
    history.push(`/profile/${sessionUser?.id}`);
  };

  const handleOpenEditPostForm = (e) => {
    e.preventDefault();
    history.push(`/posts/${postId}/edit`);
  };

  // const handleViewUserProfile = e => {
  //   e.preventDefault();
  //   history.push(`/profile/${post.creator.id}`)
  // }
  const handleFollowUser = async (e) => {
    e.preventDefault();
    if (!isFollowed) {
      await dispatch(fetchAddFollower(postCreator?.id, sessionUser?.id));
      await dispatch(fetchAddFollowed(sessionUser?.id, postCreator?.id));
      setIsFollowed(true);
    } else {
      // unfollow
      await dispatch(fetchRemoveFollower(postCreator?.id, sessionUser?.id));
      // alert("Successfully unfollowed user!")
      setModalContent(<FollowModal type="unfollow" />);
      // await dispatch(fetchRemoveFollowed(sessionUser?.id, postCreator?.id))
      setIsFollowed(false);
    }
  };
  useEffect(() => {
    // console.log('Loading started');
    dispatch(fetchSinglePost(postId)).then(() => setIsLoading(false));
    window.scrollTo(0, 0);
    // console.log('Loading completed');
  }, [dispatch, postId]);

  // set follow status
  useEffect(() => {
    dispatch(fetchFollowers(postCreator?.id));
  }, [dispatch, postCreator?.id]);

  useEffect(() => {
    if (postCreatorFollowerArr) {
      for (let follower of postCreatorFollowerArr) {
        if (follower?.id === sessionUser?.id) {
          setIsFollowed(true);
        }
      }
    }
  }, [dispatch, postCreatorFollowerArr, sessionUser?.id]);

  useEffect(() => {
    post && post.creatorId && dispatch(fetchSingleUser(post?.creatorId));
  }, [dispatch, post, post?.creatorId]);
  // get all postcomments
  useEffect(() => {
    dispatch(fetchAllPostComments(postId));
  }, [dispatch, postId]);

  if (!isLoading && !post) {
    history.push("/404");
  }
  if (!post || !postCreator) {
    return null;
  }
  if (!commentObj) {
    return null;
  }

  return (
    <div id="post-detail-container">
      {isLoading ? (
        <div id="loader">
          <PageLoader />
        </div>
      ) : (
        <>
          <div id="post-detail-div">
            <div id="post-form-header">
              <h3
                id="back-to-all-posts"
                onClick={() => {
                  history.push("/posts/all");
                }}
              >
                <i class="fa-solid fa-backward"></i>
                {` ALL POSTS `}
              </h3>
            </div>
            <div id="post-img-container" className="">
              {images?.map((image, index) => (
                <>
                  <div
                    className="post-image focus-in-contract"
                    id={isActive[index]}
                    key={index}
                    onClick={() => handleImageClick(index)}
                    onMouseEnter={() => handleMouseOver(index)}
                    style={{ backgroundImage: `url(${image?.postImageUrl})` }}
                    alt=""
                  >
                    {isActive[index] && (
                      <h4 id="click-image-detail">
                        Click Image to View Detail
                      </h4>
                    )}
                  </div>
                  <div
                    className="enlarged-view"
                    id={isHidden[index]}
                    onClick={() => handleEnlargedViewClick(index)}
                  >
                    <img src={image?.postImageUrl} alt="" />
                  </div>
                </>
              ))}
            </div>
            <div id="post-detail">
              <div
                id="post-detail-user"
                // onClick={handleViewUserProfile}
              >
                <div id="post-detail-user-pic-div">
                  {postCreator?.profileImage ? (
                    <img src={postCreator?.profileImage} alt="" />
                  ) : (
                    <i class="fa-solid fa-user fa-lg"></i>
                  )}
                </div>
                <p>{post?.creator?.username}</p>
                {sessionUser &&
                  post &&
                  post.creator &&
                  sessionUser?.id !== post?.creator?.id && (
                    <div id="follow-btn" onClick={handleFollowUser}>
                      {!isFollowed ? "FOLLOW" : "FOLLOWING"}
                    </div>
                  )}
              </div>

              <h4>{post?.title}</h4>
              <div id="post-content">{post?.content}</div>
              <div id="post-detail-btn-div">
                {sessionUser && post?.creatorId === sessionUser.id && (
                  <button onClick={handleOpenEditPostForm}>EDIT POST</button>
                )}
                {sessionUser && post?.creatorId === sessionUser.id && (
                  <OpenModalButton
                    buttonText="DELETE POST"
                    modalComponent={<DeletePostModal postId={post?.id} />}
                  />
                )}
              </div>
            </div>
          </div>
          <div id="comment-section">
            <CommentForm />
            {/* {post && <div> {numOfComments} Comments</div>} */}

            <div id="comment-detail-div">
              <h4>All Comments</h4>
              <CommentDetail comments={postComments} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PostDetail;
