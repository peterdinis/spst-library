import { FC } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { CardDescription, CardHeader, CardFooter } from "~/components/ui/card";
import { IGlobalCardProps } from "~/app/types/sharedTypes";
import LazyLoad from "react-lazyload";

const GlobalCard: FC<IGlobalCardProps> = ({
  name,
  description,
  id,
  linkName,
  image,
}) => {
  return (
    <LazyLoad height={500} once>
      <div className="ml-4">
        {image ? (
          <>
            <img
              src={image}
              alt={name}
              className="h-80 w-72 rounded-t-xl object-cover"
            />
          </>
        ) : (
          <></>
        )}
        <div className="z-50 w-72 px-4 py-3">
          <CardHeader className="mr-3 text-lg font-bold uppercase text-gray-400">
            {name}
          </CardHeader>
          {!description ? (
            <></>
          ) : (
            <CardDescription className="block dark:text-blue-50 truncate text-sm font-bold capitalize text-black">
              {description}
            </CardDescription>
          )}
          <CardFooter>
            <div className="flex items-center p-4">
              <Button variant={"default"} size={"lg"}>
                <Link href={`/${linkName}/${id}`}>Detail</Link>
              </Button>
            </div>
          </CardFooter>
        </div>
      </div>
    </LazyLoad>
  );
};

export default GlobalCard;
