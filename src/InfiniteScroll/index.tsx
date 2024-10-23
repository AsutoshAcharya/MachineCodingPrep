import { useEffect, useState } from "react";
import PostItem from "./PostItem";

//https://picsum.photos/v2/list?page=2&limit=2

export type Post = {
  id: string;
  url: string;
  author: string;
};
const InfiniteScroll = () => {
  const [page, setPage] = useState<number>(1);
  const [postData, setPostData] = useState<Array<Post>>([]);
  const [loading, setLoading] = useState(true);
  function toPost(data: any): Post {
    return {
      id: data?.id,
      url: data?.download_url,
      author: data?.author,
    };
  }
  useEffect(() => {
    fetch(`https://picsum.photos/v2/list?page=${page}&limit=10`)
      .then((data) => data.json())
      .then((finalRes: Array<any>) => {
        const apiPostData = finalRes.map(toPost);
        setPostData((prev) => {
          return [...prev, ...apiPostData];
        });
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [page]);
  console.log(postData);

  return (
    <div
      style={{
        width: "100dvw",
        height: "100dvh",
        background: "cyan",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        overflow: "auto",
        flexDirection: "column",
      }}
      className="container"
      onScroll={(e) => {
        const { scrollTop, scrollHeight, offsetHeight } = e.currentTarget;
        // console.log(scrollTop, scrollHeight - offsetHeight);
        if (loading) return;
        if (Math.floor(scrollTop) === scrollHeight - offsetHeight) {
          setLoading(true);
          setPage((prev) => prev + 1);
        }
      }}
    >
      {postData?.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default InfiniteScroll;
