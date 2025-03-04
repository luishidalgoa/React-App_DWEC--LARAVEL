import React from 'react';
import { useNavigate } from 'react-router-dom';

const Edit: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm mb-4">
                        <div className="card-header bg-white">
                            <h2 className="h5 mb-0">Editar Observación</h2>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="notes" className="form-label">Observación</label>
                                    <textarea
                                        className="form-control"
                                        id="notes"
                                        rows={6}
                                        required
                                    />
                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-4">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => navigate('/dashboard')}
                                    >
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Actualizar Observación
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Edit;