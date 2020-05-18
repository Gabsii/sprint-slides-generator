import React from 'react';
import Slide from '../Slide';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Testing <Slide/> component functionalities', () => {
  test('If component loads without issues', () => {
    const { container } = render(<Slide />);
    expect(container).toBeVisible();
  });
  test('If component has child', () => {
    const { container } = render(<Slide />);
    expect(container.children.length).toBe(1);
  });
});
