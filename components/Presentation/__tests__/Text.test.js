import React from 'react';
import Text from '../Text';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Testing <Text /> component functionalities', () => {
  test('If component loads without issues', () => {
    const { container } = render(<Text />);
    expect(container).toBeVisible();
  });
  test('If component has child', () => {
    const { container } = render(<Text />);
    expect(container.children.length).toBe(1);
  });
});
