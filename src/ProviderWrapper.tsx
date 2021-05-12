import { Provider } from 'react-redux';
import App from './App';
import { store } from './redux/store';

const ProviderWrapper = () => (
    <Provider store={store}>
      <App />
    </Provider>
)

export default ProviderWrapper