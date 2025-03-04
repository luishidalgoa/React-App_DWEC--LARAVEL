import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavigationMenu from './navigation-menu'; // Importa el componente NavigationMenu

interface Note {
  id: number;
  notes: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<string>('');
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newNoteObj: Note = {
      id: notes.length + 1,
      notes: newNote,
      created_at: new Date().toISOString(),
    };
    setNotes([...notes, newNoteObj]);
    setStatus('Observación guardada con éxito');
    setNewNote('');
  };

  const handleDelete = (id: number) => {
    if (window.confirm('¿Eliminar esta observación?')) {
      setNotes(notes.filter(note => note.id !== id));
      setStatus('Observación eliminada con éxito');
    }
  };

  return (
    <div className="bg-light">
      <NavigationMenu /> {/* Incluye el componente de navegación */}
      <main className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {status && (
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                {status}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            )}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-white">
                <h2 className="h5 mb-0">Nueva Observación</h2>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      rows={4}
                      placeholder="Escribe tus observaciones aquí..."
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Guardar Observación</button>
                </form>
              </div>
            </div>
            {notes.map(note => (
              <div className="card shadow-sm mb-3" key={note.id}>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <p className="mb-0 text-muted small">Creada: {new Date(note.created_at).toLocaleString()}</p>
                    <div className="btn-group">
                      <Link to={`/notes/edit/${note.id}`} className="btn btn-sm btn-outline-secondary">
                        <i className="bi bi-pencil-square me-1"></i>Editar
                      </Link>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(note.id)}
                      >
                        <i className="bi bi-trash me-1"></i>Eliminar
                      </button>
                    </div>
                  </div>
                  <hr />
                  <p className="mb-0">{note.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;