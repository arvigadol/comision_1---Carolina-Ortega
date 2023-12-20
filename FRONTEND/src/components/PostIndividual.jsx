import { Link, useNavigate } from "react-router-dom";

const PostIndividual = ({ post, getPost, onClick }) => {
  const dia_creado = new Date(post.createdAt).toLocaleDateString();
  const hora_creado = new Date(post.createdAt).toLocaleTimeString();
  const dia_modificado = new Date(post.updatedAt).toLocaleDateString();
  const hora_modificado = new Date(post.updatedAt).toLocaleTimeString();

  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  function isLoggedIn() {
    if (user && token) {
      return true;
    } else {
      return false;
    }
  }

  function locationPosts() {
    if (location.pathname === "/posts") {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div>
      {isLoggedIn() && locationPosts() ? (
        <div
          key={post._id}
          onClick={() => {
            navigate(`/posts/${post._id}`);
          }}
        >
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title text-center fs-1">{post.title}</h5>
              <p className="card-text fs-4">{post.description}</p>
            </div>
            <img
              src={post.imageURL}
              className="card-img-top"
              alt={post.author.username}
            />
            <p className="card-text text-end fst-italic">
              <small className="text-body-secondary">
                Post creado por <b>{post.author.username}</b> el {dia_creado} a
                las {hora_creado}
              </small>
            </p>
            <p className="card-text text-end fst-italic">
              <small className="text-body-secondary">
                Modificado por última vez el {dia_modificado} a las{" "}
                {hora_modificado}
              </small>
            </p>
            <br />
            <p className="card-text">
              Este post tiene {post.comments.length} comentarios
            </p>
          </div>
          <br />
        </div>
      ) : (
        <div key={post._id}>
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title text-center fs-1">{post.title}</h5>
              <p className="card-text fs-4">{post.description}</p>
            </div>
            <img
              src={post.imageURL}
              className="card-img-top"
              alt={post.author.username}
            />
            <p className="card-text text-end fst-italic">
              <small className="text-body-secondary">
                Post creado por <b>{post.author.username}</b> el {dia_creado} a
                las {hora_creado}
              </small>
            </p>
            <p className="card-text text-end fst-italic">
              <small className="text-body-secondary">
                Modificado por última vez el {dia_modificado} a las{" "}
                {hora_modificado}
              </small>
            </p>
            <br />
            <p className="card-text">
              Este post tiene {post.comments.length} comentarios
            </p>
          </div>
          <br />
        </div>
      )}
    </div>
  );
};

export default PostIndividual;
