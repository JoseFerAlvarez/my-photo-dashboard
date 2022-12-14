import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { saveAs } from 'file-saver';
import { useDispatch } from 'react-redux';
import { addNewPhoto, deletePhoto, editPhotoDescription } from '../features/favourites/favouritesSlice';

import { IconButton, Modal, TextField, Tooltip } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import CloseIcon from '@mui/icons-material/Close';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import '../styles/_photo.scss';
import '../styles/_photo-saved.scss';


const Photo = (props) => {
    const dispatch = useDispatch();

    const [description, setDescription] = useState(props.description || "");
    const [modal, setModal] = useState(false);

    const openModal = () => {
        setModal(!modal);
    }

    const addPhotoStorage = () => {
        dispatch(addNewPhoto({
            id: props.id,
            description: props.description,
            urlfull: props.urlfull,
            urlregular: props.urlregular,
            urlthumb: props.urlthumb,
            likes: props.likes,
            width: props.width,
            height: props.height,
            date: getActualDate()
        }));

    }

    const deleteImage = () => {
        dispatch(deletePhoto(props.id));
    }

    const getActualDate = () => {
        const date = new Date();
        const day = date.toLocaleDateString();
        const time = date.toLocaleTimeString();
        return `${day}, ${time}`;
    }

    const saveFile = () => {
        saveAs(props.urlfull, `${props.id}.jpg`);
    }

    const editDescription = () => {
        dispatch(editPhotoDescription({
            id: props.id,
            description: description
        }));

        openModal(!modal);
    };

    if (!props.date) {
        return (
            <div className="card">
                <img className='card__img' src={props.urlregular} alt="" />
                <div className='img__likes'>
                    <FavoriteBorderIcon className='likes__icon' />
                    <p className='likes__num'>{props.likes}</p>
                </div>
                <p className='img__size'>{`${props.width} x ${props.height}`}</p>
                <IconButton className='img__add' onClick={addPhotoStorage} >
                    <AddCircleOutlineIcon className='img__add__icon' />
                </IconButton>
            </div>
        );
    } else {
        return (
            <div className="card-saved">
                <img className='card__img-saved' src={props.urlregular} alt="" />
                <div className='card__data-saved'>
                    <div className='card__info'>
                        <div className='card__info-saved'>
                            <p className='card__date-saved'>{props.date}</p>
                            <p className='card__size-saved'>{`${props.width} x ${props.height}`}</p>
                        </div>
                        <div className='card__likes-saved'>
                            <FavoriteBorderIcon className='likes__icon-saved' />
                            <p className='likes__num-saved'>{props.likes}</p>
                        </div>
                    </div>
                    <p className='card__description-saved'>{props.description}</p>
                </div>
                <div className='card__buttons'>
                    <Tooltip title="Edit description" arrow>
                        <IconButton onClick={openModal}>
                            <ModeEditIcon className='card__icon' />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Download" arrow>
                        <IconButton onClick={saveFile} >
                            <DownloadForOfflineIcon className='card__icon' />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" arrow>
                        <IconButton onClick={deleteImage} >
                            <HighlightOffIcon className='card__icon' />
                        </IconButton>
                    </Tooltip>
                </div>

                <Modal className="modal"
                    open={modal}
                    onClose={openModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <div className='modal__container'>
                        <p className='modal__text'>Change the description of the photo:</p>
                        <TextField className='modal__input' value={description} onChange={e => setDescription(e.target.value)} />
                        <button className='button' onClick={editDescription}>Save changes</button>
                        <IconButton onClick={openModal} className='modal__close'><CloseIcon /></IconButton>
                    </div>
                </Modal>
            </div>
        );
    };
}

Photo.propTypes = {
    id: PropTypes.string,
    description: PropTypes.string,
    urlfull: PropTypes.string,
    urlregular: PropTypes.string,
    urlthumb: PropTypes.string,
    likes: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    date: PropTypes.string
}

export default Photo;
