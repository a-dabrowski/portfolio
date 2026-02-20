import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { ContactForm } from './contactForm';

describe('ContactForm component', () => {
  it('renders form fields', () => {
    const { getByPlaceholderText, getByText } = render(<ContactForm />);
    expect(getByPlaceholderText('First and Last Name')).toBeInTheDocument();
    expect(getByPlaceholderText('Email to contact you')).toBeInTheDocument();
    expect(getByText('Message')).toBeInTheDocument();
  });

  it('renders Send Form and Reset buttons', () => {
    const { getByText } = render(<ContactForm />);
    expect(getByText('Send Form')).toBeInTheDocument();
    expect(getByText('Reset')).toBeInTheDocument();
  });

  it('renders labels for each field', () => {
    const { getByText } = render(<ContactForm />);
    expect(getByText('First and Last Name')).toBeInTheDocument();
    expect(getByText('Email')).toBeInTheDocument();
    expect(getByText('Message')).toBeInTheDocument();
  });

  it('shows name validation error when field is touched and empty', async () => {
    const { getByPlaceholderText, findByText } = render(<ContactForm />);
    const nameInput = getByPlaceholderText('First and Last Name');
    fireEvent.focus(nameInput);
    fireEvent.blur(nameInput);
    const error = await findByText('Please provide a name');
    expect(error).toBeInTheDocument();
  });

  it('shows mail validation error when field is touched and empty', async () => {
    const { getByPlaceholderText, findByText } = render(<ContactForm />);
    const mailInput = getByPlaceholderText('Email to contact you');
    fireEvent.focus(mailInput);
    fireEvent.blur(mailInput);
    const error = await findByText(
      'Please provide a mail to reach back to you'
    );
    expect(error).toBeInTheDocument();
  });

  it('does not show validation errors initially', () => {
    const { queryByText } = render(<ContactForm />);
    expect(queryByText('Please provide a name')).not.toBeInTheDocument();
    expect(
      queryByText('Please provide a mail to reach back to you')
    ).not.toBeInTheDocument();
  });

  it('includes hidden form-name input for Netlify', () => {
    const { container } = render(<ContactForm />);
    const hidden = container.querySelector('input[name="form-name"]');
    expect(hidden).toBeInTheDocument();
    expect(hidden).toHaveAttribute('type', 'hidden');
    expect(hidden).toHaveAttribute('value', 'photoContact');
  });

  it('has data-netlify attribute on form', () => {
    const { container } = render(<ContactForm />);
    const form = container.querySelector('form');
    expect(form).toHaveAttribute('data-netlify', 'true');
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<ContactForm />);
    expect(asFragment()).toMatchSnapshot();
  });
});
