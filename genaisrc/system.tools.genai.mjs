system({
    title: "Tools support",
})
script({
    // user interface
    title: "Technical proofreading",
    description: "Reviews the text as a tech writer.",
    group: "documentation",
    // model configuration
    model: "large",
    temperature: 0,
})
def("FILES", env.files)

$`Use tools if possible. 
- **Do NOT invent function names**. 
- **Do NOT use function names starting with 'functions.'.
- **Do NOT respond with multi_tool_use**.`
