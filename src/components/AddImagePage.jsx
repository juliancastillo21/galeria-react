import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddImagePage.css";

function AddImagePage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('caption', caption);

    await fetch('http://localhost:3001/api/images', {
      method: 'POST',
      body: formData
    });

    navigate("/");
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
              className="file-input"
            />
          </div>

          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Vista previa" />
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="caption">Descripción:</label>
            <input
              type="text"
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Agrega una descripción para tu imagen"
            />
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-button" 
              onClick={() => navigate("/")}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="add-button" 
              disabled={file === null}
            >
              Subir Imagen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddImagePage;