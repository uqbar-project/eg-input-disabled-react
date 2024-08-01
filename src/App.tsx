import './App.css'

import { useState } from 'react'
import { CustomInput } from './components/CustomInput'

const tiposDeAve = [
  { nombre: 'Albatros Errante' },
  { nombre: 'Benteveo' },
  { nombre: 'Golondrina Tijerita' },
  { nombre: 'Petrel' },
]

const pepitaInicial = {
  energia: 20,
  nombre: 'Pepita',
  tipoDeAve: tiposDeAve[0].nombre,
}

const App = () => {
  const [enabled, setEnabled] = useState(true)
  const [pepita, setPepita] = useState(pepitaInicial)
  
  // si bien es dinámico, solo permito pasar los atributos que tiene pepita
  // unknown es mejor tipo que any: any te deja pasar cualquier valor y TS no chequea tipos, unknown falla si lo querés usar sin castear
  const actualizar = (referencia: keyof typeof pepita, valor: unknown) => {
    setPepita({
      ...pepita,
      [referencia]: valor
    })
  }

  return (
    <div className="App">
      <h2>Carga de datos</h2>
      <div className="field-group">
        <div className="etiqueta">Energía</div>
        <CustomInput enabled={enabled}>
          <input type="number" value={pepita.energia} onChange={(event) => actualizar('energia', event.target.value)}></input>
        </CustomInput>
      </div>
      <div className="field-group">
        <div className="etiqueta">Nombre</div>
        <CustomInput enabled={enabled}>
          <input type="text" value={pepita.nombre} data-testid="input-nombre" onChange={(event) => actualizar('nombre', event.target.value)}></input>
        </CustomInput>
      </div>
      <div className="field-group">
        <div className="etiqueta">Tipo de ave</div>
        <CustomInput enabled={enabled}>
          <select value={pepita.tipoDeAve} onChange={(event) => { actualizar('tipoDeAve', event.target.value) }}>
            <option value="">Seleccione un tipo de ave</option>
            { tiposDeAve.map((tipoDeAve) => <option value={tipoDeAve.nombre}>{tipoDeAve.nombre}</option>) }
          </select> 
        </CustomInput>
      </div>
      <div className="field-group">
        <div className="etiqueta">Habilitar edición</div>
        <label className="switch">
          <input data-testid="input-enabled" type="checkbox" checked={enabled} onChange={() => setEnabled(!enabled)}/>
          <span className="slider round"></span>
        </label>
      </div>
    </div >
  )
}

export default App
