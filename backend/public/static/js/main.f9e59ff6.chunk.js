(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{114:function(e,t,a){e.exports=a(137)},137:function(e,t,a){"use strict";a.r(t);var n=a(24),r=a(97),c=a(197),s=a(0),o=a.n(s),i=a(14),l=a(196),u=a(52),m=a(44),d=a(26),g=a.n(d),f=a(37),b=a(12),p=a(15),v=a(85),O=a(203),j=a(168),E=a(170),h=a(49),y=a(171),w=a(100),C=a(175),x=a(176),S=a(172),k=a(17),M=a(18),I=a.n(M);function N(){var e=Object(k.a)(["\n  fragment MessageListMessage on Message {\n    id\n    messageText\n    user {\n      id\n      username\n      email\n      firstName\n      lastName\n    }\n  }\n"]);return N=function(){return e},e}var D=I()(N());function $(){var e=Object(k.a)(["\n  query isLoggedIn {\n    isLoggedIn @client\n  }\n"]);return $=function(){return e},e}function L(){var e=Object(k.a)(["\n  query message($messageId: ID!) {\n    message(messageId: $messageId) {\n      id\n      messageText\n      user {\n        firstName\n        lastName\n        username\n        email\n        id\n      }\n    }\n  }\n"]);return L=function(){return e},e}function P(){var e=Object(k.a)(["\n  query allMessages {\n    allMessages {\n      ...MessageListMessage\n    }\n  }\n\n  ","\n"]);return P=function(){return e},e}function F(){var e=Object(k.a)(["\n  query me {\n    me {\n      email\n      firstName\n      id\n      lastName\n      username\n      messages {\n        id\n        user {\n          id\n        }\n      }\n    }\n  }\n"]);return F=function(){return e},e}var T=I()(F()),q=I()(P(),D),A=I()(L()),R=I()($());function U(){var e=Object(k.a)(["\n  mutation editMessageInCache($id: ID!, $text: String!) {\n    editMessageInCache(id: $id, text: $text) @client\n  }\n"]);return U=function(){return e},e}function Q(){var e=Object(k.a)(["\n  mutation logout {\n    logout @client\n  }\n"]);return Q=function(){return e},e}function _(){var e=Object(k.a)(["\n  mutation addAvatar($avatar: Upload!) {\n    addAvatar(avatar: $avatar) {\n      success\n    }\n  }\n"]);return _=function(){return e},e}function z(){var e=Object(k.a)(["\n  mutation editMessage($messageId: ID!, $updatedText: String!) {\n    editMessage(messageId: $messageId, updatedText: $updatedText) {\n      message\n      success\n      ... on EditMessageResult {\n        editedMessage {\n          id\n          messageText\n        }\n      }\n    }\n  }\n"]);return z=function(){return e},e}function B(){var e=Object(k.a)(["\n  mutation deletedMessageFromCache($id: ID!) {\n    deleteMessageFromCache(id: $id) @client\n  }\n"]);return B=function(){return e},e}function G(){var e=Object(k.a)(["\n  mutation deleteMessage($messageId: ID!) {\n    deleteMessage(messageId: $messageId) {\n      success\n      message\n    }\n  }\n"]);return G=function(){return e},e}function H(){var e=Object(k.a)(["\n  mutation sendMessage($messageText: String!) {\n    sendMessage(messageText: $messageText) {\n      success\n      message\n    }\n  }\n"]);return H=function(){return e},e}function K(){var e=Object(k.a)(["\n  mutation createAccount(\n    $username: String!\n    $email: String!\n    $password: String!\n    $firstName: String\n    $lastName: String\n  ) {\n    createUser(\n      userName: $username\n      password: $password\n      email: $email\n      firstName: $firstName\n      lastName: $lastName\n    ) {\n      success\n      message\n      ... on CreateUserResult {\n        user {\n          email\n          firstName\n          id\n          lastName\n          messages {\n            id\n            user {\n              id\n            }\n          }\n          username\n        }\n      }\n    }\n  }\n"]);return K=function(){return e},e}function V(){var e=Object(k.a)(["\n  mutation login($login: String!, $password: String!) {\n    login(login: $login, password: $password) {\n      message\n      success\n      ... on LoginResult {\n        token\n      }\n    }\n  }\n"]);return V=function(){return e},e}var W=I()(V()),J=I()(K()),Y=I()(H()),X=I()(G()),Z=I()(B()),ee=I()(z()),te=(I()(_()),I()(Q())),ae=I()(U()),ne=Object(v.a)((function(){return Object(O.a)({title:{flexGrow:1}})})),re=function(e){var t=e.children,a=Object(p.a)(),n=Object(p.c)(R),r=n.data,c=n.loading,i=ne(),l=Object(s.useState)(!1),u=Object(b.a)(l,2),m=u[0],d=u[1],v=Object(s.useRef)(null),O=Object(p.b)(te),k=Object(b.a)(O,1)[0],M=function(){d(!1)},I=function(){var e=Object(f.a)(g.a.mark((function e(){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return M(),e.next=3,k();case 3:a.resetStore();case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return o.a.createElement(o.a.Fragment,null,o.a.createElement(j.a,{position:"sticky"},o.a.createElement(E.a,null,o.a.createElement(h.a,{variant:"h6",className:i.title},"Chat App"),!c&&r&&r.isLoggedIn&&o.a.createElement(o.a.Fragment,null,o.a.createElement(y.a,{color:"inherit",onClick:function(){d(!0)}},o.a.createElement(S.a,{ref:v})),o.a.createElement(w.a,{anchorEl:v.current,getContentAnchorEl:null,anchorOrigin:{vertical:"bottom",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"center"},keepMounted:!0,open:m,onClose:M},o.a.createElement(C.a,{onClick:I},"Logout"))))),o.a.createElement(x.a,{maxWidth:"sm"},t))},ce=a(140),se=a(177),oe=a(178),ie=a(179),le=a(180),ue=a(183),me=a(181),de=a(182),ge=a(68);function fe(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function be(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?fe(a,!0).forEach((function(t){Object(ge.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):fe(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var pe={type:"CONFIRM",description:"",open:!1,title:"",onConfirm:function(){},onCancel:function(){}},ve=o.a.createContext({modalState:pe,setModalState:function(){}}),Oe=function(e){var t=e.children,a=Object(s.useState)(pe),n=Object(b.a)(a,2),r=n[0],c=n[1];return o.a.createElement(ve.Provider,{value:{modalState:r,setModalState:c}},t)},je=function(){var e=Object(s.useRef)(),t=Object(s.useContext)(ve),a=t.modalState,n=t.setModalState,r=function(){n((function(e){return be({},e,{open:!1})}))};return{confirm:function(){var t=Object(f.a)(g.a.mark((function t(a){return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n(be({},a,{open:!0,type:"CONFIRM",onCancel:function(){e.current&&e.current.reject()},onConfirm:function(){e.current&&e.current.resolve()}})),t.prev=3,t.next=6,new Promise((function(t,a){e.current={resolve:t,reject:a}}));case 6:return r(),t.abrupt("return",!0);case 10:return t.prev=10,t.t0=t.catch(3),r(),t.abrupt("return",!1);case 14:case"end":return t.stop()}}),t,null,[[3,10]])})));return function(e){return t.apply(this,arguments)}}(),modalState:a,form:function(){var e=Object(f.a)(g.a.mark((function e(t){var a;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=function(e){r(),t.onConfirm(e)},n(be({},t,{open:!0,onCancel:r,type:"FORM",onConfirm:a}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}},Ee=function(e){var t=e.message,a=e.isOwner,n=Object(p.b)(X,{variables:{messageId:t.id}}),r=Object(b.a)(n,1)[0],c=Object(p.b)(Z,{variables:{id:t.id}}),s=Object(b.a)(c,1)[0],i=Object(p.b)(ee),l=Object(b.a)(i,1)[0],u=je(),m=u.confirm,d=u.form,v=function(){var e=Object(f.a)(g.a.mark((function e(){var t;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m({title:"Delete Message?",description:"Deleting a message is permanent. Are you sure you want to do this?"});case 2:if(!e.sent){e.next=7;break}return e.next=5,r();case 5:(t=e.sent).data&&t.data.deleteMessage.success&&s();case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return o.a.createElement(o.a.Fragment,null,o.a.createElement(ce.a,null,o.a.createElement(se.a,null,o.a.createElement(oe.a,null,t.user.username[0].toUpperCase())),o.a.createElement(ie.a,{primary:t.user.username,secondary:t.messageText}),a&&o.a.createElement(o.a.Fragment,null,o.a.createElement(le.a,null,o.a.createElement(y.a,{color:"primary",edge:"end","aria-label":"edit",onClick:function(){d({title:"Edit Message",initialValue:t.messageText,onConfirm:function(e){l({variables:{messageId:t.id,updatedText:e}})}})}},o.a.createElement(me.a,null)),o.a.createElement(y.a,{color:"primary",edge:"end","aria-label":"delete",onClick:v},o.a.createElement(de.a,null))))),o.a.createElement(ue.a,null))},he=a(201),ye=a(184),we=a(185),Ce=a(186),xe=a(198),Se=a(187),ke=a(188),Me=function(){var e=je().modalState,t=Object(s.useState)(""),a=Object(b.a)(t,2),n=a[0],r=a[1];return Object(s.useEffect)((function(){"FORM"===e.type&&r(e.initialValue)}),[e]),o.a.createElement(he.a,{open:e.open,onClose:e.onCancel},o.a.createElement(ye.a,null,e.title),o.a.createElement(we.a,null,"CONFIRM"===e.type?o.a.createElement(Ce.a,null,e.description):o.a.createElement(xe.a,{autoFocus:!0,fullWidth:!0,value:n,onChange:function(e){var t=e.target;return r(t.value)},onKeyPress:function(t){"Enter"===t.key&&e.onConfirm(n)}})),o.a.createElement(Se.a,null,o.a.createElement(ke.a,{color:"primary",onClick:e.onCancel},"Cancel"),o.a.createElement(ke.a,{color:"primary",onClick:function(){return e.onConfirm(n)}},"Confirm")))},Ie=a(101),Ne=a(189),De=function(e){var t=e.children,a=Object(Ie.a)(e,["children"]),n=Object(m.h)(),r=Object(p.c)(R),c=r.data;return r.loading?o.a.createElement(Ne.a,null):o.a.createElement(m.b,a,c&&c.isLoggedIn?t:o.a.createElement(m.a,{to:{pathname:"/auth",state:{from:n}}}))},$e=a(99),Le=a(103),Pe=a(174),Fe=a(190),Te=a(191);function qe(){var e=Object(k.a)(["\n  subscription editsToMessage {\n    messageEdited {\n      id\n      messageText\n    }\n  }\n"]);return qe=function(){return e},e}function Ae(){var e=Object(k.a)(["\n  subscription deleteMessages {\n    messageDeleted\n  }\n"]);return Ae=function(){return e},e}function Re(){var e=Object(k.a)(["\n  subscription newMessages {\n    messageAdded {\n      id\n      messageText\n      user {\n        id\n        username\n        email\n        firstName\n        lastName\n      }\n    }\n  }\n"]);return Re=function(){return e},e}var Ue=I()(Re()),Qe=I()(Ae()),_e=I()(qe()),ze=Object(v.a)((function(e){return Object(O.a)({root:{maxHeight:"100vh",overflowY:"auto",position:"relative"},newMessageField:{width:"100%"},newMessageContainer:{position:"sticky",bottom:0}})})),Be=function(){var e=Object(p.c)(q),t=e.loading,a=e.data,n=Object(p.c)(T).data,r=ze(),c=Object(s.useRef)(null),i=Object(s.useState)(""),l=Object(b.a)(i,2),u=l[0],m=l[1],d=Object(p.b)(Y,{variables:{messageText:u}}),g=Object(b.a)(d,2),f=g[0],v=g[1].loading,O=Object(p.b)(Z),j=Object(b.a)(O,1)[0],E=Object(p.b)(ae),h=Object(b.a)(E,1)[0];return Object(p.d)(Ue,{onSubscriptionData:function(e){var t=e.subscriptionData,a=e.client,n=a.readQuery({query:q});a.writeQuery({query:q,data:{allMessages:[].concat(Object($e.a)(n.allMessages),[t.data.messageAdded])}})}}),Object(p.d)(Qe,{onSubscriptionData:function(e){var t=e.subscriptionData;t.data&&j({variables:{id:t.data.messageDeleted}})}}),Object(p.d)(_e,{onSubscriptionData:function(e){var t=e.subscriptionData;t.data&&h({variables:{id:t.data.messageEdited.id,text:t.data.messageEdited.messageText}})}}),Object(s.useLayoutEffect)((function(){c.current&&c.current.scrollIntoView()}),[a]),t?o.a.createElement(Ne.a,null):o.a.createElement(Le.a,{className:r.root},o.a.createElement(Pe.a,null,a&&a.allMessages.map((function(e){return o.a.createElement(Ee,{key:e.id,message:e,isOwner:n&&n.me&&n.me.username===e.user.username||!1})})),o.a.createElement("div",{ref:c})),o.a.createElement(Le.a,{className:r.newMessageContainer},o.a.createElement(xe.a,{label:"Send a message",variant:"filled",value:u,onChange:function(e){var t=e.target;m(t.value)},onKeyDown:function(e){"Enter"===e.key&&(f(),m(""))},className:r.newMessageField,InputProps:{endAdornment:o.a.createElement(Fe.a,{position:"end"},o.a.createElement(y.a,{color:"primary",disabled:v,onClick:function(){f(),m("")}},o.a.createElement(Te.a,null)))}})))},Ge=a(199),He=a(192),Ke=a(202),Ve=a(195),We=a(193),Je=a(194),Ye=function(){var e=Object(s.useState)(""),t=Object(b.a)(e,2),a=t[0],n=t[1],r=Object(s.useState)(!1),c=Object(b.a)(r,2),i=c[0],l=c[1];return{openSnackbar:function(e){l(!0),n(e)},snackbarProps:{open:i,message:o.a.createElement("span",{id:"message"},a),onClose:function(e,t){"clickaway"!==t&&(l(!1),n(""))},ContentProps:{"aria-describedby":"message"}}}},Xe=Object(v.a)((function(e){return Object(O.a)({form:{display:"flex",flexDirection:"column"},card:{padding:e.spacing(2),flexGrow:1},title:{marginBottom:e.spacing(2),textAlign:"center"},textField:{marginBottom:e.spacing(1)},buttons:{display:"flex",justifyContent:"center"}})})),Ze=function(){var e=Xe();return o.a.createElement(Ge.a,{display:"flex",flexDirection:"column",alignItems:"center"},o.a.createElement(h.a,{variant:"h2",className:e.title},"Welcome!"),o.a.createElement(He.a,{variant:"contained",size:"large",color:"primary"},o.a.createElement(ke.a,{component:u.b,to:"/auth/login"},"Login"),o.a.createElement(ke.a,{component:u.b,to:"/auth/create-account"},"Create Account")))},et=function(){var e=Object(p.a)(),t=Object(m.g)(),a=Object(p.b)(J),n=Object(b.a)(a,2),r=n[0],c=n[1].loading,i=Object(p.b)(W),l=Object(b.a)(i,2),u=l[0],d=l[1].loading,v=Ye(),O=v.openSnackbar,j=v.snackbarProps,E=Object(s.useState)(""),w=Object(b.a)(E,2),C=w[0],x=w[1],S=Object(s.useState)(""),k=Object(b.a)(S,2),M=k[0],I=k[1],N=Object(s.useState)(""),D=Object(b.a)(N,2),$=D[0],L=D[1],P=Object(s.useState)(""),F=Object(b.a)(P,2),q=F[0],A=F[1],R=Object(s.useState)(""),U=Object(b.a)(R,2),Q=U[0],_=U[1],z=Object(s.useState)(!1),B=Object(b.a)(z,2),G=B[0],H=B[1],K=Xe(),V=function(){var a=Object(f.a)(g.a.mark((function a(n){var c,s,o;return g.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n.preventDefault(),a.next=3,r({variables:{email:C,username:q,password:Q,firstName:M,lastName:$}});case 3:if(!(c=a.sent).data||c.data.createUser.success){a.next=7;break}return O(c.data.createUser.message||"There was a problem creating your account"),a.abrupt("return");case 7:return a.next=9,u({variables:{login:C,password:Q}});case 9:if(!(s=a.sent).data||s.data.login.success){a.next=13;break}return O(s.data.login.message||"There was a problem logging in."),a.abrupt("return");case 13:c.data&&c.data.createUser.success&&"CreateUserResult"===c.data.createUser.__typename&&s.data&&s.data.login.success&&"LoginResult"===s.data.login.__typename&&s.data.login.token&&(e.writeQuery({query:T,data:{me:c.data.createUser.user}}),o=s.data.login.token,localStorage.setItem("token",o),e.writeData({data:{isLoggedIn:!0}}),t.push("/"));case 14:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}();return o.a.createElement(o.a.Fragment,null,o.a.createElement(h.a,{variant:"h2",className:K.title},"Create Account"),o.a.createElement("form",{onSubmit:V,className:K.form},o.a.createElement(xe.a,{label:"Username",id:"user-username",value:q,onChange:function(e){var t=e.target;A(t.value)},autoComplete:"username",variant:"outlined",className:K.textField,required:!0}),o.a.createElement(xe.a,{label:"Email",id:"user-email",value:C,onChange:function(e){var t=e.target;x(t.value)},autoComplete:"email",variant:"outlined",className:K.textField,required:!0}),o.a.createElement(xe.a,{label:"Password",id:"user-password",value:Q,onChange:function(e){var t=e.target;_(t.value)},autoComplete:"new-password",variant:"outlined",className:K.textField,type:G?"text":"password",InputProps:{endAdornment:o.a.createElement(Fe.a,{position:"end"},o.a.createElement(y.a,{edge:"end","aria-label":"toggle password visibility",onClick:function(){return H((function(e){return!e}))},onMouseDown:function(e){e.preventDefault()}},G?o.a.createElement(We.a,null):o.a.createElement(Je.a,null)))},required:!0}),o.a.createElement(xe.a,{label:"First Name",id:"user-firstName",value:M,onChange:function(e){var t=e.target;I(t.value)},autoComplete:"given-name",variant:"outlined",className:K.textField}),o.a.createElement(xe.a,{label:"Last Name",id:"user-lastName",value:$,onChange:function(e){var t=e.target;L(t.value)},autoComplete:"family-name",variant:"outlined",className:K.textField}),o.a.createElement(ke.a,{disabled:d||c,type:"submit",color:"primary",variant:"contained"},"Create Account")),o.a.createElement(Ke.a,Object.assign({},j,{anchorOrigin:{vertical:"bottom",horizontal:"right"},autoHideDuration:6e3})))},tt=function(){var e=Object(p.a)(),t=Object(m.g)(),a=Object(p.b)(W),n=Object(b.a)(a,2),r=n[0],c=n[1].loading,i=Ye(),l=i.openSnackbar,u=i.snackbarProps,d=Object(s.useState)(""),v=Object(b.a)(d,2),O=v[0],j=v[1],E=Object(s.useState)(""),w=Object(b.a)(E,2),C=w[0],x=w[1],S=Object(s.useState)(!1),k=Object(b.a)(S,2),M=k[0],I=k[1],N=Xe(),D=function(){var a=Object(f.a)(g.a.mark((function a(n){var c,s;return g.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n.preventDefault(),a.next=3,r({variables:{login:O,password:C}});case 3:(c=a.sent).data&&c.data.login.success&&"LoginResult"===c.data.login.__typename&&c.data.login.token?(s=c.data.login.token,localStorage.setItem("token",s),e.writeData({data:{isLoggedIn:!0}}),t.push("/")):l(c.data&&c.data.login.message||"There was an issue logging in");case 5:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}();return o.a.createElement(o.a.Fragment,null,o.a.createElement(h.a,{variant:"h2",className:N.title},"Login"),o.a.createElement("form",{onSubmit:D,className:N.form},o.a.createElement(xe.a,{label:"Login",id:"user-login",placeholder:"Username or email",value:O,onChange:function(e){var t=e.target;j(t.value)},autoComplete:"email",variant:"outlined",className:N.textField,required:!0}),o.a.createElement(xe.a,{label:"Password",id:"user-password",value:C,onChange:function(e){var t=e.target;x(t.value)},autoComplete:"current-password",variant:"outlined",type:M?"text":"password",className:N.textField,InputProps:{endAdornment:o.a.createElement(Fe.a,{position:"end"},o.a.createElement(y.a,{edge:"end","aria-label":"toggle password visibility",onClick:function(){return I((function(e){return!e}))},onMouseDown:function(e){e.preventDefault()}},M?o.a.createElement(We.a,null):o.a.createElement(Je.a,null)))},required:!0}),o.a.createElement(ke.a,{disabled:c,type:"submit",color:"primary",variant:"contained"},"Login")),o.a.createElement(Ke.a,Object.assign({},u,{anchorOrigin:{vertical:"bottom",horizontal:"right"},autoHideDuration:6e3})))},at=function(){var e=Object(p.c)(R),t=e.data,a=e.loading,n=Xe();return a?o.a.createElement(Ne.a,null):t&&t.isLoggedIn?o.a.createElement(m.a,{to:"/"}):o.a.createElement(Ge.a,{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh"},o.a.createElement(Ve.a,{className:n.card},o.a.createElement(m.d,null,o.a.createElement(m.b,{exact:!0,path:"/auth"},o.a.createElement(Ze,null)),o.a.createElement(m.b,{path:"/auth/login"},o.a.createElement(tt,null)),o.a.createElement(m.b,{path:"/auth/create-account"},o.a.createElement(et,null)))))},nt=function(){return o.a.createElement(u.a,null,o.a.createElement(m.d,null,o.a.createElement(m.b,{path:"/auth"},o.a.createElement(at,null)),o.a.createElement(De,{path:"/"},o.a.createElement(Be,null))),o.a.createElement(Me,null))},rt=function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(l.a,null),o.a.createElement(re,null,o.a.createElement(nt,null)))},ct=a(98),st=a(45),ot=a(25),it=a(96),lt=a(95),ut=a(94),mt=a(6),dt=a(93);function gt(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function ft(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?gt(a,!0).forEach((function(t){Object(ge.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):gt(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function bt(){var e=Object(k.a)(["\n  extend type Query {\n    isLoggedIn: Boolean!\n  }\n\n  extend type Mutation {\n    saveLogin(token: String!): String!\n    logout: String!\n    deleteMessageFromCache(id: ID!): String!\n    editMessageInCache(id: ID!, text: String!): String!\n  }\n"]);return bt=function(){return e},e}var pt=I()(bt()),vt={Mutation:{saveLogin:function(e,t,a){var n=t.token,r=a.cache;return localStorage.setItem("token",n),r.writeData({data:{isLoggedIn:!0}}),"Logged in"},logout:function(e,t,a){a.cache;return localStorage.removeItem("token"),"Logged out"},deleteMessageFromCache:function(e,t,a){var n=a.cache,r=n.readQuery({query:q});if(r&&r.allMessages){var c=r.allMessages.filter((function(e){return e.id!==t.id}));return n.writeQuery({query:q,data:{allMessages:c}}),"Deleted message ".concat(t.id)}return"Error deleting message. Cache read query returned null"},editMessageInCache:function(e,t,a){var n=a.cache,r=n.readQuery({query:A,variables:{messageId:t.id}});return r&&r.message?(n.writeQuery({query:A,variables:{messageId:t.id},data:{message:ft({},r.message,{messageText:t.text})}}),"Success"):"Couldn't find message"}}},Ot=new ct.a({cacheRedirects:{Query:{message:function(e,t,a){return(0,a.getCacheKey)({__typename:"Message",id:t.messageId})}}}}),jt=Object(dt.createUploadLink)({uri:"http://192.168.1.231:4000/graphql"}),Et=new ut.a({uri:"ws://192.168.1.231:4000/graphql",options:{timeout:3e4,reconnect:!0}}),ht=Object(lt.a)((function(e){var t=e.graphQLErrors,a=e.networkError;t&&t.forEach((function(e){var t=e.message,a=e.locations,n=e.path;console.log("[GraphQL error]: Message: ".concat(t,", Location: ").concat(a,", Path: ").concat(n))})),a&&console.log("[Network error]: ".concat(a))})),yt=Object(it.a)((function(e,t){var a=t.headers,n=localStorage.getItem("token");return{headers:ft({},a,{authorization:n?"Bearer ".concat(n):""})}})),wt=ot.ApolloLink.from([ht,yt.concat(Object(ot.split)((function(e){var t=e.query,a=Object(mt.l)(t);return"OperationDefinition"===a.kind&&"subscription"===a.operation}),Et,jt))]),Ct=new st.a({cache:Ot,link:wt,typeDefs:pt,resolvers:vt});Ot.writeData({data:{isLoggedIn:!!localStorage.getItem("token")}});var xt=Ct;Object(i.render)(o.a.createElement((function(e){var t=e.children,a=Object(r.a)();return o.a.createElement(n.a,{client:xt},o.a.createElement(c.a,{theme:a},o.a.createElement(Oe,null,t)))}),null,o.a.createElement(rt,null)),document.getElementById("root"))}},[[114,1,2]]]);
//# sourceMappingURL=main.f9e59ff6.chunk.js.map