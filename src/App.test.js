import { fireEvent, render, screen } from "@testing-library/react"
import ProviderWrapper from "./ProviderWrapper";
import '@testing-library/jest-dom'
import App from "./App";
import userEvent from "@testing-library/user-event";

describe('test app', () => {
  it('app render correctly', () =>{
    const { getByText, asFragment, queryByText } = render(<ProviderWrapper />);
    const btn = getByText(/Add Item/i);
    const btn1 = queryByText(/edit item/i)

    expect(btn).toBeInTheDocument()
    expect(btn1).toBeNull()
    expect(asFragment(<App />)).toMatchSnapshot()
  })

  it('screen', () => {
    render(<ProviderWrapper />)
    screen.debug()
  })

  it('add item text', () => {
    const { getByRole, asFragment } = render(<ProviderWrapper />);
    const input = getByRole('textbox')
    const btn = getByRole('button')

    // userEvent.type(input, 'gdjevihb')
    fireEvent.change(input, { target: { value : 'gdjevihb'}})
    expect(input).toHaveValue('gdjevihb')

    fireEvent.click(btn)

    // expect(asFragment(<App />)).toMatchSnapshot()

    const list = getByRole('list')
    expect(list).toBeInTheDocument

    const checkbox = getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()

  })
})