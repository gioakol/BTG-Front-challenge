import './App.css'
import ClientInfo from './components/ClientInfo'

function App() {
  const idClient = 1;
  
  return (
    <div>
      <ClientInfo idClient={idClient} />
    </div>
  )
}

export default App