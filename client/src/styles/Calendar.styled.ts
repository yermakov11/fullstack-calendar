import styled from "styled-components";

interface StyledEventProps {
  bgColor: string;
}
interface SevenColGridProps {
  fullheight?: string | undefined;
  is28Days?: boolean;
}
export const Wrapper = styled.div`
  border: 1px solid;
  height: 95vh;
  .searchBar {
    padding: 8px 12px;
    font-size: 14px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

export const DayContainer = styled.div`
  min-height: 100px;
  padding: 12px 8px 8px 8px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: rgba(42, 48, 52, 0.68);
  position: relative;
  transition: all 0.2s ease;
  color: white;

  .holiday {
    color: #ff9c9c;
  }

  &.today::before {
    content: "Today";
    position: absolute;
    top: -1px;
    left: 50%;
    transform: translateX(-50%);
    background: #ff3b3b;
    color: white;
    font-size: 16px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 12px;
    letter-spacing: 0.5px;
  }

  &:hover {
    background: rgba(252, 253, 255, 0.85);
    color: black;
    transform: translateY(-2px);
  }
`;

export const EventBox = styled.div<StyledEventProps>`
  background: ${({ bgColor }) => bgColor};
  color: #222;
  margin: 2px 0;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: background 0.15s;

  &:hover {
    filter: brightness(0.98) contrast(1.08);
    box-shadow: 0 2px 6px rgba(0,0,0,0.04);
    outline: 1px solid #b9b9b9;
  }
`;


export const StyledEvent = styled.span<StyledEventProps>`
  background: ${({ bgColor }) => bgColor};
  color: black;
  text-align: left !important;
  padding: 2px 10px;
  margin: 0 2px;
  border-radius: 10px;
  font-size: 13px;
  cursor: move;
  text-transform: capitalize;
`;
export const SevenColGrid = styled.div<SevenColGridProps>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  ${(props) => props.fullheight === "true" && `height: calc(100% - 75px);`}
  ${(props) =>
    props.fullheight === "true" &&
    `grid-template-rows: repeat(${props.is28Days ? 4 : 5}, 1fr);`}

  div {
    display: grid;
    border: 1px solid;
    ${StyledEvent} {
      display: none;
    }

    ${StyledEvent}:nth-child(-n + 3) {
      display: block;
    }

    span {
      text-align: right;
      padding-right: 15px;
      height: fit-content;
    }

    span.active {
      background-color: red;
      border-bottom: 2px solid red;
      position: relative;
    }

    span.active::before {
      content: "Today ";
      font-size: 14px;
    }
  }
`;

export const HeadDays = styled.span`
  text-align: center;
  border: 1px solid;
  height: 30px;
  padding: 5px;
  background: blue;
  color: white;
`;

export const DateControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 0;
  .arrow {
    background-color: #3498db;
    color: #fff;
    padding: 8px 12px;
    font-size: 14px;
    margin: 0 4px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
  }
  p {
    color: white;
    font-size: 20px;
  }
`;

export const SeeMore = styled.p`
  font-size: 12px;
  padding: 0 5px;
  margin-bottom: 0;
  cursor: pointer;
`;

export const PortalWrapper = styled.div`
  background: white;
  position: absolute;
  width: 60%;
  height: 200px;
  top: 50%;
  left: 50%;
  /* border: 1px solid; */
  border-radius: 6px;
  transform: translate(-50%, -50%);
  box-shadow: 10px 10px 20px black;
  padding: 40px;

  h2 {
    font-size: 3rem;
  }

  .portal-button-delete {
    font-size: 1rem;
    color: white;
    background: red;
    padding: 10px 20px;
    border-radius: 6px;
    margin-left: 15px;
  }
  .portal-button-close {
    font-size: 1rem;
    color: white;
    background: green;
    padding: 10px 20px;
    border-radius: 6px;
    margin-left: 15px;
  }
  .portal-button-edit {
    font-size: 1rem;
    color: white;
    background: grey;
    padding: 10px 20px;
    border-radius: 6px;
    margin-left: 15px;
  }

  p {
    margin-bottom: 15px;
  }

  .portal-button[name="close-outline"] {
    position: absolute;
    top: 10px;
    right: 10px;
    background: red;
    color: lightblue;
  }
`;

export const HolidayLabel = styled.span`
  font-size: 22px;
  color: #e74c3c;
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  padding: 0 2px;
`;






