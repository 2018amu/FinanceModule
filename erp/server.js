const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();

// Serve Angular production build
app.use(express.static(path.join(__dirname, 'dist/erp')));

// Proxy API requests to Spring Boot backend
app.use('/dashboard', createProxyMiddleware({
    target: 'http://localhost:8080',
    changeOrigin: true
}));

// Angular SPA fallback for routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/erp/index.html'));
});

// Start server
app.listen(3000, () => {
    console.log('Frontend + proxy running on http://localhost:3000');
});