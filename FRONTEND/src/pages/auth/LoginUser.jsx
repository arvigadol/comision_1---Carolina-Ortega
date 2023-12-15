import styles from "../../styles/AuthForm.module.css";

import { useId, useRef } from "react";
import { API_URL } from "../../utils/consts";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

function LoginUser() {
  const ref = useRef(null);

  const emailRef = useId();
  const passwordRef = useId();

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");

    const user = {
      email,
      password,
    };

    const req = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (req.status !== 200) {
      ref.current.reset();
      return alert("Error al iniciar sesión");
    }
    const res = await req.json();
    login(res);
    ref.current.reset();
    navigate("/");
  };

  return (
    <div className={styles.containerauth}>
      <div className="col-sm-6 offset-3 pt-5 d-flex justify-content-start ">
        <div className="col-sm-6 offset-3">
          <form onSubmit={handleSubmit} ref={ref} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor={emailRef}>Correo electrónico</label>
              <input
                type="email"
                placeholder="my-email@email.com"
                name="email"
                id={emailRef}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor={passwordRef}>Contraseña</label>
              <input
                type="password"
                placeholder="*******"
                name="password"
                id={passwordRef}
              />
            </div>
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginUser;
