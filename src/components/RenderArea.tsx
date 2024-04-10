import { Interweave } from "interweave";

type InputProps = {
    code: string
}
const RenderArea: React.FC<InputProps> = ({code}) => {
    return(
        <Interweave content={code} />
    );
}

export default RenderArea;