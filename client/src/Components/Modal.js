import { Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';
import Button from './Form Field/Button';

function Modal(props) {

    const { title, children, openModal, setOpenModal } = props;

    return (
        <Dialog open={openModal}>
            <DialogTitle>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h5" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <Button
                        text="X"
                        onClick={()=>{setOpenModal(false)}}
                    ></Button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default Modal;