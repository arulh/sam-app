import React, { useState } from 'react';
import './App.css';

function App() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const [image, setImage] = useState<HTMLImageElement | null>(null);

  const handleSubmit = () => {
    console.log('form submitted');
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8000/upload-file/');

    let formData = new FormData();
    const input = document.querySelector('input[type="file"]');
    formData.append('image', (input as HTMLInputElement).files![0]);

    xhr.send(formData);
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
      <header className="App-header">
        <h1>Hello, React!</h1>
      </header>
      <div>
        <form onSubmit={(event) => {event.preventDefault(); handleSubmit();}}>
          <input type="file" accept="image/*" />
          <button type='submit'>Submit</button>
        </form>
      </div>
      <div>
        <canvas ref={canvasRef} width="300" height="300" onClick={handleClick} style={{ border: '1px solid black' }}></canvas>
      </div>
    </div>
  );
}

export default App;
