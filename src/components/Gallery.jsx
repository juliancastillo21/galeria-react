import { Gallery as GridGallery } from "react-grid-gallery";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Gallery.css";

function Gallery() {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  // Cargar imágenes del localStorage al iniciar
  useEffect(() => {
    const savedImages = JSON.parse(localStorage.getItem("galleryImages") || "[]");
    
    // Si no hay imágenes guardadas, usar las imágenes predeterminadas
    if (savedImages.length === 0) {
      const defaultImages = [
        {
          src: "https://picsum.photos/400/300",
          width: 400,
          height: 300,
          caption: "Imagen 1",
          isSelected: false,
          thumbnailWidth: 320,
          thumbnailHeight: 240,
        },
        {
          src: "https://picsum.photos/401/301",
          width: 400,
          height: 300,
          caption: "Imagen 2",
          isSelected: false,
          thumbnailWidth: 320,
          thumbnailHeight: 240,
        },
        {
          src: "https://picsum.photos/403/303",
          width: 400,
          height: 300,
          caption: "Imagen 3",
          isSelected: false,
          thumbnailWidth: 320,
          thumbnailHeight: 240,
        },
        {
          src: "https://picsum.photos/403/305",
          width: 400,
          height: 300,
          caption: "Imagen 4",
          isSelected: false,
          thumbnailWidth: 320,
          thumbnailHeight: 240,
        },
      ];
      setImages(defaultImages);
      // Guardar las imágenes predeterminadas en localStorage
      localStorage.setItem("galleryImages", JSON.stringify(defaultImages));
    } else {
      setImages(savedImages);
    }
  }, []);
  
  const handleNavigateToAddImage = () => {
    navigate("/add-image");
  };
  
  return (
    <div className="App">
      <h1 className="fade-in">Galería de Imágenes</h1>
      
      <div className="image-form-container fade-in">
        <button 
          onClick={handleNavigateToAddImage} 
          className="add-image-button"
        >
          <span className="button-icon">+</span>
          Agregar imagen
        </button>
      </div>
      
      <div className="container fade-in">
        {images.length > 0 ? (
          <GridGallery
            images={images}
            enableImageSelection={true}
            rowHeight={280}
            margin={7}
            maxRows={2}
          />
        ) : (
          <p className="empty-gallery-message">No hay imágenes en la galería. ¡Agrega algunas!</p>
        )}
      </div>
    </div>
  );
}

export default Gallery;