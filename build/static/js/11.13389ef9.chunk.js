(this.webpackJsonpnurana_bedew=this.webpackJsonpnurana_bedew||[]).push([[11],{198:function(e,t,a){},488:function(e,t,a){"use strict";a.r(t);var r=a(3),l=a(2),s=a.n(l),n=a(9),d=a(4),i=a(36),c=(a(0),a(18)),o=a(199),u=a(200),m=(a(198),a(1));var g=o.c().shape({title:o.d().min(3,"Azyndan 3 simwol bolmaly!").max(100,"I\u0148 k\xf6p 100 simwol bolmaly!").required("H\xf6kman gerek"),text:o.d().min(3,"Azyndan 3 simwol bolmaly!").max(1e3,"I\u0148 k\xf6p 100 simwol bolmaly!").required("H\xf6kman gerek"),start_date:o.a().required("Hokman gerek"),end_date:o.a().required("Hokman gerek")});t.default=function(e){var t,a,l,o=e.values,x=e.setClose,b=e.setNews,p=e.setLoad,y=(e.form,Object(i.d)({resolver:Object(u.a)(g),defaultValues:o})),f=y.register,j=y.handleSubmit,k=y.formState.errors,h=(y.setValue,function(){var e=Object(d.a)(s.a.mark((function e(t){var a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return p(!0),e.next=3,Object(c.d)(t);case 3:a=e.sent,b((function(e){return[].concat(Object(n.a)(e),[a.data.rows])})),p(!1),x();case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());return Object(m.jsx)("div",{className:"flex flex-col justify-start px-4 pb-6",children:Object(m.jsxs)("form",{onSubmit:j(h),className:"pt-2",children:[Object(m.jsxs)("div",{className:"relative w-full mt-5 flex flex-col justify-start items-start",children:[Object(m.jsx)("label",{className:"block uppercase text-gray-700 dark:text-gray-200 text-xs font-medium mb-2",htmlFor:"email",children:"S\xf6zba\u015fy(\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a)"}),Object(m.jsx)("input",Object(r.a)(Object(r.a)({},f("title")),{},{type:"text",name:"title",placeholder:"\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a",className:k.title?"px-3 py-2 placeholder-gray-400 text-gray-700 dark:text-gray-200  bg-white dark:bg-gray-700 rounded text-sm focus:outline-none ring-1 ring-red-500 w-full":"px-3 py-2 placeholder-gray-400 text-gray-700 dark:text-gray-200  bg-white dark:bg-gray-700 rounded text-sm focus:outline-none  border-0 ring-1 ring-gray-300 dark:ring-gray-800 focus:ring-purple-700 dark:focus:ring-2 dark:focus:ring-gray-600 w-full"})),Object(m.jsx)("div",{className:"absolute top-14 left-0 text-xs text-red-500 font-normal mt-2",children:null===(t=k.product_name)||void 0===t?void 0:t.message})]}),Object(m.jsxs)("div",{className:"relative w-full-1 mt-3 ",children:[Object(m.jsx)("label",{className:"block uppercase text-gray-700 dark:text-gray-200 text-xs text-left font-medium mb-2",htmlFor:"email",children:"\u041d\u0430\u0447\u0430\u043b\u044c\u043d\u043e\u0435 \u0447\u0438\u0441\u043b\u043e"}),Object(m.jsx)("input",Object(r.a)(Object(r.a)({},f("start_date")),{},{type:"date",name:"start_date",placeholder:"\u041d\u0430\u0447\u0430\u043b\u044c\u043d\u043e\u0435 \u0447\u0438\u0441\u043b\u043e",className:"px-3 py-2 placeholder-gray-400 text-gray-700 dark:text-gray-200  bg-white dark:bg-gray-700 rounded text-sm focus:outline-none  border-0 ring-1 ring-gray-300 dark:ring-gray-800 focus:ring-purple-700 dark:focus:ring-2 dark:focus:ring-gray-600 w-full",style:{transition:"all .15s ease"}})),Object(m.jsx)("div",{className:"absolute top-14 left-0 text-xs text-red-500 font-normal mt-2",children:null===(a=k.start_date)||void 0===a?void 0:a.message})]}),Object(m.jsxs)("div",{className:"relative w-full-1 mt-3 ",children:[Object(m.jsx)("label",{className:"block uppercase text-gray-700 dark:text-gray-200 text-xs text-left font-medium mb-2",htmlFor:"email",children:"\u041a\u043e\u043d\u0435\u0447\u043d\u043e\u0435 \u0447\u0438\u0441\u043b\u043e"}),Object(m.jsx)("input",Object(r.a)(Object(r.a)({},f("end_date")),{},{type:"date",name:"end_date",placeholder:"\u041a\u043e\u043d\u0435\u0447\u043d\u043e\u0435 \u0447\u0438\u0441\u043b\u043e",className:"px-3 py-2 placeholder-gray-400 text-gray-700 dark:text-gray-200  bg-white dark:bg-gray-700 rounded text-sm focus:outline-none  border-0 ring-1 ring-gray-300 dark:ring-gray-800 focus:ring-purple-700 dark:focus:ring-2 dark:focus:ring-gray-600 w-full",style:{transition:"all .15s ease"}})),Object(m.jsx)("div",{className:"absolute top-14 left-0 text-xs text-red-500 font-normal mt-2",children:null===(l=k.end_date)||void 0===l?void 0:l.message})]}),Object(m.jsx)("div",{className:"flex flex-col md:flex-row md:justify-between items-center",children:Object(m.jsxs)("div",{className:"relative w-full mt-3 px-2",children:[Object(m.jsx)("label",{className:"block uppercase text-gray-700 dark:text-gray-200 text-xs text-left font-medium mb-2",children:"\u0422\u0435\u043a\u0441\u0442"}),Object(m.jsx)("textarea",Object(r.a)(Object(r.a)({},f("text")),{},{type:"text",name:"text",placeholder:"\u0422\u0435\u043a\u0441\u0442",className:k.email?"px-3 py-2 w-auto placeholder-gray-400 text-gray-700 dark:text-gray-200  bg-white dark:bg-gray-700 rounded text-sm focus:outline-none ring-1 ring-red-500 w-full":"px-3 py-2 placeholder-gray-400 text-gray-700 dark:text-gray-200  bg-white dark:bg-gray-700 rounded text-sm focus:outline-none  border-0 ring-1 ring-gray-300 dark:ring-gray-800 focus:ring-purple-700 dark:focus:ring-2 dark:focus:ring-gray-600 w-full",style:{transition:"all .15s ease"}}))]})}),Object(m.jsx)("div",{className:"text-center mt-12 mb-2",children:Object(m.jsx)("button",{className:"bg-purple-700 hover:bg-purple-600 text-white  active:bg-gray-700 text-sm font-medium uppercase px-6 py-3 rounded shadow outline-none focus:outline-none mr-1 mb-1 w-full",type:"submit",children:o?"\xdc\xfdtgetmek":"Go\u015fmak"})})]})})}}}]);
//# sourceMappingURL=11.13389ef9.chunk.js.map