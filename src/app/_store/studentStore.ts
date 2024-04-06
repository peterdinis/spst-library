import { create } from "zustand";

interface StudentStore {
	student: any;
	getStudent: () => void;
	setStudent: (student: unknown) => void;
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
