import { useCallback, useEffect, useId, useRef, useState } from "react";
import { API_URL } from "../utils/consts";

const token = localStorage.getItem("token");

const UpdatePostModal = ({ post, postId, getPost }) => {
  const labelId = useId();
  const ref = useRef(null);

  const handleUpdate = () => {
    const form_id = document.getElementById("form_modal");
    const form_data = new FormData(form_id);

    fetch(`${API_URL}/posts/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        title: form_data.get("title"),
        description: form_data.get("description"),
        imageURL: form_data.get("imageURL"),
      }),
    }).then((res) => {
      if (res.status !== 200)
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al modificar la publicación",
          footer: '<a href="#">Why do I have this issue?</a>',
        });

      Swal.fire({
        position: "center",
        icon: "success",
        title: "¡Publicación actualizada!",
        showConfirmButton: false,
        timer: 1500,
      });

      ref.current.click();
      getPost();
    });
  };

  return (
    <div
      className="modal fade"
      id={"modal-update" + postId}
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
            <form id="form_modal">
              <label htmlFor="imageURL">Editar imageURL:</label>
              &nbsp; &nbsp;
              <input
                type="text"
                contentEditable
                name="imageURL"
                defaultValue={post.imageURL}
              />
              <br />
              <label htmlFor="titulo">Editar título:</label>
              &nbsp; &nbsp;
              <input
                type="text"
                contentEditable
                name="title"
                defaultValue={post.title}
              />
              <br />
              <label htmlFor="imageURL">Editar descripción:</label>
              &nbsp; &nbsp;
              <input
                type="text"
                contentEditable
                name="description"
                defaultValue={post.description}
              />
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
              className="btn btn-primary"
              onClick={handleUpdate}
            >
              Editar Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePostModal;
