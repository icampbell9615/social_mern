webpackHotUpdate(0,{155:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),i=n(0),l=a(i),c=n(7),p=(a(c),n(1));n(156),n(3);var f=function(e){function t(e){r(this,t);var n=u(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={status:"I'm using react app!"},n.handleStatusChange=n.handleStatusChange.bind(n),n.handleInputChange=n.handleInputChange.bind(n),n}return o(t,e),s(t,[{key:"handleStatusChange",value:function(){this.callStatusChangeApi(this.state)}},{key:"callStatusChangeApi",value:function(e){var t=this;fetch("/api/statusupdate",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(function(e){return e.json()}).then(function(e){t.serviceStatusChangeHandler(e)})}},{key:"serviceStatusChangeHandler",value:function(e){"success"===e.status?alert("Your status has been updated."):alert(e.message)}},{key:"handleInputChange",value:function(e){var t=e.target.value;this.setState({status:t})}},{key:"render",value:function(){return l.default.createElement("div",{className:"userstatus-container"},l.default.createElement("div",{className:"form-group"},l.default.createElement("input",{type:"text",name:"form-status",value:this.state.status,placeholder:"Update your status",onChange:this.handleInputChange,className:"form-control padding"}),l.default.createElement("input",{type:"button",onClick:this.handleStatusChange,className:"btn btn-transparent padding",value:"Update"})))}}]),t}(i.Component);t.default=(0,p.withRouter)(f)}});