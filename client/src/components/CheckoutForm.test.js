import React from "react";
import { render, screen, getByText, fireEvent, waitForElement, getByTestId } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    const header = render(<CheckoutForm />)
    const title = header.getByText(/checkout form/i)
    expect(title).toBeInTheDocument()
    //expect(title).not.toBeInTheDocument() causes error since it IS in the document
});

test("form shows success message on submit with form details", () => {
    //find each input
    const form = render(<CheckoutForm />)
    const firstName = form.getByLabelText(/first name/i)
    const lastName = form.getByLabelText(/last name/i)
    const address = form.getByLabelText(/address/i)
    const city = form.getByLabelText(/city/i)
    const state = form.getByLabelText(/state/i)
    const zip = form.getByLabelText(/zip/i)
    //check to see if firstName exists in document before entering input
    expect(firstName).toBeInTheDocument()
    //enter data into each input

    fireEvent.change(firstName, {target:{value:'nick'} })
    fireEvent.change(lastName, {target:{value:'ussery'} })
    fireEvent.change(address, {target:{value:'54656 855 rd'} })
    fireEvent.change(city, {target:{value:'Columbus'} })
    fireEvent.change(state, {target:{value:'NE'} })
    fireEvent.change(zip, {target:{value:68601} })
    //find submit button then click it
    const submit = form.getByRole('button')
    expect(submit).toBeInTheDocument()
    fireEvent.click(submit)

    //find success message
    const success = form.getByTestId(/successmessage/i)
    expect(success).toBeInTheDocument()
});
