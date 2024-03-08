import {
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    CheckCircleIcon,
    XCircleIcon,
    TimerIcon,
} from "lucide-react";

export const statuses = [
    {
        value: "ongoing",
        label: "Ongoing",
        icon: TimerIcon,
    },
    {
        value: "finished",
        label: "Finished",
        icon: CheckCircleIcon,
    },
    {
        value: "canceled",
        label: "Canceled",
        icon: XCircleIcon,
    },
];

export const priorities = [
    {
        label: "Low",
        value: "low",
        icon: ArrowDownIcon,
        color: "text-green-500",
    },
    {
        label: "Medium",
        value: "medium",
        icon: ArrowRightIcon,
        color: "text-yellow-500",
    },
    {
        label: "High",
        value: "high",
        icon: ArrowUpIcon,
        color: "text-red-500",
    },
];
