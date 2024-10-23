import { FC, useState } from "react";
import { Post } from ".";
interface Props {
  post: Post;
}
const PostItem: FC<Props> = ({ post }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      style={{
        width: "30%",
        height: "300px",
        flexShrink: 0,
        display: "flex",
        position: "relative",
      }}
    >
      {!isLoaded && !hasError && (
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Loading...
        </div>
      )}

      {hasError && (
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ff0000",
          }}
        >
          Failed to load image
        </div>
      )}

      <img
        src={post.url}
        alt="postimage"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "10px",
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        loading="lazy"
      />
    </div>
  );
};

export default PostItem;
