import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Palette() {
  const [notes, setNotes] = useState<string[]>([]);
  const [noteInput, setNoteInput] = useState('');

  const addNote = () => {
    if (noteInput.trim() === '') return;
    setNotes([noteInput, ...notes]);
    setNoteInput('');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '340px',
      height: '100vh',
      background: 'rgba(255,255,255,0.97)',
      boxShadow: '-2px 0 8px rgba(0,0,0,0.08)',
      zIndex: 9999,
      padding: '24px 16px',
      display: 'flex',
      flexDirection: 'column',
      borderLeft: '1px solid #eee',
    }}>
      <h2 style={{marginTop:0}}>Trade Notes</h2>
      <div style={{marginBottom: 12}}>
        <textarea
          value={noteInput}
          onChange={e => setNoteInput(e.target.value)}
          placeholder="Écris ta note de trade ici..."
          rows={3}
          style={{width:'100%', resize:'none', padding:8, borderRadius:4, border:'1px solid #ccc'}}
        />
        <button
          onClick={addNote}
          style={{marginTop:8, width:'100%', padding:8, borderRadius:4, background:'#1976d2', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer'}}
        >
          Ajouter la note
        </button>
      </div>
      <div style={{flex:1, overflowY:'auto'}}>
        {notes.length === 0 ? (
          <p style={{color:'#888'}}>Aucune note pour l’instant.</p>
        ) : (
          <ul style={{padding:0, listStyle:'none'}}>
            {notes.map((note, idx) => (
              <li key={idx} style={{background:'#f5f5f5', marginBottom:8, padding:8, borderRadius:4}}>
                {note}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Palette />
    </>
  )
}

export default App
