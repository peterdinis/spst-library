"use client";

import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import { ICookieAuthType } from "~/app/types/authTypes";

const useStudentCookie = (): {
  studentCookie: ICookieAuthType | null;
  isCookieLoaded: boolean;
} => {
  const [studentCookie, setStudentCookie] = useState<ICookieAuthType | null>(
    null
  );
  const [isCookieLoaded, setIsCookieLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchStudentCookie = () => {
      try {
        const cookieValue = Cookie.get("studentD");
        if (cookieValue) {
          const parsedCookie = JSON.parse(cookieValue) as ICookieAuthType;
          setStudentCookie(parsedCookie);
          setIsCookieLoaded(true);
        } else {
          setStudentCookie(null);
          setIsCookieLoaded(true);
        }
      } catch (error) {
        console.error("Error parsing student cookie:", error);
        setStudentCookie(null);
        setIsCookieLoaded(true);
      }
    };

    fetchStudentCookie();
    return () => {};
  }, []);

  return { studentCookie, isCookieLoaded };
};

export default useStudentCookie;