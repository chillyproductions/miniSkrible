(this["webpackJsonpfront-end"]=this["webpackJsonpfront-end"]||[]).push([[0],{88:function(A,e,t){},94:function(A,e,t){},95:function(A,e,t){},96:function(A,e,t){},97:function(A,e,t){"use strict";t.r(e);var n=t(1),c=t(49),r=t.n(c),Q=t(19),C=t(2),s=t(12),o=t(50),i=t(13),I=t.n(i),a=t(16);function u(A){return k.apply(this,arguments)}function k(){return(k=Object(a.a)(I.a.mark((function A(e){var t;return I.a.wrap((function(A){for(;;)switch(A.prev=A.next){case 0:return A.next=2,fetch("/check-lobby/?id="+e);case 2:return t=A.sent,A.next=5,t.text();case 5:if("ok"!=A.sent){A.next=8;break}return A.abrupt("return",!0);case 8:return A.abrupt("return",!1);case 9:case"end":return A.stop()}}),A)})))).apply(this,arguments)}function S(A){return g.apply(this,arguments)}function g(){return(g=Object(a.a)(I.a.mark((function A(e){var t,n;return I.a.wrap((function(A){for(;;)switch(A.prev=A.next){case 0:return A.next=2,fetch("/create-lobby/?id="+e,{method:"POST"});case 2:return t=A.sent,A.next=5,t.text();case 5:n=A.sent,sessionStorage.setItem("painterCode",n),sessionStorage.setItem("painter",!0);case 8:case"end":return A.stop()}}),A)})))).apply(this,arguments)}var E,l=t(52),d=(t(88),t(0));function b(A){var e,t=Object(C.g)().id,c=function(){var A=Object(n.useState)([]),e=Object(s.a)(A,2),t=e[0],c=e[1];function r(A){c((function(e){return[].concat(Object(l.a)(e),[A])}))}return[t,r]}(),r=Object(s.a)(c,2),Q=r[0],o=r[1],i=Object(n.useRef)();return Object(n.useEffect)((function(){(E=A.socket).on("msg-recived",(function(A){o(A)}))}),[]),Object(n.useEffect)((function(){i.current.scrollTop=i.current.scrollHeight}),[null===(e=i.current)||void 0===e?void 0:e.scrollHeight]),Object(d.jsxs)("div",{className:"chatCover",children:[Object(d.jsx)("div",{children:t}),Object(d.jsx)("div",{className:"chat",ref:i,children:Q.map((function(A,e){return Object(d.jsx)(h,{name:null===A||void 0===A?void 0:A.name,msg:A.msg,gameTalking:null===A||void 0===A?void 0:A.gameTalking},e)}))}),Object(d.jsx)(B,{set:o})]})}function h(A){return A.gameTalking?Object(d.jsx)("div",{className:"gameTalking",children:A.msg}):Object(d.jsxs)("div",{children:[A.name,": ",A.msg]})}function B(A){var e=Object(n.useRef)();function t(){var t,n,c=null===(t=e.current)||void 0===t?void 0:t.value;(null===c||void 0===c?void 0:c.replace(" ",""))&&(E.emit("send-msg",{msg:c,name:sessionStorage.getItem("name")}),A.set({msg:c,name:"you"}),(null===(n=e.current)||void 0===n?void 0:n.value)&&(e.current.value=""))}return Object(n.useEffect)((function(){function A(A){"Enter"===A.key&&t()}return window.addEventListener("keydown",(function(e){return A(e)})),window.removeEventListener("keydown",(function(e){return A(e)}))}),[]),Object(d.jsxs)("div",{children:[Object(d.jsx)("input",{type:"text",ref:e}),Object(d.jsx)("button",{onClick:t,children:"SEND"})]})}t(94);function f(A){return Object(d.jsx)("div",{children:A.players.map((function(A,e){return Object(d.jsx)(p,{player:A,propsKey:e})}))})}function p(A){var e="";return A.player.guessedCorrectly&&(e="guessedCorrectly "),Object(d.jsxs)("div",{className:e+"Person",children:[Object(d.jsx)("div",{children:A.player.name}),Object(d.jsxs)("div",{children:["Score: ",A.player.score]})]},A.propsKey)}function O(A){return Object(d.jsx)("div",{children:A.players.map((function(A,e){return Object(d.jsx)("div",{children:A.name},e)}))})}function j(A){return Object(d.jsxs)("div",{style:{display:"flex"},children:[Object(d.jsx)("button",{onClick:function(){A.socket.emit("start",sessionStorage.getItem("painterCode"))},disabled:"true"!=sessionStorage.getItem("painter"),children:"START"}),Object(d.jsx)(b,{socket:A.socket}),Object(d.jsx)(O,{players:A.players})]})}t(95);var J,m,v,K,U,N="black",Z=!1;function x(A){var e=Object(n.useRef)();function t(A){if(Z&&"true"==sessionStorage.getItem("painter")){var t=function(A,e){var t=e.clientY-A.current.getBoundingClientRect().y;return[e.clientX-A.current.getBoundingClientRect().x,t]}(e,A);U(t[0],t[1]),K?(!function(A){var e,t,n=K[0],c=K[1],r=(A[0]-n)/(Math.abs(A[0]-n)+Math.abs(A[1]-c))*J,Q=(A[1]-c)/(Math.abs(A[0]-n)+Math.abs(A[1]-c))*J;r=2*r/3,Q=2*Q/3,n<A[0]&&c<A[1]?(e="<",t="<"):n<A[0]&&c>A[1]?(e="<",t=">"):n>A[0]&&c<A[1]?(e=">",t="<"):n>A[0]&&c>A[1]&&(e=">",t=">");for(;C(e,t);)n+=r,c+=Q,U(Math.floor(n),Math.floor(c));function C(e,t){return">"==e&&">"==t?n>A[0]||c>A[1]:">"==e&&"<"==t?n>A[0]||c<A[1]:"<"==e&&">"==t?n<A[0]||c>A[1]:"<"==e&&"<"==t?n<A[0]||c<A[1]:void 0}}(t),K=t):K=[t[0],t[1]]}}function c(A){e.current.getContext("2d").fillStyle=A,N=A}return Object(n.useEffect)((function(){(m=A.socket).on("draw",(function(A){v.fillStyle=A.color,v.fillRect(A.coordinates[0],A.coordinates[1],J,J)})),m.on("clearDraw",(function(){v.clearRect(0,0,e.current.width,e.current.height)})),A.socket.on("new-drawing",(function(A){v.fillStyle="#000000",N="black"})),v=e.current.getContext("2d")}),[]),Object(n.useEffect)((function(){J=e.current.width/A.size}),[A.size]),U=function(A,e){var t=Math.floor(A/J)*J,n=Math.floor(e/J)*J;v.fillRect(t,n,J,J),m.emit("draw",{code:sessionStorage.getItem("painterCode"),paint:{coordinates:[t,n],color:N}})},Object(d.jsxs)("div",{children:[Object(d.jsx)("canvas",{ref:e,onMouseDown:function(A){Z=!0,t(A)},onMouseUp:function(){Z=!1,K=null},onContextMenu:function(){Z=!1,K=null},onMouseOut:function(){Z=!1,K=null},onMouseMove:function(A){return t(A)},width:"800",height:"800",style:{border:"1px dashed black"}}),Object(d.jsxs)("div",{className:"toolsCover",children:[Object(d.jsx)("button",{className:"brushCover",onClick:function(){return c("#000000")},children:Object(d.jsx)("img",{className:"brush",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAAAXNSR0IArs4c6QAAA3xJREFUeJzt3TFrXmUYgOG0TZuqJCK0g9KlgxbcdCri4CA66uDm6iQ4Fhd/gKCTs6t/wsHV0a1QLDpIU6UFtaHQJC36D+SJOcn9Jbmu+eHNIbl5l4eTc26NQ7l58+ai5+3t7o7mdp88Gc093d//5zDP83/duXv33GTu/FE/CPwXAZISICkBkhIgKQGSEiApAZISIKn1+gFW1XTDMd1cXNrYGG0kLm1sjM57vLMzmlt1bkBSAiQlQFICJCVAUgIkJUBSAiQlQFJnbhNSbTj+fPhwdN5Z4wYkJUBSAiQlQFICJCVAUgIkJUBSAiR15jYhUzYcx8MNSEqApARISoCkBEhKgKQESEqApARI6sxtQq7feH009+ud20f8JCfTzuPHi57nBiQlQFICJCVAUgIkJUBSAiQlQFICJDX6qvVJ8O3HH4zmtl+4Mpp7+f2PFv3S+Neff7bkcYubbjgunD8/aua3e/dG57kBSQmQlABJCZCUAEkJkJQASQmQlABJrfwmZLrh2Hn0aDS3ubW16Ibjzu3ZuyOvffHNaK7amBzgXY9RM9v3748OcwOSEiApAZISICkBkhIgKQGSEiApAZJa+U3Il++9NZq7cvXqaMMx3VxUlt6YTDcc6xcujFp4+uzZ6DybEE4EAZISICkBkhIgKQGSEiApAZISIKnsOyHTdz0ePngwmlv1DcfUX3/M/qvUm2+/M9pc/PjD96Pz9vb3R3PTDceUG5CUAEkJkJQASQmQlABJCZCUAEkJkNTi74RU/83qtGxCNq7fGP1NXnz3w9F5tz795FDPc9TcgKQESEqApARISoCkBEhKgKQESEqApMabkFtvvDqa29zaGs29cu3aqdhwbP+9M5p76fnLo9/1cxcvjs776qefR3Orzg1ISoCkBEhKgKQESEqApARISoCkBEjq3HTDcQCLfpF8adPNxebGpUXfl9nZ3RvNfffL70v+2JXnBiQlQFICJCVAUgIkJUBSAiQlQFICJHWQ74Scig3H5Yvrow2HzcXxcAOSEiApAZISICkBkhIgKQGSEiApAZJaXztjG44n+09H59lwHA83ICkBkhIgKQGSEiApAZISICkBkhIgqYO8E7IoGw7W1tyAxARISoCkBEhKgKQESEqApARISoCkxpuQ6eZiyoaDtTU3IDEBkhIgKQGSEiApAZISICkBkhIgqX8BOUaksb6wqSQAAAAASUVORK5CYII=",alt:"black"})}),Object(d.jsx)("button",{className:"brushCover",onClick:function(){return c("#0033cc")},children:Object(d.jsx)("img",{className:"brush",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAAAXNSR0IArs4c6QAAA4hJREFUeJzt3T9vVnUYgOG30AJCqCGBQYODAzFxc3Vw0s1Edx2dHHQwbMbJzbg4GgcXFwd3N7+BCQOJkrD4P6ACDVqgiB/AmDzYA/crva75yXlP2zu/4X1yejZW7Muzb3+66PX+uLsxmru5d2g0d+uvjXv7uZ//6sbHr49+kNlPAQ+IAEkJkJQASQmQlABJCZCUAEkJkNRmfQPrarrhmG4ujh++N9pIHD88W1z8dnv2uevOCUhKgKQESEqApARISoCkBEhKgKQESOrAbUKqDcf3fx64X/WIE5CUAEkJkJQASQmQlABJCZCUAEkJkJSv5/+FDcfD4QQkJUBSAiQlQFICJCVAUgIkJUBSAiR14L7GP3f66Gju0tVbD/hO/p9OXLs8mrsxvJ4TkJQASQmQlABJCZCUAEkJkJQASQmQ1COzCfnktVdGc99dvziae/mF5/dzO//wzpe/Lnq9pU03HHc3jy36ghInICkBkhIgKQGSEiApAZISICkBkhIgqbXfhEw3HDs3Zk8hPLW6MHsl+RcXRmPfXJxtVj5896PR3LpvTA7v7S56PScgKQGSEiApAZISICkBkhIgKQGSEiCptd+EXL1yZTR3+syZ0YZjurlY2rfvvzWaW3pjMn3WY2/rxOhZj807N0fXm3ICkhIgKQGSEiApAZISICkBkhIgKQGSyjYh02c9ppuQasOxtGu//DCae+mJQ6PNxVe7p0bXO7L7+2jup8/fG81NOQFJCZCUAEkJkJQASQmQlABJCZCUAEkt+s6H1Wr5/2Z1cnt7rZ/1WNrRp58Z/U0ef/HV0fXOv/nGvu7nQXMCkhIgKQGSEiApAZISICkBkhIgKQGSGm9Czj93bjR3cnt7NPfk2bOPxIbjx+s7o7lTx2dvGn9sa2t0vQ++vjSaW3dOQFICJCVAUgIkJUBSAiQlQFICJCVAUhvTDcd9mL2RPDLdXJw8emTR52V2bt0ezX12+eclP3btOQFJCZCUAEkJkJQASQmQlABJCZCUAEndz3tCHokNx7GtzdGGw+bi4XACkhIgKQGSEiApAZISICkBkhIgKQGS2lwdsA3H7p290fVsOB4OJyApAZISICkBkhIgKQGSEiApAZISIKn7eSZkUTYcrFZOQGICJCVAUgIkJUBSAiQlQFICJCVAUuNNyHRzMWXDwWrlBCQmQFICJCVAUgIkJUBSAiQlQFICJPU3/jWe1dScOZUAAAAASUVORK5CYII=",alt:"blue"})}),Object(d.jsx)("button",{className:"brushCover",onClick:function(){return c("#663300")},children:Object(d.jsx)("img",{className:"brush",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAAAXNSR0IArs4c6QAAA35JREFUeJzt3T1rnmUYgOG3Nh+1kIjSLtJF8QNHJ0EQHNRVBzdHndwcugmugpuzq4t/QScnB8FFq6IoVCxKQ7WNSNIG9B/IFfu059vmOOaLOw/tyT3k4slzasVtefPF5xc97+/Dm6O5/YOD0dzhraN/bud5/q9Pv/7u1GTugTv9IPBfBEhKgKQESEqApARISoCkBEhKgKQ26gdYV9MNx3RzcXZ7a7SROLu9NTpvb/+v0dy6cwOSEiApAZISICkBkhIgKQGSEiApAZI6cZuQasNxee/a6LyTxg1ISoCkBEhKgKQESEqApARISoCkBEjqxG1Cpmw47g43ICkBkhIgKQGSEiApAZISICkBkhIgqRO3CXnkiWdGc9d+/PYOP8m96Y8bNxY9zw1ISoCkBEhKgKQESEqApARISoCkBEhq9FXre8FHb7w6mru+c240t/vy64t+afyT995Z8rjFTTccG6dPj5r54udfRue5AUkJkJQASQmQlABJCZCUAEkJkJQASa39JmS64dgf/iZ/Z3d30Q3H95cujeaeevfD0Vy1MTnGux6jZr68fGV0mBuQlABJCZCUAEkJkJQASQmQlABJCZDU2m9C3n9l9oXzc+fPjzYc081FZemNyXTDsbmxMWrh1tHR6DybEO4JAiQlQFICJCVAUgIkJUBSAiQlQFLZd0Km73rsXb06mlv3DcfUn7//Opp7/LkXRpuLbz7/bHTeweHhaG664ZhyA5ISICkBkhIgKQGSEiApAZISICkBklr8nZDqr1ndL5uQ7ceeHv2fPPTSa6PzLr791m09z53mBiQlQFICJCVAUgIkJUBSAiQlQFICJDXehFx89snR3M7u7mju0QsX7osNx5Xr+6O5h8+eGf1bP7i5OTrvg69+GM2tOzcgKQGSEiApAZISICkBkhIgKQGSEiCpU9MNxzEs+kXypU03FzvbW4u+L7N/eHM09/FPvy35Y9eeG5CUAEkJkJQASQmQlABJCZCUAEkJkNRxvhNyX2w4zmzOvgxuc3F3uAFJCZCUAEkJkJQASQmQlABJCZCUAEltrE7YhuPg1tHoPBuOu8MNSEqApARISoCkBEhKgKQESEqApARI6jjvhCzKhoPVyg1ITICkBEhKgKQESEqApARISoCkBEhqvAmZbi6mbDhYrdyAxARISoCkBEhKgKQESEqApARISoCk/gUTWaTPMnuoYwAAAABJRU5ErkJggg==",alt:"brown"})}),Object(d.jsx)("button",{className:"brushCover",onClick:function(){return c("#00cc00")},children:Object(d.jsx)("img",{className:"brush",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAAAXNSR0IArs4c6QAAA4tJREFUeJzt3T9rnWUYwOHTtGliJZGCXaQIKuKgCIIfobvdXRXBQXDo5uhWP4Cgo+4u4uRnEBwKRnCQWJSK2gRK/6TVr3CHvu3vmFzXfPOcQ/LjWW7e855Z8Vg++Or1Rc+7c+/BaO7o6OFobvfZ7X8nc/u3bo/Om/r24/0zk7mNRT8VjkmApARISoCkBEhKgKQESEqApARI6lz9BdbVdMMx3Vxc2NocbSQubG2Ozts/uDOaO7hzbzRXcQOSEiApAZISICkBkhIgKQGSEiApAZI6dZuQasOx9DMXJ4UbkJQASQmQlABJCZCUAEkJkJQASQmQ1KnbhEzZcDwdbkBSAiQlQFICJCVAUgIkJUBSAiQlQFKnbhNy8eybo7m/H/74hL/J/9Pdm7Nf5ZpyA5ISICkBkhIgKQGSEiApAZISICkBkjoxm5Av331nNHewtzWae+WNz0Zzb784Glt98+v7s8HIdMOxcX5j9Cb0KTcgKQGSEiApAZISICkBkhIgKQGSEiCptd+ETDcchwcHo7ndvdXoV69We5+Pxn66cWM0d/WTL0Zz674xeXT/0aLnuQFJCZCUAEkJkJQASQmQlABJCZCUAEmt/Sbkz1u3RnPPX7o02nBMNxdL2/v0o9Hc0huT8bMe22dHz3o8uvtwdN6UG5CUAEkJkJQASQmQlABJCZCUAEkJkFS2CZk+6zHdhFQbjqX988dvo7mXN66MNhd7O9+Nzjs6fDCa+/76X6O5KTcgKQGSEiApAZISICkBkhIgKQGSEiCpRd/5sFot/2tWO7u7a/2sx9K2Xnpt9D957srV0XnXPnzvsb7Pk+YGJCVAUgIkJUBSAiQlQFICJCVAUgIkNd6EXHvr1dHczu7uaO6Fy5dPxIbj5u3D0dzFC9ujv/Uzm5uj867/8PNobt25AUkJkJQASQmQlABJCZCUAEkJkJQASZ2ZbjiOYfZG8sh0c7GzdX7R52UO790fzX39y+9LfuzacwOSEiApAZISICkBkhIgKQGSEiApAZI6zntCTsSGY3vz3GjDYXPxdLgBSQmQlABJCZCUAEkJkJQASQmQlABJnVudsg3H3QdHo/NsOJ4ONyApAZISICkBkhIgKQGSEiApAZISIKnjPBOyKBsOVis3IDEBkhIgKQGSEiApAZISICkBkhIgqfEmZLq5mLLhYLVyAxITICkBkhIgKQGSEiApAZISICkBkvoPvY2nGHO8NgwAAAAASUVORK5CYII=",alt:"green"})}),Object(d.jsx)("button",{className:"brushCover",onClick:function(){return c("#9900cc")},children:Object(d.jsx)("img",{className:"brush",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAAAXNSR0IArs4c6QAAA31JREFUeJzt3T2PlGUUgOFZM+Oy6K4hkUKlsVBrChN/gL32tlQWdhT2GhLtjKWltpZW/gQJHYkYjRYSCCa4EJBl149/YA4yyz2y11WfPPMWd57m5J13a8Fj+eSlb9Z63uHyj9HcwereaO7P5cO/H+d5/quPr13Ymsw9c9wPAv9GgKQESEqApARISoCkBEhKgKQESGpZP8Cmmm44ppuL1dHOaCOxOtoZnXd/5/ZobtO5AUkJkJQASQmQlABJCZCUAEkJkJQASZ24TUi14djfvT4676RxA5ISICkBkhIgKQGSEiApAZISICkBkjpxm5ApG44nww1ISoCkBEhKgKQESEqApARISoCkBEjqxG1CVudnc4dXjvc5/q9+ufnjWs9zA5ISICkBkhIgKQGSEiApAZISICkBknpqNiFfvPfOaO5w+d1o7vnP3xzNnVm8Mpr7+cNfR3OV6YZje3Vq9CX0KTcgKQGSEiApAZISICkBkhIgKQGSEiCpjd+ETDccd+/cGc3t7l0e/evV4uvLo7Hvr14dzb1+6bPR3KZvTA4OH6z1PDcgKQGSEiApAZISICkBkhIgKQGSEiCpjd+E/Hbr1mjuxbNnRxuO6eZi3a599MFobt0bk+m7Hqe3nxu963H/4N7ovCk3ICkBkhIgKQGSEiApAZISICkBkhIgqWwTMn3XY7oJqTYc6/b7zdmGY/nWX6PNxQvfnhmdt3/v9mjuy/1Lo7kpNyApAZISICkBkhIgKQGSEiApAZISIKm1fvNhsTiOf7Pa2+h3PdZt+9U3ZhuOt98dnXfx/QuP9TzHzQ1ISoCkBEhKgKQESEqApARISoCkBEhqvAm5eP610dzu3t5o7uVz556KDcf1/bujuTOnZ18a31mtRud9euWH0dymcwOSEiApAZISICkBkhIgKQGSEiApAZLamm44HsHsi+SR6eZid/vZtb4vc/fg4Wjuq59urPNnN54bkJQASQmQlABJCZCUAEkJkJQASQmQ1KN8J+Sp2HCcWi1HGw6biyfDDUhKgKQESEqApARISoCkBEhKgKQESGq5OGEbjgeHR6PzbDieDDcgKQGSEiApAZISICkBkhIgKQGSEiCpR3knZK1sOFgs3IDEBEhKgKQESEqApARISoCkBEhKgKTGm5Dp5mLKhoPFwg1ITICkBEhKgKQESEqApARISoCkBEjqH+OZn4O3Ya11AAAAAElFTkSuQmCC",alt:"purple"})}),Object(d.jsx)("button",{className:"brushCover",onClick:function(){return c("#ff0000")},children:Object(d.jsx)("img",{className:"brush",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAAAXNSR0IArs4c6QAAA4NJREFUeJzt3T9rnWUYwOGTNmlqaSMNdpEuDuosDq4O3RUcnQQnBcGh38DNWRAUnLo6OfgVHKRbQYUMghKpaP+IpCaN7rrcJW/7OzbXNd8850348Sw37zkbK07k5u7uouf9cebMaO5wY2M0d/nhw79P8jz/tnfu3Gjurf390QPO/lp4TARISoCkBEhKgKQESEqApARISoCkNusHWFfTDcd0c3Hx+Hi0kbh4fDw6b7qR+P3s2dFcxQ1ISoCkBEhKgKQESEqApARISoCkBEjq1G1Cqg3HdHNx2rgBSQmQlABJCZCUAEkJkJQASQmQlABJnbpNyJQNx5PhBiQlQFICJCVAUgIkJUBSAiQlQFICJHXqNiG/vfraaG73228e85P8P/14586i57kBSQmQlABJCZCUAEkJkJQASQmQlABJPTWbkM/ffmM0d/vMhdHc3mc3TvI4/7H7/juLnre06YZje3Nz9lPtQ25AUgIkJUBSAiQlQFICJCVAUgIkJUBSa78JmW447t+7NztwZzX61quNLz8dHffdrVujuZc++WI0t+4bkwdHR4ue5wYkJUBSAiQlQFICJCVAUgIkJUBSAiS19puQX2/fHs09d+XKaMMx3Vws7fuPPhjNLb0xmb7rcWFra/Sux5+Hh6PzptyApARISoCkBEhKgKQESEqApARISoCksk3I9F2P6Sak2nAs7c4vP43mHr5+bbS5ePbrr0bn3T04GM19OJybcgOSEiApAZISICkBkhIgKQGSEiApAZJa9DcfVqvlv83q0s7OWr/rsbTtF16ebTiuvTk67/p7757oeR43NyApAZISICkBkhIgKQGSEiApAZISIKnxJuT6Ky+O5i7t7Izmnr969anYcPx89/5o7vKF86P/9TNbW6PzPr75w2hu3bkBSQmQlABJCZCUAEkJkJQASQmQlABJbUw3HI9gtOGoTDcXl7bPLfq+zP0Hf43mbuztL/mxa88NSEqApARISoCkBEhKgKQESEqApARI6lF+J+Sp2HCc39ocbThsLp4MNyApAZISICkBkhIgKQGSEiApAZISIKnN1SnbcBwcHo3Os+F4MtyApARISoCkBEhKgKQESEqApARISoCkHuWdkEXZcLBauQGJCZCUAEkJkJQASQmQlABJCZCUAEmNNyHTzcWUDQerlRuQmABJCZCUAEkJkJQASQmQlABJCZDUP7Acm4lDChN0AAAAAElFTkSuQmCC",alt:"red"})}),Object(d.jsx)("button",{className:"brushCover",onClick:function(){return c("#cccc00")},children:Object(d.jsx)("img",{className:"brush",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAAAXNSR0IArs4c6QAAA4NJREFUeJzt3buKnVUYgOE9OhMnhgwIiXiIYuMFWFgqdgFBtBdvwc7O0s4bsLCT9GJjk07QTrt4TiOKmmjMjIHJHNALEOSLs2febeZ56sXaP5uX1Xz8619bcCTbvy93v/2DM7N1+2dH6w4PN/46yvP8V08+fXNtsu6B434Q+DcCJCVAUgIkJUBSAiQlQFICJCVAUuv1A6yq6YRjOrnYWN8bTSQ21vdG++3ubo3WrTonICkBkhIgKQGSEiApAZISICkBkhIgqVM3CakmHDt/Xpj98CnjBCQlQFICJCVAUgIkJUBSAiQlQFICJHXqJiFTJhwnwwlISoCkBEhKgKQESEqApARISoCkBEjq1E1Cfvj1hdG6px795Jif5P/p++s7S93PCUhKgKQESEqApARISoCkBEhKgKQESOq+mYS8//qro3XfXZ3devXp4x8f5XH+4eXn31jqfss2nXBsbj44+hL6lBOQlABJCZCUAEkJkJQASQmQlABJCZDUyk9CphOOne3t2YafbY1uvVpbvDfa7utr12a/+/YHo2WrPjHZ3T1c6n5OQFICJCVAUgIkJUBSAiQlQFICJCVAUis/Cbl548Zo3YWLF0cTjvHkYsm+eefN2cIlT0ym73qcO7c+etfjzp2D0X5TTkBSAiQlQFICJCVAUgIkJUBSAiQlQFLZJGT6rsd0ElJNOJbtj19+HK37/MvLo8nFM499NNrv1q290boXX7o7WjflBCQlQFICJCVAUgIkJUBSAiQlQFICJLX0Sciyb7Oavuvx23BisupuX/1wNOH4avHaaL9XLl850vMcNycgKQGSEiApAZISICkBkhIgKQGSEiCp8dev33ru2dG681tbo3VPXLq00rdZTf10e3b71CMPb47+67MbG6P93v3i29G6VecEJCVAUgIkJUBSAiQlQFICJCVAUgIktTadcNyD0YSjMp1cnH/ozHhKNLFzd3b71JXrPy/zZ1eeE5CUAEkJkJQASQmQlABJCZCUAEkJkNS93I51X0w4NjdmXwY3uTgZTkBSAiQlQFICJCVAUgIkJUBSAiQlQFLri1M24djdPxjtZ8JxMpyApARISoCkBEhKgKQESEqApARISoCklv7F9CkTDhYLJyAxAZISICkBkhIgKQGSEiApAZISIKnxJGQ6uZgy4WCxcAISEyApAZISICkBkhIgKQGSEiApAZL6G4Wcn+B4NyouAAAAAElFTkSuQmCC",alt:"yellow"})}),Object(d.jsx)("button",{className:"brushCover",onClick:function(){return c("#ffffff")},children:Object(d.jsx)("img",{className:"brush",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAAAXNSR0IArs4c6QAAAwVJREFUeJzt3D1uVUcYgOFz4WIBElCgpEvFFlgAdVgNm6NmAUjUKVKliESKSAm/AdssgOaDO/CemOepR+Ox9XqaT3MOGyd5ce/x0v3eXnwcrft4eTFad+f62eUp5/nWrtUH4McmQFICJCVAUgIkJUBSAiQlQFICJHWoD7DKdCLx7/l/o3XTScPFNhs03D/eWjqR+PPD65XbZdyApARISoCkBEhKgKQESEqApARISoCklk9Cnt5+tHrLkbPD7H9pOpG4KpOGvXMDkhIgKQGSEiApAZISICkBkhIgKQGSOlSTi20bPqbgJC8v3o3WTd/KPLhx95TjfMYNSEqApARISoCkBEhKgKQESEqApARI6vgFa00udmQ64fj52s2l61ZzA5ISICkBkhIgKQGSEiApAZISICkBkjpuP9iEY/UEoXpzMd2vmnBMuQFJCZCUAEkJkJQASQmQlABJCZCUAEl9yZuQkelkYKqaIEzt/c3F7x/+Wbqfr2NxpQiQlABJCZCUAEkJkJQASQmQlABJLZ+ETO19grD3txSrJxKrJyZTbkBSAiQlQFICJCVAUgIkJUBSAiQlQFLLJyFX5atNfB9uQFICJCVAUgIkJUBSAiQlQFICJCVAUtmbkL1/tWnvpn+/v8/fj9Y9vPnTKcf5am5AUgIkJUBSAiQlQFICJCVAUgIkJUBS2SSkmlxMJwPbjW97jlON/347/z3cgKQESEqApARISoCkBEhKgKQESEqApLJJSKV6+/A/cCh+qBuQlABJCZCUAEkJkJQASQmQlABJCZBUNgl5/u6vpfvtfcLx2/ZqtO6X7dZoInF7u37Seb7Wr2+eLd3PDUhKgKQESEqApARISoCkBEhKgKQESGr5JGTvX21aPZE43y5H+93fzkbr/tjejtY9efN8tG7v3ICkBEhKgKQESEqApARISoCkBEhKgKSyNyEmEmybG5CYAEkJkJQASQmQlABJCZCUAEkJkNRxOpFY7c52HE04TCSuNjcgKQGSEiApAZISICkBkhIgKQGSEiCpT0NHcTcxl1DoAAAAAElFTkSuQmCC",alt:"erase"})}),Object(d.jsx)("button",{className:"brushCover",onClick:function(){return A=e,void("true"==sessionStorage.getItem("painter")&&(v.clearRect(0,0,A.current.width,A.current.height),m.emit("clearDraw",sessionStorage.getItem("painterCode"))));var A},children:Object(d.jsx)("img",{className:"brush",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAAAXNSR0IArs4c6QAAAq5JREFUeJzt3TFqlEEYgOF/JZBetIgmTazUA6g3UGwkwoZ4ChG8kmJA8Qwi3sJUir2KFgbiBUQmyR/edX2eepidhJdpvkx2mgAAAAAAAAAAAAAAAAAAAAAAAGBVLA6We/UZ/urHz59D645/HQ+t+/rt+8l5znNWV69cXoys29zcvOijnMvLwzez7ndp1t3glARISoCkBEhKgKQESEqApARISoCkFgfLvWQyMLdPn78Mrdu+vnXBJ/lnDU1qRo1OTNyApARISoCkBEhKgKQESEqApARISoCkNuoDcDaPHu8PrXv7+tXolqMTsVknJm5AUgIkJUBSAiQlQFICJCVAUgIkJUBSazMJGX3rMfp2ZO7PHTU64Zh7v1NMTGblBiQlQFICJCVAUgIkJUBSAiQlQFICJLXx4tXroYVP9h9f8FH+bO7zzT0xWfXf36pzA5ISICkBkhIgKQGSEiApAZISICkBkhIgKQGSEiApAZISICkBkhIgKQGSEiApAZLaGH2rMPfbh1Xf7937D7PuN2q5XA6tOzw8nPVzK25AUgIkJUBSAiQlQFICJCVAUgIkJUBSa/M9If+bdZmYuAFJCZCUAEkJkJQASQmQlABJCZCUAEktDpZ7J3NuuOrfm7Eu55vb6M975+69xci6p8+eD+3nBiQlQFICJCVAUgIkJUBSAiQlQFICJDX7JITzqSYho46OPg5NQnZ3bwzt5wYkJUBSAiQlQFICJCVAUgIkJUBSAiTlv2NxKru7N2adnLkBSQmQlABJCZCUAEkJkJQASQmQlABJbUzTNPQ3/qvu5q3bQ+u2tq4Nrdve2Rlad//BQ29qzsENSEqApARISoCkBEhKgKQESEqApARIai2mINM0TScnwwMJk4sV4gYkJUBSAiQlQFICJCVAUgIkJUBSAiT1G3ReXAfmxEYpAAAAAElFTkSuQmCC",alt:"erase all"})})]})]})}function H(A){return Object(d.jsxs)("div",{style:{display:"flex"},children:[Object(d.jsx)(P,{socket:A.socket}),Object(d.jsx)(G,{socket:A.socket})]})}function G(A){var e=Object(n.useState)(),t=Object(s.a)(e,2),c=t[0],r=t[1];return Object(n.useEffect)((function(){A.socket.on("new-drawing",(function(A){r(A.word)}))}),[]),Object(d.jsx)("div",{children:c})}function P(A){var e=Object(n.useState)(),t=Object(s.a)(e,2),c=t[0],r=t[1];return Object(n.useEffect)((function(){var e;return A.socket.on("new-drawing",(function(A){r(A.roundTime-((new Date).getTime()-A.time)),clearInterval(e),e=setInterval((function(){r(A.roundTime-((new Date).getTime()-A.time))}),1e3)})),clearInterval(e)}),[]),Object(d.jsx)("div",{children:Math.floor(c/1e3)})}function X(A){var e=Object(n.useState)(5),t=Object(s.a)(e,2),c=t[0],r=t[1];return Object(n.useEffect)((function(){A.socket.on("size-change",(function(A){r(A)})),A.socket.on("painter",(function(A){sessionStorage.setItem("painter",!0),sessionStorage.setItem("painterCode",A)})),A.socket.on("stop-painter",(function(){sessionStorage.setItem("painter",!1)})),A.socket.on("new-drawing",(function(A){alert("".concat(A.name," is now drawing!"))}))}),[]),Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(H,{socket:A.socket}),Object(d.jsxs)("div",{style:{display:"flex"},children:[Object(d.jsx)(f,{players:A.players}),Object(d.jsx)(x,{socket:A.socket,size:c}),Object(d.jsx)(b,{socket:A.socket})]})]})}var z=Object(o.io)();function R(){var A=Object(C.g)().id,e=Object(C.f)();u(A)||e.push("/");var t=Object(n.useState)(),c=Object(s.a)(t,2),r=c[0],Q=c[1];return Object(n.useEffect)((function(){return z.on("lobby-change",(function(A){Q(A)})),z.emit("join-room",{id:A,name:sessionStorage.getItem("name")}),function(){sessionStorage.setItem("painter",!1),e.push("/")}}),[]),r?Object(d.jsx)(d.Fragment,{children:r.started?Object(d.jsx)(X,{socket:z,players:r.players}):Object(d.jsx)(j,{socket:z,players:r.players})}):Object(d.jsx)("div",{children:"hello"})}t(96);function F(){var A=Object(C.f)(),e=Object(n.useRef)(),t=Object(n.useRef)();function c(){return(c=Object(a.a)(I.a.mark((function n(){var c;return I.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(c=e.current.value,!t.current.value){n.next=7;break}return n.next=4,u(c);case 4:if(!n.sent){n.next=7;break}sessionStorage.setItem("name",t.current.value),A.push("/lobby/"+c);case 7:case"end":return n.stop()}}),n)})))).apply(this,arguments)}function r(){return(r=Object(a.a)(I.a.mark((function e(){var n;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=T(5),!t.current.value){e.next=9;break}return e.next=4,u(n);case 4:if(e.sent){e.next=9;break}return e.next=7,S(n);case 7:sessionStorage.setItem("name",t.current.value),A.push("/lobby/"+n);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(n.useEffect)((function(){sessionStorage.setItem("painter",!1)}),[]),Object(d.jsxs)("div",{className:"menu",children:[Object(d.jsx)("img",{className:"logo",src:"data:image/png;base64,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",alt:"Logo"}),Object(d.jsxs)("div",{className:"menuCover",style:{display:"flex",flexDirection:"column"},children:[Object(d.jsx)("input",{className:"nameInput",ref:t,placeholder:"name"}),Object(d.jsx)("button",{className:"createButton",onClick:function(){return r.apply(this,arguments)},children:"Create"}),Object(d.jsx)("input",{className:"idInput",type:"text",ref:e,placeholder:"lobby ID"}),Object(d.jsx)("button",{className:"joinButton",onClick:function(){return c.apply(this,arguments)},children:"Join"})]})]})}function T(A){for(var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890",t="",n=0;n<A;n++)t+=e.charAt(Math.floor(Math.random()*e.length));return t}r.a.render(Object(d.jsx)(Q.a,{children:Object(d.jsxs)(C.c,{children:[Object(d.jsx)(C.a,{exact:!0,path:"/",children:Object(d.jsx)(F,{})}),Object(d.jsx)(C.a,{exact:!0,path:"/lobby/:id",children:Object(d.jsx)(R,{})})]})}),document.getElementById("root"))}},[[97,1,2]]]);
//# sourceMappingURL=main.ad90b7ec.chunk.js.map