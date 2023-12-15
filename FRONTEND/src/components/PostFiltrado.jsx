import { useEffect, useState } from "react";
import PostIndividual from "./PostIndividual";
import { Link, useNavigate } from "react-router-dom";

const PostFiltrado = ({ posts, getPost }) => {
  // la información que NO vamos a modificar.
  const [search, setSearch] = useState("");
  const [filterPosts, setFilterPosts] = useState(posts);

  const navigate = useNavigate();

  useEffect(() => {
    const filtered = posts.filter((post) => {
      return post.title.toLowerCase().includes(search.toLowerCase());
    });

    setFilterPosts(filtered);
  }, [search, posts]);

  return (
    <div className="col-sm-12" style={{ minWidth: "420px" }}>
      <input
        type="search"
        className="form-control"
        placeholder="Search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <br />
      <>
        {filterPosts.map((post) => {
          return (
            <PostIndividual
              getPost={getPost}
              key={post._id}
              post={post}
              onClick={() => {
                navigate(`/posts/${post._id}`);
              }}
            />
          );
        })}
      </>
    </div>
  );
};

export default PostFiltrado;
