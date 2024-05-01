"use client"

import { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import { ICookieAuthType } from '~/app/types/authTypes';

const useAdminCookie = (): ICookieAuthType | null => {
    const [adminCookie, setAdminCookie] = useState<ICookieAuthType | null>(null);

    useEffect(() => {
        const fetchAdminCookie = () => {
            try {
                const cookieValue = Cookie.get('AdminD');
                if (cookieValue) {
                    const parsedCookie = JSON.parse(cookieValue) as ICookieAuthType;
                    setAdminCookie(parsedCookie);
                }
            } catch (error) {
                console.error('Error parsing Admin cookie:', error);
            }
        };

        fetchAdminCookie();

        return () => {
        };
    }, []);

    return adminCookie;
};

export default useAdminCookie;