import { render, fireEvent, screen } from '@testing-library/react';
import MyMentionComponent from '../components/MyMentionComponent/MyMentionComponent';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../data/data.json', () => ['Alice', 'Shubham', 'Charlie']);

describe('MyMentionComponent', () => {

  test('renders MyMentionComponent', () => {
    render(<MyMentionComponent />);
    const inputElement = screen.getByPlaceholderText('Mention');
    expect(inputElement).toBeInTheDocument();
  });

  test('displays suggestions when "@" is pressed', () => {
    render(<MyMentionComponent />);
    const inputElement = screen.getByPlaceholderText('Mention');

    fireEvent.keyDown(inputElement, { key: '@' });
    
    const suggestionBox = screen.getByTestId('suggestion-box');
    expect(suggestionBox).toBeInTheDocument();
  });

  test('filters and displays suggestions as the user types', () => {
    render(<MyMentionComponent />);
    const inputElement = screen.getByPlaceholderText('Mention');

    fireEvent.keyDown(inputElement, { key: '@' });
    fireEvent.change(inputElement, { target: { value: 'Al' } });

    const suggestionList = screen.getByTestId('suggestion-list');
    const suggestedNames = screen.getAllByTestId('suggested-name');

    expect(suggestionList).toBeInTheDocument();
    expect(suggestedNames).toHaveLength(1);
  });
});
