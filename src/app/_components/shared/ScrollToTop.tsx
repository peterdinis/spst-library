"use client"

import { FC, useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

const ScrollToTop: FC = () => {
	const [showTopBtn, setShowTopBtn] = useState(false);
	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 400) {
				setShowTopBtn(true);
			} else {
				setShowTopBtn(false);
			}
		});
	}, []);
	const goToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<div className="top-to-btm">
			{showTopBtn && (
				<ChevronUp
					onClick={goToTop}
					className="icon-position icon-style"
				/>
			)}
		</div>
	);
};
export default ScrollToTop;
