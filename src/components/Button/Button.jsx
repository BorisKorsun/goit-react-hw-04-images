import { LoadBtn } from './Button.styled';

const Button = ({ onBtnClick }) => {
    return (
        <LoadBtn type="button" onClick={onBtnClick}><p>Load More</p></LoadBtn>
    )
};

export default Button;