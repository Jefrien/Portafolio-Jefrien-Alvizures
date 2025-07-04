import TypewriterTitle from "@/components/kokonutui/type-writer";

const words = [
    {
        text: "Frontend Developer (React, Vue)",
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
        text: "AI Integrator (ChatGPT, LangChain)",
        deleteAfter: true
    },
    {
        text: "Full Stack Web Developer",
        deleteAfter: false
    }
]
const TypeWriterHome = () => {
  return <TypewriterTitle sequences={words} />
}

export default TypeWriterHome