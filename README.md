[![Build React App](https://github.com/uqbar-project/eg-input-disabled-react/actions/workflows/build.yml/badge.svg?branch=master)](https://github.com/uqbar-project/eg-input-disabled-react/actions/workflows/build.yml) ![coverage](./badges/coverage/coverage.svg)

## Ejemplo input disabled o cómo anidar componentes

En este ejemplo queremos mostrar cómo diseñar un componente React que pueda trabajar con componentes hijos dinámicos.

![demo](./video/demo.gif)


## Definición del CustomInput

Entonces modelamos un `CustomInput` que acepta como props

- la propiedad `enabled` que nos dice si el control está habilitado para que el usuario actualice información
- un valor a visualizar en el caso de estar deshabilitado

La función hace un renderizado condicional del elemento. El único detalle es que nos gustaría que sirviera para

- texto
- números
- dropdowns (combos)
- y en general para cualquier tipo de input

Para eso podemos aprovechar la props `children`, donde React inyecta automáticamente los hijos del componente actual. `children` referencia a una expresión JSX, por lo tanto, el `CustomInput` puede recibir y devolver esa props como parte de su definición:

```js
export const CustomInput = ({ enabled, value, children }) => {
  if (!enabled) {
    return <span className="disabled">{value}</span>
  }
  return children
}
```

## Uso del CustomInput

En nuestro componente principal, podemos ver cómo utilizamos CustomInput con el nombre del ave:

```js
  <CustomInput value={pepita.nombre} enabled={enabled}>
    <InputText value={pepita.nombre} data-testid="input-nombre" onChange={(event) => actualizar('nombre', event.target.value)}></InputText>
  </CustomInput>
```

o bien con el dropdown que elige el tipo de ave:

```js
  <CustomInput value={pepita.tipoDeAve} enabled={enabled}>
    <Dropdown value={pepita.tipoDeAve} options={tiposDeAve.map((tipoDeAve) => tipoDeAve.nombre)} onChange={(event) => { actualizar('tipoDeAve', event.value) }} placeholder="Seleccione un tipo de ave" />
  </CustomInput>
```

Pasamos como `props.children` un `InputText`, un `Dropdown` de primefaces o cualquier otro componente React que necesitemos. El flag `enabled` forma parte del estado de nuestro componente App, y se asocia con el `InputSwitch` que está al final del formulario:

```js
const App = () => {
  
  const [enabled, setEnabled] = useState(true)

  return (
    ...
      <InputSwitch data-testid="enable" checked={enabled} onChange={(e) => setEnabled(e.value)} ></InputSwitch>
```

## Actualización del objeto en el formulario

Un detalle adicional es que definimos una sola función para actualizar a pepita:

```js
const actualizar = (referencia, valor) => {
  pepita[referencia] = valor
  setPepita({ ...pepita })
}
```

En cada control solo necesitamos pasar:

- cuál es el atributo que queremos modificar
- cuál es el valor nuevo

El control que modifica la energia define el onChange de la siguiente manera:

```js
<InputNumber showButtons={true} value={pepita.energia} onChange={(event) => actualizar('energia', event.value)}></InputNumber>
```

El Dropdown lo hace de manera similar:

```js
<... onChange={(event) => { actualizar('tipoDeAve', event.value) }} ...>
```

## Forzando el render de los cambios

Repasemos una vez más este código:

```js
const actualizar = (referencia, valor) => {
  pepita[referencia] = valor
  setPepita({ ...pepita })
}
```

Lo que nosotros hacemos es: 1) pisar el valor en la referencia, 2) actualizar el estado de pepita **haciendo una copia de ella (para que React detecte los cambios)**.

Si nosotros modificamos la definición de la función actualizar:

```js
const actualizar = (referencia, valor) => {
  pepita[referencia] = valor
  setPepita(pepita)
}
```

ahora los cambios no son reactivos: React no es capaz de detectar que hubo un cambio en pepita, porque de hecho **sigue siendo la misma referencia** (solo cambiaron las referencias internas de pepita, no el objeto apuntado por la referencia `pepita`).

> Hay que ser cuidadosos con las reglas que React nos propone: no todo debe ser inmutable (pepita por ejemplo es un objeto que puede mutar sus referencias), **pero lo que forma parte del estado de un componente React sí debe ser inmutable**.

## Testeo

Proveemos tres funciones de testeo para CustomInput:

- el escenario inicial en el que un control está habilitado
- además si está habilitado podemos modificar el valor
- y el escenario en el que el control está deshabilitado

```js
test('inicialmente aparece habilitado el formulario', () => {
  render(<App />)
  expect(screen.getByTestId('input-nombre')).toBeInTheDocument()
})

test('si está habilitado podemos cambiar el valor de una referencia', async () => {
  render(<App />)
  const inputNombre = screen.getByTestId('input-nombre')
  expect(inputNombre.value).toBe('Pepita')
  await userEvent.type(inputNombre, '{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}restaurant')
  expect(screen.getByTestId('input-nombre').value).toBe('restaurant')
})

test('al presionar el botón para deshabilitar el formulario queda readonly', () => {
  render(<App />)
  fireEvent.click(screen.getByTestId('enable'))
  expect(screen.queryByTestId('input-nombre')).toBeNull()
  expect(screen.getByText(/pepita/i)).toBeInTheDocument()
})
```

## Material relacionado

- [Composición vs. herencia](https://es.reactjs.org/docs/composition-vs-inheritance.html)
