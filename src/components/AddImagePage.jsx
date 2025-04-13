import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddImagePage.css";

function AddImagePage() {
  const navigate = useNavigate();
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

      // Obtener imágenes existentes del localStorage
      const existingImages = JSON.parse(localStorage.getItem("galleryImages") || "[]");
      
      // Añadir la nueva imagen
      const updatedImages = [...existingImages, newImage];
      
      // Guardar en localStorage
      localStorage.setItem("galleryImages", JSON.stringify(updatedImages));
      
      // Redirigir a la página principal
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h1 className="title">Agregar Nueva Imagen</h1>
      
      <div className="add-image-form">
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
              onClick={() => navigate("/")}
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
    </div>
  );
}

export default AddImagePage;