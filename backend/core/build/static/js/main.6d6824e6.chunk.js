(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{12:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var c=n(1),o=n.n(c),a=n(7),r=n.n(a),s=(n(12),n(2)),i=n(4),u=n(6),b=n(5),j=n(0),h=function(){var e=Object(c.useState)({name:"",ssn:"",dob:""}),t=Object(u.a)(e,2),n=t[0],o=t[1],a=Object(c.useState)({message:""}),r=Object(u.a)(a,2),h=(r[0],r[1]),d=n.name,p=n.ssn,f=n.dob,O=function(e){return o(Object(i.a)(Object(i.a)({},n),{},Object(s.a)({},e.target.name,e.target.value)))};return Object(j.jsx)("div",{children:Object(j.jsxs)("form",{onSubmit:function(e){return function(e){e.preventDefault();var t=Object(b.sha256)(d+p+f);console.log(Object(b.sha256)(d+p+f)),fetch("http://localhost:8000/api/add/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({vote:"biden",voter_hash:t})}).then((function(e){return e.json()})).then((function(e){h(e.message)}))}(e)},children:[Object(j.jsx)("input",{type:"text",placeholder:"Name",name:"name",onChange:function(e){return O(e)}}),Object(j.jsx)("input",{type:"text",placeholder:"SSN",name:"ssn",onChange:function(e){return O(e)}}),Object(j.jsx)("input",{type:"text",placeholder:"DOB",name:"dob",onChange:function(e){return O(e)}}),Object(j.jsx)("input",{type:"submit"})]})})},d=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,18)).then((function(t){var n=t.getCLS,c=t.getFID,o=t.getFCP,a=t.getLCP,r=t.getTTFB;n(e),c(e),o(e),a(e),r(e)}))};r.a.render(Object(j.jsx)(o.a.StrictMode,{children:Object(j.jsx)(h,{})}),document.getElementById("root")),d()}},[[17,1,2]]]);
//# sourceMappingURL=main.6d6824e6.chunk.js.map