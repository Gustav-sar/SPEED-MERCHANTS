import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('✅ Mensaje enviado correctamente. Te contactaremos pronto!');
    setFormData({
      nombre: '',
      email: '',
      asunto: '',
      mensaje: ''
    });
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h2 className="text-center mb-5 display-6 fw-bold">Contacto</h2>
          
          <div className="row">
            <div className="col-md-5 mb-5">
              <h4 className="mb-4">VinylMarket</h4>
              <p><strong>Dirección:</strong><br />Viña del mar, Chile</p>
              <p><strong>Email:</strong><br />SpeedMerchants@gmail.com</p>
              <p><strong>Teléfono:</strong><br />+56 9 1234 5678</p>
              
              <hr />
              <h5>Horario de atención</h5>
              <p>Lunes a Viernes: 10:00 - 19:00 hrs<br />
                 Sábados: 11:00 - 16:00 hrs</p>
            </div>

            <div className="col-md-7">
              <div className="card shadow">
                <div className="card-body p-4">
                  <h4 className="mb-4">Envíanos un mensaje</h4>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Nombre</label>
                        <input 
                          type="text" 
                          name="nombre"
                          className="form-control" 
                          value={formData.nombre}
                          onChange={handleChange}
                          required 
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Correo Electrónico</label>
                        <input 
                          type="email" 
                          name="email"
                          className="form-control" 
                          value={formData.email}
                          onChange={handleChange}
                          required 
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Asunto</label>
                      <input 
                        type="text" 
                        name="asunto"
                        className="form-control" 
                        value={formData.asunto}
                        onChange={handleChange}
                        required 
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label">Mensaje</label>
                      <textarea 
                        name="mensaje"
                        className="form-control" 
                        rows="6"
                        value={formData.mensaje}
                        onChange={handleChange}
                        required 
                      ></textarea>
                    </div>

                    <button type="submit" className="btn btn-dark btn-lg w-100">
                      Enviar Mensaje
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;