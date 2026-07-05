import React from 'react';
import { Shield, Search, Globe, Server, Lock, Fingerprint, Activity, FileText } from 'lucide-react';
import WebsiteHeader from '../../layouts/Website/Header';

export default function DosseraImageMatchPage() {
    return (
        <div className="bg-[#080808] min-h-screen text-[#f5f5f5] font-sans selection:bg-[#e63946] selection:text-white pb-12 overflow-x-hidden">
            <WebsiteHeader />

            {/* Background Gradients */}
            <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#e63946] rounded-full blur-[180px] opacity-10"></div>
                <div className="absolute top-[-5%] right-[-10%] w-[40%] h-[40%] bg-[#c9a84c] rounded-full blur-[150px] opacity-[0.05]"></div>
            </div>

            {/* HERO SECTION */}
            <section className="relative z-10 pt-32 pb-24 px-4 sm:px-6 flex flex-col items-center text-center max-w-5xl mx-auto">
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#a0a0a0] mb-6">
                    ACTIVE JUDICIAL ARCHIVE MANAGEMENT SYSTEM
                </p>

                <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
                    <span className="text-[#e63946] font-bold">JAMS:</span> The Judicial Archive<br />Management System
                </h1>

                <h2 className="text-2xl md:text-4xl font-serif italic text-[#c9a84c] mb-8">
                    Archive less. Accomplish more.
                </h2>

                <p className="text-[#a0a0a0] max-w-xl mx-auto mb-10 text-sm leading-relaxed">
                    Your workflow, redefined. DOSSERA deploys sovereign document<br />
                    intelligence inside your institution.<br />
                    No cloud. No compromise. No data leaving your walls.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-[#e63946] hover:bg-[#ff4d5d] text-white px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(230,57,70,0.3)]">
                        Book a Discovery Call <span className="ml-2">→</span>
                    </button>
                    <button className="bg-transparent border border-white/20 hover:border-white text-white px-8 py-3 rounded-full font-medium transition-all">
                        See how it works <span className="ml-2">↓</span>
                    </button>
                </div>
            </section>

            {/* THE ENTERPRISE EDGE: 3-TIER CACHE ARCHITECTURE */}
            <section className="relative z-10 py-16 px-4 sm:px-6 max-w-6xl mx-auto">
                <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-10 lg:p-16">
                    <h2 className="text-2xl md:text-3xl font-serif text-center mb-16">The Enterprise Edge: 3-Tier Cache Architecture</h2>

                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* Abstract 3D graphic placeholder */}
                        <div className="lg:w-1/3 flex justify-center">
                            <div className="relative w-48 h-48">
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#e63946]/20 to-transparent rounded-2xl rotate-45 transform border border-[#e63946]/30 animate-pulse"></div>
                                <div className="absolute inset-4 bg-gradient-to-tr from-[#e63946]/30 to-transparent rounded-2xl rotate-45 transform border border-[#e63946]/40"></div>
                                <div className="absolute inset-8 bg-[#e63946]/40 rounded-2xl rotate-45 transform border border-[#e63946]/50 flex items-center justify-center">
                                    <FileText className="text-[#e63946] w-8 h-8 -rotate-45" />
                                </div>
                            </div>
                        </div>

                        {/* Cards */}
                        <div className="lg:w-2/3 flex flex-col gap-4 relative">
                            {/* Connector lines would go here via SVG */}

                            {/* Tier 1 */}
                            <div className="bg-[#141414] border border-white/5 p-6 rounded-xl flex items-start gap-5 hover:bg-[#1a1a1a] transition-colors group">
                                <div className="p-3 bg-[#e63946]/10 rounded-lg group-hover:bg-[#e63946]/20 transition-colors">
                                    <Server className="w-6 h-6 text-[#e63946]" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-1">Tier 1: Hot Cache (Redis)</h3>
                                    <p className="text-xs text-[#808080]">Ultra-fast access for active documents</p>
                                </div>
                                <div className="ml-auto text-xs text-[#606060] max-w-[200px] text-right hidden sm:block">
                                    Reliability and scale unelories provide documents and enigcoccale controller. high accuracy inartinerine and wanticaccess.
                                </div>
                            </div>

                            {/* Tier 2 */}
                            <div className="bg-[#141414] border border-white/5 p-6 rounded-xl flex items-start gap-5 hover:bg-[#1a1a1a] transition-colors group">
                                <div className="p-3 bg-[#ff006e]/10 rounded-lg group-hover:bg-[#ff006e]/20 transition-colors">
                                    <Activity className="w-6 h-6 text-[#ff006e]" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-1">Tier 2: Warm Cache (Meilisearch)</h3>
                                    <p className="text-xs text-[#808080]">Optimized for search and retrieval</p>
                                </div>
                                <div className="ml-auto text-xs text-[#606060] max-w-[200px] text-right hidden sm:block">
                                    Reticticity advanced, oon-keocentised eotonce, and locod pnoncoartsectionsts technology and biecoconsite.
                                </div>
                            </div>

                            {/* Tier 3 */}
                            <div className="bg-[#141414] border border-white/5 p-6 rounded-xl flex items-start gap-5 hover:bg-[#1a1a1a] transition-colors group">
                                <div className="p-3 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                                    <Globe className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-1">Tier 3: Cold Storage (PostgreSQL)</h3>
                                    <p className="text-xs text-[#808080]">Long-term, secure archiving</p>
                                </div>
                                <div className="ml-auto text-xs text-[#606060] max-w-[200px] text-right hidden sm:block">
                                    Archiving sich secure archiving, aomstiations and storage foll endcynomerty, tenritions, oportize, and rotirated compliance.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CORE CAPABILITIES */}
            <section className="relative z-10 py-16 px-4 sm:px-6 max-w-6xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-serif mb-10">Core Capabilities</h2>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="bg-gradient-to-b from-[#e63946]/10 to-[#111] p-[1px] rounded-2xl">
                        <div className="bg-[#111] border border-white/5 h-full p-8 rounded-2xl">
                            <div className="p-3 bg-[#e63946]/10 rounded-xl inline-block mb-6 border border-[#e63946]/20">
                                <Search className="w-6 h-6 text-[#e63946]" />
                            </div>
                            <h3 className="font-bold text-lg mb-3">Advanced OCR & Indexing</h3>
                            <p className="text-[#808080] text-sm leading-relaxed">
                                Extract text from scanned images with high accuracy, including handwriting recognition.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-gradient-to-b from-[#e63946]/10 to-[#111] p-[1px] rounded-2xl">
                        <div className="bg-[#111] border border-white/5 h-full p-8 rounded-2xl">
                            <div className="p-3 bg-[#e63946]/10 rounded-xl inline-block mb-6 border border-[#e63946]/20">
                                <Activity className="w-6 h-6 text-[#e63946]" />
                            </div>
                            <h3 className="font-bold text-lg mb-3">Vector Search Technology</h3>
                            <p className="text-[#808080] text-sm leading-relaxed">
                                Semantic understanding for context-aware retrieval, going beyond keyword matching.
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-gradient-to-b from-[#e63946]/10 to-[#111] p-[1px] rounded-2xl">
                        <div className="bg-[#111] border border-white/5 h-full p-8 rounded-2xl">
                            <div className="p-3 bg-[#e63946]/10 rounded-xl inline-block mb-6 border border-[#e63946]/20">
                                <span className="font-arabic font-bold text-xl text-[#e63946]">ع</span>
                            </div>
                            <h3 className="font-bold text-lg mb-3">Arabic RTL Support</h3>
                            <p className="text-[#808080] text-sm leading-relaxed">
                                Native support for Arabic and right-to-left languages, ensuring seamless integration.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* HARDWARE-BOUND SECURITY */}
            <section className="relative z-10 py-16 px-4 sm:px-6 max-w-6xl mx-auto">
                <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-10 lg:p-16 relative overflow-hidden">
                    <h2 className="text-2xl md:text-3xl font-serif text-center mb-16">Hardware-Bound Security: Air-Gapped & Sovereign</h2>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                        {/* Left labels */}
                        <div className="flex flex-col gap-6 text-sm text-[#a0a0a0]">
                            <div className="bg-[#141414] border border-white/10 px-4 py-2 rounded-full relative">
                                Zero external connectivity
                                <div className="hidden md:block absolute right-[-40px] top-1/2 h-px w-10 bg-white/20"></div>
                            </div>
                            <div className="bg-[#141414] border border-white/10 px-4 py-2 rounded-full relative">
                                On-premise deployment
                                <div className="hidden md:block absolute right-[-40px] top-1/2 h-px w-10 bg-white/20"></div>
                            </div>
                            <div className="bg-[#141414] border border-white/10 px-4 py-2 rounded-full relative">
                                FIPS-compliant encryption
                                <div className="hidden md:block absolute right-[-40px] top-1/2 h-px w-10 bg-white/20"></div>
                            </div>
                        </div>

                        {/* Central server diagram (CSS art / Lucide icons) */}
                        <div className="relative">
                            <div className="w-32 h-48 bg-gradient-to-b from-[#222] to-[#111] border border-white/20 rounded-md relative flex flex-col justify-center items-center shadow-2xl">
                                {/* Server racks */}
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="w-[80%] h-4 bg-black/50 border border-white/10 rounded mb-2 flex items-center px-2">
                                        <div className="w-1.5 h-1.5 bg-[#e63946] rounded-full animate-pulse shadow-[0_0_8px_#e63946]"></div>
                                    </div>
                                ))}

                                {/* Lock and firewall graphics */}
                                <div className="absolute -bottom-4 -right-4 bg-[#111] border border-white/20 p-3 rounded-xl shadow-xl">
                                    <Lock className="w-8 h-8 text-[#c9a84c]" />
                                </div>
                                <div className="absolute -left-8 bottom-4 flex gap-1 transform rotate-y-[30deg]">
                                    {/* Brick wall abstraction */}
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i} className="w-2 h-16 bg-[#e63946]/40 border border-[#e63946]/60 rounded-sm"></div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right labels */}
                        <div className="flex flex-col gap-6 text-sm text-[#a0a0a0]">
                            <div className="bg-[#141414] border border-white/10 px-4 py-2 rounded-full relative">
                                <div className="hidden md:block absolute left-[-40px] top-1/2 h-px w-10 bg-white/20"></div>
                                FIPS-compliant encryption
                            </div>
                            <div className="bg-[#141414] border border-white/10 px-4 py-2 rounded-full relative">
                                <div className="hidden md:block absolute left-[-40px] top-1/2 h-px w-10 bg-white/20"></div>
                                Immutable audit logs
                            </div>
                            <div className="bg-[#141414] border border-white/10 px-4 py-2 rounded-full relative">
                                <div className="hidden md:block absolute left-[-40px] top-1/2 h-px w-10 bg-white/20"></div>
                                Data never leaves your premises
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TECHNICAL INFRASTRUCTURE */}
            <section className="relative z-10 py-16 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
                <div className="md:w-1/3">
                    <h2 className="text-2xl md:text-3xl font-serif mb-4 leading-tight">Technical Infrastructure:<br />Built for Reliability & Scale</h2>
                </div>
                <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* PostgreSQL */}
                    <div className="bg-[#111] border border-white/5 p-6 rounded-xl flex gap-4 items-center">
                        <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-lg shrink-0">
                            <span className="text-2xl text-blue-400 font-bold">🐘</span>
                        </div>
                        <div>
                            <h4 className="font-bold">PostgreSQL</h4>
                            <p className="text-xs text-[#808080]">Robust, enterprise-grade relational database for secure, long-term data storage and integrity.</p>
                        </div>
                    </div>

                    {/* Redis */}
                    <div className="bg-[#111] border border-white/5 p-6 rounded-xl flex gap-4 items-center">
                        <div className="w-12 h-12 flex items-center justify-center bg-[#e63946]/10 rounded-lg shrink-0">
                            <Server className="text-[#e63946]" />
                        </div>
                        <div>
                            <h4 className="font-bold">Redis</h4>
                            <p className="text-xs text-[#808080]">High-performance, in-memory data store for real-time caching and rapid access.</p>
                        </div>
                    </div>

                    {/* Meilisearch */}
                    <div className="bg-[#111] border border-white/5 p-6 rounded-xl flex gap-4 items-center sm:col-span-2">
                        <div className="w-12 h-12 flex items-center justify-center bg-[#ff006e]/10 rounded-lg shrink-0">
                            <Activity className="text-[#ff006e]" />
                        </div>
                        <div>
                            <h4 className="font-bold">Meilisearch</h4>
                            <p className="text-xs text-[#808080]">Lightning-fast, open-source search engine designed for powerful, relevant results.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* OUR CLIENT IMPACT */}
            <section className="relative z-10 py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-white/5 mt-10">
                <h2 className="text-2xl md:text-3xl font-serif mb-16 text-center">Our Client Impact</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
                    <div>
                        <div className="mx-auto w-16 h-16 rounded-2xl bg-[#e63946]/10 border border-[#e63946]/20 flex items-center justify-center mb-6">
                            <FileText className="w-8 h-8 text-[#e63946]" />
                        </div>
                        <div className="text-5xl font-serif font-bold text-[#f5f5f5] mb-2">10M+</div>
                        <div className="text-sm text-[#808080]">Documents Processed</div>
                    </div>
                    <div>
                        <div className="mx-auto w-16 h-16 rounded-2xl bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center mb-6">
                            <Activity className="w-8 h-8 text-[#c9a84c]" />
                        </div>
                        <div className="text-5xl font-serif font-bold text-[#f5f5f5] mb-2">Sub-100ms</div>
                        <div className="text-sm text-[#808080]">Search Latency</div>
                    </div>
                    <div>
                        <div className="mx-auto w-16 h-16 rounded-2xl bg-[#e63946]/10 border border-[#e63946]/20 flex items-center justify-center mb-6">
                            <Shield className="w-8 h-8 text-[#e63946]" />
                        </div>
                        <div className="text-5xl font-serif font-bold text-[#f5f5f5] mb-2">0</div>
                        <div className="text-sm text-[#808080]">Data Leaks</div>
                    </div>
                </div>
            </section>

            {/* THE COMPLIANCE VAULT */}
            <section className="relative z-10 py-16 px-4 sm:px-6 max-w-6xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-serif mb-10 text-center md:text-left">The Compliance Vault</h2>

                <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4 bg-[#141414] border border-[#e63946]/20 px-6 py-4 rounded-xl">
                            <Shield className="text-[#e63946] w-6 h-6" />
                            <span className="font-semibold">Hardware-Bound<br />Licensing</span>
                        </div>
                        <div className="flex items-center gap-4 bg-[#141414] border border-white/10 px-6 py-4 rounded-xl">
                            <Lock className="text-[#808080] w-6 h-6" />
                            <span className="font-semibold text-[#a0a0a0]">FIPS-Compliant<br />Encryption</span>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="w-32 h-48 bg-[#111] border border-white/10 rounded-md relative flex flex-col justify-center items-center shadow-[0_0_50px_rgba(230,57,70,0.1)]">
                            {/* Server abstract */}
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-[80%] h-3 bg-black/50 border border-white/5 rounded mb-2"></div>
                            ))}
                            <div className="absolute -left-6 bottom-6 flex gap-1 transform rotate-y-[30deg]">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="w-2 h-12 bg-[#e63946]/30 border border-[#e63946]/50 rounded-sm"></div>
                                ))}
                            </div>
                            <div className="absolute -right-6 bottom-0">
                                <Lock className="w-12 h-12 text-[#c9a84c] drop-shadow-lg" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-lg bg-[#e63946]/10 border border-[#e63946]/20 flex items-center justify-center"><FileText className="w-5 h-5 text-[#e63946]" /></div>
                            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"><Globe className="w-5 h-5 text-[#808080]" /></div>
                            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"><Fingerprint className="w-5 h-5 text-[#808080]" /></div>
                        </div>
                        <div className="flex gap-4 justify-center md:justify-start items-center bg-[#141414] py-3 px-6 rounded-xl border border-white/5">
                            {/* Fake Badges */}
                            <div className="text-[#a0a0a0] font-bold text-lg">FIPS</div>
                            <div className="w-px h-6 bg-white/10"></div>
                            <div className="text-[#c9a84c] font-bold text-lg"><Shield className="inline w-5 h-5 mb-1" /></div>
                            <div className="w-px h-6 bg-white/10"></div>
                            <div className="text-[#4a90e2] font-bold text-sm bg-blue-500/10 px-2 py-1 rounded">ISO 27001</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* OUR SERVICES & DEPLOYMENT */}
            <section className="relative z-10 py-16 px-4 sm:px-6 max-w-6xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-serif mb-10">Our Services & Deployment</h2>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Service 1 */}
                    <div className="bg-gradient-to-b from-[#e63946]/20 to-transparent p-[1px] rounded-2xl">
                        <div className="bg-[#111] border border-white/5 h-full p-8 rounded-2xl flex flex-col">
                            <div className="p-3 bg-[#e63946]/10 border border-[#e63946]/20 rounded-xl w-fit mb-6">
                                <Server className="w-6 h-6 text-[#e63946]" />
                            </div>
                            <h3 className="font-bold text-lg mb-3">On-Premise Installation</h3>
                            <p className="text-[#808080] text-sm leading-relaxed">
                                Secure on-premise installation, and professional and none-conceive installation security concomitatian.
                            </p>
                        </div>
                    </div>

                    {/* Service 2 */}
                    <div className="bg-gradient-to-b from-[#e63946]/20 to-transparent p-[1px] rounded-2xl">
                        <div className="bg-[#111] border border-white/5 h-full p-8 rounded-2xl flex flex-col">
                            <div className="p-3 bg-[#e63946]/10 border border-[#e63946]/20 rounded-xl w-fit mb-6">
                                <FileText className="w-6 h-6 text-[#e63946]" />
                            </div>
                            <h3 className="font-bold text-lg mb-3">Custom OCR Training for Judicial Script</h3>
                            <p className="text-[#808080] text-sm leading-relaxed">
                                Custom OCR Training for Judicial Script is an in-industry to conware confend into end of omronocs.
                            </p>
                        </div>
                    </div>

                    {/* Service 3 */}
                    <div className="bg-gradient-to-b from-[#e63946]/20 to-transparent p-[1px] rounded-2xl">
                        <div className="bg-[#111] border border-white/5 h-full p-8 rounded-2xl flex flex-col">
                            <div className="p-3 bg-[#e63946]/10 border border-[#e63946]/20 rounded-xl w-fit mb-6">
                                <Search className="w-6 h-6 text-[#e63946]" />
                            </div>
                            <h3 className="font-bold text-lg mb-3">24/7 Forensic Support</h3>
                            <p className="text-[#808080] text-sm leading-relaxed">
                                24/7 Forensic Support is a coollocie cappport server inatiuly, evenoca indcuing, annodctions, and ibeatocr.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* INQUIRY & STRATEGIC PARTNERSHIP */}
            <section className="relative z-10 py-20 px-4 sm:px-6 max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-serif mb-10 text-center text-[#c9a84c]">Inquiry & Strategic Partnership</h2>

                <form className="flex flex-col gap-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-[#a0a0a0] font-medium">Full Name</label>
                            <input type="text" className="bg-[#111] border border-[#e63946]/50 rounded-lg p-4 text-white focus:outline-none focus:border-[#e63946] transition-colors" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-[#a0a0a0] font-medium">Email Address</label>
                            <input type="email" className="bg-[#111] border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-[#e63946]/50 transition-colors" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-[#a0a0a0] font-medium">Institution/Organization</label>
                        <input type="text" className="bg-[#111] border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-[#e63946]/50 transition-colors" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-[#a0a0a0] font-medium">Message</label>
                        <textarea rows={4} className="bg-[#111] border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-[#e63946]/50 transition-colors"></textarea>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button type="button" className="bg-[#e63946] hover:bg-[#ff4d5d] text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(230,57,70,0.3)]">
                            Request Secure Site Audit
                        </button>
                    </div>
                </form>
            </section>

            {/* FOOTER */}
            <footer className="relative z-10 border-t border-white/5 mt-16 pt-12 pb-8 px-4 sm:px-6 max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12">
                    <div className="flex flex-col gap-2 text-sm text-[#808080]">
                        <h4 className="text-white font-bold mb-2">Site Map</h4>
                        <h4 className="text-white font-bold mb-1">Legal Disclosures</h4>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <h2 className="text-3xl font-serif tracking-widest font-bold mb-6">DOSSERA</h2>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer">
                            <span className="text-xl">f</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer">
                            <span className="text-xl">𝕏</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer">
                            <span className="text-xl">in</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer">
                            <span className="text-xl">▶</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between text-xs text-[#606060] pt-6 border-t border-white/5">
                    <p>© 2032 @ DOSSERA. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
