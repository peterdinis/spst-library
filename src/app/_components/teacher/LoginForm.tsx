"use client";

import { useMutation } from "@tanstack/react-query";
import axios, { type AxiosResponse } from "axios";
import { setCookie } from "cookies-next";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState, type FC } from "react";
import { useForm, type FieldValues, type FieldError, type Merge, type FieldErrorsImpl } from "react-hook-form";
import { urlCheck } from "~/app/_constants/api";
import type { ILoginType } from "~/app/types/authTypes";
import { useToast } from "~/components/ui/use-toast";
import Header from "../shared/Header";

interface LoginResponseData {
    user: {
        name: string;
        lastName: string;
        email: string;
    };
    token: string;
}

type LoginResponse = AxiosResponse<LoginResponseData>;

const LoginForm: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>();
    const [showPassword, setShowPassword] = useState(false);
    const { toast } = useToast();

    const loginTeacherMut = useMutation<LoginResponse, unknown, ILoginType>({
        mutationKey: ["loginTeacher"],
        mutationFn: async (data: ILoginType) => {
            return await axios.post<LoginResponseData>(urlCheck + "auth/login", data);
        },
        onSuccess: (data) => {
            const user = data.data.user;
            setCookie("teacherD", JSON.stringify(user));
            setCookie("isTeacherLogin", "true");
            toast({
                title: "Prihlásenie bolo úspešné",
                duration: 2000,
                className: "bg-green-500 text-white",
            });
            window.location.replace("/teacher/profile");
        },
        onError: () => {
            toast({
                title: "Prihlásenie nebolo úspešné",
                duration: 2000,
                className: "bg-red-500 text-white",
            });
        },
    });

    const onStudentSubmit = async (data: FieldValues) => {
        await loginTeacherMut.mutateAsync({
            name: data.name as string,
            lastName: data.lastName as string,
            email: data.email as string,
            password: data.password as string,
        });
    };

    const renderError = (error: FieldError | Merge<FieldError, FieldErrorsImpl<FieldValues>> | undefined): string | null => {
        if (!error) return null;
        if (typeof error === 'string') return error;
        return null;
    };

    return (
        <>
            <Header text="Prihlásenie učiteľ" />
            <form onSubmit={handleSubmit(onStudentSubmit)}>
                <div className="mb-4 flex flex-col rounded mt-6 bg-white dark:bg-card px-8 pb-8 pt-6 shadow-md">
                    <div className="mb-4">
                        <div className="mb-2">
                            <label
                                className="text-grey-darker mb-2 block text-sm font-bold"
                                htmlFor="name"
                            >
                                Meno
                            </label>
                            <input
                                className="passwordInput border-red text-grey-darker mb-3 w-full appearance-none rounded border px-3 py-2 dark:text-black shadow"
                                id="name"
                                type="text"
                                placeholder="Meno"
                                {...register("name", {
                                    required: true,
                                    minLength: 5,
                                })}
                            />
                            {errors.name && (
                                <span className="text-red-500">
                                    {renderError(errors.name)}
                                </span>
                            )}
                        </div>
                        <div className="mb-2">
                            <label
                                className="text-grey-darker mb-2 block text-sm font-bold"
                                htmlFor="lastName"
                            >
                                Priezvisko
                            </label>
                            <input
                                className="passwordInput border-red text-grey-darker mb-3 w-full appearance-none rounded border px-3 py-2 dark:text-black shadow"
                                id="lastName"
                                type="text"
                                {...register("lastName", {
                                    required: true,
                                    minLength: 5,
                                })}
                                placeholder="Priezvisko"
                            />
                            {errors.lastName && (
                                <span className="text-red-500">
                                    {renderError(errors.lastName)}
                                </span>
                            )}
                        </div>
                        <div className="mb-2">
                            <label
                                className="text-grey-darker mb-2 block text-sm font-bold"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                className="passwordInput border-red text-grey-darker mb-3 w-full appearance-none rounded border px-3 py-2 dark:text-black shadow"
                                id="email"
                                type="email"
                                {...register("email", {
                                    required: true,
                                    minLength: 5,
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Zlý formát emailu",
                                    },
                                })}
                                placeholder="Email"
                            />
                            {errors.email && (
                                <span className="text-red-500">
                                    {renderError(errors.email)}
                                </span>
                            )}
                        </div>

                        <div className="mb-2">
                            <label
                                className="text-grey-darker mb-2 block text-sm font-bold"
                                htmlFor="password"
                            >
                                Heslo
                            </label>
                            <div className="relative">
                                <input
                                    className="passwordInput border-red text-grey-darker mb-3 w-full appearance-none rounded border px-3 py-2 dark:text-black shadow"
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    {...register("password", {
                                        required: true,
                                        minLength: 5,
                                    })}
                                    autoFocus
                                    autoComplete="current-password"
                                    placeholder="********************************************"
                                />
                                {errors.password && (
                                    <span className="text-red-500">
                                        {renderError(errors.password)}
                                    </span>
                                )}
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center px-4 bg-transparent text-gray-500 focus:outline-none"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <Eye /> : <EyeOff />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <button
                                className="mt-4 rounded-lg bg-red-700 p-2 text-white"
                                type="submit"
                            >
                                Prihlásenie
                            </button>
                            <div>
                                <Link
                                    className="text-blue hover:text-blue-darker mt-4 inline-block align-baseline text-2xl font-bold"
                                    href="/teacher/register"
                                >
                                    Registrácia
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default LoginForm;