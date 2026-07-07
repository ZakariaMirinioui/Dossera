import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";

const ACCENT = "#a0894b";
const ACCENT_DIM = "rgba(160, 137, 75, 0.15)";
const BG_DARK = "#0c0a09";

function DocumentParticle({
	pathPoints,
	offset,
	color = ACCENT,
	size = 0.08,
}: {
	pathPoints: THREE.Vector3[];
	offset: number;
	color?: string;
	size?: number;
}) {
	const meshRef = useRef<THREE.Mesh>(null);
	const total = pathPoints.length;

	useFrame(({ clock }) => {
		if (!meshRef.current) return;
		const t = ((clock.getElapsedTime() * 0.15 + offset) % 1) * total;
		const idx = Math.floor(t);
		const frac = t - idx;
		const p0 = pathPoints[idx % total];
		const p1 = pathPoints[(idx + 1) % total];
		meshRef.current.position.lerpVectors(p0, p1, frac);
	});

	return (
		<mesh ref={meshRef} position={pathPoints[0]}>
			<boxGeometry args={[size, size, size]} />
			<meshStandardMaterial color={color} transparent opacity={0.8} />
		</mesh>
	);
}

function FlowPath({ points }: { points: THREE.Vector3[] }) {
	return (
		<Line
			points={points}
			color={ACCENT_DIM}
			lineWidth={1}
			transparent
			opacity={0.3}
		/>
	);
}

function PipelineScene() {
	const mainPath = useMemo(
		() => [
			new THREE.Vector3(-4, -1.5, 0),
			new THREE.Vector3(-2, -0.5, 0.5),
			new THREE.Vector3(0, 0.5, 0),
			new THREE.Vector3(2, 0.5, -0.3),
		],
		[],
	);

	const branchTop = useMemo(
		() => [
			new THREE.Vector3(2, 0.5, -0.3),
			new THREE.Vector3(3.5, 1.5, 0.2),
			new THREE.Vector3(4.5, 1.2, 0),
		],
		[],
	);

	const branchBottom = useMemo(
		() => [
			new THREE.Vector3(2, 0.5, -0.3),
			new THREE.Vector3(3.5, -0.5, -0.2),
			new THREE.Vector3(4.5, -0.2, 0),
		],
		[],
	);

	const particles = useMemo(() => {
		const result: { path: THREE.Vector3[]; offset: number }[] = [];
		for (let i = 0; i < 12; i++) {
			result.push({ path: mainPath, offset: i / 12 });
		}
		for (let i = 0; i < 8; i++) {
			result.push({ path: branchTop, offset: i / 8 });
		}
		for (let i = 0; i < 8; i++) {
			result.push({ path: branchBottom, offset: i / 8 });
		}
		return result;
	}, [mainPath, branchTop, branchBottom]);

	return (
		<group>
			{/* Labels */}
			<mesh position={[-4, -2.3, 0]}>
				<planeGeometry args={[2.2, 0.5]} />
				<meshBasicMaterial transparent opacity={0.3} color={BG_DARK} />
			</mesh>
			<mesh position={[-4.8, 1.2, 0]}>
				<planeGeometry args={[1.8, 0.4]} />
				<meshBasicMaterial transparent opacity={0.2} color={ACCENT} />
			</mesh>
			<mesh position={[4.5, 1.8, 0]}>
				<planeGeometry args={[2.2, 0.5]} />
				<meshBasicMaterial transparent opacity={0.3} color={BG_DARK} />
			</mesh>
			<mesh position={[4.5, -0.8, 0]}>
				<planeGeometry args={[2.2, 0.5]} />
				<meshBasicMaterial transparent opacity={0.3} color={BG_DARK} />
			</mesh>

			<FlowPath points={mainPath} />
			<FlowPath points={branchTop} />
			<FlowPath points={branchBottom} />

			{particles.map((p, i) => (
				<DocumentParticle key={i} pathPoints={p.path} offset={p.offset} />
			))}

			{/* Nodes */}
			<mesh position={[0, 0.5, 0]}>
				<sphereGeometry args={[0.25, 16, 16]} />
				<meshStandardMaterial color={ACCENT} />
			</mesh>
			<mesh position={[2, 0.5, -0.3]}>
				<sphereGeometry args={[0.2, 16, 16]} />
				<meshStandardMaterial color={ACCENT} transparent opacity={0.6} />
			</mesh>

			<ambientLight intensity={0.4} />
			<directionalLight position={[5, 5, 5]} intensity={0.6} color={ACCENT} />
			<pointLight position={[0, 3, 2]} intensity={0.3} color={ACCENT} />
		</group>
	);
}

export default function ArchitecturePipeline() {
	return (
		<div className="w-full h-[320px] md:h-[400px] rounded-xl overflow-hidden border border-[var(--border)]">
			<Canvas
				dpr={[1, 1.5]}
				camera={{ position: [0, 0, 7], fov: 40 }}
				gl={{ antialias: true }}
				style={{ background: BG_DARK }}
			>
				<PipelineScene />
				<OrbitControls
					enableZoom={false}
					enablePan={false}
					autoRotate
					autoRotateSpeed={0.5}
					rotateSpeed={0.3}
				/>
			</Canvas>
		</div>
	);
}
