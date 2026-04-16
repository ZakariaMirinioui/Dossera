import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NProgressSuspense from '@components/NProgressSuspense';
import DosseraPage from '@pages/Home/DosseraPage';
import NotFound from '@pages/NotFound';

export default function BaseRoutes() {
    return (
        <BrowserRouter>
            <Suspense fallback={<NProgressSuspense />}>
                <Routes>
                    <Route path="/" element={<DosseraPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
