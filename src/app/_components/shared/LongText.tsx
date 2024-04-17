"use client";

import { FC, useState } from "react";
import classNames from "classnames";
import { Button } from "~/components/ui/button";
import { ILongTextProps } from "~/app/types/sharedTypes";

const LongText: FC<ILongTextProps> = ({ text, maxLength }: ILongTextProps) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleIsExpanded = () => {
		setIsExpanded(!isExpanded);
	};

	const textClass = classNames("text-sm", "text-gray-800", "dark:text-blue-50", {
		truncate: !isExpanded,
	});

	const buttonClass = classNames(
		"text-blue-500",
		"hover:text-blue-700",
		"transition-colors",
		"duration-300",
		"mt-4",
		"text-sm",
	);

	if (text.length <= maxLength) {
		return <p className={textClass}>{text}</p>;
	}

	return (
		<div>
			<span className={textClass}>
				{isExpanded
					? text
					: `${text.substring(0, maxLength).trim()}...`}
			</span>
			<Button
				variant={"link"}
				size={"sm"}
				onClick={toggleIsExpanded}
				className={buttonClass}
			>
				{isExpanded ? "Zobraziť menej" : "Zobraziť viac"}
			</Button>
		</div>
	);
};

export default LongText;
