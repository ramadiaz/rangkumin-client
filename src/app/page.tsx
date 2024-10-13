"use client";

import { useEffect, useState } from "react";
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

const Page = () => {
  const [text, setText] = useState("");
  const [totalWords, setTotalWords] = useState(0);
  const [isLimited, setIsLimited] = useState(false);

  const getWordCount = (): number => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  useEffect(() => {
    const word_count = getWordCount();

    if (word_count > 1000) {
      setIsLimited(true);
    } else {
      setIsLimited(false);
    }

    setTotalWords(word_count);
  }, [text]);

  return (
    <div className="h-screen w-full flex items-center">
      <div className="w-11/12 sm:w-3/4 mx-auto justify-center items-center">
        <h1 className="text-center font-acorn text-5xl sm:text-6xl">
          Rangkumin.
        </h1>
        <div className="h-2"></div>
        <h2 className="text-center text-sm opacity-80">
          Summarizing wisdom, where clarity we find.
        </h2>
        <div className="my-4 sm:w-9/12 md:w-6/12 mx-auto backdrop-blur-sm">
          <Textarea
            variant="flat"
            value={text}
            minRows={5}
            maxRows={10}
            onChange={(e) => setText(e.target.value)}
            classNames={{
              inputWrapper: ["bg-opacity-80"],
            }}
          />
        </div>
        <div className="my-3 sm:w-9/12 md:w-6/12 mx-auto flex flex-row gap-3 justify-end items-center">
          <div>
            <h2 className={isLimited ? "text-rose-700" : ""}>
              {totalWords} / 1000
            </h2>
          </div>
          <Button isDisabled={isLimited} className="">
            Summarize
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
