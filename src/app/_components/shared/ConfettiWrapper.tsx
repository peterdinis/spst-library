import React, { FC, useEffect } from "react";
import Confetti from "react-confetti";

const ConfettiWrapper: FC = () => {
	const drawShape = () => {
		const ctx = (
			document.getElementById("confetti") as HTMLCanvasElement
		).getContext("2d");
		if (ctx) {
			ctx.beginPath();
			for (let i = 0; i < 22; i++) {
				const angle = 0.25 * i;
				const x = (0.2 + 1.5 * angle) * Math.cos(angle);
				const y = (0.2 + 1.5 * angle) * Math.sin(angle);
				ctx.lineTo(x, y);
			}
			ctx.stroke();
			ctx.closePath();
		}
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			drawShape();
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			<canvas
				id="confetti"
				style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
			/>
			<Confetti />
		</>
	);
};

export default ConfettiWrapper;
