"use client";

import { FC, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAdminCookie from "~/hooks/useAdminCookie";
import useTeacherCookie from "~/hooks/useTeacherCookie";

interface IAuthWrapperProps {
    children?: ReactNode;
}

const AuthWrapper: FC<IAuthWrapperProps> = ({children}: IAuthWrapperProps) => {
    const admin = useAdminCookie();
    const teacher = useTeacherCookie();
    const router = useRouter();

    useEffect(() => {
        if (!admin || !teacher) {
            router.push("/not-allowed");
        }
    }, [admin, teacher, router]);

    if (!admin || !teacher) {
        return null;
    }

    return (
        <>
            {children}
        </>
    );
}

export default AuthWrapper;