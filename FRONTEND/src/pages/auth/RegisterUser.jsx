import styles from "../../styles/AuthForm.module.css";

import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/consts.js";

function RegisterUser() {
  const ref = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const avatarURL = formData.get("avatarURL");
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");

    const user = {
      avatarURL,
      email,
      username,
      password,
    };

    const req = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (req.status !== 201) Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error al realizar el registro",
    });
    ref.current.reset();
    Swal.fire("¡Bienvenidx! Te registraste exitosamente");
    navigate("/login");
  };

  return (
    <div className={styles.containerauth}>
      <div className="col-sm-6 offset-3 pt-5">
        <div className="col-sm-6 offset-3">
          <form onSubmit={handleSubmit} ref={ref} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="avatarURL">Tu foto de perfil</label>
              <input
                type="url"
                placeholder="www.my-avatar.jpg"
                name="avatarURL"
              />
            </div>
            <div className={styles.inputGroup}>
            <label htmlFor="email">Ingresa tu correo electrónico</label>
              <input
                type="email"
                placeholder="my-email@email.com"
                name="email"
              />
            </div>
            <div className={styles.inputGroup}>
            <label htmlFor="password">Ingresa tu nombre de usuario</label>
              <input type="text" placeholder="Joe Doe" name="username" />
            </div>
            <div className={styles.inputGroup}>
            <label htmlFor="password">Ingresa tu contraseña</label>
              <input type="password" placeholder="*******" name="password" />
            </div>
            <button>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;
