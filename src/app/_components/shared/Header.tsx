import type { FC } from "react";
import type { IHeaderProps } from "~/app/types/sharedTypes";

const Header: FC<IHeaderProps> = ({ text }: IHeaderProps) => {
	return (
		<h2 className="mt-5 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
			{text}
		</h2>
	);
};

export default Header;
