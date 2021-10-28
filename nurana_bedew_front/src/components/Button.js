import {string, func} from "prop-types"

const Button = ({title, type, Icon, handleClick}) => (
    <>
    {title ? 
        <button  type={type} onClick={handleClick} className="w-full h-full flex flex-row flex-shrink-0 justify-center items-center p-1 text-sm font-semibold text-white dark:text-gray-200 border-2 border-purple-700 bg-purple-700 rounded-md shadow-xs hover:bg-purple-600 active:bg-purple-700  focus:outline-none">
            {Icon && 
                <div className="bg-purple-700 rounded mr-2 h-full flex justify-center items-center remove-button-bg">
                    <Icon className="text-2xl"/>
                </div>
            }
            {title}
        </button>
    :
        <button  type={type} onClick={handleClick} className="w-full h-full p-1 flex justify-center items-center text-gray-500 remove-button-bg bg-white border-2  border-gray-400 focus:text-white focus:bg-purple-700 hover:bg-purple-700 active:bg-purple-700 hover:text-white active:text-white hover:border-purple-700 rounded-md focus:outline-none" >
            <Icon className="text-2xl"/>
        </button>
    }
    </>
);

Button.propTypes = {
    name: string,
    type:string.isRequired,
    Icon:func,
    handleClick:func
};

export default Button;