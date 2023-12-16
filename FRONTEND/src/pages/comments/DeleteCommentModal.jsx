import { useId, useRef } from "react";
import { API_URL } from "../../utils/consts";
import { Link } from "react-router-dom";

const DeleteCommentModal = ({ postId, getPost }) => {
  const labelId = useId();
  const ref = useRef(null);

  const handleDeleteComment = (commentId) => {
    fetch(`${API_URL}/comments/${postId}/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    }).then((res) => {
      if (!res.ok) Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al eliminar el comentario",
      });
      getPost();
    });
  };


  return (
    <div
      className="modal fade"
      id={"modal-delete" + postId}
      aria-labelledby={labelId}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id={labelId}>
              Delete Post
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            ¿Está seguro de que quiere eliminar este posteo?
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              ref={ref}
            >
              Close
            </button>
            <Link onClick={handleDeleteComment} to={"http://127.0.0.1:4001/posts"}>
              <li className="btn btn-danger">Eliminar</li>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCommentModal;