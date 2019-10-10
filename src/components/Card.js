import React from 'react';
import Image from './Image'
import Paragraph from './Paragraph'
import Tag from './Tag'
import Title from './Title'

export default props => {
    const { episode, addAction, isFavourite } = props;

    return (
        <div className="card border-0 col-sm-12 col-md-4 mb-5 position-relative" key={'card-' + episode.id}>
            {episode.image &&
                <Image src={episode.image.medium} alt={'cover'} key={'image-' + episode.id} />
            }

            <div className="d-flex align-items-center justify-content-between py-4">
                <Title text={episode.name} key={'title-' + episode.id} />

                <button onClick={() => addAction(episode.id)} className="btn border-0 bg-transparent p-0 btn-favourites d-flex align-items-center justify-content-center">
                    <img
                        src={isFavourite ? "./assets/star-fill-icon.svg" : "./assets/star-icon.svg"}
                        alt=""
                    />
                </button>
            </div>

            <Paragraph description={episode.summary} key={'paragraph-' + episode.id} />

            <div className="d-flex align-items-center">
                <Tag text={'Season: ' + episode.season} key={'tag-' + episode.id} />
            </div>
        </div>
    )
}

