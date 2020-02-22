import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Watch } from './WatchPage';


export const WatchModal = () => {
    let history = useHistory()
    let { id } = useParams()
    const [scroll, setScroll] = useState<number>(0)
    if(!id) return null
    let back = (e:any) => {
        e.stopPropagation();
        history.goBack();
    };


    return(
        <div onClick={back}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                background: "rgba(0, 0, 0, 0.3)"
            }}
        >
            <div className="modal"
                style={{
                    position: "fixed",
                    top: 80,
                    left: 0,
                    right: 0,
                    minWidth: 640,
                    maxWidth: 860,
                    maxHeight: 640,
                    overflow: "auto",
                    width: "90%",
                    margin: "auto",
                    padding: 15,
                    background: "rgba(255, 255, 255, 1)"
                }}
                onClick={(e)=>e.stopPropagation()}
            >
                <Watch youtubeID={id} tagType={"movie"}/>
            </div>
        </div>
    )
}