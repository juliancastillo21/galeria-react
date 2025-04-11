import { useState } from "react";
import "../styles/ImageForm.css";

function ImageForm({ onAddImage }) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageCaption, setNewImageCaption] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateImageUrl = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height,
          valid: true
        });
      };
      img.onerror = () => {
        reject(new Error("La URL no corresponde a una imagen válida"));
      };
      img.src = url;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newImageUrl) {
      setError("Por favor ingresa una URL de imagen válida");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const imageDetails = await validateImageUrl(newImageUrl);
      
      const aspectRatio = imageDetails.width / imageDetails.height;
      const thumbnailWidth = 320;
      const thumbnailHeight = Math.round(thumbnailWidth / aspectRatio);

      const newImage = {
        src: newImageUrl,
        width: imageDetails.width,
        height: imageDetails.height,
        caption: newImageCaption || `Nueva imagen`,
        isSelected: false,
        thumbnailWidth,
        thumbnailHeight,
      };

      // Llamar a la función que recibimos por props para añadir la imagen
      onAddImage(newImage);
      
      // Limpiar los campos del formulario
      setNewImageUrl("");
      setNewImageCaption("");
      
      // Ocultar el formulario después de agregar la imagen
      setIsFormVisible(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
    // Limpiar errores y campos cuando se oculta el formulario
    if (isFormVisible) {
      setError("");
      setNewImageUrl("");
      setNewImageCaption("");
    }
  };
  
  return (
    <div className="image-form-container fade-in">
      {!isFormVisible ? (
        <button 
          onClick={toggleForm} 
          className="add-image-button"
        >
          <span className="button-icon">+</span>
          Agregar imagen
        </button>
      ) : (
        <div className="add-image-form">
          <div className="form-header">
            <h2>Agregar Nueva Imagen</h2>
            <button 
              onClick={toggleForm} 
              className="close-button"
              aria-label="Cerrar formulario"
            >
              ×
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="imageUrl">URL de la imagen:</label>
              <input
                type="url"
                id="imageUrl"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="https://ejemplo.com/imagen.jpg"
                disabled={isLoading}
                autoFocus
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="imageCaption">Descripción (opcional):</label>
              <input
                type="text"
                id="imageCaption"
                value={newImageCaption}
                onChange={(e) => setNewImageCaption(e.target.value)}
                placeholder="Descripción de la imagen"
                disabled={isLoading}
              />
            </div>
            
            {error && <p className="error-message">{error}</p>}
            
            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-button" 
                onClick={toggleForm}
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="add-button" 
                disabled={isLoading}
              >
                {isLoading ? "Verificando imagen..." : "Agregar Imagen"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ImageForm;