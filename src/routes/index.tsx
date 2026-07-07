import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NProgressSuspense from '@components/NProgressSuspense';
import DosseraPage from '@pages/Home/DosseraPage';
import SolutionsPage from '@pages/Solutions/SolutionsPage';
import ArchitecturePage from '@pages/Architecture/ArchitecturePage';
import SpecificationsPage from '@pages/Specifications/SpecificationsPage';
import SecuritePage from '@pages/Securite/SecuritePage';
import LivreBlancPage from '@pages/LivreBlanc/LivreBlancPage';
import DemoRequestPage from '@pages/DemoRequest/DemoRequestPage';
import NotFound from '@pages/NotFound';

export default function BaseRoutes() {
    return (
        <BrowserRouter>
            <Suspense fallback={<NProgressSuspense />}>
                <Routes>
                    <Route path="/" element={<DosseraPage />} />
                    <Route path="/solutions" element={<SolutionsPage />} />
                    <Route path="/architecture" element={<ArchitecturePage />} />
                    <Route path="/specifications" element={<SpecificationsPage />} />
                    <Route path="/securite" element={<SecuritePage />} />
                    <Route path="/livre-blanc" element={<LivreBlancPage />} />
                    <Route path="/demande-demo" element={<DemoRequestPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
