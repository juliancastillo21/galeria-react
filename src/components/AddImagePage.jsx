import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddImagePage.css";

function AddImagePage() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageCaption, setImageCaption] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Por favor selecciona un archivo de imagen válido');
        return;
      }
      setSelectedFile(file);
      setError('');
      
      // Crear preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError("Por favor selecciona una imagen");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('caption', imageCaption);

      const response = await fetch('http://localhost:3001/api/images', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al guardar la imagen');
      }

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h1 className="fade-in">Agregar Nueva Imagen</h1>
      
      <div className="add-image-form fade-in">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="image">Seleccionar imagen:</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isLoading}
              className="file-input"
            />
          </div>

          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Preview" />
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="imageCaption">Descripción (opcional):</label>
            <input
              type="text"
              id="imageCaption"
              value={imageCaption}
              onChange={(e) => setImageCaption(e.target.value)}
              placeholder="Descripción de la imagen"
              disabled={isLoading}
            />
          </div>
          
          {error && <p className="error-message">{error}</p>}
          
          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-button" 
              onClick={() => navigate("/")}
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="add-button" 
              disabled={isLoading || !selectedFile}
            >
              {isLoading ? "Guardando imagen..." : "Agregar Imagen"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddImagePage;