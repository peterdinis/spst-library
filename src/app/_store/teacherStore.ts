import { create } from "zustand";

interface ITeacherStoreData {
	role: string;
	email: string;
}

interface TeacherStore {
	teacher: any;
	getTeacher: () => void;
	setTeacher: (teacher: ITeacherStoreData) => void;
}

export const useTeacherStore = create<TeacherStore>((set) => ({
	teacher: null,
	getTeacher: () => {
		return set((state) => state.teacher);
	},
	setTeacher: (teacher) => {
		set(() => ({ teacher }));
	},
}));
