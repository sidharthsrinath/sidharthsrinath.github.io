type InputProps = {
    initalValue: number
    setDisappearingReactionProperty: (number) => void
}
const disappear = ({ value, setDisappearingReactionProperty }) => {
    for (let i = 1; i <= 10; i++) {
        setTimeout(() => {
            setDisappearingReactionProperty(value - i * 0.1); // Decrease by 0.1 each step
        }, i * 100); 
    }

};



export default disappear
