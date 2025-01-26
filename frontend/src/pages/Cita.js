import React, { useState } from 'react';
import '../css/Cita.css';


const Cita = () => {
  const [specialty, setSpecialty] = useState('');
  const [hour, setHour] = useState('');
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  

  const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      specialty,
      hour,
      date,
      reason,
    });
  };

  return (
    <div className="form-container">
      <div className="form-container-box">
        <h2>Formulario de Cita Médica</h2>
        <form className="appointment-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <br></br>
            <label>Especialidad:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  value="Ginecología"
                  checked={specialty === 'Ginecología'}
                  onChange={(e) => setSpecialty(e.target.value)}
                />
                Ginecología
              </label>
              <label>
                <input
                  type="radio"
                  value="Medicina General"
                  checked={specialty === 'Medicina General'}
                  onChange={(e) => setSpecialty(e.target.value)}
                />
                Medicina General
              </label>
              <label>
                <input
                  type="radio"
                  value="Odontología"
                  checked={specialty === 'Odontología'}
                  onChange={(e) => setSpecialty(e.target.value)}
                />
                Odontología
              </label>
              <label>
                <input
                  type="radio"
                  value="Fisioterapia"
                  checked={specialty === 'Fisioterapia'}
                  onChange={(e) => setSpecialty(e.target.value)}
                />
                Fisioterapia
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Hora:</label>
            <select
              className="select-input"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
            >
              <option value="">Seleccione una hora</option>
              {hours.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Fecha:</label>
            <input
              type="date"
              className="input-field"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Motivo de consulta:</label>
            <input
              type="text"
              className="input-field"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Ingrese el motivo de consulta"
            />
          </div>

          <button className="submit-button" type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Cita;
