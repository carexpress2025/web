import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from './page';
import React from 'react';

describe('Teste de Renderização do Componente HomePage', () => {
  it('Deve renderizar "Hello World" corretamente no componente', () => {
    // Renderiza o componente HomePage
    render(<HomePage />);

    // Verifica se o texto 'Hello World' está presente no DOM
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
