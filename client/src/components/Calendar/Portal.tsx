import { PortalWrapper } from "../../styles/Calendar.styled";

interface PropsPortal {
  title: string;
  date: Date;
  handleDelete: () => void;
  handleClose: () => void;
  handleEdit: () => void;
}

export const Portal = ({ title, date, handleDelete, handleClose, handleEdit }: PropsPortal) => (
  <PortalWrapper>
    <h2>{title}</h2>
    <p>{date.toDateString()}</p>
    <button className="portal-button-delete" onClick={handleDelete}>Delete</button>
    <button className="portal-button-close" onClick={handleClose}>Close</button>
    <button className="portal-button-edit" onClick={handleEdit}>Edit</button>
  </PortalWrapper>
);