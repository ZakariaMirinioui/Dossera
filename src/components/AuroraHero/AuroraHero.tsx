import React from "react";

const SVG_FILTER = [
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" color-interpolation-filters="sRGB">',
	"<g>",
	'<rect width="1" height="1" fill="black" />',
	'<rect width="1" height="1" fill="url(#deep)" style="mix-blend-mode:screen" />',
	'<rect width="1" height="1" fill="url(#gold)" style="mix-blend-mode:screen" />',
	'<rect width="1" height="1" fill="url(#warm)" style="mix-blend-mode:screen" />',
	"</g><defs>",
	'<radialGradient id="gold" cx="0" cy="0" r="1">',
	'<stop stop-color="#a0894b" />',
	'<stop stop-color="#a0894b" offset="1" stop-opacity="0" />',
	"</radialGradient>",
	'<radialGradient id="deep" cx="1" cy="0" r="1">',
	'<stop stop-color="#0b2e21" />',
	'<stop stop-color="#0b2e21" offset="1" stop-opacity="0" />',
	"</radialGradient>",
	'<radialGradient id="warm" cx="0" cy="1" r="1">',
	'<stop stop-color="#2c1810" />',
	'<stop stop-color="#2c1810" offset="1" stop-opacity="0" />',
	"</radialGradient>",
	"</defs></svg>",
].join("\n");

const filterImageHref = "data:image/svg+xml," + encodeURIComponent(SVG_FILTER);

const AuroraHero: React.FC<{ className?: string }> = ({ className }) => {
	return (
		<div
			className={className}
			aria-hidden
			style={{
				position: "absolute",
				inset: 0,
				overflow: "hidden",
				pointerEvents: "none",
				zIndex: 0,
			}}
		>
			<style>{`
				@keyframes auroraDrift {
					from { background-position: 50% 50%, 50% 50%; }
					to { background-position: 350% 50%, 350% 50%; }
				}
				.aurora-layer {
					width: 100%;
					height: 100%;
					position: absolute;
					inset: 0;
					--stripes: repeating-linear-gradient(
						100deg,
						#0c0a09 0%,
						#0c0a09 7%,
						transparent 10%,
						transparent 12%,
						#0c0a09 16%
					);
					--rainbow: repeating-linear-gradient(
						100deg,
						#a0894b 10%,
						#0b2e21 15%,
						#a0894b 20%,
						#2c1810 25%,
						#a0894b 30%
					);
					background-image: var(--stripes), var(--rainbow);
					background-size: 300%, 200%;
					background-position: 50% 50%, 50% 50%;
					filter: blur(10px) opacity(50%) saturate(200%);
					mask-image: radial-gradient(ellipse at 100% 0%, black 40%, transparent 70%);
					-webkit-mask-image: radial-gradient(ellipse at 100% 0%, black 40%, transparent 70%);
				}
				.aurora-layer::after {
					content: "";
					position: absolute;
					inset: 0;
					background-image: var(--stripes), var(--rainbow);
					background-size: 200%, 100%;
					animation: auroraDrift 120s linear infinite;
					background-attachment: fixed;
					mix-blend-mode: difference;
				}
				.aurora-content {
					position: absolute;
					inset: 0;
					width: 100%;
					height: 100%;
					display: flex;
					place-content: center;
					place-items: center;
					flex-flow: column;
					gap: 4.5%;
					backdrop-filter: contrast(0.9) blur(7px) url(#fluted);
					-webkit-backdrop-filter: contrast(0.9) blur(7px) url(#fluted);
					mix-blend-mode: difference;
					filter: invert(1);
				}
			`}</style>

			<div className="aurora-layer" />

			<div className="aurora-content" />

			<svg
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				colorInterpolationFilters="sRGB"
				style={{ position: "absolute", opacity: 0, height: 0, width: 0, pointerEvents: "none" }}
				aria-hidden
				focusable="false"
			>
				<filter id="fluted" primitiveUnits="objectBoundingBox">
					<feImage
						x="0"
						y="0"
						result="image_0"
						crossOrigin="anonymous"
						href={filterImageHref}
						preserveAspectRatio="none meet"
						width=".03"
						height="1"
					/>
					<feTile in="image_0" result="tile_0" />
					<feGaussianBlur stdDeviation=".0001" edgeMode="none" in="tile_0" result="bar_smoothness" x="0" y="0" />
					<feDisplacementMap scale=".08" xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" in2="bar_smoothness" result="displacement_0" />
				</filter>
			</svg>
		</div>
	);
};

export default AuroraHero;
