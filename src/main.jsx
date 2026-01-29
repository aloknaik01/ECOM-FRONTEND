import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import App from './App.jsx'

// Remove preload class after initial render to enable transitions
window.addEventListener('load', () => {
  document.body.classList.remove('preload');
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
    </Provider>
);