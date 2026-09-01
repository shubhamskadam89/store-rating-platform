import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <h1>Store Rating Platform</h1>
      <p className="subtitle">Repository Initialization Phase</p>
      <div className="card">
        <button onClick={() => setCount((c) => c + 1)}>Count is {count}</button>
      </div>
    </div>
  );
}

export default App;
