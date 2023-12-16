import styles from "../../styles/PostsPages.module.css";

import { useCallback, useContext, useEffect, useState } from "react";
import { API_URL } from "../../utils/consts";
import PostFiltrado from "../../components/PostFiltrado";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";

const token = localStorage.getItem("token");

function GetAllPosts() {
  const [posts, setPosts] = useState([]);

  const { auth } = useContext(AuthContext);

  const getPost = useCallback(() => {
    !token ? (
      <Link to="/login"></Link>
    ) : (
      fetch(`${API_URL}/posts`, {
        headers: {
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((data) => setPosts(data))
        .catch((err) => console.log(err))
    );
  }, [token]);

  useEffect(() => {
    getPost();
  }, [auth, getPost]);

  return (
    <div className={styles.containerposts}>
      <div className="col-sm-6 offset-3">
        <div>
          <h2>Posts</h2>
          <main>
            <div>
              {posts.length === 0 ? (
                <p>"Aún no se han publicado posts"</p>
              ) : (
                <>
                  <PostFiltrado getPost={getPost} posts={posts} />
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
export default GetAllPosts;
