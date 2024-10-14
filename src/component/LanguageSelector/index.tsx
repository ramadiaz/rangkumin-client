"use client";

import { Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react";

export const LanguageSelector = () => {
  const [selected, setSelected] = useState("EN");

  const handleChange = (lang: string) => {
    setSelected(lang);
    localStorage.setItem("lang", lang);
  };

  useEffect(() => {
    const lang = localStorage.getItem("lang");
    if (lang == "ID") {
      setSelected("ID");
    } else {
      setSelected("EN");
      localStorage.setItem("lang", "EN");
    }
  }, []);

  return (
    <div>
      <Tabs
        aria-label="Options"
        selectedKey={selected}
        size="sm"
        onSelectionChange={(e) => handleChange(e.toString())}
      >
        <Tab key="EN" title="EN"></Tab>
        <Tab key="ID" title="ID"></Tab>
      </Tabs>
    </div>
  );
};
