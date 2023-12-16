import { useId, useRef } from "react";
import { API_URL } from "../utils/consts";
import { Link, useNavigate } from "react-router-dom";

const DeletePostModal = ({ postId, getPost }) => {
  const labelId = useId();
  const ref = useRef(null);
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    await fetch(`${API_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
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
        Swal.fire({
          title: "¿Estás segurx?",
          text: "Esta acción no se puede deshacer",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "¡Si, eliminar!"
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "¡Eliminada!",
              text: "La publicación se eliminó correctamente",
              icon: "success"
            });
          }
        });
        navigate("/posts");
        //window.location.reload();
      });
  };

  return (
    <div
      className="modal fade"
      id={"modal-deletecomment" + postId}
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
            {/*<button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete
            </button>*/}
            <Link onClick={handleDelete} to={"http://127.0.0.1:4001/posts"}>
              <li className="btn btn-danger">Delete</li>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePostModal;
