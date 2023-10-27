import React from 'react';
import Home from './Home';
import Me from './Me';
import Recipe from './Recipe';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Pages() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:name" element={<Recipe />} />
            <Route path="/me" element={<Me />} />
        </Routes>
    )
}

export default Pages