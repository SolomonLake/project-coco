(window["webpackJsonpdemo-react"]=window["webpackJsonpdemo-react"]||[]).push([[0],[,,,,,function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},function(e,t,n){e.exports=n(14)},,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var o=n(1),r=n.n(o),a=n(2),c=n(0),s=n.n(c),i=n(4),u=n.n(i),l=(n(12),n(5)),p=n.n(l),d=(n(13),function(){return s.a.createElement("div",{className:"App"},s.a.createElement("header",{className:"App-header"},s.a.createElement("img",{src:p.a,className:"App-logo",alt:"logo"}),s.a.createElement("p",null,"Edit ",s.a.createElement("code",null,"src/App.tsx")," and save to reload..."),s.a.createElement("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer"},"Learn React")))}),m=function(e){var t=new RegExp(e+"=(.*?)($|&)","g"),n=decodeURIComponent(window.location.search).match(t);return n&&n.length?n[0].replace(e+"=","").replace("&",""):null},f=function(){switch(window.location.host){case"localhost:3006":return{CLOUD_FUNCTION_ENDPOINT:"http://localhost:8080"};case"solomonlake.github.io":return{CLOUD_FUNCTION_ENDPOINT:"https://us-central1-project-coco-251813.cloudfunctions.net"};default:throw new Error("unknown window host:".concat(window.location.host))}},h={initialize:function(){var e=m("zoom_token_data");if(e){var t=JSON.parse(decodeURIComponent(e));return console.log("tokenData",t),t}return window.location.href=f().CLOUD_FUNCTION_ENDPOINT+"/zoomGetTokenData",{expiresAt:0,access_token:"",token_type:"",refresh_token:"",expires_in:0,scope:""}},getUser:function(){var e=Object(a.a)(r.a.mark(function e(){var t,n;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return"https://api.zoom.us/v2/users/me",e.next=3,fetch(f().CLOUD_FUNCTION_ENDPOINT+"/zoomApiProxy?endPoint=".concat("https://api.zoom.us/v2/users/me","&zoomTokenData=").concat(encodeURIComponent(JSON.stringify(w))));case 3:return t=e.sent,e.next=6,t.json();case 6:return n=e.sent,e.abrupt("return",n);case 8:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}()},w=h.initialize();function N(){return(N=Object(a.a)(r.a.mark(function e(){var t;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.getUser();case 2:t=e.sent,console.log("zoom user",t),u.a.render(s.a.createElement(d,null),document.getElementById("root"));case 5:case"end":return e.stop()}},e)}))).apply(this,arguments)}!function(){N.apply(this,arguments)}()}],[[6,1,2]]]);
//# sourceMappingURL=main.5a8f4dcc.chunk.js.map