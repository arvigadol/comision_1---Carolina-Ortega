import styles from "../../styles/HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>¡Bienvenido a tu lugar en el mundo!</h1>
      &nbsp;
      <p className={styles.parrafo}>
        Sabemos que no hay placer más grande que viajar. ¡Y lo lindo que es
        compartir nuestras experiencias y vivencias! Es por ello que creamos
        este sitio, para que puedas compartir con todxs tus recuerdos y momentos
        vividos recorriendo el mundo.
      </p>
      <p className={styles.nosvemos}>¡Nos vemos adentro!</p>
    </div>
  );
};
export default HomePage;
