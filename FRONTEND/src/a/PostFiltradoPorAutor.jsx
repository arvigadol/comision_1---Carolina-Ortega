import { useEffect, useState } from "react";
import GetOnePostPorAutor from "./GetOnePostPorAutor";

const PostFiltradoPorAutor = ({ misposts, getPost }) => {

    const [filterPosts, setFilterPosts] = useState(misposts);  
  
    useEffect(() => {
      setFilterPosts(misposts);
    }, [filterPosts]);
  return (
    <div className="col-sm-6 offset-3" style={{ minWidth: "420px" }}>
      <>
        {filterPosts.map((post) => {
          return (
            <GetOnePostPorAutor
              getPost={getPost}
              post={post}
            />
          );
        })}
      </>
    </div>
  );
};

export default PostFiltradoPorAutor;