import { create } from "zustand";

interface TeacherStore {
	teacher: any;
	getTeacher: () => void;
	setTeacher: (teacher: unknown) => void;
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
