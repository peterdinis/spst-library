"use client";

import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import schollImage from "../../../../public/img/main.png";
import { Button } from "~/components/ui/button";
import { motion } from "framer-motion";

const Hero: FC = () => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      className="container relative z-0 mx-auto px-4 xl:px-0"
    >
      <div className="flex flex-col-reverse md:flex-row">
        <div className="md:w-3/5 md:pt-24 lg:py-32">
          <h1 className="text-heading-color dark:text-blue-50  text-center text-3xl font-black leading-tight tracking-tighter text-gray-900 md:w-7/12 md:text-left lg:text-6xl xl:text-8xl">
            SPŠT Knižnica
          </h1>
          <h2 className="py-4 text-center text-lg dark:text-blue-50  text-gray-700 md:w-8/12 md:py-8 md:text-left lg:text-2xl">
            <q>Knihy sú jedinečne prenosné kúzlo - Stephen King</q>
          </h2>
          <div className="flex justify-center sm:block md:block">
            <Button size="default" variant={"default"}>
              <Link href="/books">Zobraziť všekty knihy</Link>
            </Button>
            <Button className="ml-4" size="default" variant={"destructive"}>
              <Link href="/books">Školská stránka</Link>
            </Button>
          </div>
        </div>
        <div className="m-auto flex h-64 items-center overflow-hidden sm:w-2/5 md:h-auto">
          <Image
            src={schollImage}
            alt="Scholl homepage"
            className="rounded-xl bg-transparent md:absolute md:-ml-28 md:w-1/2"
            placeholder="blur"
            width={1200}
            height={1200}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
