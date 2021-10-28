import NavigateNextIcon from '../icons/NavigateNextIcon';
import NavigateBeforeIcon from '../icons/NavigateBeforeIcon';
import {string, number} from 'prop-types';

const PaginationButton = ({direction, pageCount, page}) => {
    return (
        <>
        {direction === "next" ? 
            <button disabled={page === Math.floor(pageCount)} type="button"
                className={page === Math.floor(pageCount) ? 
                    "cursor-not-allowed w-full p-1  shadow-md text-xl focus:outline-none outline-none rounded-lg text-gray-400 dark:text-white dark:bg-gray-600 bg-gray-50 hover:bg-white hover:text-indigo-500"
                    :
                    "w-full p-1  shadow-md text-xl focus:outline-none outline-none rounded-lg text-gray-400 dark:text-white bg-gray-50 dark:bg-gray-600 hover:bg-white hover:text-indigo-500"
            }>
                <NavigateNextIcon />
            </button> 
            :
            <button disabled={page === 0} type="button"
                className={page === 0 ? 
                    "cursor-not-allowed w-full p-1  shadow-md text-xl focus:outline-none outline-none rounded-lg text-gray-400 dark:text-white bg-gray-50 dark:bg-gray-600 hover:bg-white hover:text-indigo-500" 
                    : 
                    "w-full p-1  shadow-md text-xl focus:outline-none outline-none rounded-lg text-gray-400 dark:text-white bg-gray-50 dark:bg-gray-600 hover:bg-white hover:text-indigo-500"
            }>
                <NavigateBeforeIcon/>
            </button> 
        }
        </>
    );
};

PaginationButton.propTypes = {
    direction:string.isRequired,
    pageCount:number.isRequired,
    page:number.isRequired
}

export default PaginationButton;