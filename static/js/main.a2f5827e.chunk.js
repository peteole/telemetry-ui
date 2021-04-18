(this["webpackJsonptelemetry-ui"]=this["webpackJsonptelemetry-ui"]||[]).push([[0],{102:function(e,t,n){"use strict";var r=n(37),s=n(48),a=n(49),i=n(57);Object.defineProperty(t,"__esModule",{value:!0}),t.MessageRegistry=void 0;var o=n(56),u=n(103),c=function(e){var t={id:255,parse:function(e){return t.value.parse(e)},value:{name:"message",parse:function(n){var r=new TextDecoder("utf-8"),s=new Uint8Array(n)[0],a=r.decode(n.slice(1));try{var c=JSON.parse(a);if(u.isSensorValueDTO(c)){var l,h=u.toSensorValue(c),f=new o.Message(h,s);f.value=f.value.replaceBasicSensorValues(e.basicSensorValues);var v=h.getBasicSensorValues();e.basicSensorValues=e.basicSensorValues.filter((function(e){return-1===v.findIndex((function(t){return t.name===e.name}))})),(l=e.basicSensorValues).push.apply(l,i(v)),t.value.message=f;var d=e.messages.findIndex((function(e){return e.id==f.id}));-1!=d&&(console.log("attention, added same message id again!"),e.messages.splice(d,1)),e.addMessage(f)}}catch(A){return!1}return!0},serialize:function(){return new Uint8Array([])},size:h,replaceBasicSensorValues:function(e){return t.value},message:null,getBasicSensorValues:function(){return[]}},registry:e};return t},l=function(){function e(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(e){return console.log(e)};s(this,e),this.currentMessage=null,this.buffer=new ArrayBuffer(0),this.bufferView=new Uint8Array(this.buffer),this.currentPosition=0,this.previousByteZero=!1,this.onUnknownMessage=null,this.basicSensorValues=[],this.messages=[],this.messageDefinitionMessage=c(this),n.push(this.messageDefinitionMessage),this.streamMessage=new o.StreamMessage(r),n.push(this.streamMessage),n.forEach((function(e){return t.addMessage(e)}))}return a(e,[{key:"readData",value:function(e){var t,n,s=this,a=r(new Uint8Array(e));try{var i=function(){var e=n.value;if(s.currentPosition>=(null!==s.currentMessage?s.currentMessage.value:0)&&(s.currentPosition=0),s.previousByteZero){if(0==e)s.bufferView[s.currentPosition]=e,s.currentPosition++;else if(1==e)s.currentMessage&&(s.currentMessage.parse(s.buffer.slice(0,s.currentPosition)),s.currentMessage=null);else{var r=s.messages.findIndex((function(t){return t.id==e}));-1==r?(s.currentMessage=null,null===(t=s.onUnknownMessage)||void 0===t||t.call(s)):s.currentMessage=s.messages[r]}s.previousByteZero=!1}else 0==e?s.previousByteZero=!0:(s.bufferView[s.currentPosition]=e,s.currentPosition++)};for(a.s();!(n=a.n()).done;)i()}catch(o){a.e(o)}finally{a.f()}}},{key:"addMessage",value:function(e){this.messages.push(e),this.buffer=new ArrayBuffer(Math.max.apply(Math,i(this.messages.map((function(e){return e.value.size}))))),this.bufferView=new Uint8Array(this.buffer)}},{key:"onMessage",set:function(e){this.streamMessage._value.onMessage=e}},{key:"encodeMessage",value:function(e){var t,n=new Uint8Array(e.value.serialize()),s=[0,e.id],a=r(n);try{for(a.s();!(t=a.n()).done;){var i=t.value;s.push(i),0===i&&s.push(0)}}catch(o){a.e(o)}finally{a.f()}return s.push(0,1),new Uint8Array(s)}}]),e}();t.MessageRegistry=l;var h=1e4},103:function(e,t,n){"use strict";var r=n(37);Object.defineProperty(t,"__esModule",{value:!0}),t.toSensorValue=t.isSensorValueListDTO=t.isSensorValueDTO=t.isBasicSensorValueDTOConstrained=t.isBasicSensorValueDTO=void 0;var s=n(50);function a(e){return void 0!==e.name&&void 0!==e.size}function i(e){return a(e)&&void 0!==e.type}function o(e){return void 0===e.values}function u(e){try{if(!a(e))return!1;var t=e.values;if(void 0===t)return!1;var n,s=r(t);try{for(s.s();!(n=s.n()).done;){var o=n.value;if(!i(o)||!u(o))return!1}}catch(c){s.e(c)}finally{s.f()}}catch(l){return!1}return!0}t.isBasicSensorValueDTO=i,t.isBasicSensorValueDTOConstrained=o,t.isSensorValueDTO=function(e){return i(e)||!u(e)},t.isSensorValueListDTO=u,t.toSensorValue=function e(t){if(o(t))return new s.NumberSensorValue(t.name,s.getNumberParser(t.type,t.size));var n=t.values.map((function(t){return e(t)}));return new s.SensorValueList(n)}},104:function(e,t,n){"use strict";n.r(t);var r=n(0),s=n.n(r),a=n(9),i=n.n(a),o=(n(81),n(11)),u=n(12),c=n(28),l=n(26),h=(n(82),n(4)),f=function(e){Object(c.a)(n,e);var t=Object(l.a)(n);function n(e){var r;return Object(o.a)(this,n),(r=t.call(this,e)).canvasRef=void 0,r.canvasRef=s.a.createRef(),r}return Object(u.a)(n,[{key:"render",value:function(){return Object(h.jsx)("div",{className:this.props.className,children:Object(h.jsx)("canvas",{height:this.props.height,width:this.props.width,ref:this.canvasRef,style:{fontFamily:"Arial"}})})}},{key:"componentDidMount",value:function(){this.componentDidUpdate()}},{key:"componentDidUpdate",value:function(){switch(this.props.orientation){case"horizontal":this.renderHorizontally();break;case"verticalL":this.renderVerticallyL();break;case"verticalR":this.renderVerticallyR()}}},{key:"renderHorizontally",value:function(){var e,t=null===(e=this.canvasRef.current)||void 0===e?void 0:e.getContext("2d");if(t){var n=Math.round(this.props.value),r=this.props.width,s=this.props.height;null===t||void 0===t||t.clearRect(0,0,r,s),t.translate(-10*(this.props.value-n),0);for(var a=n-25;a<=n+25;a++)if(t.strokeStyle="black",a%10===0){t.font="15px Arial";var i=a%360;i<0&&(i+=360);var o=("000"+i).slice(-3);t.strokeText(o,r/2+2*(a-n)*5-14,.8*s),t.beginPath(),t.moveTo(r/2+2*(a-n)*5,.1*s),t.lineTo(r/2+2*(a-n)*5,.4*s),t.stroke()}else a%5===0&&(t.beginPath(),t.moveTo(r/2+2*(a-n)*5,.1*s),t.lineTo(r/2+2*(a-n)*5,.8*s),t.stroke());t.resetTransform(),t.fillStyle="black",t.fillRect(.5*r-25,3,50,.9*s),t.strokeStyle="white",t.beginPath(),t.rect(.5*r-25,3,50,.9*s),t.stroke(),t.font="20px Arial";var u=("000"+n%360).slice(-3);t.strokeText(u,.5*r-17,.8*s)}}},{key:"renderVerticallyL",value:function(){var e,t=null===(e=this.canvasRef.current)||void 0===e?void 0:e.getContext("2d");if(t){var n=Math.round(this.props.value),r=10,s=this.props.width,a=this.props.height;null===t||void 0===t||t.clearRect(0,0,s,a),t.translate(0,20*(this.props.value-n));for(var i=n-10;i<=n+10;i++)t.strokeStyle="black",i%10===0?(t.font="15px Arial",t.strokeText(i.toString(),.1*s,a/2+5-2*(i-n)*r),t.beginPath(),t.moveTo(.5*s,a/2-2*(i-n)*r),t.lineTo(.9*s,a/2-2*(i-n)*r),t.stroke()):i%5===0&&(t.beginPath(),t.moveTo(.6*s,a/2-2*(i-n)*r),t.lineTo(.9*s,a/2-2*(i-n)*r),t.stroke());t.resetTransform(),t.fillStyle="black",t.fillRect(.01*s,a/2-20,.9*s,40),t.strokeStyle="white",t.beginPath(),t.rect(.01*s,a/2-20,.9*s,40),t.stroke(),t.font="20px Arial",t.strokeText(n+" m/s",.1*s,a/2+10)}}},{key:"renderVerticallyR",value:function(){var e,t=null===(e=this.canvasRef.current)||void 0===e?void 0:e.getContext("2d");if(t){var n=Math.round(this.props.value),r=this.props.width,s=this.props.height;null===t||void 0===t||t.clearRect(0,0,r,s),t.translate(0,10*(this.props.value-n));for(var a=n-25;a<=n+25;a++)t.strokeStyle="black",a%10===0?(t.font="15px Arial",t.strokeText(a.toString(),.1*r,s/2+5-2*(a-n)*5),t.beginPath(),t.moveTo(.6*r,s/2-2*(a-n)*5),t.lineTo(.9*r,s/2-2*(a-n)*5),t.stroke()):a%5===0&&(t.beginPath(),t.moveTo(.3*r,s/2-2*(a-n)*5),t.lineTo(.9*r,s/2-2*(a-n)*5),t.stroke());t.resetTransform(),t.fillStyle="black",t.fillRect(.01*r,s/2-20,.99*r,40),t.strokeStyle="white",t.beginPath(),t.rect(.01*r,s/2-20,.99*r,40),t.stroke(),t.font="20px Arial",t.strokeText(n+" m",.1*r,s/2+10)}}}]),n}(r.Component),v=(n(84),function(e){Object(c.a)(n,e);var t=Object(l.a)(n);function n(e){var r;return Object(o.a)(this,n),(r=t.call(this,e)).canvasRef=void 0,r.headingRef=void 0,r.altitudeRef=void 0,r.speedRef=void 0,r.canvasRef=s.a.createRef(),r.headingRef=s.a.createRef(),r.altitudeRef=s.a.createRef(),r.speedRef=s.a.createRef(),r}return Object(u.a)(n,[{key:"render",value:function(){return Object(h.jsxs)("div",{className:"ah-container",style:{height:this.props.height,width:this.props.width},children:[Object(h.jsx)("canvas",{className:"ah-canvas",ref:this.canvasRef,height:this.props.height,width:this.props.width}),Object(h.jsx)(f,{className:"heading-gauge",ref:this.headingRef,height:.08*this.props.height,orientation:"horizontal",width:.7*this.props.width,value:(180*this.props.heading/Math.PI+720)%360}),Object(h.jsx)(f,{className:"alt-gauge",ref:this.altitudeRef,height:this.props.height,orientation:"verticalR",width:.12*this.props.width,value:this.props.altitude}),Object(h.jsx)(f,{className:"speed-gauge",ref:this.speedRef,height:this.props.height,orientation:"verticalL",width:.13*this.props.width,value:this.props.speed})]})}},{key:"componentDidMount",value:function(){this.componentDidUpdate()}},{key:"componentDidUpdate",value:function(){var e,t=null===(e=this.canvasRef.current)||void 0===e?void 0:e.getContext("2d");if(t){var n=180*this.props.pitch/Math.PI,r=180*this.props.bank/Math.PI,s=this.props.width,a=this.props.height,i=2.5*s,o=8*a;t.translate(s/2,a/2),t.rotate(-r*Math.PI/180),t.translate(0,8*n),t.fillStyle="brown",t.fillRect(-i/2,0,i,o/2),t.fillStyle="blue",t.fillRect(-i/2,-o/2,i,o/2);for(var u=-80;u<=80;u+=10)t.lineWidth=1,t.moveTo(-50,8*u),t.lineTo(50,8*u),t.strokeStyle="white",t.stroke();for(var c=-25;c<=25;c+=10)t.moveTo(-30,8*c),t.lineTo(30,8*c),t.stroke();for(var l=-17.5;l<=17.5;l+=5)t.moveTo(-15,8*l),t.lineTo(15,8*l),t.stroke();t.font="30px Arial";for(var h=10;h<=80;h+=10)t.strokeText(h+"",-85,8*-h+10),t.strokeText(h+"",50,8*-h+10),t.strokeText(h+"",-85,8*h+10),t.strokeText(h+"",50,8*h+10);t.translate(0,-8*n),t.rotate(30*Math.PI/180);for(var f=-30;f<=30;f+=10)t.beginPath(),t.moveTo(0,-a/2.5),t.lineTo(0,-a/2.35),0===f&&t.lineTo(0,-a/2.25),t.stroke(),t.rotate(-10*Math.PI/180);t.rotate(40*Math.PI/180),t.rotate(r*Math.PI/180),t.translate(-s/2,-a/2),t.beginPath(),t.arc(s/2,a/2,a/2.5,0,2*Math.PI),t.lineWidth=1,t.strokeStyle="black",t.stroke(),t.translate(s/2,a/2),t.beginPath(),t.moveTo(0,-a/2.5),t.lineTo(-8,-a/2.3),t.lineTo(8,-a/2.3),t.lineTo(0,-a/2.5),t.strokeStyle="yellow",t.stroke(),t.translate(-s/2,-a/2),t.beginPath(),t.rect(s/2-5,a/2-5,10,10),t.lineWidth=3,t.strokeStyle="yellow",t.stroke(),t.beginPath(),t.moveTo(-a/2.3+s/2,a/2),t.lineTo(-a/4+s/2,a/2),t.lineTo(-a/4+s/2,a/2+40),t.stroke(),t.beginPath(),t.moveTo(a/2.3+s/2,a/2),t.lineTo(a/4+s/2,a/2),t.lineTo(a/4+s/2,a/2+40),t.stroke()}}}]),n}(r.Component));v.defaultProps={height:500,width:600};var d=n(143),A=(n(85),function(e){return Object(h.jsx)("div",{children:Object(h.jsxs)(d.a,{container:!0,spacing:3,className:"nav-grid",children:[Object(h.jsx)(d.a,{item:!0,style:{flexGrow:0},children:e.children.horizon}),Object(h.jsx)(d.a,{item:!0,children:e.children.settings}),Object(h.jsx)(d.a,{item:!0,children:e.children.terminal})]})})}),p=n(22),g=n(108),C=n(112),y=n(110),b=n(109),m=n(148),k=n(105),D=n(150),j=n(151),S=n(51),w=n.n(S),O=n(68),B=n(147),x=n(149),E=function(){function e(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"http://localhost:9091";Object(o.a)(this,e),this.baseUrl="",this.socket=null,this.streamHook=void 0,this.setSocketUrl(n),this.streamHook={writeData:function(e){var n;return null===(n=t.socket)||void 0===n?void 0:n.send(e)},onData:null}}return Object(u.a)(e,[{key:"matchesStringValue",value:function(e){return e==="websocket-"+this.baseUrl}},{key:"getSettings",value:function(){return Object(h.jsx)(V,{source:this})}},{key:"openPort",value:function(e){var t,n=this;null===(t=this.socket)||void 0===t||t.close(),this.socket=null;var r=new URL(this.baseUrl+"/open-port-request?");r.searchParams.append("path",encodeURI(e.path)),r.searchParams.append("baud","9600"),fetch(r.href).then((function(t){t.text().then((function(t){"success"===t&&n.setSocketUrl(n.baseUrl,"/device"+e.path)}))}))}},{key:"close",value:function(){var e;null===(e=this.socket)||void 0===e||e.close()}},{key:"setSocketUrl",value:function(e){var t,n=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",s=e.replace("http://","ws://")+r;null===(t=this.socket)||void 0===t||t.close();try{this.socket=new WebSocket(s),this.socket.onopen=function(e){var t;null===(t=n.socket)||void 0===t||t.send("Hallo Welt")},this.socket.onmessage=function(e){try{e.data.arrayBuffer().then((function(e){var t,r;null===(t=(r=n.streamHook).onData)||void 0===t||t.call(r,e)}))}catch(t){}}}catch(a){console.log(a)}this.baseUrl=e}},{key:"getSelectOption",value:function(){var e="websocket-"+this.baseUrl;return Object(h.jsx)(j.a,{value:e,children:Object(h.jsxs)("p",{children:["Websocket ",Object(h.jsx)(B.a,{children:this.baseUrl})]})},e)}},{key:"getStreamHook",value:function(){var e=this;return this.streamHook.writeData=function(t){var n;return null===(n=e.socket)||void 0===n?void 0:n.send(t)},this.streamHook}},{key:"begin",value:function(){}}]),e}(),M=function(e){var t=s.a.useState({ports:[],selected:""}),n=Object(p.a)(t,2),a=n[0],i=n[1],o=Object(r.useRef)(-1);window.clearInterval(o.current);var u=e.url;return o.current=window.setInterval(Object(O.a)(w.a.mark((function e(){var t,n;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(u+"/devices");case 3:return t=e.sent,e.next=6,t.json();case 6:n=e.sent,i({ports:n,selected:a.selected}),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])}))),1e3),Object(r.useEffect)((function(){return function(){console.log("Clearing timer ",o.current,"before exit"),window.clearInterval(o.current)}}),[]),Object(h.jsx)(y.a,{value:a.selected,onChange:function(t){var n=a.ports.find((function(e){return e.path===t.target.value}));n&&e.onChange(n),i({ports:a.ports,selected:t.target.value})},children:a.ports.map((function(e){return Object(h.jsxs)(j.a,{value:e.path,children:[e.path," (",e.manufacturer,")"]})}))})},V=function(e){var t=s.a.useState(e.source.baseUrl),n=Object(p.a)(t,2),r=n[0],a=n[1];return Object(h.jsxs)("div",{children:[Object(h.jsx)(x.a,{defaultValue:e.source.baseUrl,onChange:function(t){e.source.setSocketUrl(t.target.value),a(t.target.value)}}),Object(h.jsx)(M,{url:r,onChange:e.source.openPort.bind(e.source)})]})},T=function(){function e(){Object(o.a)(this,e),this.hook={writeData:function(e){return console.log(e)},onData:null}}return Object(u.a)(e,[{key:"matchesStringValue",value:function(e){return"demo"===e}},{key:"getSettings",value:function(){return null}},{key:"getSelectOption",value:function(){return Object(h.jsx)(j.a,{value:"demo",children:"Demo data"},"demo")}},{key:"getStreamHook",value:function(){return this.hook}},{key:"close",value:function(){}},{key:"begin",value:function(){var e,t;null===(e=(t=this.hook).onData)||void 0===e||e.call(t,U)}}]),e}(),F=new E,P=[new T,F],U=new Uint8Array("00 FF 11 7B 22 6E 61 6D 65 22 3A 20 22 6C 69 73 74 22 2C 0A 20 22 73 69 7A 65 22 3A 20 38 2C 20 22 76 61 6C 75 65 73 22 3A 20 5B 0A 7B 22 6E 61 6D 65 22 3A 20 22 61 6C 74 69 74 75 64 65 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 66 6C 6F 61 74 22 7D 2C 0A 7B 22 6E 61 6D 65 22 3A 20 22 68 65 61 64 69 6E 67 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 69 6E 74 22 7D 0A 5D 0A 7D 00 01 00 11 00 00 00 00 C0 41 18 00 00 00 00 00 00 00 01 00 FF 11 7B 22 6E 61 6D 65 22 3A 20 22 6C 69 73 74 22 2C 0A 20 22 73 69 7A 65 22 3A 20 38 2C 20 22 76 61 6C 75 65 73 22 3A 20 5B 0A 7B 22 6E 61 6D 65 22 3A 20 22 61 6C 74 69 74 75 64 65 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 66 6C 6F 61 74 22 7D 2C 0A 7B 22 6E 61 6D 65 22 3A 20 22 68 65 61 64 69 6E 67 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 69 6E 74 22 7D 2C 0A 5D 0A 7D 00 01 00 11 00 00 00 00 C8 41 19 00 00 00 00 00 00 00 01 00 FF 11 7B 22 6E 61 6D 65 22 3A 20 22 6C 69 73 74 22 2C 0A 20 22 73 69 7A 65 22 3A 20 38 2C 20 22 76 61 6C 75 65 73 22 3A 20 5B 0A 7B 22 6E 61 6D 65 22 3A 20 22 61 6C 74 69 74 75 64 65 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 66 6C 6F 61 74 22 7D 2C 0A 7B 22 6E 61 6D 65 22 3A 20 22 68 65 61 64 69 6E 67 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 69 6E 74 22 7D 2C 0A 5D 0A 7D 00 01 00 11 00 00 00 00 D0 41 1A 00 00 00 00 00 00 00 01 00 FF 11 7B 22 6E 61 6D 65 22 3A 20 22 6C 69 73 74 22 2C 0A 20 22 73 69 7A 65 22 3A 20 38 2C 20 22 76 61 6C 75 65 73 22 3A 20 5B 0A 7B 22 6E 61 6D 65 22 3A 20 22 61 6C 74 69 74 75 64 65 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 66 6C 6F 61 74 22 7D 2C 0A 7B 22 6E 61 6D 65 22 3A 20 22 68 65 61 64 69 6E 67 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 69 6E 74 22 7D 2C 0A 5D 0A 7D 00 01 00 11 00 00 00 00 D8 41 1B 00 00 00 00 00 00 00 01 00 FF 11 7B 22 6E 61 6D 65 22 3A 20 22 6C 69 73 74 22 2C 0A 20 22 73 69 7A 65 22 3A 20 38 2C 20 22 76 61 6C 75 65 73 22 3A 20 5B 0A 7B 22 6E 61 6D 65 22 3A 20 22 61 6C 74 69 74 75 64 65 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 66 6C 6F 61 74 22 7D 2C 0A 7B 22 6E 61 6D 65 22 3A 20 22 68 65 61 64 69 6E 67 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 69 6E 74 22 7D 2C 0A 5D 0A 7D 00 01 00 11 00 00 00 00 E0 41 1C 00 00 00 00 00 00 00 01 00 FF 11 7B 22 6E 61 6D 65 22 3A 20 22 6C 69 73 74 22 2C 0A 20 22 73 69 7A 65 22 3A 20 38 2C 20 22 76 61 6C 75 65 73 22 3A 20 5B 0A 7B 22 6E 61 6D 65 22 3A 20 22 61 6C 74 69 74 75 64 65 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 66 6C 6F 61 74 22 7D 2C 0A 7B 22 6E 61 6D 65 22 3A 20 22 68 65 61 64 69 6E 67 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 69 6E 74 22 7D 2C 0A 5D 0A 7D 00 01 00 11 00 00 00 00 E8 41 1D 00 00 00 00 00 00 00 01 00 FF 11 7B 22 6E 61 6D 65 22 3A 20 22 6C 69 73 74 22 2C 0A 20 22 73 69 7A 65 22 3A 20 38 2C 20 22 76 61 6C 75 65 73 22 3A 20 5B 0A 7B 22 6E 61 6D 65 22 3A 20 22 61 6C 74 69 74 75 64 65 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 66 6C 6F 61 74 22 7D 2C 0A 7B 22 6E 61 6D 65 22 3A 20 22 68 65 61 64 69 6E 67 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 69 6E 74 22 7D 2C 0A 5D 0A 7D 00 01 00 11 00 00 00 00 F0 41 1E 00 00 00 00 00 00 00 01 00 FF 11 7B 22 6E 61 6D 65 22 3A 20 22 6C 69 73 74 22 2C 0A 20 22 73 69 7A 65 22 3A 20 38 2C 20 22 76 61 6C 75 65 73 22 3A 20 5B 0A 7B 22 6E 61 6D 65 22 3A 20 22 61 6C 74 69 74 75 64 65 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 66 6C 6F 61 74 22 7D 2C 0A 7B 22 6E 61 6D 65 22 3A 20 22 68 65 61 64 69 6E 67 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 69 6E 74 22 7D 2C 0A 5D 0A 7D 00 01 00 11 00 00 00 00 F8 41 1F 00 00 00 00 00 00 00 01 00 FF 11 7B 22 6E 61 6D 65 22 3A 20 22 6C 69 73 74 22 2C 0A 20 22 73 69 7A 65 22 3A 20 38 2C 20 22 76 61 6C 75 65 73 22 3A 20 5B 0A 7B 22 6E 61 6D 65 22 3A 20 22 61 6C 74 69 74 75 64 65 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 66 6C 6F 61 74 22 7D 2C 0A 7B 22 6E 61 6D 65 22 3A 20 22 68 65 61 64 69 6E 67 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 69 6E 74 22 7D 2C 0A 5D 0A 7D 00 01 00 11 00 00 00 00 00 00 42 20 00 00 00 00 00 00 00 01 00 FF 11 7B 22 6E 61 6D 65 22 3A 20 22 6C 69 73 74 22 2C 0A 20 22 73 69 7A 65 22 3A 20 38 2C 20 22 76 61 6C 75 65 73 22 3A 20 5B 0A 7B 22 6E 61 6D 65 22 3A 20 22 61 6C 74 69 74 75 64 65 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 66 6C 6F 61 74 22 7D 2C 0A 7B 22 6E 61 6D 65 22 3A 20 22 68 65 61 64 69 6E 67 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 69 6E 74 22 7D 2C 0A 5D 0A 7D 00 01 00 11 00 00 00 00 04 42 21 00 00 00 00 00 00 00 01 00 FF 11 7B 22 6E 61 6D 65 22 3A 20 22 6C 69 73 74 22 2C 0A 20 22 73 69 7A 65 22 3A 20 38 2C 20 22 76 61 6C 75 65 73 22 3A 20 5B 0A 7B 22 6E 61 6D 65 22 3A 20 22 61 6C 74 69 74 75 64 65 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 66 6C 6F 61 74 22 7D 2C 0A 7B 22 6E 61 6D 65 22 3A 20 22 68 65 61 64 69 6E 67 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 69 6E 74 22 7D 2C 0A 5D 0A 7D 00 01 00 11 00 00 00 00 08 42 22 00 00 00 00 00 00 00 01 00 FF 11 7B 22 6E 61 6D 65 22 3A 20 22 6C 69 73 74 22 2C 0A 20 22 73 69 7A 65 22 3A 20 38 2C 20 22 76 61 6C 75 65 73 22 3A 20 5B 0A 7B 22 6E 61 6D 65 22 3A 20 22 61 6C 74 69 74 75 64 65 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 66 6C 6F 61 74 22 7D 2C 0A 7B 22 6E 61 6D 65 22 3A 20 22 68 65 61 64 69 6E 67 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 69 6E 74 22 7D 2C 0A 5D 0A 7D 00 01 00 11 00 00 00 00 0C 42 23 00 00 00 00 00 00 00 01 00 FF 11 7B 22 6E 61 6D 65 22 3A 20 22 6C 69 73 74 22 2C 0A 20 22 73 69 7A 65 22 3A 20 38 2C 20 22 76 61 6C 75 65 73 22 3A 20 5B 0A 7B 22 6E 61 6D 65 22 3A 20 22 61 6C 74 69 74 75 64 65 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 66 6C 6F 61 74 22 7D 2C 0A 7B 22 6E 61 6D 65 22 3A 20 22 68 65 61 64 69 6E 67 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 69 6E 74 22 7D 2C 0A 5D 0A 7D 00 01 00 11 00 00 00 00 10 42 24 00 00 00 00 00 00 00 01 ".split(" ").map((function(e){return parseInt(e,16)}))),z=(n(92),function(e){var t,n=s.a.useState(""),r=Object(p.a)(n,2),a=r[0],i=r[1];return Object(h.jsxs)(m.a,{className:"settings-grid-element",children:[Object(h.jsx)(k.a,{component:"h1",children:"Settings"}),Object(h.jsx)(D.a,{}),Object(h.jsxs)(g.a,{className:"settings-form",children:[Object(h.jsx)(C.a,{htmlFor:"datasource-select",children:"Data source"}),Object(h.jsx)(y.a,{id:"datasource-select",value:a,onChange:function(t){var n;null===(n=e.logic.currentDataSource)||void 0===n||n.close(),e.logic.currentDataSource=P.find((function(e){return e.matchesStringValue(t.target.value)}))||null,i(t.target.value)},children:P.map((function(e){return e.getSelectOption()}))}),Object(h.jsx)(b.a,{children:"Data source to use"})]}),null===(t=e.logic.currentDataSource)||void 0===t?void 0:t.getSettings()]})}),R=(n(93),function(e){var t=Object(r.useState)([]),n=Object(p.a)(t,2),s=n[0],a=n[1];e.logic.onMessage=function(e){s.push(e),a(s)};var i=Object(r.useRef)(null);return Object(h.jsxs)(m.a,{className:"terminal",children:[Object(h.jsx)("div",{className:"terminal-output-container",children:s.map((function(e){return Object(h.jsx)("p",{children:e})}))}),Object(h.jsx)("input",{ref:i,onKeyPress:function(t){"Enter"===t.key&&i.current&&(e.logic.sendMessage(i.current.value),i.current.value="")}})]})}),I=function(e){Object(c.a)(n,e);var t=Object(l.a)(n);function n(e){var r;return Object(o.a)(this,n),(r=t.call(this,e)).props.logic.onUpdate=function(){r.forceUpdate()},r}return Object(u.a)(n,[{key:"render",value:function(){return Object(h.jsx)("div",{className:"App",children:Object(h.jsx)(A,{children:{horizon:Object(h.jsx)(v,{pitch:this.props.logic.data.pitch,bank:this.props.logic.data.bank,heading:this.props.logic.data.heading,altitude:this.props.logic.data.altitude,speed:this.props.logic.data.speed}),settings:Object(h.jsx)(z,{logic:this.props.logic}),terminal:Object(h.jsx)(R,{logic:this.props.logic})}})})}}]),n}(s.a.Component),N=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,152)).then((function(t){var n=t.getCLS,r=t.getFID,s=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),r(e),s(e),a(e),i(e)}))},_=n(69),H=n(70),L=new(function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){};Object(o.a)(this,e),this.onMessage=function(e){return console.log(e)},this.registry=null,this.onUpdate=void 0,this.data={pitch:0,bank:0,heading:0,speed:0,altitude:0},this._currentDataSource=null,this.streamHook=null,this.onUpdate=t}return Object(u.a)(e,[{key:"currentDataSource",get:function(){return this._currentDataSource},set:function(e){this._currentDataSource=e,this.setStreamHook((null===e||void 0===e?void 0:e.getStreamHook())||null),null===e||void 0===e||e.begin()}},{key:"setStreamHook",value:function(e){var t=this;this.streamHook=e,this.registry=new H.MessageRegistry,this.registry.onMessage=this.onMessage,this.registry.onUnknownMessage=function(){t.registry&&t.sendMessage(t.registry.messageDefinitionMessage)},e&&(e.onData=function(e){if(t.registry){t.registry.readData(e);var n,r=Object(_.a)(t.registry.basicSensorValues||[]);try{for(r.s();!(n=r.n()).done;){var s=n.value;Object.keys(t.data).includes(s.name)&&(t.data[s.name]=s.value)}}catch(a){r.e(a)}finally{r.f()}t.onUpdate()}})}},{key:"sendMessage",value:function(e){if(this.registry)if("string"===typeof e)this.registry.streamMessage.append(e),this.sendMessage(this.registry.streamMessage);else if("stream"===e.value.name){var t;null===(t=this.currentDataSource)||void 0===t||t.getStreamHook().writeData(e.encodeAndFlush())}else{var n,r=this.registry.encodeMessage(e);null===(n=this.currentDataSource)||void 0===n||n.getStreamHook().writeData(r)}}}]),e}());i.a.render(Object(h.jsx)(s.a.StrictMode,{children:Object(h.jsx)(I,{logic:L})}),document.getElementById("root")),N()},50:function(e,t,n){"use strict";var r=n(37),s=n(49),a=n(62),i=n(60),o=n(61),u=n(48);Object.defineProperty(t,"__esModule",{value:!0}),t.SensorValueList=t.NumberSensorValue=t.getNumberParser=t.parsers=t.SensorValue=void 0;var c=function e(){var t=this;u(this,e),this.name="",this.size=0,this.replaceBasicSensorValues=function(e){return t}};t.SensorValue=c,t.parsers={uint8:{name:"uint8",size:1,parse:function(e){return new Uint8Array(e)[0]},serialize:function(e){return new Uint8Array([e])}},uint16:{name:"uint16",size:2,parse:function(e){return new Uint16Array(e)[0]},serialize:function(e){return new Uint16Array([e])}},uint32:{name:"uint32",size:4,parse:function(e){return new Uint32Array(e)[0]},serialize:function(e){return new Uint32Array([e])}},int8:{name:"int8",size:1,parse:function(e){return new Int8Array(e)[0]},serialize:function(e){return new Int8Array([e])}},int16:{name:"int16",size:2,parse:function(e){return new Int16Array(e)[0]},serialize:function(e){return new Int16Array([e])}},int32:{name:"int32",size:4,parse:function(e){return new Int32Array(e)[0]},serialize:function(e){return new Int32Array([e])}},float32:{name:"float32",size:4,parse:function(e){return new Float32Array(e)[0]},serialize:function(e){return new Float32Array([e])}},float64:{name:"float64",size:4,parse:function(e){return new Float64Array(e)[0]},serialize:function(e){return new Float64Array([e])}}};t.getNumberParser=function(e,n){return t.parsers[e+8*n]};var l=function(e){i(n,e);var t=o(n);function n(e,r){var s;return u(this,n),(s=t.call(this)).value=0,s.name=e,s.parser=r,s.size=r.size,s.replaceBasicSensorValues=function(e){var t=e.find((function(e){return e.name==s.name}));return void 0==t?a(s):t},s}return s(n,[{key:"getBasicSensorValues",value:function(){return[this]}},{key:"parse",value:function(e){return this.value=this.parser.parse(e),!0}},{key:"serialize",value:function(){return this.parser.serialize(this.value)}}]),n}(c);t.NumberSensorValue=l;var h=function(e){i(n,e);var t=o(n);function n(e){var r;return u(this,n),(r=t.call(this)).sensorValues=e,r.sensorValues.forEach((function(e){return r.size+=e.size})),r.replaceBasicSensorValues=function(e){for(var t in r.sensorValues)r.sensorValues[t]=r.sensorValues[t].replaceBasicSensorValues(e);return a(r)},r}return s(n,[{key:"getBasicSensorValues",value:function(){return this.sensorValues.filter((function(e){return e instanceof l}))}},{key:"parse",value:function(e){var t,n=0,s=r(this.sensorValues);try{for(s.s();!(t=s.n()).done;){var a=t.value;a.parse(e.slice(n,n+a.size)),n+=a.size}}catch(i){s.e(i)}finally{s.f()}return n==this.size}},{key:"serialize",value:function(){var e,t=new Uint8Array(this.size),n=r(this.sensorValues);try{for(n.s();!(e=n.n()).done;){var s=e.value;t.set(new Uint8Array(s.serialize()),0)}}catch(a){n.e(a)}finally{n.f()}return t}}]),n}(c);t.SensorValueList=h},56:function(e,t,n){"use strict";var r=n(57),s=n(37),a=n(60),i=n(61),o=n(48),u=n(49);Object.defineProperty(t,"__esModule",{value:!0}),t.StreamMessage=t.Message=void 0;var c=n(50),l=function(){function e(t,n){if(o(this,e),n<=1||n>255)throw new Error("id not in valid range");this.id=n,this.value=t}return u(e,[{key:"parse",value:function(e){return(new Uint8Array(e).length==this.value.size||!("stream"!==this.value.name||new Uint8Array(e).length>this.value.size))&&(this.value.parse(e),!0)}}]),e}();t.Message=l;var h=function(e){a(n,e);var t=i(n);function n(){var e,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:500,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(e){return console.log(e)};return o(this,n),(e=t.call(this)).name="stream",e.outputBuffer=[],e.size=r,e.onMessage=s,e}return u(n,[{key:"getBasicSensorValues",value:function(){return[]}},{key:"parse",value:function(e){return this.onMessage((new TextDecoder).decode(e.slice(0,e.byteLength-1))),!0}},{key:"serialize",value:function(){return console.error("You cannot serialize a string message!"),new ArrayBuffer(0)}}]),n}(c.SensorValue),f=function(e){a(n,e);var t=i(n);function n(){var e,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(e){return console.log(e)};return o(this,n),(e=t.call(this,new h(500,r),254))._value=e.value,e}return u(n,[{key:"append",value:function(e){this._value.outputBuffer.push(e)}},{key:"encodeAndFlush",value:function(){var e=this,t=this._value.outputBuffer.map((function(t){return function(t){var n,r=(new TextEncoder).encode(t),a=[0,e.id],i=s(r);try{for(i.s();!(n=i.n()).done;){var o=n.value;a.push(o),0===o&&a.push(0)}}catch(u){i.e(u)}finally{i.f()}return a.push(0,0,0,1),new Uint8Array(a)}(t)}));return this._value.outputBuffer=[],t.reduce((function(e,t){return Uint8Array.from([].concat(r(e),r(t)))}))}}]),n}(l);t.StreamMessage=f},70:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.NumberSensorValue=t.SensorValueList=t.MessageRegistry=t.Message=void 0;var r=n(56);Object.defineProperty(t,"Message",{enumerable:!0,get:function(){return r.Message}});var s=n(102);Object.defineProperty(t,"MessageRegistry",{enumerable:!0,get:function(){return s.MessageRegistry}});var a=n(50);Object.defineProperty(t,"SensorValueList",{enumerable:!0,get:function(){return a.SensorValueList}}),Object.defineProperty(t,"NumberSensorValue",{enumerable:!0,get:function(){return a.NumberSensorValue}})},81:function(e,t,n){},82:function(e,t,n){},84:function(e,t,n){},85:function(e,t,n){},92:function(e,t,n){},93:function(e,t,n){}},[[104,1,2]]]);
//# sourceMappingURL=main.a2f5827e.chunk.js.map