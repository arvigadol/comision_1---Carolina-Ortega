import styles from "../styles/NotFound.module.css";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className={styles.container}>
      <div className={styles.notfound}>
        <h1>Ooopps!</h1>
        <h2>404 Not found</h2>
        <h2>
          <Link to="/">Ir al inicio</Link>
        </h2>
      </div>
    </div>
  );
}
export default NotFoundPage;
