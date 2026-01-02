import TopicsSearch from "../components/TopicsSearch";
import PostGenerator from "../components/PostGenerator";
import PostCommentRepsonder from "../components/PostCommentResponder";
import "../styles/main.scss";

export default function Main() {
  return (
    <>
      <TopicsSearch />
      <PostGenerator />
      <PostCommentRepsonder />
    </>
  );
}
