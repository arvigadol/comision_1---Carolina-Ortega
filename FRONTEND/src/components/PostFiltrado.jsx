import { useEffect, useState } from "react";
import PostIndividual from "./PostIndividual";

const PostFiltrado = ({ posts, getPost }) => {
  // la información que NO vamos a modificar.
  const [search, setSearch] = useState("");
  const [filterPosts, setFilterPosts] = useState(posts);

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
            <div>
              <PostIndividual getPost={getPost} key={post._id} post={post} />
            </div>
          );
        })}
      </>
    </div>
  );
};

export default PostFiltrado;
