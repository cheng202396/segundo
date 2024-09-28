import React, { useState } from 'react';

function CursoForm() {
    const [nombre, setNombre] = useState('');
    const [creditos, setCreditos] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const cursoData = {
            nombre,
            creditos: parseInt(creditos),
            descripcion: `${descripcion} - Carnet: 5390-15-23813, Nombre: EDSON ANTONIO CHEN GONZÁLEZ, Sección: 3`
        };

        try {
            const response = await fetch('https://test-deploy-12.onrender.com/cursos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cursoData),
            });

            const data = await response.json();
            if (response.ok) {
                setMensaje('Curso agregado exitosamente!');
                setNombre('');
                setCreditos('');
                setDescripcion('');
            } else {
                setMensaje('Error al agregar el curso.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMensaje('Error de conexión al agregar el curso.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Agregar Nuevo Curso</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre del curso:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Créditos:</label>
                    <input
                        type="number"
                        value={creditos}
                        onChange={(e) => setCreditos(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <input
                        type="text"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Enviar Curso</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}

export default CursoForm;
