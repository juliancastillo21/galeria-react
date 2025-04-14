import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Gallery.css";

function Gallery() {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const response = await fetch('http://localhost:3001/api/images');
    const data = await response.json();
    setImages(data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Deseas eliminar esta imagen?')) return;

    await fetch(`http://localhost:3001/api/images/${id}`, {
      method: 'DELETE'
    });

    setImages(prevImages => prevImages.filter(img => img.id !== id));
  };

  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <h1>Mi Galería de Imágenes</h1>
        <button 
          onClick={() => navigate("/add-image")} 
          className="add-image-button"
        >
          <span className="button-icon">+</span>
          Agregar imagen
        </button>
      </div>
      
      <div className="gallery-container">
        {images.length > 0 ? (
          <div className="gallery-grid">
            {images.map((image) => (
              <div key={image.id} className="gallery-item">
                <img src={image.src} alt={image.caption} />
                <div className="image-overlay">
                  <p className="image-caption">{image.caption}</p>
                  <button 
                    onClick={() => handleDelete(image.id)}
                    className="delete-button"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-gallery">
            <p>No hay imágenes en la galería</p>
            <button onClick={() => navigate("/add-image")} className="add-first-image">
              ¡Agrega tu primera imagen!
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Gallery;