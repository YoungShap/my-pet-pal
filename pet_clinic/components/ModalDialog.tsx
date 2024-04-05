import { Dialog } from "@mui/material";
import Form from "./Form";
import EditForm from "./EditForm";

const ModalDialog = (props: { open: boolean, handleClose: () => void, patientId?: string }) => {
    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            {props.patientId ? (
                <EditForm handleClose={props.handleClose} patientId={props.patientId} />
            ) : (
                <Form handleClose={props.handleClose} />
            )}
        </Dialog>
    );
}

export default ModalDialog;