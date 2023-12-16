import { useId, useRef } from "react";
import { API_URL } from "../../utils/consts";

const token = localStorage.getItem("token");

const UpdateCommentModal = ({postId, getPost }) => {
  const labelId = useId();
  const ref = useRef(null);

  const handleUpdateComment = () => {
    const form_id = document.getElementById("form_modal");
    const formData = new FormData(form_id);

    fetch(`${API_URL}/comments/${postId}`, {
      method: "PATCH",
      body: JSON.stringify({
        description: formData.get("description"),
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((res) => {
        console.log(res)
      if (!res.ok) Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al modificar la comentario",
      });
      getPost();
    });
    //ref.current.click();
    //window.location.reload();
  };

  return (
    <div
      className="modal fade"
      id={"#modal-updatecomment" + postId}
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
              Editar Comentario
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form
              id="form_modal"
            >
              <label htmlFor="description">Comentario:</label>
              &nbsp; &nbsp;
              <input type="text" name="description" />
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
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpdateComment}
            >
              Comentar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCommentModal;