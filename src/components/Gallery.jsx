import { Gallery as GridGallery } from "react-grid-gallery";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Gallery.css";

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/images');
      if (!response.ok) {
        throw new Error('Error al obtener las imágenes');
      }
      const data = await response.json();
      setImages(data);
      setError("");
    } catch (err) {
      setError("Error al cargar las imágenes. Por favor, intenta de nuevo más tarde.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToAddImage = () => {
    navigate("/add-image");
  };

  const handleSelect = async (index) => {
    try {
      const response = await fetch(`http://localhost:3001/api/images/${index}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la imagen');
      }

      // Actualizar el estado local después de eliminar
      await fetchImages();
    } catch (err) {
      console.error('Error:', err);
      setError("Error al eliminar la imagen");
    }
  };
  
  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <h1>Mi Galería de Imágenes</h1>
        <button 
          onClick={handleNavigateToAddImage} 
          className="add-image-button"
        >
          <span className="button-icon">+</span>
          Agregar imagen
        </button>
      </div>
      
      <div className="gallery-container">
        {error && <p className="error-message">{error}</p>}
        
        {loading ? (
          <div className="loading-message">Cargando imágenes...</div>
        ) : images.length > 0 ? (
          <div className="grid-gallery-wrapper">
            <GridGallery
              images={images}
              onSelect={handleSelect}
              enableImageSelection={true}
              rowHeight={280}
              margin={10}
              maxRows={null}
            />
          </div>
        ) : (
          <div className="empty-gallery">
            <p>No hay imágenes en la galería</p>
            <button onClick={handleNavigateToAddImage} className="add-first-image">
              ¡Agrega tu primera imagen!
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Gallery;