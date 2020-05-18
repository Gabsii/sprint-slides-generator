import React from 'react';
import OrderedList from '../OrderedList';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Testing the <OrderedList /> component', () => {
  test('If component contains a li element', () => {
    const { container } = render(<OrderedList />);
    expect(container).toContainHTML('<li>');
  });
  test('If component can be rendered', () => {
    const { container } = render(<OrderedList />);
    expect(container).toBe(<OrderedList />);
  });
  test('If component has child', () => {
    const { container } = render(<OrderedList />);
    expect(container.children.length).toBe(1);
  });
});
