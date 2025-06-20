import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { Routes as AppRoutes } from './types';
import { Analytics, Generate, History } from './pages';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route
                    path={AppRoutes.Home}
                    element={<Navigate to={AppRoutes.Analytics} />}
                />
                <Route path={AppRoutes.Analytics} element={<Analytics />} />
                <Route path={AppRoutes.Generate} element={<Generate />} />
                <Route path={AppRoutes.History} element={<History />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
