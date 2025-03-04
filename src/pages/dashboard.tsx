import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavigationMenu from './navigation-menu'; // Importa el componente NavigationMenu

interface Note {
  id: number;
  user_id: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

const Dashboard: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<string>('');
  const [status, setStatus] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error('Error al obtener los datos del usuario');
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/notes", {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        if (!response.ok) {
          throw new Error("Error al cargar las notas");
        }
        const data = await response.json();
        setNotes(data);
      } catch (err) {
        if (err instanceof Error) {
          setStatus(err.message);
        } else {
          setStatus("Error desconocido");
        }
      }
    };

    fetchNotes();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) {
      setStatus("Usuario no autenticado");
      return;
    }

    if (editingNoteId === null) {
      // Crear nueva nota
      try {
        const response = await fetch("http://localhost:8000/api/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
          body: JSON.stringify({
            user_id: user.id, // Usa el user_id del usuario logueado
            notes: newNote,
          }),
        });
        if (!response.ok) {
          throw new Error("Error al guardar la observación");
        }
        const newNoteObj = await response.json();
        setNotes([...notes, newNoteObj]);
        setStatus('Observación guardada con éxito');
        setNewNote('');
      } catch (err) {
        if (err instanceof Error) {
          setStatus(err.message);
        } else {
          setStatus("Error desconocido");
        }
      }
    } else {
      // Actualizar nota existente
      try {
        const response = await fetch(`http://localhost:8000/api/notes/${editingNoteId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
          body: JSON.stringify({
            user_id: user.id, // Usa el user_id del usuario logueado
            notes: newNote,
          }),
        });
        if (!response.ok) {
          throw new Error("Error al actualizar la observación");
        }
        const updatedNote = await response.json();
        setNotes(notes.map(note => (note.id === editingNoteId ? updatedNote : note)));
        setStatus('Observación actualizada con éxito');
        setNewNote('');
        setEditingNoteId(null);
      } catch (err) {
        if (err instanceof Error) {
          setStatus(err.message);
        } else {
          setStatus("Error desconocido");
        }
      }
    }
  };

  const handleEdit = (note: Note) => {
    setNewNote(note.notes);
    setEditingNoteId(note.id);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Eliminar esta observación?')) {
      try {
        const response = await fetch(`http://localhost:8000/api/notes/${id}`, {
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        if (!response.ok) {
          throw new Error("Error al eliminar la observación");
        }
        setNotes(notes.filter(note => note.id !== id));
        setStatus('Observación eliminada con éxito');
      } catch (err) {
        if (err instanceof Error) {
          setStatus(err.message);
        } else {
          setStatus("Error desconocido");
        }
      }
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
                <h2 className="h5 mb-0">{editingNoteId === null ? 'Nueva Observación' : 'Editar Observación'}</h2>
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
                  <button type="submit" className="btn btn-primary">
                    {editingNoteId === null ? 'Guardar Observación' : 'Actualizar Observación'}
                  </button>
                </form>
              </div>
            </div>
            {notes.map(note => (
              <div className="card shadow-sm mb-3" key={note.id}>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <p className="mb-0 text-muted small">Creada: {new Date(note.created_at).toLocaleString()}</p>
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleEdit(note)}
                      >
                        <i className="bi bi-pencil-square me-1"></i>Editar
                      </button>
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