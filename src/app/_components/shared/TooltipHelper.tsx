import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "~/components/ui/tooltip";
import { FC } from "react";

interface ITooltipHelperProps {
    tooltipHeader: string;
    tooltipText: string;
}

const TooltipHelper: FC<ITooltipHelperProps> = ({tooltipHeader, tooltipText}: ITooltipHelperProps) => {
    return (
        <TooltipProvider>
        <Tooltip>
            <TooltipTrigger>{tooltipHeader}</TooltipTrigger>
            <TooltipContent>
                <p className="font-bold text-gray-800 p-2 text-lg">
                    {tooltipText}
                </p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
    )
}

export default TooltipHelper