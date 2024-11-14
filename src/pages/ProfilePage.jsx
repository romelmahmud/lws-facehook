import { useEffect } from "react";
import { actions } from "../actions";
import MyPosts from "../components/profie/MyPosts";
import ProfileInfo from "../components/profie/ProfileInfo";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import useProfile from "../hooks/useProfile";

export default function ProfilePage() {
  const { state, dispatch } = useProfile();

  const { api } = useAxios();
  const { auth } = useAuth();

  useEffect(() => {
    dispatch({
      type: actions.profile.DATA_FETCHING,
    });
    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        );
        if (response.status === 200) {
          dispatch({
            type: actions.profile.DATA_FETCHED,
            data: response.data,
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    };
    fetchProfile();
  }, []);
  if (state?.loading) {
    return <div>Loading ....</div>;
  }

  return (
    <>
      <ProfileInfo />
      <MyPosts />
    </>
  );
}
