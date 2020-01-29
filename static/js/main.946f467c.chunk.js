(this["webpackJsonpdemo-react"]=this["webpackJsonpdemo-react"]||[]).push([[0],{54:function(e,t,a){e.exports=a(76)},76:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),c=a(11),u=a.n(c),s=a(3),o=a.n(s),i=a(78),p=a(111),l=function(){return n.a.createElement(p.a,{container:!0,direction:"column",justify:"center",alignItems:"center",spacing:5},n.a.createElement(p.a,{item:!0},n.a.createElement(i.a,null,"Loading")))},d=a(23),m={view:"initial"};function f(e,t){switch(console.log("appStoreReducer previous state:",e),console.log("appStoreReducer",t),t.type){case"TRANSITION_APP_STATE":return a=t.newAppState,console.log("appStoreReducer computed state",a),a;default:t.type;return e}var a}var v=n.a.createContext(null);var w=a(13),I={joinId:""};function g(e,t){switch(console.log("joinGroupStoreReducer previous state:",e),console.log("joinGroupStoreReducer",t),t.type){case"UPDATE_JOIN_ID":return a=Object(w.a)({},e,{joinId:t.newJoinId}),console.log("joinGroupStoreReducer computed state",a),a;default:t.type;return e}var a}n.a.createContext(null);var E=a(119),h=a(121),x=a(114),y=a(15),G=a(30),S=a.n(G);a(73);function T(){if(b)return b;throw new Error("config not initialized")}var b=null;function A(){if(j)return j;throw new Error("firestoreDb not initialized")}function O(e){return o.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return S.a.initializeApp({apiKey:T().FIRESTORE_API_KEY,authDomain:T().FIRESTORE_AUTH_DOMAIN,projectId:T().FIRESTORE_PROJECT_ID}),t.next=3,o.a.awrap(S.a.auth().signInWithCustomToken(e).catch((function(e){var t=e.code,a=e.message;throw console.log("firestoreInitialize error",t,a),e})));case 3:j=S.a.firestore();case 4:case"end":return t.stop()}}))}var j=null,_=function(e){return{get:function(t){var a,r;return o.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return a=A().collection(e).doc(t),n.next=3,o.a.awrap(a.get());case 3:if(!(r=n.sent).exists){n.next=8;break}return n.abrupt("return",r.data());case 8:return n.abrupt("return",null);case 9:case"end":return n.stop()}}))},set:function(t,a){return o.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,o.a.awrap(A().collection(e).doc(t).set(a));case 2:case"end":return r.stop()}}))},update:function(t,a){return o.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,o.a.awrap(A().collection(e).doc(t).update(a));case 2:case"end":return r.stop()}}))},delete:function(t){return o.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,o.a.awrap(A().collection(e).doc(t).delete());case 2:case"end":return a.stop()}}))},watch:function(t,a){return A().collection(e).doc(t).onSnapshot((function(e){a(e.data())}))}}};function N(e,t){for(var a="",r=0;r<e;r++)a+=t.charAt(Math.floor(Math.random()*t.length));return a}var C=_("appGroups"),P={watchAppGroup:function(e,t){return C.watch(e,t)},getAppGroup:function(e){return o.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.a.awrap(C.get(e));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}))},getExistingAppGroup:function(e){var t;return o.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,o.a.awrap(C.get(e));case 2:if(!(t=a.sent)){a.next=7;break}return a.abrupt("return",t);case 7:throw new Error("getExistingAppGroup: group doesn't exist with id:"+e);case 8:case"end":return a.stop()}}))},deleteAppGroup:function(e){return o.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.a.awrap(C.delete(e));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}))},createAppGroup:function(e){return o.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.a.awrap(C.set(e.appGroupId,e));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}))},createNewAppGroup:function(e){var t;return o.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return t={appGroupId:"g"+(r=5,N(r,"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789")),userIds:Object(y.a)({},e.userId,Object(w.a)({},e,{userId:e.userId,lastOnline:Date.now(),availabilityStatus:"available",currentMeeting:null,dailyCalendarEvents:[]}))},a.next=3,o.a.awrap(C.set(t.appGroupId,t));case 3:return a.abrupt("return",t);case 4:case"end":return a.stop()}var r}))},userJoinExistingAppGroup:function(e,t){var a,r;return o.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return a=Object(w.a)({},e,{userId:e.userId,lastOnline:Date.now(),availabilityStatus:"available",currentMeeting:null,dailyCalendarEvents:[]}),r=Object(y.a)({},"userIds.".concat(e.userId),a),C.update(t,r),n.abrupt("return",P.getExistingAppGroup(t));case 4:case"end":return n.stop()}}))},removeUserFromAppGroup:function(e,t){return o.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,o.a.awrap(C.update(e.appGroupId,Object(y.a)({},"userIds.".concat(t.userId),S.a.firestore.FieldValue.delete())));case 2:case"end":return a.stop()}}))},setUserCalendarEvents:function(e,t,a){var r=Object(y.a)({},"userIds.".concat(e,".dailyCalendarEvents"),a);C.update(t,r)},sendAlivePing:function(e,t){var a=Object(y.a)({},"userIds.".concat(e,".lastOnline"),Date.now());C.update(t,a)}},U=_("users"),D={getUser:function(e){return o.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.a.awrap(U.get(e));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}))},createUser:function(e){return o.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.a.awrap(U.set(e.userId,e));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}))},findOrCreateUser:function(e){var t,a;return o.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,o.a.awrap(D.getUser(e.id));case 2:if(!(t=r.sent)){r.next=7;break}return r.abrupt("return",t);case 7:return a={userId:e.id,groupId:null,displayName:e.first_name+" "+e.last_name,personalMeetingUrl:e.personal_meeting_url,avatarUrl:e.pic_url},r.next=10,o.a.awrap(U.set(a.userId,a));case 10:return r.abrupt("return",a);case 11:case"end":return r.stop()}}))},updateGroup:function(e,t){return o.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,o.a.awrap(U.update(e,{groupId:t}));case 2:case"end":return a.stop()}}))}},R=a(18),k=a.n(R),M=function(e){var t;return o.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,o.a.awrap(P.createNewAppGroup(e));case 2:return t=a.sent,a.next=5,o.a.awrap(D.updateGroup(e.userId,t.appGroupId));case 5:return a.abrupt("return",t);case 6:case"end":return a.stop()}}))},F=function(e,t){var a;return o.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,o.a.awrap(P.getAppGroup(t));case 2:if(!r.sent){r.next=12;break}return r.next=6,o.a.awrap(P.userJoinExistingAppGroup(e,t));case 6:return a=r.sent,r.next=9,o.a.awrap(D.updateGroup(e.userId,t));case 9:return r.abrupt("return",a);case 12:return r.abrupt("return",null);case 13:case"end":return r.stop()}}))},L=function(e,t){var a;return o.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,o.a.awrap(D.updateGroup(e.userId,null));case 2:return r.next=4,o.a.awrap(P.removeUserFromAppGroup(t,e));case 4:return r.next=6,o.a.awrap(P.getAppGroup(t.appGroupId));case 6:if(!(a=r.sent)||!a.userIds||0!==k.a.values(a.userIds).length){r.next=10;break}return r.next=10,o.a.awrap(P.deleteAppGroup(a.appGroupId));case 10:case"end":return r.stop()}}))},J=function(e){var t=Object(r.useContext)(v),a=function(){var e=Object(r.useReducer)(g,I),t=Object(d.a)(e,2);return{state:t[0],dispatch:t[1]}}();return n.a.createElement(p.a,{container:!0,direction:"column",justify:"center",alignItems:"center",spacing:5},n.a.createElement(p.a,{item:!0},n.a.createElement(p.a,{container:!0,direction:"row",justify:"center",alignItems:"center",spacing:2},n.a.createElement(p.a,{item:!0},n.a.createElement(E.a,{label:"Group Id",margin:"normal",variant:"outlined",value:a.state.joinId,onChange:function(e){a.dispatch({type:"UPDATE_JOIN_ID",newJoinId:e.target.value})}})),n.a.createElement(p.a,{item:!0},n.a.createElement(h.a,{color:"primary",variant:"contained",onClick:function(){var r;return o.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return t.dispatch({type:"TRANSITION_APP_STATE",newAppState:{view:"loading"}}),n.next=3,o.a.awrap(F(e.appState.user,a.state.joinId));case 3:(r=n.sent)?t.dispatch({type:"TRANSITION_APP_STATE",newAppState:{view:"mainGroup",user:Object(w.a)({},e.appState.user,{groupId:r.appGroupId}),initialAppGroup:r}}):(t.dispatch({type:"TRANSITION_APP_STATE",newAppState:e.appState}),console.log("group doesn't exist"));case 5:case"end":return n.stop()}}))}},"Join")))),n.a.createElement(x.a,{variant:"middle"}),n.a.createElement(p.a,{item:!0},n.a.createElement(h.a,{color:"secondary",variant:"contained",onClick:function(){var a;return o.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return t.dispatch({type:"TRANSITION_APP_STATE",newAppState:{view:"loading"}}),r.next=3,o.a.awrap(M(e.appState.user));case 3:a=r.sent,t.dispatch({type:"TRANSITION_APP_STATE",newAppState:{view:"mainGroup",user:Object(w.a)({},e.appState.user,{groupId:a.appGroupId}),initialAppGroup:a}});case 5:case"end":return r.stop()}}))}},"Create Group")))},K=a(116);function z(e,t){switch(console.log("mainGroupStoreReducer previous state:",e),console.log("mainGroupStoreReducer",t),t.type){case"UPDATE_APP_GROUP":return H(Object(w.a)({},e,{appGroup:t.newAppGroup}));case"CHECK_FOR_MEETINGS_UI_UPDATE":return H(Object(w.a)({},e,{lastCheckForMeetingUIUpdate:Date.now()}));default:return e}}function H(e){return console.log("mainGroupStoreReducer computed state",e),e}n.a.createContext(null);var B=null,V=function(){var e,t,a,r;return o.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,o.a.awrap(o.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:if(!B){e.next=6;break}return e.next=3,o.a.awrap(B);case 3:return e.abrupt("return",gapi.client);case 6:return B=o.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.awrap(new Promise((function(e,t){gapi.load("client:auth2",{callback:function(){var t,a;return o.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return t={apiKey:T().GOOGLE_CALENDAR_API_KEY,clientId:T().GOOGLE_AUTH_CLIENT_ID,discoveryDocs:["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],scope:"https://www.googleapis.com/auth/calendar.events.readonly"},r.next=3,o.a.awrap(gapi.client.init(t));case 3:if((a=gapi.auth2.getAuthInstance()).isSignedIn.get()){r.next=8;break}return r.next=8,o.a.awrap(a.signIn());case 8:e();case 9:case"end":return r.stop()}}))}})})));case 2:case"end":return e.stop()}})),e.next=9,o.a.awrap(B);case 9:return e.abrupt("return",gapi.client);case 10:case"end":return e.stop()}})));case 2:return e=n.sent,n.next=5,o.a.awrap(e.calendar.events.list({calendarId:"primary",timeMin:(new Date).toISOString(),showDeleted:!1,singleEvents:!0,maxResults:10,orderBy:"startTime"}));case 5:return t=n.sent,a=t.result,r=a.items||[],console.log("Upcoming events:"),r.map((function(e){var t=e.start?e.start.dateTime||e.start.date:null;console.log(e.summary+" ("+t+")")})),n.abrupt("return",r);case 11:case"end":return n.stop()}}))},W=function(e,t){var a,r;return o.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,o.a.awrap(V());case 2:a=n.sent,r=a.map(Y),P.setUserCalendarEvents(e,t,r);case 5:case"end":return n.stop()}}))};function Y(e){var t=e.id,a=e.summary,r=e.start?e.start.dateTime||e.start.date:null,n=e.end?e.end.dateTime||e.end.date:null,c=e.htmlLink;if(t&&a&&r&&n&&c)return{id:t,eventName:a,startTime:r,endTime:n,eventLink:c};throw console.log("gapi calendar event",e),new Error("gapi calendar event is missing properties")}var q=a(115),Q=function(e){return e.toLocaleTimeString().slice(0,-6)+e.toLocaleTimeString().slice(9,11)},X=function(e){var t=e.mainGroupStore.state.appGroup.userIds[e.user.userId].dailyCalendarEvents,a=Object(r.useState)(Z(t)),c=Object(d.a)(a,2),u=c[0],s=c[1];return n.a.useEffect((function(){s(Z(t));var e=setInterval((function(){s(Z(t))}),1e4);return function(){clearInterval(e)}}),[e.mainGroupStore.state.appGroup.userIds[e.user.userId].dailyCalendarEvents]),n.a.createElement(p.a,{container:!0,direction:"row",spacing:2,justify:"flex-start",alignItems:"center"},n.a.createElement(p.a,{item:!0},n.a.createElement(q.a,{alt:e.user.displayName,src:e.user.avatarUrl})),n.a.createElement(p.a,{item:!0},n.a.createElement(p.a,{container:!0,direction:"column",spacing:0,justify:"flex-start"},n.a.createElement(p.a,{item:!0},n.a.createElement(i.a,null,e.user.displayName)),e.showNextMeetingTime&&n.a.createElement(p.a,{item:!0},e.currentUser&&"Calendar not synced"===u?n.a.createElement(i.a,{variant:"caption",color:"error"},n.a.createElement("i",null,u)):n.a.createElement(i.a,{variant:"caption"},n.a.createElement("i",null,u))))))};function Z(e){var t=new Date,a=t.getTime(),r=t.toDateString(),n=e.filter((function(e){var t=new Date(e.endTime).getTime()>a,n=new Date(e.startTime).toDateString();return t&&n===r}))[0];if(n){var c=new Date(n.startTime),u=new Date(n.endTime),s=c.getTime()<a,o=Q(c),i=Q(u);return s?"".concat(n.eventName," ends at ").concat(i):"Next meeting at ".concat(o)}return 0===e.length?"Calendar not synced":"No upcoming events"}var $=function(e){return n.a.createElement(p.a,{container:!0,direction:"column",spacing:2,justify:"center"},n.a.createElement(p.a,{item:!0},n.a.createElement(p.a,{container:!0,direction:"row",spacing:3,justify:"center",alignItems:"center"},n.a.createElement(p.a,{item:!0},n.a.createElement(i.a,null,"Group Id: ",e.mainGroupStore.state.appGroup.appGroupId)),n.a.createElement(p.a,{item:!0},n.a.createElement(h.a,{variant:"contained",color:"primary",onClick:function(){return o.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:W(e.user.userId,e.mainGroupStore.state.appGroup.appGroupId);case 1:case"end":return t.stop()}}))}},"Sync Google Calendar")))),n.a.createElement(p.a,{item:!0},n.a.createElement(X,{user:e.user,mainGroupStore:e.mainGroupStore,currentUser:!0,showNextMeetingTime:!0})),n.a.createElement(p.a,{item:!0},n.a.createElement(x.a,null)))},ee=function(e){return n.a.createElement(h.a,{variant:"contained",color:"secondary",onClick:function(){return o.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return e.appStore.dispatch({type:"TRANSITION_APP_STATE",newAppState:{view:"loading"}}),t.next=3,o.a.awrap(L(e.user,e.mainGroupStore.state.appGroup));case 3:e.appStore.dispatch({type:"TRANSITION_APP_STATE",newAppState:{view:"joinGroup",user:Object(w.a)({},e.user,{groupId:null})}});case 4:case"end":return t.stop()}}))}},"Leave Group")};function te(e){var t=Date.now();return e.filter((function(e){var a=new Date(e.endTime).getTime()>t,r=new Date(e.startTime).getTime();return a&&r<t}))[0]}var ae=function(e){var t=Object(r.useContext)(v),a=function(e){var t=Object(r.useReducer)(z,{appGroup:e,lastCheckForMeetingUIUpdate:0}),a=Object(d.a)(t,2);return{state:a[0],dispatch:a[1]}}(e.appState.initialAppGroup);n.a.useEffect((function(){W(e.appState.user.userId,a.state.appGroup.appGroupId);var t=setInterval((function(){W(e.appState.user.userId,a.state.appGroup.appGroupId)}),6e5);P.sendAlivePing(e.appState.user.userId,a.state.appGroup.appGroupId);var r,n,c=setInterval((function(){P.sendAlivePing(e.appState.user.userId,a.state.appGroup.appGroupId)}),6e4),u=(r=a.state.appGroup.appGroupId,n=a.dispatch,P.watchAppGroup(r,(function(e){n({type:"UPDATE_APP_GROUP",newAppGroup:e})}))),s=setInterval((function(){a.dispatch({type:"CHECK_FOR_MEETINGS_UI_UPDATE"})}),1e4);return function(){clearInterval(t),clearInterval(c),u(),clearInterval(s)}}),[]);var c=function(e){var t=Date.now(),a=k.a.values(e.userIds).reduce((function(e,a){return t-a.lastOnline>9e4?Object(w.a)({},e,Object(y.a)({},a.userId,a)):e}),{}),r=k.a.values(e.userIds).reduce((function(e,t){if(!a[t.userId]&&t.currentMeeting){var r=t.currentMeeting,n=e[r.meetingId],c=n?n.users:{};return Object(w.a)({},e,Object(y.a)({},r.meetingId,{meeting:r,users:Object(w.a)({},c,Object(y.a)({},t.userId,t))}))}return e}),{}),n=k.a.values(e.userIds).reduce((function(e,t){var r=!a[t.userId],n=te(t.dailyCalendarEvents);if(r&&n){var c=e[n.id],u=c?c.users:{};return Object(w.a)({},e,Object(y.a)({},n.id,{meeting:n,users:Object(w.a)({},u,Object(y.a)({},t.userId,t))}))}return e}),{}),c=k.a.values(e.userIds).reduce((function(e,t){var r=!a[t.userId],n=!t.currentMeeting,c=!te(t.dailyCalendarEvents),u="available"===t.availabilityStatus;return r&&n&&c&&u?Object(w.a)({},e,Object(y.a)({},t.userId,t)):e}),{}),u=k.a.values(e.userIds).reduce((function(e,t){var r=!a[t.userId],n=!t.currentMeeting,c=!te(t.dailyCalendarEvents),u="busy"===t.availabilityStatus;return r&&n&&c&&u?Object(w.a)({},e,Object(y.a)({},t.userId,t)):e}),{});return{offline:a,video:r,calendar:n,available:c,busy:u}}(a.state.appGroup);return console.log("meetingsUi",c),n.a.createElement(p.a,{container:!0,direction:"column",justify:"center",alignItems:"flex-start",spacing:2},n.a.createElement(p.a,{item:!0,style:{width:"100%"}},n.a.createElement($,{mainGroupStore:a,user:a.state.appGroup.userIds[e.appState.user.userId]})),n.a.createElement(p.a,{item:!0,style:{width:"100%"}},n.a.createElement(p.a,{container:!0,direction:"column",spacing:2,justify:"center"},n.a.createElement(p.a,{item:!0},n.a.createElement(i.a,null,n.a.createElement("b",null,"Available")),k.a.values(c.available).map((function(t){return n.a.createElement(X,{mainGroupStore:a,user:t,currentUser:t.userId===e.appState.user.userId,showNextMeetingTime:t.userId!==e.appState.user.userId})}))),n.a.createElement(p.a,{item:!0},n.a.createElement(i.a,null,n.a.createElement("b",null,"Video Calls")),k.a.values(c.video).map((function(t){return n.a.createElement(p.a,{container:!0,direction:"row",spacing:2,justify:"flex-start",alignItems:"center"},n.a.createElement(p.a,{item:!0},n.a.createElement(i.a,null,t.meeting.meetingName),n.a.createElement(K.a,{href:t.meeting.meetingUrl,target:"_blank"},"Open Meeting"),k.a.values(t.users).map((function(t){return n.a.createElement(X,{mainGroupStore:a,user:t,currentUser:t.userId===e.appState.user.userId,showNextMeetingTime:t.userId!==e.appState.user.userId})}))))}))),n.a.createElement(p.a,{item:!0},n.a.createElement(i.a,null,n.a.createElement("b",null,"Calendar Events")),k.a.values(c.calendar).map((function(t){return n.a.createElement(p.a,{container:!0,direction:"row",spacing:2,justify:"flex-start",alignItems:"center"},n.a.createElement(p.a,{item:!0},n.a.createElement(p.a,{container:!0,direction:"row",justify:"flex-start",spacing:1,alignItems:"center"},n.a.createElement(p.a,{item:!0},n.a.createElement(i.a,{variant:"caption"},t.meeting.eventName)),n.a.createElement(p.a,{item:!0},n.a.createElement(i.a,{variant:"caption"},Q(new Date(t.meeting.startTime))+" - "+Q(new Date(t.meeting.endTime))))),k.a.values(t.users).map((function(t){return n.a.createElement(X,{mainGroupStore:a,user:t,currentUser:t.userId===e.appState.user.userId,showNextMeetingTime:!1})}))))}))),n.a.createElement(p.a,{item:!0},n.a.createElement(x.a,null)))),n.a.createElement(p.a,{item:!0,style:{width:"100%"}},n.a.createElement(ee,{appStore:t,mainGroupStore:a,user:e.appState.user})))};var re=function(e){var t=new RegExp(e+"=(.*?)($|&)","g"),a=decodeURIComponent(window.location.search).match(t);return a&&a.length?a[0].replace(e+"=","").replace("&",""):null},ne=function(){switch(window.location.host){case"localhost:3006":return{CLOUD_FUNCTION_ENDPOINT:"http://localhost:8080"};case"solomonlake.github.io":return{CLOUD_FUNCTION_ENDPOINT:"https://us-central1-project-coco-251813.cloudfunctions.net"};default:throw new Error("unknown window host:".concat(window.location.host))}},ce=new Promise((function(e,t){re("logged_in")?(window.history.pushState({},document.title,window.location.origin+window.location.pathname),e()):window.location.href=ne().CLOUD_FUNCTION_ENDPOINT+"/zoomGetTokenData"})),ue=function(){return o.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.awrap(ce);case 2:case"end":return e.stop()}}))};function se(){var e,t;return o.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,o.a.awrap(ue());case 2:return a.next=4,o.a.awrap(fetch(ne().CLOUD_FUNCTION_ENDPOINT+"/loginUser",{credentials:"include"}));case 4:return e=a.sent,a.next=7,o.a.awrap(e.json());case 7:return t=a.sent,a.abrupt("return",t);case 9:case"end":return a.stop()}}))}var oe=a(117);var ie=function(){var e=function(){var e=Object(r.useReducer)(f,m),t=Object(d.a)(e,2);return{state:t[0],dispatch:t[1]}}();switch(e.state.view){case"initial":return function(e){var t,a,r;o.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,o.a.awrap(se());case 2:return t=n.sent,c=t.config,b=c,n.next=6,o.a.awrap(O(t.customToken));case 6:return n.next=8,o.a.awrap(D.findOrCreateUser(t.user));case 8:if(!(a=n.sent).groupId){n.next=15;break}return n.next=12,o.a.awrap(P.getAppGroup(a.groupId));case 12:n.t0=n.sent,n.next=16;break;case 15:n.t0=null;case 16:r=n.t0,a.groupId&&r?e.dispatch({type:"TRANSITION_APP_STATE",newAppState:{view:"mainGroup",user:a,initialAppGroup:r}}):e.dispatch({type:"TRANSITION_APP_STATE",newAppState:{view:"joinGroup",user:a}});case 18:case"end":return n.stop()}var c}))}(e),n.a.createElement(l,null);case"loading":return n.a.createElement(l,null);case"joinGroup":return n.a.createElement(v.Provider,{value:e},n.a.createElement(J,{appState:e.state}));case"mainGroup":return n.a.createElement(v.Provider,{value:e},n.a.createElement(ae,{appState:e.state}));default:e.state;throw new Error("unknown state view")}},pe=(a(75),a(122)),le=a(118),de=a(39),me=a(50),fe=Object(me.a)({palette:{primary:{main:"#556cd6"},secondary:{main:"#19857b"},error:{main:de.a.A400},background:{default:"#fff"}}});u.a.render(n.a.createElement(le.a,{theme:fe},n.a.createElement(pe.a,null),n.a.createElement((function(){return n.a.createElement(oe.a,{maxWidth:"xs",style:{marginTop:"2em"}},n.a.createElement(ie,null))}),null)),document.getElementById("root"))}},[[54,1,2]]]);
//# sourceMappingURL=main.946f467c.chunk.js.map