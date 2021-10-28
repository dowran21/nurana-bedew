import Loader from "react-loader-spinner";
import {string} from "prop-types";

const Loading = ({type}) => (
    <>
        {
        type === "global" ?
            <div className="z-50 bg-transparent absolute top-0 left-0 w-full h-full flex justify-center items-center">
                <Loader type="Oval" color="rgba(99, 102, 241, 1)" height={80} width={80} />
            </div>
            :
        type === "table" ?
            <div className="z-50 w-full h-full flex justify-center items-left">
                <Loader type="Oval" color="rgba(99, 102, 241, 1)" height={30} width={30} />
            </div>
            :
        type === "button" ? 
            <div className="z-50 w-full h-full flex justify-center items-center">
                <Loader type="Bars" color="white" height={21} width={21} />
            </div>
            :
        type === "select" ? 
                <div className="z-50 w-full h-full flex justify-center items-center">
                    <Loader type="Bars" color="rgba(99, 102, 241, 1)" height={21} width={21} />
                </div>
            :
            null
        }
    </>
);

Loading.propTypes = {
    type:string.isRequired
}

export default Loading;