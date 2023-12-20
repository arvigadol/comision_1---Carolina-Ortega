import styles from "../../styles/CreatePost.module.css";

import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/consts";

const token = localStorage.getItem("token");

const CreatePost = () => {
  const ref = useRef(null);
  const navigate = useNavigate();

  const handleSubmitNuevoPosteo = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const title = formData.get("title");
    const description = formData.get("description");
    const imageURL = formData.get("imageURL");

    const post = {
      title,
      description,
      imageURL,
    };

    const req = await fetch(`${API_URL}/posts/new`, {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (req.status !== 201) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al crear la publicación",
      });
    }
    ref.current.reset();

    Swal.fire({
      position: "center",
      icon: "success",
      title: "¡Publicación exitosa!",
      showConfirmButton: false,
      timer: 1500,
    });

    navigate("/posts");
  };

  return (
    <div className={styles.containercreatepost}>
      <div className="col-sm-6 offset-3 pt-4">
        <div className="col-sm-6 offset-3">
          <form
            onSubmit={handleSubmitNuevoPosteo}
            ref={ref}
            className={styles.form}
          >
            <div className={styles.inputGroup}>
              <h2 className="text-center">Nueva Publicación</h2>
              <input type="text" placeholder="Nuevo título" name="title" />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Nueva description"
                name="description"
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="url"
                placeholder="http://www.my-avatar.com"
                name="imageURL"
              />
            </div>
            <button>Publicar</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreatePost;
