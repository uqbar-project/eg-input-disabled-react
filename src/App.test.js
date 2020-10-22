import { fireEvent, render } from '@testing-library/react'
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

