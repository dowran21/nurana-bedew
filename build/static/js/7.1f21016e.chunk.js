(this.webpackJsonpnurana_bedew=this.webpackJsonpnurana_bedew||[]).push([[7],{138:function(e,t,a){"use strict";var r=a(1);t.a=function(e){var t=e.title,a=e.type,n=e.Icon,i=e.handleClick;return Object(r.jsx)(r.Fragment,{children:t?Object(r.jsxs)("button",{type:a,onClick:i,className:"w-full h-full flex flex-row flex-shrink-0 justify-center items-center p-1 text-sm font-semibold text-white dark:text-gray-200 border-2 border-purple-700 bg-purple-700 rounded-md shadow-xs hover:bg-purple-600 active:bg-purple-700  focus:outline-none",children:[n&&Object(r.jsx)("div",{className:"bg-purple-700 rounded mr-2 h-full flex justify-center items-center remove-button-bg",children:Object(r.jsx)(n,{className:"text-2xl"})}),t]}):Object(r.jsx)("button",{type:a,onClick:i,className:"w-full h-full p-1 flex justify-center items-center text-gray-500 remove-button-bg bg-white border-2  border-gray-400 focus:text-white focus:bg-purple-700 hover:bg-purple-700 active:bg-purple-700 hover:text-white active:text-white hover:border-purple-700 rounded-md focus:outline-none",children:Object(r.jsx)(n,{className:"text-2xl"})})})}},139:function(e,t,a){var r;e.exports=(r=a(0),function(e){var t={};function a(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,a),n.l=!0,n.exports}return a.m=e,a.c=t,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(r,n,function(t){return e[t]}.bind(null,n));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=4)}([function(e,t,a){e.exports=a(2)()},function(e,t){e.exports=r},function(e,t,a){"use strict";var r=a(3);function n(){}function i(){}i.resetWarningCache=n,e.exports=function(){function e(e,t,a,n,i,s){if(s!==r){var o=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw o.name="Invariant Violation",o}}function t(){return e}e.isRequired=e;var a={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:i,resetWarningCache:n};return a.PropTypes=a,a}},function(e,t,a){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,a){"use strict";a.r(t);var r=a(1),n=a.n(r),i=a(0),s=a.n(i);function o(){return(o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}var c=function(e){var t=e.pageClassName,a=e.pageLinkClassName,r=e.page,i=e.selected,s=e.activeClassName,c=e.activeLinkClassName,l=e.getEventListener,u=e.pageSelectedHandler,d=e.href,p=e.extraAriaContext,h=e.pageLabelBuilder,f=e.ariaLabel||"Page "+r+(p?" "+p:""),b=null;return i&&(b="page",f=e.ariaLabel||"Page "+r+" is your current page",t=void 0!==t?t+" "+s:s,void 0!==a?void 0!==c&&(a=a+" "+c):a=c),n.a.createElement("li",{className:t},n.a.createElement("a",o({role:"button",className:a,href:d,tabIndex:"0","aria-label":f,"aria-current":b,onKeyPress:u},l(u)),h(r)))};c.propTypes={pageSelectedHandler:s.a.func.isRequired,selected:s.a.bool.isRequired,pageClassName:s.a.string,pageLinkClassName:s.a.string,activeClassName:s.a.string,activeLinkClassName:s.a.string,extraAriaContext:s.a.string,href:s.a.string,ariaLabel:s.a.string,page:s.a.number.isRequired,getEventListener:s.a.func.isRequired,pageLabelBuilder:s.a.func.isRequired};var l=c;function u(){return(u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}var d=function(e){var t=e.breakLabel,a=e.breakClassName,r=e.breakLinkClassName,i=e.breakHandler,s=e.getEventListener,o=a||"break";return n.a.createElement("li",{className:o},n.a.createElement("a",u({className:r,role:"button",tabIndex:"0",onKeyPress:i},s(i)),t))};d.propTypes={breakLabel:s.a.oneOfType([s.a.string,s.a.node]),breakClassName:s.a.string,breakLinkClassName:s.a.string,breakHandler:s.a.func.isRequired,getEventListener:s.a.func.isRequired};var p=d;function h(e){return(h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function f(){return(f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}function b(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function g(e,t){return(g=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function m(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,r=v(e);if(t){var n=v(this).constructor;a=Reflect.construct(r,arguments,n)}else a=r.apply(this,arguments);return x(this,a)}}function x(e,t){if(t&&("object"===h(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return y(e)}function y(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function v(e){return(v=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function j(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var k=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&g(e,t)}(s,e);var t,a,r,i=m(s);function s(e){var t,a;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s),j(y(t=i.call(this,e)),"handlePreviousPage",(function(e){var a=t.state.selected;e.preventDefault?e.preventDefault():e.returnValue=!1,a>0&&t.handlePageSelected(a-1,e)})),j(y(t),"handleNextPage",(function(e){var a=t.state.selected,r=t.props.pageCount;e.preventDefault?e.preventDefault():e.returnValue=!1,a<r-1&&t.handlePageSelected(a+1,e)})),j(y(t),"handlePageSelected",(function(e,a){a.preventDefault?a.preventDefault():a.returnValue=!1,t.state.selected!==e?(t.setState({selected:e}),t.callCallback(e)):t.callActiveCallback(e)})),j(y(t),"getEventListener",(function(e){return j({},t.props.eventListener,e)})),j(y(t),"handleBreakClick",(function(e,a){a.preventDefault?a.preventDefault():a.returnValue=!1;var r=t.state.selected;t.handlePageSelected(r<e?t.getForwardJump():t.getBackwardJump(),a)})),j(y(t),"callCallback",(function(e){void 0!==t.props.onPageChange&&"function"==typeof t.props.onPageChange&&t.props.onPageChange({selected:e})})),j(y(t),"callActiveCallback",(function(e){void 0!==t.props.onPageActive&&"function"==typeof t.props.onPageActive&&t.props.onPageActive({selected:e})})),j(y(t),"pagination",(function(){var e=[],a=t.props,r=a.pageRangeDisplayed,i=a.pageCount,s=a.marginPagesDisplayed,o=a.breakLabel,c=a.breakClassName,l=a.breakLinkClassName,u=t.state.selected;if(i<=r)for(var d=0;d<i;d++)e.push(t.getPageElement(d));else{var h,f,b,g=r/2,m=r-g;u>i-r/2?g=r-(m=i-u):u<r/2&&(m=r-(g=u));var x=function(e){return t.getPageElement(e)};for(h=0;h<i;h++)(f=h+1)<=s||f>i-s||h>=u-g&&h<=u+m?e.push(x(h)):o&&e[e.length-1]!==b&&(b=n.a.createElement(p,{key:h,breakLabel:o,breakClassName:c,breakLinkClassName:l,breakHandler:t.handleBreakClick.bind(null,h),getEventListener:t.getEventListener}),e.push(b))}return e})),void 0!==e.initialPage&&void 0!==e.forcePage&&console.warn("(react-paginate): Both initialPage (".concat(e.initialPage,") and forcePage (").concat(e.forcePage,") props are provided, which is discouraged.")+" Use exclusively forcePage prop for a controlled component.\nSee https://reactjs.org/docs/forms.html#controlled-components"),a=e.initialPage?e.initialPage:e.forcePage?e.forcePage:0,t.state={selected:a},t}return t=s,(a=[{key:"componentDidMount",value:function(){var e=this.props,t=e.initialPage,a=e.disableInitialCallback,r=e.extraAriaContext,n=e.pageCount;void 0===t||a||this.callCallback(t),r&&console.warn("DEPRECATED (react-paginate): The extraAriaContext prop is deprecated. You should now use the ariaLabelBuilder instead."),Number.isInteger(n)||console.warn("(react-paginate): The pageCount prop value provided is not an integer (".concat(this.props.pageCount,"). Did you forget a Math.ceil()?"))}},{key:"componentDidUpdate",value:function(e){void 0!==this.props.forcePage&&this.props.forcePage!==e.forcePage&&this.setState({selected:this.props.forcePage}),Number.isInteger(e.pageCount)&&!Number.isInteger(this.props.pageCount)&&console.warn("(react-paginate): The pageCount prop value provided is not an integer (".concat(this.props.pageCount,"). Did you forget a Math.ceil()?"))}},{key:"getForwardJump",value:function(){var e=this.state.selected,t=this.props,a=t.pageCount,r=e+t.pageRangeDisplayed;return r>=a?a-1:r}},{key:"getBackwardJump",value:function(){var e=this.state.selected-this.props.pageRangeDisplayed;return e<0?0:e}},{key:"hrefBuilder",value:function(e){var t=this.props,a=t.hrefBuilder,r=t.pageCount;if(a&&e!==this.state.selected&&e>=0&&e<r)return a(e+1)}},{key:"ariaLabelBuilder",value:function(e){var t=e===this.state.selected;if(this.props.ariaLabelBuilder&&e>=0&&e<this.props.pageCount){var a=this.props.ariaLabelBuilder(e+1,t);return this.props.extraAriaContext&&!t&&(a=a+" "+this.props.extraAriaContext),a}}},{key:"getPageElement",value:function(e){var t=this.state.selected,a=this.props,r=a.pageClassName,i=a.pageLinkClassName,s=a.activeClassName,o=a.activeLinkClassName,c=a.extraAriaContext,u=a.pageLabelBuilder;return n.a.createElement(l,{key:e,pageSelectedHandler:this.handlePageSelected.bind(null,e),selected:t===e,pageClassName:r,pageLinkClassName:i,activeClassName:s,activeLinkClassName:o,extraAriaContext:c,href:this.hrefBuilder(e),ariaLabel:this.ariaLabelBuilder(e),page:e+1,pageLabelBuilder:u,getEventListener:this.getEventListener})}},{key:"render",value:function(){var e=this.props.renderOnZeroPageCount;if(0===this.props.pageCount&&void 0!==e)return e?e(this.props):e;var t=this.props,a=t.disabledClassName,r=t.pageCount,i=t.className,s=t.containerClassName,o=t.previousLabel,c=t.previousClassName,l=t.previousLinkClassName,u=t.previousAriaLabel,d=t.prevRel,p=t.nextLabel,h=t.nextClassName,b=t.nextLinkClassName,g=t.nextAriaLabel,m=t.nextRel,x=this.state.selected,y=c+(0===x?" ".concat(a):""),v=h+(x===r-1?" ".concat(a):""),j=0===x?"true":"false",k=x===r-1?"true":"false";return n.a.createElement("ul",{className:i||s},n.a.createElement("li",{className:y},n.a.createElement("a",f({className:l,href:this.hrefBuilder(x-1),tabIndex:"0",role:"button",onKeyPress:this.handlePreviousPage,"aria-disabled":j,"aria-label":u,rel:d},this.getEventListener(this.handlePreviousPage)),o)),this.pagination(),n.a.createElement("li",{className:v},n.a.createElement("a",f({className:b,href:this.hrefBuilder(x+1),tabIndex:"0",role:"button",onKeyPress:this.handleNextPage,"aria-disabled":k,"aria-label":g,rel:m},this.getEventListener(this.handleNextPage)),p)))}}])&&b(t.prototype,a),r&&b(t,r),s}(r.Component);j(k,"propTypes",{pageCount:s.a.number.isRequired,pageRangeDisplayed:s.a.number.isRequired,marginPagesDisplayed:s.a.number.isRequired,previousLabel:s.a.node,previousAriaLabel:s.a.string,prevRel:s.a.string,nextLabel:s.a.node,nextAriaLabel:s.a.string,nextRel:s.a.string,breakLabel:s.a.oneOfType([s.a.string,s.a.node]),hrefBuilder:s.a.func,onPageChange:s.a.func,onPageActive:s.a.func,initialPage:s.a.number,forcePage:s.a.number,disableInitialCallback:s.a.bool,containerClassName:s.a.string,className:s.a.string,pageClassName:s.a.string,pageLinkClassName:s.a.string,pageLabelBuilder:s.a.func,activeClassName:s.a.string,activeLinkClassName:s.a.string,previousClassName:s.a.string,nextClassName:s.a.string,previousLinkClassName:s.a.string,nextLinkClassName:s.a.string,disabledClassName:s.a.string,breakClassName:s.a.string,breakLinkClassName:s.a.string,extraAriaContext:s.a.string,ariaLabelBuilder:s.a.func,eventListener:s.a.string,renderOnZeroPageCount:s.a.func}),j(k,"defaultProps",{pageCount:10,pageRangeDisplayed:2,marginPagesDisplayed:3,activeClassName:"selected",previousLabel:"Previous",previousClassName:"previous",previousAriaLabel:"Previous page",prevRel:"prev",nextLabel:"Next",nextClassName:"next",nextAriaLabel:"Next page",nextRel:"next",breakLabel:"...",disabledClassName:"disabled",disableInitialCallback:!1,pageLabelBuilder:function(e){return e},eventListener:"onClick",renderOnZeroPageCount:void 0}),t.default=k}]))},140:function(e,t,a){"use strict";a(39),a(40),a(1)},141:function(e,t,a){"use strict";var r=a(13),n=a(0);t.a=function(e){var t=e.action,a=e.time,i=Object(n.useState)(0),s=Object(r.a)(i,2),o=s[0],c=s[1];return function(e){o&&clearTimeout(o),c(setTimeout((function(){t(e)}),a))}}},163:function(e,t,a){e.exports=a(164)},164:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var r=a(0);function n(){return(n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}var i=r.createElement("svg",{viewBox:"-2 -5 14 20",height:"100%",width:"100%",style:{position:"absolute",top:0}},r.createElement("path",{d:"M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12",fill:"#fff",fillRule:"evenodd"})),s=r.createElement("svg",{height:"100%",width:"100%",viewBox:"-2 -5 17 21",style:{position:"absolute",top:0}},r.createElement("path",{d:"M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0",fill:"#fff",fillRule:"evenodd"}));function o(e){if(7===e.length)return e;for(var t="#",a=1;a<4;a+=1)t+=e[a]+e[a];return t}function c(e,t,a,r,n){return function(e,t,a,r,n){var i=(e-a)/(t-a);if(0===i)return r;if(1===i)return n;for(var s="#",o=1;o<6;o+=2){var c=parseInt(r.substr(o,2),16),l=parseInt(n.substr(o,2),16),u=Math.round((1-i)*c+i*l).toString(16);1===u.length&&(u="0"+u),s+=u}return s}(e,t,a,o(r),o(n))}var l=function(e){function t(t){e.call(this,t);var a=t.height,r=t.width,n=t.checked;this.t=t.handleDiameter||a-2,this.i=Math.max(r-a,r-(a+this.t)/2),this.o=Math.max(0,(a-this.t)/2),this.state={h:n?this.i:this.o},this.l=0,this.u=0,this.p=this.p.bind(this),this.v=this.v.bind(this),this.g=this.g.bind(this),this.k=this.k.bind(this),this.M=this.M.bind(this),this.m=this.m.bind(this),this.T=this.T.bind(this),this.$=this.$.bind(this),this.C=this.C.bind(this),this.D=this.D.bind(this),this.O=this.O.bind(this),this.S=this.S.bind(this)}return e&&(t.__proto__=e),(t.prototype=Object.create(e&&e.prototype)).constructor=t,t.prototype.componentDidMount=function(){this.W=!0},t.prototype.componentDidUpdate=function(e){e.checked!==this.props.checked&&this.setState({h:this.props.checked?this.i:this.o})},t.prototype.componentWillUnmount=function(){this.W=!1},t.prototype.I=function(e){this.H.focus(),this.setState({R:e,j:!0,B:Date.now()})},t.prototype.L=function(e){var t=this.state,a=t.R,r=t.h,n=(this.props.checked?this.i:this.o)+e-a;t.N||e===a||this.setState({N:!0});var i=Math.min(this.i,Math.max(this.o,n));i!==r&&this.setState({h:i})},t.prototype.U=function(e){var t=this.state,a=t.h,r=t.N,n=t.B,i=this.props.checked,s=(this.i+this.o)/2;this.setState({h:this.props.checked?this.i:this.o});var o=Date.now()-n;(!r||o<250||i&&a<=s||!i&&a>=s)&&this.A(e),this.W&&this.setState({N:!1,j:!1}),this.l=Date.now()},t.prototype.p=function(e){e.preventDefault(),"number"==typeof e.button&&0!==e.button||(this.I(e.clientX),window.addEventListener("mousemove",this.v),window.addEventListener("mouseup",this.g))},t.prototype.v=function(e){e.preventDefault(),this.L(e.clientX)},t.prototype.g=function(e){this.U(e),window.removeEventListener("mousemove",this.v),window.removeEventListener("mouseup",this.g)},t.prototype.k=function(e){this.X=null,this.I(e.touches[0].clientX)},t.prototype.M=function(e){this.L(e.touches[0].clientX)},t.prototype.m=function(e){e.preventDefault(),this.U(e)},t.prototype.$=function(e){Date.now()-this.l>50&&(this.A(e),Date.now()-this.u>50&&this.W&&this.setState({j:!1}))},t.prototype.C=function(){this.u=Date.now()},t.prototype.D=function(){this.setState({j:!0})},t.prototype.O=function(){this.setState({j:!1})},t.prototype.S=function(e){this.H=e},t.prototype.T=function(e){e.preventDefault(),this.H.focus(),this.A(e),this.W&&this.setState({j:!1})},t.prototype.A=function(e){var t=this.props;(0,t.onChange)(!t.checked,e,t.id)},t.prototype.render=function(){var e=this.props,t=e.checked,a=e.disabled,i=e.className,s=e.offColor,o=e.onColor,l=e.offHandleColor,u=e.onHandleColor,d=e.checkedIcon,p=e.uncheckedIcon,h=e.checkedHandleIcon,f=e.uncheckedHandleIcon,b=e.boxShadow,g=e.activeBoxShadow,m=e.height,x=e.width,y=e.borderRadius,v=function(e,t){var a={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&-1===t.indexOf(r)&&(a[r]=e[r]);return a}(e,["checked","disabled","className","offColor","onColor","offHandleColor","onHandleColor","checkedIcon","uncheckedIcon","checkedHandleIcon","uncheckedHandleIcon","boxShadow","activeBoxShadow","height","width","borderRadius","handleDiameter"]),j=this.state,k=j.h,w=j.N,O=j.j,N={position:"relative",display:"inline-block",textAlign:"left",opacity:a?.5:1,direction:"ltr",borderRadius:m/2,WebkitTransition:"opacity 0.25s",MozTransition:"opacity 0.25s",transition:"opacity 0.25s",touchAction:"none",WebkitTapHighlightColor:"rgba(0, 0, 0, 0)",WebkitUserSelect:"none",MozUserSelect:"none",msUserSelect:"none",userSelect:"none"},C={height:m,width:x,margin:Math.max(0,(this.t-m)/2),position:"relative",background:c(k,this.i,this.o,s,o),borderRadius:"number"==typeof y?y:m/2,cursor:a?"default":"pointer",WebkitTransition:w?null:"background 0.25s",MozTransition:w?null:"background 0.25s",transition:w?null:"background 0.25s"},L={height:m,width:Math.min(1.5*m,x-(this.t+m)/2+1),position:"relative",opacity:(k-this.o)/(this.i-this.o),pointerEvents:"none",WebkitTransition:w?null:"opacity 0.25s",MozTransition:w?null:"opacity 0.25s",transition:w?null:"opacity 0.25s"},P={height:m,width:Math.min(1.5*m,x-(this.t+m)/2+1),position:"absolute",opacity:1-(k-this.o)/(this.i-this.o),right:0,top:0,pointerEvents:"none",WebkitTransition:w?null:"opacity 0.25s",MozTransition:w?null:"opacity 0.25s",transition:w?null:"opacity 0.25s"},S={height:this.t,width:this.t,background:c(k,this.i,this.o,l,u),display:"inline-block",cursor:a?"default":"pointer",borderRadius:"number"==typeof y?y-1:"50%",position:"absolute",transform:"translateX("+k+"px)",top:Math.max(0,(m-this.t)/2),outline:0,boxShadow:O?g:b,border:0,WebkitTransition:w?null:"background-color 0.25s, transform 0.25s, box-shadow 0.15s",MozTransition:w?null:"background-color 0.25s, transform 0.25s, box-shadow 0.15s",transition:w?null:"background-color 0.25s, transform 0.25s, box-shadow 0.15s"},E={height:this.t,width:this.t,opacity:Math.max(2*(1-(k-this.o)/(this.i-this.o)-.5),0),position:"absolute",left:0,top:0,pointerEvents:"none",WebkitTransition:w?null:"opacity 0.25s",MozTransition:w?null:"opacity 0.25s",transition:w?null:"opacity 0.25s"},T={height:this.t,width:this.t,opacity:Math.max(2*((k-this.o)/(this.i-this.o)-.5),0),position:"absolute",left:0,top:0,pointerEvents:"none",WebkitTransition:w?null:"opacity 0.25s",MozTransition:w?null:"opacity 0.25s",transition:w?null:"opacity 0.25s"};return r.createElement("div",{className:i,style:N},r.createElement("div",{className:"react-switch-bg",style:C,onClick:a?null:this.T,onMouseDown:function(e){return e.preventDefault()}},d&&r.createElement("div",{style:L},d),p&&r.createElement("div",{style:P},p)),r.createElement("div",{className:"react-switch-handle",style:S,onClick:function(e){return e.preventDefault()},onMouseDown:a?null:this.p,onTouchStart:a?null:this.k,onTouchMove:a?null:this.M,onTouchEnd:a?null:this.m,onTouchCancel:a?null:this.O},f&&r.createElement("div",{style:E},f),h&&r.createElement("div",{style:T},h)),r.createElement("input",n({},{type:"checkbox",role:"switch","aria-checked":t,checked:t,disabled:a,style:{border:0,clip:"rect(0 0 0 0)",height:1,margin:-1,overflow:"hidden",padding:0,position:"absolute",width:1}},v,{ref:this.S,onFocus:this.D,onBlur:this.O,onKeyUp:this.C,onChange:this.$})))},t}(r.Component);l.defaultProps={disabled:!1,offColor:"#888",onColor:"#080",offHandleColor:"#fff",onHandleColor:"#fff",uncheckedIcon:i,checkedIcon:s,boxShadow:null,activeBoxShadow:"0 0 2px 3px #3bf",height:28,width:56},t.default=l},490:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a(37),i=a(2),s=a.n(i),o=a(9),c=a(4),l=a(13),u=a(38),d=(a(140),a(139),a(138)),p=a(18),h=a(141),f=a(163),b=a.n(f),g=a(17),m=a(1);var x=function(e){var t=e.id,a=e.setLoad,n=(e.load,Object(r.useState)([])),i=Object(l.a)(n,2),o=i[0],u=i[1],d=Object(r.useState)({}),h=Object(l.a)(d,2),f=h[0],b=h[1];return Object(r.useEffect)(Object(c.a)(s.a.mark((function e(){var r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(p.n)(t,a);case 2:r=e.sent,u(r.rows.items),b(r.rows);case 5:case"end":return e.stop()}}),e)}))),[]),Object(m.jsxs)("div",{children:[Object(m.jsxs)("div",{className:"flex flex-row p-1",children:["Sargyt eden: ",f.full_name]}),Object(m.jsxs)("div",{className:"flex flex-row p-1",children:["Sargydy\u0148 belgisi: ",f.id]}),Object(m.jsxs)("div",{className:"flex flex-row p-1",children:["Sargydy\u0148 jemi bahasy: ",f.total_price]}),Object(m.jsxs)("div",{className:"flex flex-row p-1",children:["Sargydy\u0148 wagty: ",f.created_date," ",f.created_time]}),Object(m.jsx)("div",{className:"flex flex-row",children:Object(m.jsxs)("table",{className:"divide-gray-200 dark:divide-gray-600 w-full",children:[Object(m.jsx)("thead",{className:"w-full shadow bg-white rounded-t dark:bg-gray-800 ",children:Object(m.jsxs)("tr",{className:"w-full my-2 px-4",children:[Object(m.jsx)("th",{scope:"col",className:"px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider",children:"Haryt"}),Object(m.jsx)("th",{scope:"col",className:"px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider",children:"Bahasy"}),Object(m.jsx)("th",{scope:"col",className:"px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider",children:"Sany"})]})}),Object(m.jsx)("tbody",{className:"w-full h-5 overflow-x-auto bg-white  dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600",children:o&&o.map((function(e){return Object(m.jsxs)("tr",{className:"w-full mb-4 px-4",children:[Object(m.jsx)("td",{className:"px-2  py-2 whitespace-wrap",children:Object(m.jsx)("div",{className:"text-sm text-gray-900 dark:text-gray-100",children:e.product_name})}),Object(m.jsx)("td",{className:"px-2  py-2 whitespace-wrap",children:Object(m.jsx)("div",{className:"text-sm text-gray-900 dark:text-gray-100",children:e.product_price})}),Object(m.jsx)("td",{className:"px-2  py-2 whitespace-wrap",children:Object(m.jsx)("div",{className:"text-sm text-gray-900 dark:text-gray-100",children:e.quantity})})]},e.id)}))})]})})]})},y=Object(r.lazy)((function(){return a.e(0).then(a.bind(null,150))}));var v=function(){var e=Object(r.useState)(!0),t=Object(l.a)(e,2),a=t[0],n=t[1],i=Object(r.useState)([]),f=Object(l.a)(i,2),v=f[0],j=f[1],k=Object(r.useState)(""),w=Object(l.a)(k,2),O=w[0],N=w[1],C=Object(r.useState)(0),L=Object(l.a)(C,2),P=L[0],S=L[1],E=Object(r.useState)(1),T=Object(l.a)(E,2),_=T[0],D=T[1],R=Object(r.useState)(!0),B=Object(l.a)(R,2),M=B[0],I=B[1],A=Object(r.useState)(!1),H=Object(l.a)(A,2),W=H[0],z=H[1],U=Object(r.useState)(0),q=Object(l.a)(U,2),F=q[0],J=q[1];Object(r.useEffect)(Object(c.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("i am in useefecet"),console.log(M),e.prev=2,!M){e.next=16;break}return console.log("I am in fetching"),e.next=7,Object(p.o)({page:P,limit:30,user_name:O});case 7:t=e.sent,console.log(t.rows.orders),W?(console.log("I am in else"),j(t.rows.orders)):j([].concat(Object(o.a)(v),Object(o.a)(t.rows.orders))),D(t.rows.count),J(Math.floor(_/30)),S((function(e){return e+1})),I(!1),z(!1),n(!1);case 16:e.next=20;break;case 18:e.prev=18,e.t0=e.catch(2);case 20:case"end":return e.stop()}}),e,null,[[2,18]])}))),[M]);var X=function(){var e=Object(c.a)(s.a.mark((function e(t){var a,r,n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(p.b)(t);case 2:a=e.sent,new Date,console.log(a),console.log(a.isBase64Encoded),(null===a||void 0===a?void 0:a.isBase64Encoded)&&(r="data:application/pdf;base64,".concat(a.body),n=document.createElement("a"),document.body.appendChild(n),console.log(document.body.appendChild(n)),window.open("").document.write("<iframe width='100%' height='100%' src='".concat(r,"'></iframe>")),n.parentNode.removeChild(n)),j(v.map((function(e){return e.id===t&&(e.has_seen=!0),e})));case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();Object(r.useEffect)((function(){return document.addEventListener("scroll",K),function(){document.removeEventListener("scroll",K)}}),[]);var K=function(e){e.target.documentElement.scrollHeight-(e.target.documentElement.scrollTop+window.innerHeight)<200&&(v.length<_?I(!0):F===P&&I(!1))},V=function(){var e=Object(c.a)(s.a.mark((function e(t,a){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,j(v.map((function(e){return e.id===t&&(e.miniLoad=!0),e}))),e.next=4,Object(p.a)(t,a).then((function(e){j(v.map((function(e){return e.id===t&&(e.accepted=a,e.miniLoad=!1),e})))}));case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),alert("Bir zatlar yalnys gitdi garasmagynyzy hayysh edyarin");case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t,a){return e.apply(this,arguments)}}(),$=Object(h.a)({time:1500,action:function(e){N(e),S(0),I(!0),z(!0)}});return Object(m.jsx)(m.Fragment,{children:a?Object(m.jsx)(u.a,{type:"global"}):Object(m.jsxs)("div",{className:"w-full",children:[Object(m.jsx)("div",{className:"flex flex-row py-2 w-full",children:Object(m.jsx)("div",{className:"flex flex-row w-full p-2",children:Object(m.jsx)("input",{type:"text",name:"user_name",placeholder:"Ulanyjynyn adyny girizin",onChange:function(e){return $(e.target.value)},className:"w-30 h-full px-3 py-2 placeholder-gray-400 text-gray-700 dark:text-gray-200  bg-white dark:bg-gray-700 rounded text-sm focus:outline-none  border-0 ring-1 ring-gray-300 dark:ring-gray-800 focus:ring-purple-700 dark:focus:ring-2 dark:focus:ring-gray-600 w-full"})})}),Object(m.jsxs)("table",{className:"divide-gray-200 dark:divide-gray-600 w-full",children:[Object(m.jsx)("thead",{className:"w-full shadow bg-white rounded-t dark:bg-gray-800 ",children:Object(m.jsxs)("tr",{className:"w-full my-2 px-4",children:[Object(m.jsx)("th",{scope:"col",className:"px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider",children:"Sargydy\u0148 belgisi"}),Object(m.jsx)("th",{scope:"col",className:"px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider",children:"Sargyt eden"}),Object(m.jsx)("th",{scope:"col",className:"px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider",children:"jemi bahasy"}),Object(m.jsx)("th",{scope:"col",className:"px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider",children:"Telefon belgisi"}),Object(m.jsx)("th",{scope:"col",className:"px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider",children:"Sargydy\u0148 wagty"}),Object(m.jsx)("th",{scope:"col",className:"px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider",children:"T\xf6legi\u0148 g\xf6rn\xfc\u015fi"}),Object(m.jsx)("th",{scope:"col",className:"px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider",children:"Sargydy g\xf6rkez"}),Object(m.jsx)("th",{scope:"col",className:"px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider",children:"Sargydy kabul et"}),Object(m.jsx)("th",{scope:"col",className:"px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider",children:"\xc7ap et"})]})}),Object(m.jsx)("tbody",{className:"w-full h-5 overflow-x-auto bg-white  dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600",children:v&&v.map((function(e){return Object(m.jsxs)("tr",{className:"w-full mb-4 px-4",children:[Object(m.jsx)("td",{className:"px-2  py-2 whitespace-wrap",children:Object(m.jsx)("div",{className:e.has_seen?"text-sm text-gray-900 dark:text-gray-100":"text-sm font-bold text-red-500 dark:text-red-100",children:e.id})}),Object(m.jsx)("td",{className:"px-2  py-2 whitespace-wrap",children:Object(m.jsx)("div",{className:e.has_seen?"text-sm text-gray-900 dark:text-gray-100":"text-sm font-bold text-red-500 dark:text-red-100",children:e.full_name})}),Object(m.jsx)("td",{className:"px-2  py-2 whitespace-wrap",children:Object(m.jsx)("div",{className:e.has_seen?"text-sm text-gray-900 dark:text-gray-100":"text-sm font-bold text-red-500 dark:text-red-100",children:e.total_price})}),Object(m.jsx)("td",{className:"px-2  py-2 whitespace-wrap",children:Object(m.jsx)("div",{className:e.has_seen?"text-sm text-gray-900 dark:text-gray-100":"text-sm font-bold text-red-500 dark:text-red-100",children:e.main_phone})}),Object(m.jsx)("td",{className:"px-2  py-2 whitespace-wrap",children:Object(m.jsxs)("div",{className:e.has_seen?"text-sm text-gray-900 dark:text-gray-100":"text-sm font-bold text-red-500 text-red-100",children:[e.created_date," ",e.created_time]})}),Object(m.jsx)("td",{className:"px-2  py-2 whitespace-wrap",children:Object(m.jsx)("div",{className:e.has_seen?"text-sm text-gray-900 dark:text-gray-100":"text-sm font-bold text-red-500 text-red-100",children:e.paymant_name})}),Object(m.jsx)("td",{className:"px-2  py-2 whitespace-wrap",children:Object(m.jsx)(y,{Button:function(e){return Object(m.jsx)(g.b,{onClick:function(){return e()},className:"w-5 h-5 cursor-pointer text-indigo-600 hover:text-indigo-900"})},title:"Sargyt",size:"min",children:Object(m.jsx)(x,{id:e.id,setLoad:n})})}),Object(m.jsx)("td",{className:"px-2  py-2 whitespace-wrap",children:e.miniLoad?Object(m.jsx)(u.a,{type:"table"}):Object(m.jsx)("div",{children:Object(m.jsx)(b.a,{onChange:function(t){return V(e.id,t)},checked:e.accepted,className:"w-auto h-5"})})}),Object(m.jsx)("td",{className:"px-2  py-2 whitespace-wrap",children:Object(m.jsx)(d.a,{title:"PDF A\xe7",type:"button",handleClick:function(){return X(e.id)}})})]},e.id)}))})]})]})})},j=a(56);t.default=function(){Object(r.useContext)(j.Context);return Object(m.jsx)("div",{className:"w-full bg-gray-50 dark:bg-black dark:text-white",children:Object(m.jsxs)("div",{className:"flex flex-row justify-start h-full overflow-y-hidden",children:[Object(m.jsx)(n.a,{}),Object(m.jsx)("div",{className:"flex flex-row w-full justify-between items-start",children:Object(m.jsx)(v,{})})]})})}}}]);
//# sourceMappingURL=7.1f21016e.chunk.js.map