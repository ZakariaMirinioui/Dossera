import React, { lazy } from "react";
import { Outlet } from "react-router-dom";

const WebsiteHeader = lazy(() => import("./Header"));
const WebsiteFooter = lazy(() => import("./Footer"));

const WebsiteLayout: React.FC = () => {
	return (
		<>
			<section
				className="min-h-screen overflow-x-hidden bg-[url(/grid.svg)] bg-repeat-y bg-cover"
				style={{ backgroundBlendMode: "overlay", backgroundColor: "var(--bg-primary)" }}
			>
				<WebsiteHeader />
				<main className="website-main w-full min-h-[90vh] pt-[var(--navbar-height)] px-0">
					<Outlet />
				</main>
				<WebsiteFooter />
			</section>
		</>
	);
};

export default WebsiteLayout;
