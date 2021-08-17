import { fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import App from './App'

test('inicialmente aparece habilitado el formulario', () => {
  const { getByTestId } = render(<App />)
  expect(getByTestId('input-nombre')).toBeInTheDocument()
})

test('al presionar el botón para deshabilitar el formulario queda readonly', () => {
  const { getByTestId, getByText, queryByTestId } = render(<App />)
  fireEvent.click(getByTestId('enable'))
  expect(queryByTestId('input-nombre')).toBeNull()
  expect(getByText(/pepita/i)).toBeInTheDocument()
})

test('si está habilitado podemos cambiar el valor de una referencia', async () => {
  const { getByTestId } = render(<App />)
  const inputNombre = getByTestId('input-nombre')
  expect(inputNombre.value).toBe('Pepita')
  userEvent.type(inputNombre, 'restaurant')
  waitFor(() => {
    expect(getByTestId('input-nombre')).toBe('restaurant')
  })
})