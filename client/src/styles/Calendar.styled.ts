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
    text-align: center; 
    position: absolute;
    top: -1px;
    left: 50%;
    transform: translateX(-50%);
    background: #ff3b3b;
    color: white;
    font-size: 12px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 12px;
    letter-spacing: 0.5px;
    width:96%;
    height: 11px;
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
  display: flex;             
  justify-content: center;    
  align-items: center;        
  text-align: center;         
  font-size: 12px;
  padding: 0 5px;
  margin-bottom: 0;
  cursor: pointer;
  width: 80px;
  height: 24px;
  background: rgb(0, 136, 255);
  border-radius: 8px;
`;

export const PortalWrapper = styled.div`
  background: white;
  position: absolute;
  width: 60%;
  min-height: 200px;       
  max-height: 80vh;         
  overflow-y: auto;         
  top: 50%;
  left: 50%;
  border-radius: 6px;
  transform: translate(-50%, -50%);
  box-shadow: 10px 10px 20px black;
  padding: 40px;

  h2 {
    font-size: 1.5rem;        
    word-break: break-word;   
    overflow-wrap: break-word;
    margin-bottom: 8px;
  }

  p {
    margin-bottom: 15px;
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

  .portal-button[name="close-outline"] {
    position: absolute;
    top: 10px;
    right: 10px;
    background: red;
    color: lightblue;
  }
`;

export const HolidayLabel = styled.span`
  position: absolute;
  top: -1px;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ff9c9c;
  color: white;
  font-size: 12px;
  font-weight: 600;
  border-radius: 12px;
  letter-spacing: 0.5px;
  width: 100%;
  height: 7px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
`;

export const DayEventsOverlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
`;

export const DayEventsWrapper = styled.div`
  position: relative;
  z-index: 11;
  background: white;
  border-radius: 8px;
  padding: 24px;
  width: 500px;
  heigh: 300px;
  max-width: 90vw;     
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

  input {
    width: 150px;
    padding: 3px 8px;
    font-size: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    outline: none; 
  }

  h3 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    gap: 12px;
  }

  .close-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    background: none;
    border: none;
    font-size: 1rem;
    cursor: pointer;
  }
`;


export const EventListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const DayEventItem = styled.div<{ bgColor: string }>`
  background: ${({ bgColor }) => bgColor};
  color: white;
  padding: 6px 16px;
  border-radius: 6px;
  margin-bottom: 4px;
  cursor: pointer;
  font-size: 13px;
`;


export const SearchInput = styled.input`
  display: block;
  margin: 0 auto;
  width: 100%;
  max-width: 300px;
  height: 20px;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease;
  margin-top:10px

  &:focus {
    border-color: #6c63ff;
    box-shadow: 0 0 0 2px rgba(108, 99, 255, 0.15);
  }

  &::placeholder {
    color: #999;
  }
`;

export const CountrySelect = styled.select`
  display: block;
  margin: 0 auto;
  width: 100%;
  max-width: 300px;
  height: 30px;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  font-size: 12px;
  outline: none;
  transition: all 0.2s ease;

  cursor: pointer;
  background: white;
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

