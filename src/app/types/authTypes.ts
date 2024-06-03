export interface IProfileData {
	createdAt: string | Date;
	email: string;
	id: string;
	isActive: boolean;
	lastName: string;
	isStudent: boolean;
	password: string;
	name: string;
	updatedAt: string | Date;
}

export interface IRegisterType {
	name: string;
	lastName: string;
	email: string;
	password: string;
	isActive: boolean;
	hasAdminRights: boolean;
	role: string;
}

export type ILoginType = Pick<
	IRegisterType,
	"name" | "lastName" | "email" | "password"
>;

export interface ICookieAuthType {
	name: string;
	lastName: string;
	email: string;
	password: string;
	isActive: boolean;
	hasAdminRights: boolean;
	role: string;
}