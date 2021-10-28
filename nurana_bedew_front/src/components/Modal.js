import { element, func, string } from "prop-types";
import CloseIcon from '../icons/CloseIcon';

const Modal = ({title, setClose, children, size}) =>(
    <div className="fixed top-0 left-0 z-50 bg-transparent w-full h-full flex justify-center items-start pt-16 overflow-y-auto">
        <div className={
            size === "min" ? "flex flex-col bg-white dark:bg-gray-800 shadow max-w-xl w-full rounded mx-2 mb-16" 
            : size === "med" ? "flex flex-col bg-white dark:bg-gray-800 shadow max-w-3xl w-full rounded mx-2 mb-16"
            : size === "large" ? "flex flex-col bg-white dark:bg-gray-800 shadow min-w-max rounded mx-2 mb-16"
            : "flex flex-col bg-white dark:bg-gray-800 shadow max-w-7xl w-full rounded mx-2 mb-16"
        }>
            <div className="flex w-full justify-between items-center shadow-sm rounded-t border-b-2 border-gray-200 dark:border-gray-600 dark:text-gray-200 px-2 select-none">
                <div className="text-lg text-left w-full font-medium py-2">
                    {title}
                </div>
                <CloseIcon className="text-2xl cursor-pointer remove-button-bg" onClick={setClose}/>
            </div>
            <div className="w-full h-full">
                {children}
            </div>
        </div>
    </div>
);
Modal.propTypes = {
    setClose:func.isRequired,
    children:element.isRequired,
    size:string.isRequired
}
export default Modal;

