const Hero = () => {
  return (
    <section
      className="text-white d-flex align-items-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://www.themetalcircus.com/wp-content/uploads/2018/10/IMG_3651.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "85vh",
      }}
    >
      <div className="container text-center position-relative">
        <h1 className="display-1 fw-bold mb-4">
          Bienvenidos a<br />
          <span className="text-warning">Speed Merchants</span>
        </h1>
        <p className="lead fs-3 mb-5">
          Tu tienda de discos favorita • Vinilos nuevos y usados
        </p>

        <div className="d-flex justify-content-center gap-4 flex-wrap">
          <a
            href="/catalog"
            className="btn btn-warning btn-lg px-5 py-3 fw-bold"
          >
            Ver Catálogo
          </a>
          <a
            href="/create-product"
            className="btn btn-outline-light btn-lg px-5 py-3"
          >
            Vender mi Disco
          </a>
        </div>

        <div className="mt-5">
          <span className="mx-3 fs-2">🎵</span>
          <span className="mx-3 fs-2">💿</span>
          <span className="mx-3 fs-2">📀</span>
          <span className="mx-3 fs-2">🎸</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
