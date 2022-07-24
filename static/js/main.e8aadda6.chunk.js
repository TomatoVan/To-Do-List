(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{103:function(e,t,a){e.exports={text:"EditableSpan_text__1gsyY"}},157:function(e,t,a){e.exports=a(195)},162:function(e,t,a){},163:function(e,t,a){},195:function(e,t,a){"use strict";a.r(t);var n,o,c,r=a(0),i=a.n(r),l=a(21),s=a.n(l),u=(a(162),a(163),a(297)),d=a(296),m=a(298),f=a(300),p=a(293),b=a(299),E=a(130),g=a.n(E),O=a(78),y=a(17),T=a(18),j=a(124),h=a.n(j).a.create({withCredentials:!0,baseURL:"https://social-network.samuraijs.com/api/1.1",headers:{"API-KEY":"e53bd4e2-48e0-477a-b70a-83002085f133"}});!function(e){e[e.success=0]="success",e[e.error=1]="error"}(n||(n={})),function(e){e[e.New=0]="New",e[e.InProgress=1]="InProgress",e[e.Completed=2]="Completed",e[e.Draft=3]="Draft"}(o||(o={})),function(e){e[e.Low=0]="Low",e[e.Middle=1]="Middle",e[e.Hi=2]="Hi",e[e.Urgently=3]="Urgently",e[e.Later=4]="Later"}(c||(c={}));var I=function(){return h.get("/auth/me")},k=function(e){return h.post("/auth/login",e)},S=function(){return h.delete("/auth/login")},v=function(){return h.get("/todo-lists")},C=function(e){return h.post("/todo-lists",{title:e})},A=function(e){return h.delete("/todo-lists/".concat(e))},L=function(e,t){return h.put("/todo-lists/".concat(e),{title:t})},D=function(e){return h.get("/todo-lists/".concat(e,"/tasks"))},w=function(e,t){return h.post("/todo-lists/".concat(e,"/tasks"),{title:t})},x=function(e,t,a){return h.put("/todo-lists/".concat(e,"/tasks/").concat(t),a)},N=function(e,t){return h.delete("/todo-lists/".concat(e,"/tasks/").concat(t))},P={status:"loading",error:null},R=function(e){return{type:"APP/SET-STATUS",payload:{status:e}}},G=function(e){return{type:"APP/SET-ERROR",payload:{error:e}}},H=function(e,t){e(G(t)),e(R("failed"))},K=function(e,t){t.messages.length?e(G(t.messages[0])):e(G("Some error occurred")),e(R("failed"))},F=[],B=function(e,t){return{type:"CHANGE-TODOLIST-FILTER",payload:{id:e,filter:t}}},M=a(6),U={},z=a(125),V=a(23),Z={isLoggedIn:!1,isInitialized:!1},_=function(e){return{type:"login/SET-IS-LOGGED-IN",payload:{isLoggedIn:e}}},Y=Object(O.b)({todolists:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TODOLIST":return e.filter((function(e){return e.id!==t.payload.id}));case"ADD-TODOLIST":return[{id:t.payload.todolistId,title:t.payload.title,filter:"all",addedDate:"",order:0,entityStatus:"idle"}].concat(Object(T.a)(e));case"CHANGE-TODOLIST-TITLE":return e.map((function(e){return e.id===t.payload.id?Object(y.a)(Object(y.a)({},e),{},{title:t.payload.title}):e}));case"CHANGE-TODOLIST-FILTER":return e.map((function(e){return e.id===t.payload.id?Object(y.a)(Object(y.a)({},e),{},{filter:t.payload.filter}):e}));case"SET-TODOLIST":return t.payload.todolists.map((function(e){return Object(y.a)(Object(y.a)({},e),{},{filter:"all",entityStatus:"idle"})}));case"CHANGE-TODOLIST-ENTITY-STATUS":return e.map((function(e){return e.id===t.payload.id?Object(y.a)(Object(y.a)({},e),{},{entityStatus:t.payload.status}):e}));default:return e}},tasks:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:U,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD-TODOLIST":return Object(y.a)(Object(y.a)({},e),{},Object(M.a)({},t.payload.todolistId,[]));case"REMOVE-TODOLIST":var a=Object(y.a)({},e);return delete a[t.payload.id],a;case"REMOVE-TASK":return Object(y.a)(Object(y.a)({},e),{},Object(M.a)({},t.payload.todolistId,e[t.payload.todolistId].filter((function(e){return e.id!==t.payload.id}))));case"ADD-TASK":return Object(y.a)(Object(y.a)({},e),{},Object(M.a)({},t.payload.task.todoListId,[t.payload.task].concat(Object(T.a)(e[t.payload.task.todoListId]))));case"CHANGE-TASK-STATUS":return Object(y.a)(Object(y.a)({},e),{},Object(M.a)({},t.payload.todolistId,e[t.payload.todolistId].map((function(e){return e.id===t.payload.taskId?Object(y.a)(Object(y.a)({},e),{},{status:t.payload.status}):e}))));case"CHANGE-TASK-TITLE":return Object(y.a)(Object(y.a)({},e),{},Object(M.a)({},t.payload.todolistId,e[t.payload.todolistId].map((function(e){return e.id===t.payload.taskId?Object(y.a)(Object(y.a)({},e),{},{title:t.payload.title}):e}))));case"SET-TODOLIST":var n=Object(y.a)({},e);return t.payload.todolists.forEach((function(e){n[e.id]=[]})),n;case"SET-TASKS":return Object(y.a)(Object(y.a)({},e),{},Object(M.a)({},t.payload.todolistId,t.payload.tasks));default:return e}},app:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"APP/SET-STATUS":return Object(y.a)(Object(y.a)({},e),{},{status:t.payload.status});case"APP/SET-ERROR":return Object(y.a)(Object(y.a)({},e),{},{error:t.payload.error});default:return e}},auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Z,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"login/SET-IS-LOGGED-IN":return Object(y.a)(Object(y.a)({},e),{},{isLoggedIn:t.payload.isLoggedIn});case"login/SET-IS-INITIALIZED":return Object(y.a)(Object(y.a)({},e),{},{isInitialized:t.payload.isInitialized});default:return e}}}),q=V.c,J=Object(O.c)(Y,Object(O.a)(z.a));function W(){var e=Object(V.b)(),t=q((function(e){return e.auth.isLoggedIn}));return r.createElement(d.a,{sx:{flexGrow:1}},r.createElement(u.a,{position:"static"},r.createElement(m.a,null,r.createElement(b.a,{size:"large",edge:"start",color:"inherit","aria-label":"menu",sx:{mr:2}},r.createElement(g.a,null)),r.createElement(f.a,{variant:"h6",component:"div",sx:{flexGrow:1}},"TodoLists"),t&&r.createElement(p.a,{color:"inherit",onClick:function(){e((function(e){e(R("loading")),S().then((function(t){t.data.resultCode===n.success?(console.log("logout data",t),e(_(!1)),e(R("succeeded"))):K(e,t.data)})).catch((function(t){H(e,t.message)}))}))}},"Logout"))))}window.store=J;var $=a(292),Q=a(295),X=a(14),ee=a(285),te=a(277),ae=i.a.memo((function(e){var t=e.callBackAddTask,a=e.entityStatus,n=Object(r.useState)(""),o=Object(X.a)(n,2),c=o[0],l=o[1],s=Object(r.useState)(!1),u=Object(X.a)(s,2),d=u[0],m=u[1],f=function(){""!==c.trim()?(t(c.trim()),l("")):m(!0)};return i.a.createElement("div",null,i.a.createElement(ee.a,{id:"outlined-basic",size:"small",error:d,label:d?"Title is required":"Add new",variant:"outlined",value:c,onChange:function(e){l(e.currentTarget.value)},onKeyPress:function(e){d&&m(!1),"Enter"===e.key&&f()},className:d?"error":"",disabled:"loading"===a}),i.a.createElement(te.a,{variant:"contained",color:"primary",onClick:f,disabled:"loading"===a,style:{maxWidth:"38px",maxHeight:"38px",minWidth:"38px",minHeight:"38px"}},"+"))})),ne=a(294),oe=a(303),ce=a(103),re=a.n(ce),ie=i.a.memo((function(e){var t=e.titleFromProps,a=e.changeTask,n=Object(r.useState)(t),o=Object(X.a)(n,2),c=o[0],l=o[1],s=Object(r.useState)(!1),u=Object(X.a)(s,2),d=u[0],m=u[1],f=Object(r.useCallback)((function(){m(!1),a(c)}),[a,c]);return d?i.a.createElement("input",{className:re.a.text,value:c,onChange:function(e){l(e.currentTarget.value)},autoFocus:!0,onBlur:f}):i.a.createElement("span",{className:re.a.text,onDoubleClick:function(){m(!0)}},t)})),le=a(278),se=a(279),ue=i.a.memo((function(e){var t=e.callBack,a=e.entityStatus,n=Object(r.useCallback)((function(){t()}),[t]);return i.a.createElement(le.a,{"aria-label":"delete",onClick:n,disabled:"loading"===a},i.a.createElement(se.a,null))})),de=a(286),me=i.a.memo((function(e){var t=e.checked,a=e.changeBox,n=Object(r.useCallback)((function(e){a(e.currentTarget.checked?o.Completed:o.New)}),[a]);return i.a.createElement(de.a,{color:"primary",onChange:n,checked:t===o.Completed})})),fe=i.a.memo((function(e){var t=e.todolistId,a=e.taskId,c=Object(V.c)((function(e){return e.tasks[t].filter((function(e){return e.id===a}))[0]})),l=Object(V.b)(),s=Object(r.useCallback)((function(e){l(function(e,t,a){return function(o,c){o(R("loading"));var r=c().tasks[e].find((function(e){return e.id===t}));if(r){var i={title:r.title,startDate:r.startDate,priority:r.priority,description:r.description,deadline:r.deadline,status:a};x(e,t,i).then((function(c){c.data.resultCode===n.success?(console.log("update task",c),o(function(e,t,a){return{type:"CHANGE-TASK-STATUS",payload:{todolistId:e,status:t,taskId:a}}}(e,a,t)),o(R("succeeded"))):K(o,c.data)})).catch((function(e){H(o,e.message)}))}}}(t,a,e))}),[l,a,t]),u=Object(r.useCallback)((function(e){l(function(e,t,a){return function(o,c){o(R("loading"));var r=c().tasks[e].find((function(e){return e.id===t}));if(r){var i={title:a,startDate:r.startDate,priority:r.priority,description:r.description,deadline:r.deadline,status:r.status};x(e,t,i).then((function(c){c.data.resultCode===n.success?(console.log("update task",c),o(function(e,t,a){return{type:"CHANGE-TASK-TITLE",payload:{todolistId:e,title:a,taskId:t}}}(e,t,a)),o(R("succeeded"))):K(o,c.data)})).catch((function(e){H(o,e.message)}))}}}(t,a,e))}),[l,a,t]),d=Object(r.useCallback)((function(){l(function(e,t){return function(a){a(R("loading")),N(e,t).then((function(o){o.data.resultCode===n.success?(console.log("delete task",o),a(function(e,t){return{type:"REMOVE-TASK",payload:{todolistId:e,id:t}}}(e,t)),a(R("succeeded"))):K(a,o.data)})).catch((function(e){H(a,e.message)}))}}(t,a))}),[l,a,t]);return i.a.createElement("li",{key:a,className:c.status===o.Completed?"is-done":""},i.a.createElement(me,{changeBox:function(e){return s(e)},checked:c.status}),i.a.createElement(ie,{titleFromProps:c.title,changeTask:function(e){return u(e)}}),i.a.createElement(ue,{name:"x",callBack:function(){return d()}}))})),pe=i.a.memo((function(e){var t=e.id,a=Object(V.b)(),c=Object(V.c)((function(e){return e.todolists.filter((function(e){return e.id===t}))[0]})),l=Object(V.c)((function(e){return e.tasks[t]}));Object(r.useEffect)((function(){var e;a((e=c.id,function(t){t(R("loading")),D(e).then((function(a){console.log("get task",a),t(function(e,t){return{type:"SET-TASKS",payload:{todolistId:e,tasks:t}}}(e,a.data.items)),t(R("succeeded"))})).catch((function(e){H(t,e.message)}))}))}),[a,c.id]);var s=Object(r.useCallback)((function(){return a(B(c.id,"all"))}),[a,c.id]),u=Object(r.useCallback)((function(){return a(B(c.id,"active"))}),[a,c.id]),d=Object(r.useCallback)((function(){return a(B(c.id,"completed"))}),[a,c.id]);"active"===c.filter&&(l=l.filter((function(e){return e.status===o.New}))),"completed"===c.filter&&(l=l.filter((function(e){return e.status===o.Completed})));var m=Object(r.useCallback)((function(){var e;a((e=c.id,function(t){t(R("loading")),t({type:"CHANGE-TODOLIST-ENTITY-STATUS",payload:{id:e,status:"loading"}}),A(e).then((function(a){a.data.resultCode===n.success?(console.log("delete todo",a),t(function(e){return{type:"REMOVE-TODOLIST",payload:{id:e}}}(e)),t(R("succeeded"))):K(t,a.data)})).catch((function(e){H(t,e.message)}))}))}),[a,c.id]),f=Object(r.useCallback)((function(e){a(function(e,t){return function(a){a(R("loading")),w(e,t).then((function(e){if(e.data.resultCode===n.success){console.log("post task",e);var t=e.data.data.item;a(function(e){return{type:"ADD-TASK",payload:{task:e}}}(t)),a(R("succeeded"))}else K(a,e.data)})).catch((function(e){H(a,e.message)}))}}(c.id,e))}),[a,c.id]),b=Object(r.useCallback)((function(e){a(function(e,t){return function(a){a(R("loading")),L(e,t).then((function(o){o.data.resultCode===n.success?(console.log("update todo",o),a(function(e,t){return{type:"CHANGE-TODOLIST-TITLE",payload:{id:e,title:t}}}(e,t)),a(R("succeeded"))):K(a,o.data)})).catch((function(e){H(a,e.message)}))}}(c.id,e))}),[a,c.id]);return i.a.createElement("div",null,i.a.createElement("h3",null,i.a.createElement(ie,{titleFromProps:c.title,changeTask:b}),i.a.createElement(ue,{name:"x",callBack:m,entityStatus:c.entityStatus})),i.a.createElement(ae,{callBackAddTask:f,entityStatus:c.entityStatus}),i.a.createElement("ul",null,l.map((function(e){return i.a.createElement(fe,{key:e.id,taskId:e.id,todolistId:c.id})}))),i.a.createElement("div",null,i.a.createElement(p.a,{variant:"all"===c.filter?"contained":"outlined",color:"success",onClick:s},"All"),i.a.createElement(p.a,{variant:"active"===c.filter?"contained":"outlined",color:"primary",onClick:u},"Active"),i.a.createElement(p.a,{variant:"completed"===c.filter?"contained":"outlined",color:"secondary",onClick:d},"Completed")))})),be=a(16),Ee=function(){var e=Object(V.b)(),t=Object(V.c)((function(e){return e.todolists})),a=q((function(e){return e.auth.isLoggedIn}));Object(r.useEffect)((function(){a&&e((function(e){e(R("loading")),v().then((function(t){console.log("get todo",t),e({type:"SET-TODOLIST",payload:{todolists:t.data}}),e(R("succeeded"))})).catch((function(t){H(e,t.message)}))}))}),[e,a]);var o=Object(r.useCallback)((function(t){e(function(e){return function(t){t(R("loading")),C(e).then((function(a){a.data.resultCode===n.success?(console.log("post todo",a),t(function(e,t){return{type:"ADD-TODOLIST",payload:{title:e,todolistId:t}}}(e,a.data.data.item.id)),t(R("succeeded"))):K(t,a.data)})).catch((function(e){H(t,e.message)}))}}(t))}),[e]);return a?i.a.createElement(i.a.Fragment,null,i.a.createElement(ne.a,{container:!0,style:{padding:"20px"}},i.a.createElement(ae,{callBackAddTask:o})),i.a.createElement(ne.a,{container:!0,spacing:3},t.map((function(e){return i.a.createElement(ne.a,{key:e.id,item:!0},i.a.createElement(oe.a,{elevation:4,style:{padding:"10px"}},i.a.createElement(pe,{key:e.id,id:e.id})))})))):i.a.createElement(be.a,{to:"/login"})},ge=a(290),Oe=a(302),ye=a(301),Te=a(280),je=a(284),he=a(137),Ie=function(){var e=q((function(e){return e.auth.isLoggedIn})),t=Object(V.b)(),a=Object(he.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(e){var t={};return e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.email)||(t.email="Invalid email address"):t.email="Required",e.password?e.password.length<4&&(t.password="Invalid password length"):t.password="Required",t},onSubmit:function(e){var o;t((o=e,function(e){e(R("loading")),k(o).then((function(t){t.data.resultCode===n.success?(console.log("login data",t),e(_(!0)),e(R("succeeded"))):K(e,t.data)})).catch((function(t){H(e,t.message)}))})),a.resetForm()}});return e?i.a.createElement(be.a,{to:"/To-Do-List"}):i.a.createElement(ne.a,{container:!0,justifyContent:"center"},i.a.createElement(ne.a,{item:!0,justifyContent:"center"},i.a.createElement("form",{onSubmit:a.handleSubmit},i.a.createElement(ge.a,null,i.a.createElement(Te.a,null,i.a.createElement("p",null,"To log in get registered",i.a.createElement("br",null),i.a.createElement("a",{href:"https://social-network.samuraijs.com/",target:"_blank",rel:"noopener noreferrer"},"here")),i.a.createElement("p",null,"or use common test account credentials:"),i.a.createElement("p",null,"Email: free@samuraijs.com"),i.a.createElement("p",null,"Password: free")),i.a.createElement(ye.a,null,i.a.createElement(je.a,Object.assign({label:"Email",margin:"normal"},a.getFieldProps("email"))),a.touched.email&&a.errors.email&&i.a.createElement("div",{style:{color:"red"}},a.errors.email),i.a.createElement(je.a,Object.assign({type:"password",label:"Password",margin:"normal"},a.getFieldProps("password"))),a.touched.password&&a.errors.password&&i.a.createElement("div",{style:{color:"red"}},a.errors.password),i.a.createElement(Oe.a,{label:"Remember me",control:i.a.createElement(de.a,Object.assign({checked:a.values.rememberMe},a.getFieldProps("rememberMe")))}),i.a.createElement(p.a,{type:"submit",variant:"contained",color:"primary"},"Login"))))))},ke=a(289),Se=a(287),ve=i.a.forwardRef((function(e,t){return i.a.createElement(Se.a,Object.assign({elevation:6,ref:t,variant:"filled"},e))}));function Ce(){var e=q((function(e){return e.app.error})),t=Object(V.b)(),a=function(e,a){"clickaway"!==a&&t(G(null))};return i.a.createElement(ke.a,{open:!!e,autoHideDuration:6e3,onClose:a},i.a.createElement(ve,{onClose:a,severity:"error",sx:{width:"100%"}},e))}var Ae=a(283),Le=function(){var e=Object(V.b)();Object(r.useEffect)((function(){e((function(e){e(R("loading")),I().then((function(t){t.data.resultCode===n.success?(console.log("auth me data",t),e(_(!0)),e(R("succeeded"))):K(e,t.data)})).catch((function(t){H(e,t.message)})).finally((function(){e({type:"login/SET-IS-INITIALIZED",payload:{isInitialized:!0}})}))}))}),[e]);var t=q((function(e){return e.app.status}));return q((function(e){return e.auth.isInitialized}))?i.a.createElement("div",{className:"App"},i.a.createElement(Ce,null),i.a.createElement(W,null),"loading"===t&&i.a.createElement(Q.a,{color:"secondary"}),i.a.createElement($.a,{fixed:!0},i.a.createElement(be.d,null,i.a.createElement(be.b,{path:"/To-Do-List",element:i.a.createElement(Ee,null)}),i.a.createElement(be.b,{path:"/login",element:i.a.createElement(Ie,null)}),i.a.createElement(be.b,{path:"/404",element:i.a.createElement("h1",{style:{textAlign:"center"}},"404 page not found")}),i.a.createElement(be.b,{path:"*",element:i.a.createElement(be.a,{to:"/404"})})))):i.a.createElement("div",{style:{position:"fixed",top:"30%",textAlign:"center",width:"100%"}},i.a.createElement(Ae.a,null))},De=a(70);s.a.render(i.a.createElement(De.a,null,i.a.createElement(V.a,{store:J},i.a.createElement(Le,null))),document.getElementById("root"))}},[[157,1,2]]]);
//# sourceMappingURL=main.e8aadda6.chunk.js.map