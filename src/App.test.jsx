import { fireEvent, render, screen, } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'

import App from './App'

test('inicialmente aparece habilitado el formulario', () => {
  render(<App />)
  expect(screen.getByTestId('input-nombre')).toBeInTheDocument()
})

test('al presionar el botón para deshabilitar el formulario queda readonly', async () => {
  render(<App />)
  await fireEvent.click(screen.getByRole('switch'))
  expect(screen.queryByTestId('input-nombre')).toBeNull()
  expect(screen.getByText(/pepita/i)).toBeInTheDocument()
})

test('si está habilitado podemos cambiar el valor de una referencia', async () => {
  render(<App />)
  const inputNombre = screen.getByTestId('input-nombre')
  expect(inputNombre.value).toBe('Pepita')
  await userEvent.type(inputNombre, '{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}restaurant')
  expect(screen.getByTestId('input-nombre').value).toBe('restaurant')
})