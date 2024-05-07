"use client"

import { FC } from "react";
import BorrowedBooks from "./BorrowedBooks";
import Settings from "./Settings";
import useStudentCookie from "~/hooks/useStudentCookie";
import { ICookieAuthType } from "~/app/types/authTypes";
import { Loader2 } from "lucide-react";

const ProfileWrapper: FC = () => {
  const studentCookie = useStudentCookie();

  if (!studentCookie) {
    return <Loader2 className="animate-spin w-8 h-8" />
  }

  console.log("Student cookie", studentCookie);
  return (
    <div className="grid md:grid-cols-2 md:gap-6 ml-4 mr-4">
      <div className="space-y-6">
        {studentCookie && (
          <Settings studentCookie={studentCookie as ICookieAuthType} />
        )}
      </div>
      <BorrowedBooks />
    </div>
  );
};

export default ProfileWrapper