import ReactDOM from 'react-dom';
import root from './client'
import registerServiceWorker from './client/registerServiceWorker';

ReactDOM.render(root, document.getElementById('root'));
registerServiceWorker();