(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{168:function(e,t,a){e.exports=a(369)},173:function(e,t,a){},368:function(e,t,a){},369:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),o=a(46),c=a.n(o),l=(a(173),a(75)),i=a(76),u=a(82),s=a(77),d=a(83),m=a(78),p=a.n(m),f=a(8),h=(a(368),function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(u.a)(this,Object(s.a)(t).call(this,e))).counter=function(e){var t={};a.state.minor.forEach(function(e){t[e]=(t[e]||0)+1}),console.log(t)},a.state={population:[],minor:[],counts:[],selectedAlbum:null},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;p.a.get("https://pkgstore.datahub.io/core/population/population_json/data/43d34c2353cbd16a0aa8cadfb193af05/population_json.json").then(function(t){e.setState({population:t.data})}),p.a.get("https://pkgstore.datahub.io/core/country-codes/country-codes_json/data/471a2e653140ecdd7243cdcacfd66608/country-codes_json.json").then(function(t){e.setState({minor:t.data})})}},{key:"render",value:function(){var e=this.state,t=e.population,a=e.minor,n=(e.counts,this.state.selectedAlbum,t.length?t.slice(11449,11506).filter(function(e,t){return r.a.createElement("ul",{key:t},e.Year,e.Value)}).map(function(e){return e}):r.a.createElement("div",{className:"center"},"No data yet! ")),o=a.length?a.filter(function(e,t){return r.a.createElement("ul",{key:t},e.currencyMinor,e.currencyName)}).map(function(e){return e}):r.a.createElement("div",{className:"center"},"No data yet! ");return r.a.createElement("div",{className:"containerLoader",style:b},r.a.createElement("div",{className:"card z-depth-0 project-summary thumb"},r.a.createElement("div",{className:"card-content grey-text text-darken-3 containerPost"},r.a.createElement(y,{data:n}),r.a.createElement(E,{data:o}))))}}]),t}(r.a.Component));function y(e){parseInt(1958),parseInt(2018);return r.a.createElement(f.f,{width:900,height:250,data:e.data,margin:{top:5,right:30,left:50,bottom:5}},r.a.createElement(f.c,{strokeDasharray:"3 3"}),r.a.createElement(f.h,{tick:r.a.createElement(v,null),type:"category",interval:"preserveStartEnd",label:{value:"Years",position:"insideBottomRight",offset:-10},dataKey:"Year"}),r.a.createElement(f.i,{interval:"preserveStartEnd",type:"number",domain:["auto","auto"],label:{value:"Population",angle:-90,position:"insideLeft",offset:-20}}),r.a.createElement(f.g,null),r.a.createElement(f.d,null),r.a.createElement(f.e,{type:"monotone",dataKey:"Value",stroke:"#8884d8"}))}function E(e){return r.a.createElement(f.b,{width:900,height:250,data:e.data},r.a.createElement(f.c,{strokeDasharray:"3 3"}),r.a.createElement(f.h,{dataKey:"ISO4217-currency_name"}),r.a.createElement(f.i,null),r.a.createElement(f.g,null),r.a.createElement(f.d,null),r.a.createElement(f.a,{dataKey:"ISO4217-currency_minor_unit",fill:"#82ca9d"}))}var v=function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props,t=e.x,a=e.y,n=(e.stroke,e.payload);return r.a.createElement("g",{transform:"translate(".concat(t,",").concat(a,")")},r.a.createElement("text",{x:0,y:0,dy:4,textAnchor:"end",fill:"#666",fontSize:"12px",transform:"rotate(-25)"},n.value))}}]),t}(r.a.Component),b={display:"flex",justifyContent:"center"};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(h,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[168,1,2]]]);
//# sourceMappingURL=main.5eecefb9.chunk.js.map