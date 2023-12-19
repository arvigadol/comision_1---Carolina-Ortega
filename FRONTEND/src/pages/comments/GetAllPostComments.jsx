import styles from "../../styles/Comments.module.css";

import { useEffect, useId, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../utils/consts";
import CreateCommentModal from "./CreateCommentModal";
import UpdateCommentModal from "./UpdateCommentModal";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";

const token = localStorage.getItem("token");

const GetAllPostComments = () => {
  const modalId = useId();
  const ref = useRef(null);
  const { postId } = useParams();

  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const formRef = useRef(null);

  const getPost = () => {
    fetch(`${API_URL}/posts/${postId}`, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Swal.fire({
            position: "center",
            icon: "error",
            title: "Error al mostrar los comentarios de la publicación",
            showConfirmButton: false,
            timer: 1500,
          });
        }

        return res.json();
      })
      .then((res) => {
        setPost(res);
        console.log(post);
      });
  };

  useEffect(() => {
    getPost();
  }, [postId]);

  const handleDeleteComment = (commentId) => {
    fetch(`${API_URL}/comments/${postId}/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    }).then((res) => {
      if (!res.ok) {
        return Swal.fire({
          position: "center",
          icon: "error",
          title: "Error al eliminar el comentario",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      getPost();
    });
  };

  if (!post) return <h1>Loading...</h1>;

  return (
    <div className={styles.containercomments}>
      <h2>
        Comentarios del post &nbsp; <i>{post.title}</i>
      </h2>
      <section>
        <Link
          onClick={(e) => {
            e.stopPropagation();
          }}
          data-bs-toggle="modal"
          data-bs-target={"#modal-createcomment" + post._id}
        >
          <li className="btn btn-primary">Comentar</li>
        </Link>
        <CreateCommentModal
          key={post._id}
          getPost={getPost}
          modalId={modalId}
          postId={post._id}
        />
      </section>

      <br />

      {post.comments.map((comment) => {
        return (
          <div key={comment._id} className={styles.cardybotones}>
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={post.author.avatarURL}
                    className="img-fluid rounded-start"
                    alt="Imagen del autor o autora del comentario"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">
                      {post.author.username} comentó
                    </h5>
                    <p className="card-text">{comment.description}</p>
                    <p>{comment.commentId}</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="btn-group-vertical"
              role="group"
              aria-label="Vertical button group"
            >
              <Link
                onClick={(e) => {
                  e.stopPropagation();
                }}
                //data-bs-toggle="modal"
                // data-bs-target={"#modal-updatecomment" + post._id}
              >
                <HiOutlinePencilAlt className={styles.botoneditar} />
              </Link>
              {/* <UpdateCommentModal
                key={post._id}
                getPost={getPost}
                modalId={modalId}
                postId={post._id}
              /> */}
              &nbsp;
              <Link
                onClick={() =>
                  Swal.fire({
                    title: "¿Estás seguro?",
                    text: "Esta acción no se puede deshacer",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "¡Si, eliminar!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire({
                        title: "¡Eliminado!",
                        text: "El comentario se eliminó correctamente",
                        icon: "success",
                      });
                      handleDeleteComment(comment._id);
                      windows.location.reload();
                    }
                  })
                }
              >
                <HiOutlineTrash className={styles.botoneliminar} />
              </Link>
            </div>
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default GetAllPostComments;
