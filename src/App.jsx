import { Gallery } from "react-grid-gallery";
import "./App.css";

function App() {

  const images = [
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
      src: "https://picsum.photos/402/302",
      width: 400,
      height: 300,
      caption: "Imagen 3",
      isSelected: false,
      thumbnailWidth: 320,
      thumbnailHeight: 240,
    },
    {
      src: "https://picsum.photos/403/303",
      width: 400,
      height: 300,
      caption: "Imagen 4",
      isSelected: false,
      thumbnailWidth: 320,
      thumbnailHeight: 240,
    },
  ];
  
  return (
    <>
      <div className="App">
        <h1>Galería de Imágenes</h1>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
          <Gallery
            images={images}
            enableImageSelection={true}
            rowHeight={280}
            margin={7}
            maxRows={2}
          />
        </div>
      </div>
    </>
  );
}

export default App;
