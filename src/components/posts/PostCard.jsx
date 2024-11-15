import PostAction from "./PostAction";
import PostBody from "./PostBody";
import PostComments from "./PostComments";
import PostHeader from "./PostHeader";

export default function PostCard({ post }) {
  return (
    <article className="card mt-6 lg:mt-8">
      {/* <!-- post header --> */}
      <PostHeader post={post} />
      {/* <!-- post header ends --> */}

      {/* <!-- post body --> */}
      <PostBody poster={post?.image} content={post?.content} />
      {/* <!-- post body ends --> */}

      {/* <!-- post actions --> */}
      <PostAction post={post} commentCount={post?.comments?.length} />
      {/* <!-- post actions  --> */}

      {/* <!-- comment section --> */}
      <PostComments post={post} />
      {/* <!-- comment section ends --> */}
    </article>
  );
}
