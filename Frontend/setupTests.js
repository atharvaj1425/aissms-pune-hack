// setupTests.js
import '@testing-library/jest-dom';

// 🛠️ Fix react-modal error by mocking the #root element
const root = document.createElement('div');
root.setAttribute('id', 'root');
document.body.appendChild(root);
