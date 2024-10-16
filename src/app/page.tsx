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
import { LanguageSelector } from "@/component/LanguageSelector";
import CopyIcon from "@/component/Icons/CopyIcon";
import MoonStars from "@/component/Icons/MoonStars";
import AboutButton from "@/component/AboutButton";

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

    const current_lang = localStorage.getItem("lang") || "EN";

    try {
      const formData = new FormData();
      formData.append("text", text);
      formData.append("lang", current_lang);

      const res = await axios.post(BASE_API + "/generate/rangkumin", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Cache-Control": "no-store",
          Pragma: "no-cache",
        },
      });

      if (res.status == 200) {
        setResult(res.data.body);
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const status = err.response.status;

        if (status === 403) {
          toast.warning("Request blocked due to safety concerns");
        } else if (status === 429) {
          toast.warning("Too many requests. Please try again later.");
        } else {
          toast.error(err.response.data?.message || "An error occurred.");
        }
      } else {
        console.error("Unexpected error:", err);
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    toast("Copied result");
  };

  return (
    <div className="min-h-screen w-full flex items-center relative">
      <div className="absolute top-4 right-4">
        <AboutButton/>
      </div>
      <div className="w-11/12 sm:w-3/4 mx-auto justify-center items-center my-48">
        <h1 className="text-center font-acorn text-5xl sm:text-6xl text-[#f9fafb]">
          Rangkumin.
        </h1>
        <div className="h-2"></div>
        <h2 className="text-center text-sm opacity-80 text-[#f9fafb]">
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
          <LanguageSelector />
          <Button
            isDisabled={isLimited || text == ""}
            isLoading={isLoading}
            className=""
            onClick={handleSubmit}
            endContent={<MoonStars size={18} color="#fcd34d" />}
          >
            Summarize
          </Button>
        </div>
        <div
          className={`sm:w-9/12 md:w-6/12 mx-auto bg-zinc-800/80 px-6 py-8 rounded-lg backdrop-blur-sm my-10 relative ${
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
          <Button
            isIconOnly
            size="sm"
            className="absolute -right-2 -top-2 shadow-lg shadow-black"
            onClick={handleCopy}
          >
            <CopyIcon size={24} color={"#f9fafb"} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
