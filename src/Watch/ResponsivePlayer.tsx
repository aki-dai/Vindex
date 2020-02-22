import React from 'react'
import ReactPlayer from 'react-player'
import styled from 'styled-components'

interface PlayerProps{
    url:string

}

export const ResponsivePlayer: React.FC<PlayerProps> = ({url}) =>{
    const Wrapper = styled.div`
        position: relative;
        width: 100%;
        padding-top: 56.25%;
    `

    const Iframe = styled.iframe`
        position: absolute;
        top: 0;
        left: 0;
        width: 100% !important;
        height: 100% !important;
    `

    return(
        <Wrapper>
            <Iframe src={url} allow="autoplay; encrypted-media"></Iframe>
        </Wrapper>
    )
}