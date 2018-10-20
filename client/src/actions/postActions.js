import axios from "axios";
import {
   ADD_POST,
   GET_ERRORS,
   GET_POSTS,
   GET_POST,
   POST_LOADING,
   DELETE_POST,
   ADD_COMMENT,
   DELETE_COMMENT,
   UPDATE_LIKE,
   CLEAR_ERRORS,
} from "./types.js";

/***************** POSTS *****************/
// get posts
export const getPosts = () => dispatch => {
   dispatch(setPostLoading());
   axios
      .get("/api/posts")
      .then(res => {
         console.log("Posts:", res.data);
         dispatch({
            type: GET_POSTS,
            payload: res.data,
         });
      })
      .catch(err => {
         console.log("Errors:", err.response.data);
         dispatch({
            type: GET_POSTS,
            payload: null,
         });
      });
};

// get post
export const getPost = postId => dispatch => {
   dispatch(setPostLoading());
   axios
      .get(`/api/posts/${postId}`)
      .then(res => {
         console.log("Post:", res.data);
         dispatch({
            type: GET_POST,
            payload: res.data,
         });
      })
      .catch(err => {
         console.log("Errors:", err.response.data);
         dispatch({
            type: GET_POST,
            payload: null,
         });
      });
};

// add post
export const addPost = postData => dispatch => {
   axios
      .post("/api/posts", postData)
      .then(res => {
         console.log("Post added:", res.data);
         dispatch(clearErrors());
         dispatch({
            type: ADD_POST,
            payload: res.data,
         });
      })
      .catch(err => {
         console.log("Errors:", err.response.data);
         dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
         });
      });
};

// delete post
export const deletePost = postId => dispatch => {
   axios
      .delete(`/api/posts/${postId}`)
      .then(res => {
         console.log("Post deleted:", res.data);
         dispatch({
            type: DELETE_POST,
            payload: res.data,
         });
      })
      .catch(err => {
         console.log("Errors:", err.response.data);
         dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
         });
      });
};

// like post
export const likePost = postId => dispatch => {
   axios
      .post(`/api/posts/${postId}/like`)
      .then(res => {
         console.log("Post liked:", res.data);
         dispatch({
            type: UPDATE_LIKE,
            payload: res.data,
         });
      })
      .catch(err => {
         console.log("Errors:", err.response.data);
         dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
         });
      });
};

// unlike post
export const unlikePost = postId => dispatch => {
   axios
      .post(`/api/posts/${postId}/unlike`)
      .then(res => {
         console.log("Post unliked:", res.data);
         dispatch({
            type: UPDATE_LIKE,
            payload: res.data,
         });
      })
      .catch(err => {
         console.log("Errors:", err.response.data);
         dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
         });
      });
};

/***************** COMMENTS *****************/
// add comment
export const addComment = (commentData, postId) => dispatch => {
   axios
      .post(`/api/posts/${postId}/comments`, commentData)
      .then(res => {
         dispatch(clearErrors());
         console.log("Comment added:", res.data.comments[0]);
         dispatch({
            type: ADD_COMMENT,
            payload: res.data,
         });
      })
      .catch(err => {
         console.log("Errors:", err.response.data);
         dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
         });
      });
};

// delete comment
export const deleteComment = (postId, commentId) => dispatch => {
   axios
      .delete(`/api/posts/${postId}/comments/${commentId}`)
      .then(res => {
         console.log("Comment deleted:", res.data);
         dispatch({
            type: DELETE_COMMENT,
            payload: res.data,
         });
      })
      .catch(err => {
         console.log("Errors:", err.response.data);
         dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
         });
      });
};

// like comment
export const likeComment = (postId, commentId) => dispatch => {
   axios
      .post(`/api/posts/${postId}/comments/${commentId}/like`)
      .then(res => {
         console.log("Comment liked:", res.data);
         dispatch({
            type: UPDATE_LIKE,
            payload: res.data,
         });
      })
      .catch(err => {
         console.log("Errors:", err.response.data);
         dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
         });
      });
};

// unlike comment
export const unlikeComment = (postId, commentId) => dispatch => {
   axios
      .post(`/api/posts/${postId}/comments/${commentId}/unlike`)
      .then(res => {
         console.log("Comment unliked:", res.data);
         dispatch({
            type: UPDATE_LIKE,
            payload: res.data,
         });
      })
      .catch(err => {
         console.log("Errors:", err.response.data);
         dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
         });
      });
};

// set post loading state
export const setPostLoading = () => {
   return {
      type: POST_LOADING,
   };
};

// clear errors
export const clearErrors = () => {
   return {
      type: CLEAR_ERRORS,
   };
};
