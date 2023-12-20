import styles from "../../styles/PostsPages.module.css";

import { useCallback, useEffect, useState } from "react";
import { API_URL } from "../../utils/consts";
import PostFiltrado from "../../components/PostFiltrado";

function GetBlog() {
  const [posts, setPosts] = useState([]);

  const getPost = useCallback(() => {
    fetch(`${API_URL}/blog`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err));
  });

  useEffect(() => {
    getPost();
  }, []);

  posts.reverse();

  return (
    <div className={styles.containerposts}>
      <div className="col-sm-6 offset-3">
        <div>
          <h2>Los viajeros dicen...</h2>
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
export default GetBlog;
