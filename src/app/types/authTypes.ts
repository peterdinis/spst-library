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

export enum Role {
	STUDENT,
	TEACHER,
	ADMIN,
}
