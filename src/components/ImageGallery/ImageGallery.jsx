import React, { Component } from 'react';

import API from "API";
import GalleryPendingView from 'components/StatusView/GalleryPendingView';
import GalleryResolvedView from 'components/StatusView/GalleryResolvedView';
import GalleryRejectedView from 'components/StatusView/GalleryRejectedView';

const service = new API();

class ImageGallery extends Component {
    state = {
        gallery: [],
        page: 1,
        showModal: false,
        modalCard: null,
        error: null,
        status: 'idle',
    };

    componentDidUpdate(prevProps, prevState) {
        const prevQuery  = prevProps.query;
        const query = this.props.query;

        const prevPage = prevState.page;
        const page = this.state.page;

        if (prevQuery !== query) {
            this.setState({status: "pending" })

            try {
                service.getQueryImages(query).then(({ data: { hits } }) => {
                    this.setState({
                        gallery: [...hits],
                        status: "resolved",
                    })
                })
            } catch(error) {
                Promise.rejected(
                    new Error('Oopsie, something went wrong :( Try reload the page')
                )
                this.setState({
                    error,
                    status: "rejected",
                });
            };
        };

        if (page  > prevPage) {
            this.setState({status: "pending" })

            try {
                service.getPageImages(page).then(({data: { hits }}) => {
                    return this.setState(({ gallery }) => {
                        return {
                            gallery: [...gallery, ...hits],
                            status: "resolved"
                        }
                    });
                });
            } catch(error) {
                Promise.rejected(
                    new Error('Oopsie, something went wrong :( Try reload the page')
                )
                this.setState({
                    error,
                    status: "rejected",
                });
            }
        };
    };

    toggleModal = () => {
        this.setState(({ showModal }) => {
            return {
                showModal: !showModal,
            };
        });
    };

    handleBtnClick = () => {
        this.setState(({ page }) => {
            return {
                page: page + 1,
            };
        })
    };

    handleCardClick = (e) => {
        const { gallery } = this.state
        const IMGid = Number(e.target.dataset.id);


        gallery.map((card) => {
            const { id } = card;
            if (id === IMGid) {
                this.setState({
                    modalCard: card,
                    showModal: true,
                })
            };
            return card
        })
    };

    render() {
        const { status, error } = this.state;
        const { query } = this.props

        if (status === "resolved") {
            return (
            <GalleryResolvedView
            state={this.state}
            query={query}
            onCardClick={this.handleCardClick}
            onBtnClick={this.handleBtnClick}
            onModalClose={this.toggleModal}
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
    }
};

export default ImageGallery;