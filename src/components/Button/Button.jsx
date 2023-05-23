import { LoadBtn } from './Button.styled';

export default function Button ({ onBtnClick }) {
    return (
        <LoadBtn type="button" onClick={onBtnClick}><p>Load More</p></LoadBtn>
    )
};