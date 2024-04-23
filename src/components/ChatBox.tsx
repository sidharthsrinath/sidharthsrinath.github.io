import { useState, useRef, useEffect } from "react";
import './ChatBox.css'
const ChatBox = () => {
    const [text, setText] = useState("") // Text currently being entered
    const [history, setHistory] = useState([]) // Command history
    const endOfMessagesRef = useRef(null) // Ref to scroll into view
    const historyAreaRef = useRef(null) //ref to reset history
    const [cursorPos, setCursorPos] = useState(20)

    const funcs = { //functions of the cli
        'linkedin': () => {
            window.open('https://www.linkedin.com/in/sidharthsrinath', '_blank')
            return "Linkedin opened in new tab: 'https://www.linkedin.com/in/sidharthsrinath'"
        },
        'github': () => {
            window.open('https://www.github.com/ssrinath22', '_blank')
            return "Github opened in new tab: 'https://www.github.com/ssrinath22/'"
        },
        'man': () => {
            const ret = "available commands: \n " + Object.keys(funcs).map((item) => ' ' + item)
            return ret
        },
        'whoareyou': () => {
            return "I am Sidharth Srinath...or am i???"
        }
    }

    const handleInputChange = (event) => {
        setText(event.target.value) 
    }

    const updateCursorPosition = () => {
        const charWidth = 9.65;  // Average character width in pixels for monospace fonts
        const lines = text.split('\n');
        const numberOfLines = lines.length;
        const lastLineLength = lines[numberOfLines - 1].length;

        setCursorPos(lastLineLength * charWidth + 29.65);
    }


    const handleKeyDown = (event) => {
        if (event.key === "ArrowUp") {
            console.log('working')
            event.preventDefault()
            setText(history[history.length - 1]?.command)
        }
        else if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault()
            setCursorPos(20)
            executeCommand()
        } else if (event.key === "a" && event.metaKey) {
            event.preventDefault()
        }
        else{
            handleInputChange(event)
        }
    }

    const handleClear = () => {
        setHistory([])
        setText('')
        setCursorPos(20)
    }

    const executeCommand = () => {
        const trimmedText = text.trim()

        if (trimmedText === "") return

        var response
        if (trimmedText in funcs) {
            console.log(funcs[trimmedText])
            response = funcs[trimmedText]()
        } else if (trimmedText === 'clear') {
            handleClear()
            return
        } else response = `${trimmedText} is not a recognized command`


        const newHistory = [...history,
        {
            command: trimmedText,
            result: response
        }]
        setHistory(newHistory)
        setText("")
        scrollToBottom()
    };

    const scrollToBottom = () => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    // Automatically scroll to the bottom on history update
    useEffect(() => {
        if(history.length) scrollToBottom();
    }, [history]);

    return (
        <div
            style={{
                width: 'inherit',
                height: 'inherit',
                // backgroundColor: '#31363F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div style={{
                width: '80%',
                height: '70%',
                backgroundColor: '#3D3B40',
                color: '#FAF6F0',
                fontFamily: 'monospace',
                fontSize: '16px',
                padding: '10px',
                border: '1px solid #EEEEEE',
                borderRadius: '5px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div
                    ref={historyAreaRef}
                    style={{
                        flex: 1,
                        overflowY: 'auto',
                        marginBottom: '10px'
                    }}
                >
                    {history.map((item, index) => (
                        // (item.result) && 
                        <div
                            key={index}
                            style={{
                                marginBottom: '5px'
                            }}
                        >
                            <span
                                style={{
                                    color: '#64CCC5'
                                }}
                            >
                                {">> "}
                            </span>
                            <span
                                style={{
                                }}
                            >
                                {item.command}
                            </span>
                            <div
                                style={{
                                    color: (item.result.includes('is not a recognized command')) ? '#F05941' : '#F7E987'
                                }}
                            >
                                {item.result}
                            </div>
                        </div>
                    ))}
                    <div
                        style={{
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                    >
                        <span
                            style={{
                                zIndex: 0,
                                color: '#64CCC5',
                                marginRight: '2px',
                            }}
                        >
                            $:
                        </span>
                        <textarea
                            value={text}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            style={{
                                zIndex: 0,
                                caretColor: '#64CCC5',
                                caret:'ThreeDHighlight',
                                backgroundColor: 'transparent',
                                border: 'none',
                                outline: 'none',
                                width: '95%',
                                height: '25px',
                                resize: 'none',
                                overflow: 'hidden',
                            }}
                        />
                        {/** Custom cursor not working */}
                        {/* <div
                            className="blink_me"
                            style={{
                                height: '20px',
                                zIndex: 10000,
                                position: 'absolute',
                                top: 0,
                                left: cursorPos,
                                width: '1px',
                                border: '3px solid white',
                            }}
                        /> */}
                    </div>
                    <div ref={endOfMessagesRef} />
                </div>
            </div>
        </div>
    );
};

export default ChatBox;

