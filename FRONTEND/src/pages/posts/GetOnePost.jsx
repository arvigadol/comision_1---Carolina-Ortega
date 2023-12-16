import styles from "../../styles/PostsPages.module.css";

import {
  useCallback,
  useId,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../../utils/consts";
import PostIndividualOnePost from "../../components/PostIndividualOnePost";

const token = localStorage.getItem("token");

function GetOnePost(posts, e) {
  const modalId = useId();
  const ref = useRef(null);

  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const { auth } = useContext(AuthContext);

  const getPost = useCallback(() => {
    !token ? (
      <Link to="/login"></Link>
    ) : (
      fetch(`${API_URL}/posts/${postId}`, {
        headers: {
          Authorization: token,
        },
      })
        .then((res) => {
          if (res.status !== 200)
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Error al mostrar la publicación",
            });
          return res.json();
        })
        .then((data) => setPost(data))
        .catch((err) => console.log(err))
    );
  }, [token]);

  useEffect(() => {
    getPost();
  }, [postId, getPost]);

  if (!post) return <h1>Loading...</h1>;

  return (
    <div className={styles.containerposts}>
      <div
        className="col-sm-6 offset-3"
        key={post._id}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <PostIndividualOnePost getPost={getPost} key={post._id} post={post} />
      </div>
    </div>
  );
}

export default GetOnePost;

