import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const ACCENT = "#a0894b";
const SHELF_COLOR = "#1c1a18";
const SHELF_BORDER = "#2a2826";
const BG_DARK = "#0c0a09";

type ShelfPosition = { block: number; row: number; section: number };

function ShelfCompartment({
	pos,
	isHighlighted,
	onHover,
}: {
	pos: ShelfPosition;
	isHighlighted: boolean;
	onHover: (p: ShelfPosition | null) => void;
}) {
	const meshRef = useRef<THREE.Mesh>(null);
	const targetScale = useMemo(() => new THREE.Vector3(1, 1, 1), []);
	const hoveredScale = useMemo(() => new THREE.Vector3(1.08, 1.08, 1.08), []);

	const x = (pos.block - 1) * 2.8;
	const y = (pos.row - 1) * 1.2 - 1.8;
	const z = (pos.section - 1) * 0.7 - 1.4;

	useFrame(() => {
		if (!meshRef.current) return;
		meshRef.current.scale.lerp(isHighlighted ? hoveredScale : targetScale, 0.08);
	});

	return (
		<mesh
			ref={meshRef}
			position={[x, y, z]}
			onPointerEnter={() => onHover(pos)}
			onPointerLeave={() => onHover(null)}
		>
			<boxGeometry args={[1, 0.6, 0.4]} />
			<meshStandardMaterial
				color={isHighlighted ? ACCENT : SHELF_COLOR}
				transparent
				opacity={isHighlighted ? 0.9 : 0.6}
				wireframe={false}
			/>
		</mesh>
	);
}

function ShelfBlock({
	blockIdx,
	rows,
	sections,
	highlightedPos,
	onHover,
}: {
	blockIdx: number;
	rows: number;
	sections: number;
	highlightedPos: ShelfPosition | null;
	onHover: (p: ShelfPosition | null) => void;
}) {
	const compartments = useMemo(() => {
		const result: ShelfPosition[] = [];
		for (let r = 1; r <= rows; r++) {
			for (let s = 1; s <= sections; s++) {
				result.push({ block: blockIdx, row: r, section: s });
			}
		}
		return result;
	}, [blockIdx, rows, sections]);

	return (
		<group>
			{/* Block frame */}
			<mesh position={[(blockIdx - 1) * 2.8, -0.3, 0]}>
				<boxGeometry args={[2.2, 4.2, 1.8]} />
				<meshBasicMaterial color={SHELF_BORDER} transparent opacity={0.15} wireframe />
			</mesh>
			{compartments.map((p) => (
				<ShelfCompartment
					key={`${p.block}-${p.row}-${p.section}`}
					pos={p}
					isHighlighted={
						highlightedPos !== null &&
						highlightedPos.block === p.block &&
						((highlightedPos.row === p.row && highlightedPos.section === p.section) ||
							(highlightedPos.row === p.row) ||
							(highlightedPos.block === p.block))
					}
					onHover={onHover}
				/>
			))}
		</group>
	);
}

function ArchiveScene() {
	const [highlightedPos, setHighlightedPos] = useState<ShelfPosition | null>(null);

	const blocks = useMemo(() => [1, 2, 3], []);
	const rows = 4;
	const sections = 3;

	return (
		<group>
			{blocks.map((b) => (
				<ShelfBlock
					key={b}
					blockIdx={b}
					rows={rows}
					sections={sections}
					highlightedPos={highlightedPos}
					onHover={setHighlightedPos}
				/>
			))}

			{/* Floor */}
			<mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[12, 6]} />
				<meshBasicMaterial color={BG_DARK} />
			</mesh>

			{/* Label planes (invisible but serve as spacers for the HTML overlays) */}
			<mesh position={[0, 2.8, 0]}>
				<planeGeometry args={[8, 0.8]} />
				<meshBasicMaterial transparent opacity={0} />
			</mesh>

			<ambientLight intensity={0.3} />
			<directionalLight position={[3, 5, 4]} intensity={0.4} color={ACCENT} />
			<pointLight position={[0, 4, 3]} intensity={0.2} color={ACCENT} />
		</group>
	);
}

export default function PhysicalArchive() {
	return (
		<div className="relative w-full h-[360px] md:h-[460px] rounded-xl overflow-hidden border border-[var(--border)]">
			{/* HTML overlay labels */}
			<div className="absolute top-3 left-4 right-4 z-10 flex justify-between text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] pointer-events-none">
				<span>Blocks</span>
				<span>Rows</span>
				<span>Sections</span>
			</div>
			<div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 text-[10px] font-mono text-[var(--accent)] tracking-wider pointer-events-none">
				Hover a compartment to highlight its hierarchy
			</div>

			<Canvas
				dpr={[1, 1.5]}
				camera={{ position: [4, 3, 6], fov: 38 }}
				gl={{ antialias: true }}
				style={{ background: BG_DARK }}
			>
				<ArchiveScene />
				<OrbitControls
					enableZoom
					enablePan={false}
					autoRotate
					autoRotateSpeed={0.4}
					rotateSpeed={0.3}
					maxPolarAngle={Math.PI / 2.2}
					minDistance={4}
					maxDistance={12}
				/>
			</Canvas>
		</div>
	);
}
