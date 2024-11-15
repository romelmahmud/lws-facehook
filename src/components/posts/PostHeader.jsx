import { useState } from "react";
import { actions } from "../../actions";
import ThreeDotIcon from "../../assets/icons/3dots.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import EditIcon from "../../assets/icons/edit.svg";
import TimeIcon from "../../assets/icons/time.svg";
import { useAuth } from "../../hooks/useAuth";
import { useAvatar } from "../../hooks/useAvatar";
import useAxios from "../../hooks/useAxios";
import usePost from "../../hooks/usePost";
import { getDateDifferenceFromNow } from "../../utils";

export default function PostHeader({ post }) {
  const [showAction, setShowAction] = useState(false);
  const { avatarURL } = useAvatar(post);
  const { dispatch } = usePost();
  const { api } = useAxios();
  const { auth } = useAuth();
  const isMe = post?.author?.id === auth?.user?.id;

  const handleDeletePost = async () => {
    dispatch({ type: actions.post.DATA_FETCHING });
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}`
      );
      if (response.status === 200) {
        dispatch({ type: actions.post.POST_DELETED, data: post.id });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: actions.post.DATA_FETCH_ERROR, error: error.message });
    }
  };

  return (
    <header className="flex items-center justify-between gap-4">
      {/* <!-- author info --> */}
      <div className="flex items-center gap-3 ">
        <img
          className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
          src={avatarURL}
          alt="avatar"
        />
        <div>
          <h6 className="text-lg lg:text-xl">{post?.author?.name}</h6>
          <div className="flex items-center gap-1.5">
            <img src={TimeIcon} alt="time" />
            <span className="text-sm text-gray-400 lg:text-base">
              {`${getDateDifferenceFromNow(post?.createAt)} ago`}
            </span>
          </div>
        </div>
      </div>
      {/* <!-- author info ends --> */}

      {/* <!-- action dot --> */}
      <div className="relative">
        {isMe && (
          <button
            onClick={() => {
              setShowAction(!showAction);
            }}
          >
            <img src={ThreeDotIcon} alt="3dots of Action" />
          </button>
        )}

        {/* <!-- Action Menus Popup --> */}
        {showAction && (
          <div className="action-modal-container">
            <button className="action-menu-item hover:text-lwsGreen">
              <img src={EditIcon} alt="Edit" />
              Edit
            </button>
            <button
              className="action-menu-item hover:text-red-500"
              onClick={handleDeletePost}
            >
              <img src={DeleteIcon} alt="Delete" />
              Delete
            </button>
          </div>
        )}
      </div>
      {/* <!-- action dot ends --> */}
    </header>
  );
}
