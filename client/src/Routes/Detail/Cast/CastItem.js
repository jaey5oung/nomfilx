import React from "react";
import styled from "styled-components";

import { IMAGE_BASE_URL } from "../../../Components/Config";

const MovieImg = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  object-fit: cover;
  background-color: transparent;
  transition: all 100ms cubic-bezier(0.645, 0.045, 0.355, 1);
  padding: 9px;
`;
const Name = styled.span`
  font-weight: 200;
  text-align: center;
  display: block;
  margin-bottom: 3px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const Box = styled.div`
  color: inherit;
  text-decoration: none;
  font: inherit;
  margin-right: 30px;
`;
const CastItem = ({ person }) => {
  return (
    <Box>
      <MovieImg
        src={
          person.profile_path !== null
            ? `${IMAGE_BASE_URL}w185${person.profile_path}`
            : "https://www.eeweb.com/assets/themes/mobile/images/user.png"
        }
      />
      <Name>
        {person.name.length > 12
          ? `${person.name.substring(0, 8)}...`
          : person.name}
      </Name>
    </Box>
  );
};

export default CastItem;
