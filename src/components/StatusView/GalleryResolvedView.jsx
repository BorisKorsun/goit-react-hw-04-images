import { Gallery } from 'components/ImageGallery/ImageGallery.styled'
import Button from 'components/Button';
import Modal from 'components/Modal';
import ImageGalleryItem from 'components/ImageGallery/ImageGalleryItem';

export default function GalleryResolvedView (
    { state: { gallery, showModal, modalCard }, onCardClick, onBtnClick, onModalClose, query }
) {

    return (
        <>
        <Gallery>
            {gallery.map(({ id, webformatURL }) => {
                return (
                    <ImageGalleryItem
                    key={id}
                    url={webformatURL}
                    query={query}
                    id={id}
                    onClick={onCardClick}
                    />
                )
            })}
        </Gallery>
        {gallery.length > 0 && (
            <Button onBtnClick={onBtnClick}/>   
        )}   
        {showModal && 
        <Modal 
        tags={modalCard.tags} 
        url={modalCard.largeImageURL}
        onClose={onModalClose}
        />} 
        </>
    )
};