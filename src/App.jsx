import './App.css'

import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { InputSwitch } from 'primereact/inputswitch'
import { InputText } from 'primereact/inputtext'
import { useState } from 'react'

import { CustomInput } from './CustomInput'

const tiposDeAve = [
  { nombre: 'Golondrina Tijerita' },
  { nombre: 'Petrel' },
  { nombre: 'Benteveo' },
  { nombre: 'Albatros Errante' },
]

const pepitaInicial = {
  energia: 20,
  nombre: 'Pepita',
  tipoDeAve: tiposDeAve[0].nombre,
}

const App = () => {
  const [enabled, setEnabled] = useState(true)
  const [pepita, setPepita] = useState(pepitaInicial)

  const actualizar = (referencia, valor) => {
    pepita[referencia] = valor
    setPepita({ ...pepita })
  }

  return (
    <div className="App">
      <h2>Carga de datos</h2>
      <div className="field-group">
        <div className="etiqueta">Energía</div>
        <CustomInput enabled={enabled}>
          <InputNumber showButtons={true} value={pepita.energia} onChange={(event) => actualizar('energia', event.value)}></InputNumber>
        </CustomInput>
      </div>
      <div className="field-group">
        <div className="etiqueta">Nombre</div>
        <CustomInput enabled={enabled}>
          <InputText value={pepita.nombre} data-testid="input-nombre" onChange={(event) => actualizar('nombre', event.target.value)}></InputText>
        </CustomInput>
      </div>
      <div className="field-group">
        <div className="etiqueta">Tipo de ave</div>
        <CustomInput enabled={enabled}>
          <Dropdown value={pepita.tipoDeAve} options={tiposDeAve.map((tipoDeAve) => tipoDeAve.nombre)} onChange={(event) => { actualizar('tipoDeAve', event.value) }} placeholder="Seleccione un tipo de ave" />
        </CustomInput>
      </div>
      <hr />
      <div className="field-group">
        <div className="etiqueta">Habilitar edición</div>
        <InputSwitch data-testid="enable" checked={enabled} onChange={(e) => setEnabled(e.value)} ></InputSwitch>
      </div>
    </div >
  )
}

export default App
