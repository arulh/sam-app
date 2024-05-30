import React, { useState } from 'react';
import './App.css';

function App() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const [image, setImage] = useState<string | null>(null);

  const handleSubmit = async () => {
    const input = document.querySelector('input[type="file"]') as HTMLInputElement | null;

    if (input && input.files && input.files.length > 0) {
      let formData = new FormData();
      formData.append('image', input.files[0]);

      const response = await fetch('http://localhost:8000/upload-file/', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      setImage(data.image);

      const canvas = canvasRef.current;
      let context = canvas?.getContext('2d');

      const imageElement = new Image();
      imageElement.src = data.image;

      context?.drawImage(imageElement, 0, 0, 350, 350);
    }
  }; 

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log(`X: ${x}, Y: ${y}`);
  };

  return (
    <div className="App">
      <div>
        <form onSubmit={(event) => {event.preventDefault(); handleSubmit();}}>
          <input type="file" accept="image/*" />
          <button type='submit'>Submit</button>
        </form>
      </div>
      <div>
        {image && <canvas ref={canvasRef} width="350" height="350" onClick={handleClick} style={{ border: '1px solid black' }}>Stuff</canvas>}
      </div>
    </div>
  );
}

export default App;
