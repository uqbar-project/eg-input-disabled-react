import './App.css'

import { Dropdown } from 'primereact/dropdown'
import { InputSwitch } from 'primereact/inputswitch'
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'

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
        <CustomInput value={pepita.energia} enabled={enabled}>
          <InputText value={pepita.energia} onChange={(event) => actualizar('energia', event.target.value)}></InputText>
        </CustomInput>
      </div>
      <div className="field-group">
        <div className="etiqueta">Nombre</div>
        <CustomInput value={pepita.nombre} enabled={enabled}>
          <InputText value={pepita.nombre} onChange={(event) => actualizar('nombre', event.target.value)}></InputText>
        </CustomInput>
      </div>
      <div className="field-group">
        <div className="etiqueta">Nombre</div>
        <CustomInput value={pepita.tipoDeAve} enabled={enabled}>
          <Dropdown value={pepita.tipoDeAve} options={tiposDeAve.map((tipoDeAve) => tipoDeAve.nombre)} onChange={(event) => { actualizar('tipoDeAve', event.value) }} placeholder="Seleccione un tipo de ave" />
        </CustomInput>
      </div>
      <div className="field-group">
        <div className="etiqueta">Habilitar edición</div>
        <InputSwitch checked={enabled} onChange={(e) => setEnabled(e.value)} ></InputSwitch>
      </div>
    </div>
  )
}

export default App
