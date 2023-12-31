import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useId, useRef } from "react";
import UpdatePostModal from "./UpdatePostModal";
import { API_URL } from "../utils/consts";
import { AuthContext } from "../providers/AuthProvider";

const MiPost = ({ post, getPost, onClick }) => {
  const navigate = useNavigate();
  const modalId = useId();
  const { postId } = useParams();

  const { auth } = useContext(AuthContext);

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

  // function isAuthor() {
  //   if (post.author._id === user._id) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  // console.log(user._id);
  // console.log(post.author._id);
  // console.log(post.author.username);
  // console.log(isAuthor())

  let showButtons = true;
  if (isLoggedIn()) {
    showButtons = false;
  }
  let go = false;
  if (location.pathname === "/posts") return (go = true);

  const handleDeletePost = async (e) => {
    await fetch(`${API_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error al eliminar la publicación",
          });
        }
      })
      .then((res) => {
        navigate("/posts");
        //window.location.reload();
      });
  };

  return (
    <div key={post._id}>
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
        <section hidden={showButtons}>
          <Link
            onClick={(e) => {
              e.stopPropagation();
            }}
            data-bs-toggle="modal"
            data-bs-target={"#modal-update" + post._id}
          >
            <li className="btn btn-success">Editar</li>
          </Link>
          <UpdatePostModal
            key={post._id}
            getPost={getPost}
            modalId={modalId}
            postId={post._id}
            post={post}
          />
          &nbsp;
          <Link
            onClick={() =>
              Swal.fire({
                title: "¿Estás segurx?",
                text: "Esta acción no se puede deshacer",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "¡Si, eliminar!",
              }).then((res) => {
                if (res.isConfirmed) {
                  Swal.fire({
                    title: "¡Eliminada!",
                    text: "La publicación se eliminó correctamente",
                    icon: "success",
                  });
                  handleDeletePost();
                }
              })
            }
          >
            <li className="btn btn-danger">Eliminar</li>
          </Link>
          &nbsp;
          <Link
            onClick={(e) => {
              e.stopPropagation();
            }}
            to={`/comments/${post._id}`}
          >
            <li className="btn btn-primary">Ver Comentarios</li>
          </Link>
        </section>
        <hr className="mt-4" />
      </>
    </div>
  );
};

export default MiPost;
