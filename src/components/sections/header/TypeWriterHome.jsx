import TypewriterTitle from "@/components/kokonutui/type-writer";

import { useMemo } from "preact/hooks";
import { useTranslation } from "react-i18next";

const words = [
    {
        text: "Full-Stack Developer and AI Integrator",
        deleteAfter: true
    },
    {
        text: "Backend Developer (Node.js, PHP)",
        deleteAfter: true
    },
    {
        text: "Database Architect (MongoDB, MySQL)",
        deleteAfter: true
    },
    {
        text: "Frontend Developer (React, Vue)",
        deleteAfter: true
    },
    {
        text: "Full Stack Web Developer",
        deleteAfter: false
    }
]
const TypeWriterHome = () => {
    const { t, i18n } = useTranslation();
    const sequences = useMemo(() => words.map((word) => ({ ...word, text: t(word.text) })), [t]);
    return <TypewriterTitle key={i18n.resolvedLanguage} sequences={sequences} />;
}

export default TypeWriterHome