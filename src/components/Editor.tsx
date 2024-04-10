import { Button, Textarea } from "@chakra-ui/react";
import { Refresh, Send } from "@mui/icons-material";
import { useState } from "react";

type InputProps = {
    code: string,
    onChange: (arg0:string) => void
}

const Editor: React.FC<InputProps> = ({ code, onChange }) => {

    const [codeValue, setCodeValue] = useState<string>('')
    let handleInputChange = (e) => {
        let inputValue = e.target.value
        onChange(inputValue)
      }

    return (
        <div
            className="editor-container"
            style={{
                height: '100vh'
            }}
        >


            <Textarea
                // variant='filled'
                focusBorderColor='lightgrey'
                // value={codeValue}
                onChange={handleInputChange}
                style={{
                    height: '100%'
                }}
            />

        </div>
    );
}

export default Editor;