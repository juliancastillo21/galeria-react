import { Gallery as GridGallery } from "react-grid-gallery";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Gallery.css";

function Gallery() {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedImages = JSON.parse(localStorage.getItem("galleryImages") || "[]");
    setImages(savedImages);
  }, []);
  
  const handleNavigateToAddImage = () => {
    navigate("/add-image");
  };

  const handleSelect = (index) => {
    const updatedImages = images.map((img, i) => ({
      ...img,
      isSelected: i === index ? !img.isSelected : img.isSelected,
    }));
    setImages(updatedImages);
    localStorage.setItem("galleryImages", JSON.stringify(updatedImages));
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
        {images.length > 0 ? (
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