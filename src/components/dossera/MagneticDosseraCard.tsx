import React, { useRef, useEffect } from "react";

interface MagneticDosseraCardProps {
	strength: number;
	className: string;
	style?: React.CSSProperties;
	children: React.ReactNode;
}

export const MagneticDosseraCard: React.FC<MagneticDosseraCardProps> = ({ strength, className, style, children }) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const handleMouseMove = (e: MouseEvent) => {
			const rect = element.getBoundingClientRect();
			const x = e.clientX - rect.left - rect.width / 2;
			const y = e.clientY - rect.top - rect.height / 2;
			const angleX = (y / rect.height) * strength * 10;
			const angleY = (x / rect.width) * strength * 10;

			element.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
		};

		const handleMouseLeave = () => {
			element.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
		};

		const handleTouchStart = () => {
			element.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(0.98, 0.98, 0.98)`;
		};

		const handleTouchEnd = () => {
			element.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
		};

		element.addEventListener("mousemove", handleMouseMove);
		element.addEventListener("mouseleave", handleMouseLeave);
		element.addEventListener("touchstart", handleTouchStart);
		element.addEventListener("touchend", handleTouchEnd);

		return () => {
			element.removeEventListener("mousemove", handleMouseMove);
			element.removeEventListener("mouseleave", handleMouseLeave);
			element.removeEventListener("touchstart", handleTouchStart);
			element.removeEventListener("touchend", handleTouchEnd);
		};
	}, [strength]);

	return (
		<div ref={ref} className={`glass-card glass-card--magnetic ${className}`.trim()} style={style}>
			{children}
		</div>
	);
};

export default MagneticDosseraCard;