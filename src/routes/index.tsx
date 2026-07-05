import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NProgressSuspense from '@components/NProgressSuspense';
import DosseraImageMatchPage from '@pages/Home/DosseraImageMatchPage';
import NotFound from '@pages/NotFound';

export default function BaseRoutes() {
    return (
        <BrowserRouter>
            <Suspense fallback={<NProgressSuspense />}>
                <Routes>
                    <Route path="/" element={<DosseraImageMatchPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
