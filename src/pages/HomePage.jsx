import { useEffect } from "react";
import { actions } from "../actions";
import NewPost from "../components/posts/NewPost";
import PostList from "../components/posts/PostList";
import useAxios from "../hooks/useAxios";
import usePost from "../hooks/usePost";

export default function HomePage() {
  const { state, dispatch } = usePost();
  const { api } = useAxios();
  useEffect(() => {
    dispatch({ type: actions.post.DATA_FETCHING });

    const fetchPost = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts`
        );
        if (response.status === 200) {
          dispatch({ type: actions.post.DATA_FETCHED, data: response.data });
        }
      } catch (error) {
        console.log(error);
        dispatch({ type: actions.post.DATA_FETCH_ERROR, error: error.message });
      }
    };

    fetchPost();
  }, []);

  if (state?.loading) {
    return <div> Loading.....</div>;
  }
  if (state?.error) {
    return <div> Error in fetching posts: {state?.error?.message}</div>;
  }

  return (
    <>
      <NewPost />
      <PostList posts={state?.posts} />
    </>
  );
}
