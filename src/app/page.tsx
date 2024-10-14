"use client";

import { useEffect, useState } from "react";
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import axios from "axios";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import { toast } from "sonner";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API_URL;

const Page = () => {
  const [text, setText] = useState("");
  const [totalWords, setTotalWords] = useState(0);
  const [isLimited, setIsLimited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");

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

  const handleSubmit = async () => {
    setIsLoading(true);
    setResult("");
    try {
      const formData = new FormData();
      formData.append("text", text);

      const res = await axios.post(BASE_API + "/generate/rangkumin", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status == 200) {
        setResult(res.data.body);
      } else if (res.status == 403) {
        toast.error("Request blocked due to safety concerns");
      } else if (res.status == 429) {
        toast.error("Too many requests. Please try again later.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center">
      <div className="w-11/12 sm:w-3/4 mx-auto justify-center items-center my-48">
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
          <Button
            isDisabled={isLimited}
            isLoading={isLoading}
            className=""
            onClick={handleSubmit}
          >
            Summarize
          </Button>
        </div>
        <div
          className={`sm:w-9/12 md:w-6/12 mx-auto bg-zinc-800/80 px-6 py-8 rounded-lg backdrop-blur-sm my-10 ${
            result ? "" : "hidden"
          }`}
        >
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
            className="prose prose-headings:text-gray-50 prose-strong:text-gray-50 prose-code:text-gray-50 text-gray-50"
          >
            {result}
          </Markdown>
        </div>
      </div>
    </div>
  );
};

export default Page;
