import { useId, useRef } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../utils/consts";

const token = localStorage.getItem("token");

const CreateCommentModal = ({ getPost, post }) => {
  const labelId = useId();
  const ref = useRef(null);
  const { postId } = useParams();
  const formRef = useRef(null);

  const handleCreateNewComment = () => {
    const form_id = document.getElementById("form_modal");
    const formData = new FormData(form_id);

    const description = formData.get("description");

    fetch(`${API_URL}/comments/${postId}`, {
      method: "POST",
      body: JSON.stringify({
        description: formData.get("description"),
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((res) => {
      if (!res.ok) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al crear el comentario",
        });
      }
      getPost();
    });

    ref.current.click();
    getPost();

    Swal.fire({
      position: "center",
      icon: "success",
      title: "¡Comentario publicado!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div
      className="modal fade"
      id={"modal-createcomment" + postId}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby={labelId}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id={labelId}>
              Editar Post
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form id="form_modal" ref={formRef}>
              <label htmlFor="description">Haz un comentario:</label>
              <br /><br />
              <textarea type="text" name="description" />
              &nbsp; &nbsp;
            </form>
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
            <button
              type="button"
              className="btn btn-success"
              onClick={handleCreateNewComment}
            >
              Comentar
            </button>          

          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCommentModal;
