import React from 'react';
import App from '../App'
import { render, screen, getByText, fireEvent, waitForElement, getByTestId } from "@testing-library/react";

test('shopping cart render', ()=>{
    render(<App />)
})