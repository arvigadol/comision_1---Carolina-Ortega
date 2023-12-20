import styles from "../../styles/PostsPages.module.css";

import { useCallback, useContext, useEffect, useState } from "react";
import { API_URL } from "../../utils/consts";
import PostFiltrado from "../../components/PostFiltrado";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

function GetMyPosts() {
  const [posts, setPosts] = useState([]);
  const { auth } = useContext(AuthContext);
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const getPost = useCallback(() => {
    fetch(`${API_URL}/posts`, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err));
  }, [token]);

  posts.reverse();

  useEffect(() => {
    getPost();
  }, [auth, getPost]);

  useEffect(() => {
    if (!user || !token) navigate("/login");
  }, [auth, navigate]);

  return (
    <div className={styles.containerposts}>
      <div className="col-sm-6 offset-3">
        <div>
          <h2>Mis posteos</h2>
          <main>
            <div>
              {posts.length === 0 ? (
                <div>
                  <p>"Aún no se han publicado posts"</p>
                  <Link
                    to="/posts/new"
                    className="btn btn-primary"
                    style={{ minWidth: "790px" }}
                  >
                    Crear Post
                  </Link>
                </div>
              ) : (
                <>
                  <Link
                    to="/posts/new"
                    className="btn btn-primary"
                    style={{ minWidth: "790px" }}
                  >
                    Crear Post
                  </Link>
                  <br />
                  <br />
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

export default GetMyPosts;
