"use client";

import { format } from "date-fns";
import { Ghost, Loader2 } from "lucide-react";
import { type FC, useState } from "react";
import { limit } from "~/app/_constants/app-constants";
import type { IBorrowedBookingTypes } from "~/app/types/bookingTypes";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import useStudentCookie from "~/hooks/useStudentCookie";
import { api } from "~/trpc/react";
import ReturnBookingModal from "../../booking/ReturnBookingModal";
import GlobalErrorComponent from "../../shared/GlobalErrorComponent";
import GlobalPagination from "../../shared/GlobalPagination";

const BorrowedBooks: FC = () => {
    const [page, setPage] = useState(0);
    const studentCookie = useStudentCookie();

    const {
        data: paginatedData,
        fetchNextPage,
        isFetchingNextPage,
        isLoading: paginatedLoading,
        isError: paginatedError,
    } = api.booking.paginatedBoooking.useInfiniteQuery(
        {
            limit,
            userEmail: studentCookie?.email ?? "", // Using optional chaining and nullish coalescing operator
        },
        {
            getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined, // Using optional chaining and nullish coalescing operator
        }
    );

    if (isFetchingNextPage || paginatedLoading) {
        return <Loader2 className="h-8 w-8 animate-spin" />;
    }

    if (paginatedError) {
        return (
            <GlobalErrorComponent
                message="Nepodarilo sa načítať požičané knihy"
                statusCode="404"
                linkHref="/student/profile"
                linkText="Načítať znova"
            />
        );
    }

    const toShow = paginatedData?.pages[page]?.items ?? [];
    const nextCursor = paginatedData?.pages[page]?.nextCursor;

    const handleFetchNextPage = async () => {
        await fetchNextPage();
        setPage((prev) => prev + 1);
    };

    const handleFetchPreviousPage = () => {
        setPage((prev) => prev - 1);
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <h2 className="text-xl font-bold">Moje požičané knihy</h2>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        {toShow?.length === 0 && (
                            <div className="flex justify-center align-top mt-5 p-2 ml-4 text-black dark:text-blue-50 prose tex-xl">
                                <Ghost className="animate-bounce w-8 h-8" />{" "}
                                Žiadne knihy neboli požičané
                            </div>
                        )}
                        {!paginatedLoading &&
                            toShow?.map((item: IBorrowedBookingTypes) => (
                                <div
                                    key={item.id as React.Key}
                                    className="flex items-center space-x-4"
                                >
                                    <div className="grid gap-1.5">
                                        <h3 className="text-lg font-bold">
                                            {item.bookName}
                                        </h3>
                                        <p className="text-sm font-medium leading-none">
                                            Od:{" "}
                                            {format(
                                                item.from,
                                                "dd-MM-yyyy"
                                            )}
                                        </p>
                                        <p className="text-sm font-medium leading-none">
                                            Do:{" "}
                                            {format(
                                                item.to,
                                                "dd-MM-yyyy"
                                            )}
                                        </p>
                                    </div>
                                    <Button
                                        size={"lg"}
                                        className="ml-5"
                                        variant={"default"}
                                    >
                                        <ReturnBookingModal />
                                    </Button>
                                </div>
                            ))}
                        <GlobalPagination
                            handleFetchNextPage={handleFetchNextPage}
                            page={page}
                            nextCursor={nextCursor as unknown as number} // Using optional chaining and nullish coalescing operator
                            handleFetchPreviousPage={handleFetchPreviousPage}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default BorrowedBooks;