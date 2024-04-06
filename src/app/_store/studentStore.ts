import { create } from "zustand";

interface IStudentStoreData {
	role: string;
	email: string;
}

interface StudentStore {
	student: any;
	getStudent: () => void;
	setStudent: (student: IStudentStoreData) => void;
}

export const useStudentStore = create<StudentStore>((set) => ({
	student: null,
	getStudent: () => {
		return set((state) => state.student);
	},
	setStudent: (student) => {
		set(() => ({ student }));
	},
}));
