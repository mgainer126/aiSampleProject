import TopicsSearch from "../components/TopicsSearch";
import PostCommentRepsonder from "../components/PostCommentResponder";
import "../styles/main.scss";

export default function Main() {
  return (
    <>
      <div className="app-card">
        <div className="app-container">
          <h1>AI LinkedIn Post Generator and Posting Tool</h1>
          <h3 className="app-card-subtitle">
            Your website is an AI-powered content workspace designed to help
            professionals quickly generate high-quality LinkedIn posts, topic
            ideas, and comment replies. Users can enter a topic, question, or
            draft, and the platform uses AI to return polished LinkedIn-ready
            content. The experience is organized into focused tools, including a
            topic search feature to brainstorm themes and a post generator that
            converts insights into post formats. There is also a comment
            responder that helps users reply thoughtfully and professionally to
            engagement on their posts.
            <br />
            <br />
            <br />
          </h3>
          <TopicsSearch />
          <PostCommentRepsonder />
        </div>
      </div>
    </>
  );
}
