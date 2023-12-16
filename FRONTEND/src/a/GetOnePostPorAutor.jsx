import { Link } from "react-router-dom";

const GetOnePostPorAutor = ({ post, getPost, onClick }) => {

  const token = localStorage.getItem("token");
  const creado = new Date(post.createdAt).toLocaleString()
  const modificado = new Date(post.updatedAt).toLocaleString()

  function isLoggedIn() {
    if (token == !undefined || token == !null || token) {
      return true;
    } else {
      return false;
    }
  }
  
  return (
    <div >
      {" "}
      {isLoggedIn() ? (
        <>
          <picture>
            <img src={post.imageURL} alt={post.author.username} />
          </picture>
          <section>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <p>
              <b>Author: {post.author.username} </b>
            </p>
            <p>Comentarios del post: {post.comments.length}</p>
            <p>Creado: {creado}</p>
            <p>Modificado: {modificado}</p>
          </section>
          <Link>
            <li className="btn btn-success">Editar</li>
          </Link>
          &nbsp;
          <Link>
            <li className="btn btn-danger">Eliminar</li>
          </Link>
          <hr className="mt-4" />
        </>
      ) : (
        <>
          <picture>
            <img src={post.imageURL} alt={post.author.username} />
          </picture>
          <section>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <p>
              <b>Author: {post.author.username} </b>
            </p>
            <p>Comentarios del post: {post.comments.length}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default GetOnePostPorAutor;