import { ProgressBar } from  'react-loader-spinner';
import { LoaderContainer } from './Loader.styled';

export default function Loader () {
    return (
        <LoaderContainer>
        <ProgressBar
            height="150"
            width="150"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor = '#3f51b5'
            barColor = '#3f51b5'
        />
        </LoaderContainer>
    );
};