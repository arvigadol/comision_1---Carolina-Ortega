{/*import { useCallback, useEffect, useState } from "react";
import { API_URL } from "../../utils/consts";
import PostFiltradoPorAutor from "../../components/PostFiltradoPorAutor";

const token = localStorage.getItem("token");

function GetMisPosts() {
  const [misposts, setMisPosts] = useState([]);

  const getPost = useCallback(() => {
    fetch(`${API_URL}/misposts`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
          Authorization: token
        },
      }).then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
  });

  useEffect(() => {
    getPost();
  }, [misposts]);

  return (
    <div className="col-sm-6 offset-3">
      <div>
        <h2>Posts</h2>
        <main>
          <div>
            {misposts.length === 0 ? (
              <p>"Aún no has publicado ningún post"</p>
            ) : (
                <>
                <PostFiltradoPorAutor
                  getPost={getPost}
                  posts={posts}
                  onClick={console.log(posts)}
                />
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
export default GetMisPosts;*/}