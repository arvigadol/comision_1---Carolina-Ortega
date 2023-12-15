import { Link, useNavigate } from "react-router-dom";

const PostIndividual = ({ post, getPost, onClick }) => {
  const navigate = useNavigate();

  const dia_creado = new Date(post.createdAt).toLocaleDateString();
  const hora_creado = new Date(post.createdAt).toLocaleTimeString();
  const dia_modificado = new Date(post.updatedAt).toLocaleDateString();
  const hora_modificado = new Date(post.updatedAt).toLocaleTimeString();

  const token = localStorage.getItem("token");

  function isLoggedIn() {
    if (token == !undefined || token == !null || token) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div
      key={post._id}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {" "}
      {isLoggedIn() ? (
        <>
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
          <section className="">
            <Link
              onClick={(e) => {
                e.stopPropagation();
              }}
              to={`${post._id}`}
            >
              <li className="btn btn-success">Ingresar al post</li>
            </Link>
            &nbsp; &nbsp;
            <Link
              onClick={(e) => {
                e.stopPropagation();
              }}
              to={`http://127.0.0.1:4001/comments/${post._id}`}
            >
              <li className="btn btn-primary">Ver Comentarios</li>
            </Link>
          </section>
          <hr className="mt-4" />
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default PostIndividual;
