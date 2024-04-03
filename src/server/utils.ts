export const studentRedirects = {
	toLogin: "/student/login",
	toSignup: "/student/register",
	afterLogin: "/student/profile",
	afterLogout: "/student/login",
} as const;

export const teacherRedirects = {
	toLogin: "/teacher/login",
	toSignup: "/teacher/register",
	afterLogin: "/teacher/profile",
	afterLogout: "/teacher/login",
} as const;

export const adminRedirects = {
	toLogin: "/admin/login",
	toSignup: "/admin/register",
	afterLogin: "/admin/profile",
	afterLogout: "/admin/login",
} as const;