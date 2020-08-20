import React from "react";
import styled from "styled-components";
const Heading = styled.h3`
  color: var(--color-primary-dark);
  font-weight: 300;
  text-transform: uppercase;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  margin-top: 10px;
  color: white;
  @media ${props => props.theme.mediaQueries.medium} {
    font-size: 1.2rem;
  }
`;
const Video = ({ video }) => {
  
  return (
    <div>
      <div>
        {video && video.key && (
          <>
            <Heading>Trailer</Heading>
            <iframe
              title="movie"
              width="500"
              height="230"
              src={`https://www.youtube.com/embed/${video.key}`}
              frameBorder="0"
              allow="accelerometer; autoplay encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Video;
