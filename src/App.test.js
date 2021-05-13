import { fireEvent, getByRole, render, screen } from "@testing-library/react"
import ProviderWrapper from "./ProviderWrapper";
import '@testing-library/jest-dom'
import App from "./App";
// import userEvent from "@testing-library/user-event";
import { v4 } from "uuid";
import configureStore from 'redux-mock-store'
import { Provider } from "react-redux";

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

  it('mock state', () => {
    const initState = [{
      id: v4(),
      discription: 'test',
      completed: false,
    }]
    const mockStore = configureStore()

    const store = mockStore(initState)
    const { asFragment, getAllByRole, getByText } = render(<Provider store={store}><App /></Provider>)

    expect(asFragment(<App />)).toMatchSnapshot()

    const btnEdit = getAllByRole('button')[1]
    fireEvent.click(btnEdit)

    expect(getByText(/edit item/i)).toBeInTheDocument()


  })
})