import {useState, useEffect, cloneElement, lazy } from 'react';
import {element, func, string} from 'prop-types';

const Modal = lazy(() => import('./Modal'));

function ModalContainer({Button, children, title, size}){
    const [show, setShow] = useState(false);

    const setClose = () => {
        setShow(!show);
    };
    useEffect(() => {
        return () => {
            setShow(false);
        }
    }, []);
    return(
        <>  
            {Button(setClose)}
            {show && 
                <Modal title={title} setClose={setClose} size={size}>
                    {cloneElement(children, {setClose})}
                </Modal>
            }
        </>
    );
};

ModalContainer.propTypes = {
    children:element.isRequired,
    title:string.isRequired,
    size:string.isRequired,
    Button:func.isRequired,
}

export default ModalContainer