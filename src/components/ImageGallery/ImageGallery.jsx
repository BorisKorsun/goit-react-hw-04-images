import { useEffect, useState } from 'react';

import API from "API";
import GalleryPendingView from 'components/StatusView/GalleryPendingView';
import GalleryResolvedView from 'components/StatusView/GalleryResolvedView';
import GalleryRejectedView from 'components/StatusView/GalleryRejectedView';

const service = new API();

export default function ImageGallery({ query }) {
    const [gallery, setGallery] = useState([]);
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [modalCard, setmodalCard] = useState(null);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('idle');

    useEffect(() => { 
        if(query) {
            setStatus('pending');
            try {
                service.getQueryImages(query).then(({ data: { hits } }) => {
                    setGallery([...hits]);
                    setStatus('resolved');
                })
            } catch(error) {
                Promise.rejected(
                    new Error('Oopsie, something went wrong :( Try reload the page')
                );
                setError(error);
                setStatus('rejected');
            };
        }
    }, [query])

    useEffect(() => {
        setPage(1)
    }, [query])

    useEffect(() => {    
        if(page > 1) {
            setStatus('pending');
            try {
                service.getPageImages(page).then(({data: { hits }}) => {
                    setGallery(p => [...p, ...hits]);
                    setStatus('resolved')
                });
            } catch(error) {
                Promise.rejected(
                    new Error('Oopsie, something went wrong :( Try reload the page')
                );
                setError(error);
                setStatus('rejected');
            };
        };

    }, [page]);

    const toggleModal = () => {
        setShowModal(s => !s)
    };

    const handleBtnClick = () => {
        setPage(s => s + 1);
    };

    const handleCardClick = (e) => {
        const IMGid = Number(e.target.dataset.id);


        gallery.map((card) => {
            const { id } = card;
            if (id === IMGid) {
                setmodalCard(card)
                setShowModal(true)
            };
            return card
        })
    };

        if (status === "resolved") {
            return (
            <GalleryResolvedView
            gallery={gallery}
            showModal={showModal}
            modalCard={modalCard}
            query={query}
            onCardClick={handleCardClick}
            onBtnClick={handleBtnClick}
            onModalClose={toggleModal}
            />
            )
        };

        if (status === "pending") {
            return (
                <GalleryPendingView/>
            )
        };

        if (status === "rejected") {
            return (
                <GalleryRejectedView
                error={error}
                />
            )
        }
};