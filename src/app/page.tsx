"use client";

import { useEffect, useState } from "react";
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import { toast } from "sonner";
import { LanguageSelector } from "@/component/LanguageSelector";

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

      const res = await fetch(BASE_API + "/generate/rangkumin", {
        method: "POST",
        cache: "no-store",
        body: formData,
      });

      if (res.status == 200) {
        const data = await res.json();
        setResult(data.body);
      } else if (res.status === 403) {
        toast.warning("Request blocked due to safety concerns");
      } else if (res.status === 429) {
        toast.warning("Too many requests. Please try again later.");
      } else {
        const data = await res.json();
        toast.error(data.error || "An error occurred.");
      }
    } catch (err) {
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
          <LanguageSelector />
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
            {`## Damar Canggih Wicaksono, Dono Warkop's Son, Meets Indro Warkop\n\nThis article highlights the recent meeting between Damar Canggih Wicaksono, the son of the late comedian Dono Warkop DKI, and Indro Warkop DKI. \n\nDamar and his wife visited Indro at his home, sparking a lot of attention from the public. \n\nMany people commented on Damar's resemblance to his father, Dono, especially in his younger years. \n\nDamar's academic background, which includes a degree in Nuclear Engineering from Universitas Gadjah Mada (UGM) and a master's and doctorate from École polytechnique fédérale de Lausanne (EPFL), was also widely praised. \n\nDamar is fluent in German and English and has worked as a postdoctoral researcher in various institutions, including ETH Zurich and Helmholtz-Zentrum Dresden-Rossendorf (HZDR). \n`}
          </Markdown>
        </div>
      </div>
    </div>
  );
};

export default Page;
