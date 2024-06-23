"use client";

import Cookie from "js-cookie";
import Link from "next/link";
import type { FC } from "react";
import { useToast } from "~/components/ui/use-toast";
import useAdminCookie from "~/hooks/useAdminCookie";
import useStudentCookie from "~/hooks/useStudentCookie";
import useTeacherCookie from "~/hooks/useTeacherCookie";
import MenuDropdown from "./MenuDropdown";
import ThemeButton from "./ThemeButton";

const NavigationItems: FC = () => {
	const studentCookie = useStudentCookie();
	const teacherCookie = useTeacherCookie();
	const adminCookie = useAdminCookie();

	const { toast } = useToast();
	return (
		<>
			<li className="text-xl dark:text-blue-50 text-black">
				<Link href="/">Domov</Link>
			</li>
			<li className="text-xl dark:text-blue-50 text-black">
				<Link href="/books">Knihy</Link>
			</li>
			<li className="text-xl dark:text-blue-50 text-black">
				<Link href="/categories">Kategórie</Link>
			</li>
			<li className="text-xl dark:text-blue-50 text-black">
				<Link href="/publishers">Vydavateľstvá</Link>
			</li>
			<li className="text-xl dark:text-blue-50 text-black">
				<Link href="/authors">Spisovatelia</Link>
			</li>

			{teacherCookie && (
				<li className="text-xl dark:text-blue-50 text-black">
					<MenuDropdown
						profileLink={"/teacher/profile"}
						logoutFn={() => {
							Cookie.remove("teacherD");
							window.location.replace("/teacher/login");
							toast({
								title: "Odhlásenie bolo úspešné",
								className: "bg-green-500 text-blue-50",
								duration: 2000,
							});
						}}
					/>
				</li>
			)}

			{studentCookie && (
				<li className="text-xl dark:text-blue-50 text-black">
					<MenuDropdown
						profileLink={"/student/profile"}
						logoutFn={() => {
							Cookie.remove("studentD");
							Cookie.remove("isStudentLogin");
							window.location.replace("/student/login");
							toast({
								title: "Odhlásenie bolo úspešné",
								className: "bg-green-500 text-blue-50",
								duration: 2000,
							});
						}}
					/>
				</li>
			)}

			{adminCookie && (
				<li className="text-xl dark:text-blue-50 text-black">
					<MenuDropdown
						profileLink={"/admin/profile"}
						logoutFn={() => {
							Cookie.remove("adminD");
							Cookie.remove("isAdminLogin");
							window.location.replace("/admin/login");
							toast({
								title: "Odhlásenie bolo úspešné",
								className: "bg-green-500 text-blue-50",
								duration: 2000,
							});
						}}
					/>
				</li>
			)}

			{!studentCookie && !teacherCookie && !adminCookie && (
				<>
					<li className="text-xl dark:text-blue-50 text-black">
						<Link href="/student/login">Žiak</Link>
					</li>
					<li className="text-xl dark:text-blue-50 text-black">
						<Link href="/teacher/login">Učiteľ</Link>
					</li>
				</>
			)}

			<li className="text-xl text-black">
				<ThemeButton />
			</li>
		</>
	);
};

export default NavigationItems;
