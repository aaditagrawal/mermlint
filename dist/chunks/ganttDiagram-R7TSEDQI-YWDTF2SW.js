import{n as ne}from"./chunk-662UOJDC.js";import{a as Ce}from"./chunk-4DYN46BX.js";import{O as Qt,P as Kt,Q as Jt,R as te,S as ee,T as ie,U as se,V as vt}from"./chunk-JGNBUWUV.js";import{a as Zt,b as ut}from"./chunk-AE5YYKYE.js";import{a as r}from"./chunk-EIBFAW37.js";import{b as pt,d as K}from"./chunk-EMBIDUMY.js";var re=pt((Ct,Mt)=>{(function(t,e){typeof Ct=="object"&&typeof Mt<"u"?Mt.exports=e():typeof define=="function"&&define.amd?define(e):(t=typeof globalThis<"u"?globalThis:t||self).dayjs_plugin_isoWeek=e()})(Ct,(function(){"use strict";var t="day";return function(e,i,n){var c=function(y){return y.add(4-y.isoWeekday(),t)},l=i.prototype;l.isoWeekYear=function(){return c(this).year()},l.isoWeek=function(y){if(!this.$utils().u(y))return this.add(7*(y-this.isoWeek()),t);var v,Y,x,$,W=c(this),V=(v=this.isoWeekYear(),Y=this.$u,x=(Y?n.utc:n)().year(v).startOf("year"),$=4-x.isoWeekday(),x.isoWeekday()>4&&($+=7),x.add($,t));return W.diff(V,"week")+1},l.isoWeekday=function(y){return this.$utils().u(y)?this.day()||7:this.day(this.day()%7?y:y-7)};var g=l.startOf;l.startOf=function(y,v){var Y=this.$utils(),x=!!Y.u(v)||v;return Y.p(y)==="isoweek"?x?this.date(this.date()-(this.isoWeekday()-1)).startOf("day"):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf("day"):g.bind(this)(y,v)}}}))});var ae=pt((Et,It)=>{(function(t,e){typeof Et=="object"&&typeof It<"u"?It.exports=e():typeof define=="function"&&define.amd?define(e):(t=typeof globalThis<"u"?globalThis:t||self).dayjs_plugin_customParseFormat=e()})(Et,(function(){"use strict";var t={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},e=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,i=/\d/,n=/\d\d/,c=/\d\d?/,l=/\d*[^-_:/,()\s\d]+/,g={},y=function(k){return(k=+k)+(k>68?1900:2e3)},v=function(k){return function(p){this[k]=+p}},Y=[/[+-]\d\d:?(\d\d)?|Z/,function(k){(this.zone||(this.zone={})).offset=(function(p){if(!p||p==="Z")return 0;var M=p.match(/([+-]|\d\d)/g),w=60*M[1]+(+M[2]||0);return w===0?0:M[0]==="+"?-w:w})(k)}],x=function(k){var p=g[k];return p&&(p.indexOf?p:p.s.concat(p.f))},$=function(k,p){var M,w=g.meridiem;if(w){for(var P=1;P<=24;P+=1)if(k.indexOf(w(P,0,p))>-1){M=P>12;break}}else M=k===(p?"pm":"PM");return M},W={A:[l,function(k){this.afternoon=$(k,!1)}],a:[l,function(k){this.afternoon=$(k,!0)}],Q:[i,function(k){this.month=3*(k-1)+1}],S:[i,function(k){this.milliseconds=100*+k}],SS:[n,function(k){this.milliseconds=10*+k}],SSS:[/\d{3}/,function(k){this.milliseconds=+k}],s:[c,v("seconds")],ss:[c,v("seconds")],m:[c,v("minutes")],mm:[c,v("minutes")],H:[c,v("hours")],h:[c,v("hours")],HH:[c,v("hours")],hh:[c,v("hours")],D:[c,v("day")],DD:[n,v("day")],Do:[l,function(k){var p=g.ordinal,M=k.match(/\d+/);if(this.day=M[0],p)for(var w=1;w<=31;w+=1)p(w).replace(/\[|\]/g,"")===k&&(this.day=w)}],w:[c,v("week")],ww:[n,v("week")],M:[c,v("month")],MM:[n,v("month")],MMM:[l,function(k){var p=x("months"),M=(x("monthsShort")||p.map((function(w){return w.slice(0,3)}))).indexOf(k)+1;if(M<1)throw new Error;this.month=M%12||M}],MMMM:[l,function(k){var p=x("months").indexOf(k)+1;if(p<1)throw new Error;this.month=p%12||p}],Y:[/[+-]?\d+/,v("year")],YY:[n,function(k){this.year=y(k)}],YYYY:[/\d{4}/,v("year")],Z:Y,ZZ:Y};function V(k){var p,M;p=k,M=g&&g.formats;for(var w=(k=p.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(S,_,C){var E=C&&C.toUpperCase();return _||M[C]||t[C]||M[E].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(I,L,u){return L||u.slice(1)}))}))).match(e),P=w.length,z=0;z<P;z+=1){var b=w[z],f=W[b],o=f&&f[0],T=f&&f[1];w[z]=T?{regex:o,parser:T}:b.replace(/^\[|\]$/g,"")}return function(S){for(var _={},C=0,E=0;C<P;C+=1){var I=w[C];if(typeof I=="string")E+=I.length;else{var L=I.regex,u=I.parser,h=S.slice(E),m=L.exec(h)[0];u.call(_,m),S=S.replace(m,"")}}return(function(d){var D=d.afternoon;if(D!==void 0){var s=d.hours;D?s<12&&(d.hours+=12):s===12&&(d.hours=0),delete d.afternoon}})(_),_}}return function(k,p,M){M.p.customParseFormat=!0,k&&k.parseTwoDigitYear&&(y=k.parseTwoDigitYear);var w=p.prototype,P=w.parse;w.parse=function(z){var b=z.date,f=z.utc,o=z.args;this.$u=f;var T=o[1];if(typeof T=="string"){var S=o[2]===!0,_=o[3]===!0,C=S||_,E=o[2];_&&(E=o[2]),g=this.$locale(),!S&&E&&(g=M.Ls[E]),this.$d=(function(h,m,d,D){try{if(["x","X"].indexOf(m)>-1)return new Date((m==="X"?1e3:1)*h);var s=V(m)(h),U=s.year,a=s.month,tt=s.day,ft=s.hours,ht=s.minutes,_t=s.seconds,mt=s.milliseconds,kt=s.zone,A=s.week,j=new Date,q=tt||(U||a?1:j.getDate()),Z=U||j.getFullYear(),et=0;U&&!a||(et=a>0?a-1:j.getMonth());var it,st=ft||0,F=ht||0,Q=_t||0,B=mt||0;return kt?new Date(Date.UTC(Z,et,q,st,F,Q,B+60*kt.offset*1e3)):d?new Date(Date.UTC(Z,et,q,st,F,Q,B)):(it=new Date(Z,et,q,st,F,Q,B),A&&(it=D(it).week(A).toDate()),it)}catch{return new Date("")}})(b,T,f,M),this.init(),E&&E!==!0&&(this.$L=this.locale(E).$L),C&&b!=this.format(T)&&(this.$d=new Date("")),g={}}else if(T instanceof Array)for(var I=T.length,L=1;L<=I;L+=1){o[1]=T[L-1];var u=M.apply(this,o);if(u.isValid()){this.$d=u.$d,this.$L=u.$L,this.init();break}L===I&&(this.$d=new Date(""))}else P.call(this,z)}}}))});var oe=pt((Yt,$t)=>{(function(t,e){typeof Yt=="object"&&typeof $t<"u"?$t.exports=e():typeof define=="function"&&define.amd?define(e):(t=typeof globalThis<"u"?globalThis:t||self).dayjs_plugin_advancedFormat=e()})(Yt,(function(){"use strict";return function(t,e){var i=e.prototype,n=i.format;i.format=function(c){var l=this,g=this.$locale();if(!this.isValid())return n.bind(this)(c);var y=this.$utils(),v=(c||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,(function(Y){switch(Y){case"Q":return Math.ceil((l.$M+1)/3);case"Do":return g.ordinal(l.$D);case"gggg":return l.weekYear();case"GGGG":return l.isoWeekYear();case"wo":return g.ordinal(l.week(),"W");case"w":case"ww":return y.s(l.week(),Y==="w"?1:2,"0");case"W":case"WW":return y.s(l.isoWeek(),Y==="W"?1:2,"0");case"k":case"kk":return y.s(String(l.$H===0?24:l.$H),Y==="k"?1:2,"0");case"X":return Math.floor(l.$d.getTime()/1e3);case"x":return l.$d.getTime();case"z":return"["+l.offsetName()+"]";case"zzz":return"["+l.offsetName("long")+"]";default:return Y}}));return n.bind(this)(v)}}}))});var ce=pt((Lt,At)=>{(function(t,e){typeof Lt=="object"&&typeof At<"u"?At.exports=e():typeof define=="function"&&define.amd?define(e):(t=typeof globalThis<"u"?globalThis:t||self).dayjs_plugin_duration=e()})(Lt,(function(){"use strict";var t,e,i=1e3,n=6e4,c=36e5,l=864e5,g=31536e6,y=2628e6,v=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,Y=/\[([^\]]+)]|YYYY|YY|Y|M{1,2}|D{1,2}|H{1,2}|m{1,2}|s{1,2}|SSS/g,x={years:g,months:y,days:l,hours:c,minutes:n,seconds:i,milliseconds:1,weeks:6048e5},$=function(b){return b instanceof P},W=function(b,f,o){return new P(b,o,f.$l)},V=function(b){return e.p(b)+"s"},k=function(b){return b<0},p=function(b){return k(b)?Math.ceil(b):Math.floor(b)},M=function(b){return Math.abs(b)},w=function(b,f){return b?k(b)?{negative:!0,format:""+M(b)+f}:{negative:!1,format:""+b+f}:{negative:!1,format:""}},P=(function(){function b(o,T,S){var _=this;if(this.$d={},this.$l=S,o===void 0&&(this.$ms=0,this.parseFromMilliseconds()),T)return W(o*x[V(T)],this);if(typeof o=="number")return this.$ms=o,this.parseFromMilliseconds(),this;if(typeof o=="object")return Object.keys(o).forEach((function(I){_.$d[V(I)]=o[I]})),this.calMilliseconds(),this;if(typeof o=="string"){var C=o.match(v);if(C){var E=C.slice(2).map((function(I){return I!=null?Number(I):0}));return this.$d.years=E[0],this.$d.months=E[1],this.$d.weeks=E[2],this.$d.days=E[3],this.$d.hours=E[4],this.$d.minutes=E[5],this.$d.seconds=E[6],this.calMilliseconds(),this}}return this}var f=b.prototype;return f.calMilliseconds=function(){var o=this;this.$ms=Object.keys(this.$d).reduce((function(T,S){return T+(o.$d[S]||0)*x[S]}),0)},f.parseFromMilliseconds=function(){var o=this.$ms;this.$d.years=p(o/g),o%=g,this.$d.months=p(o/y),o%=y,this.$d.days=p(o/l),o%=l,this.$d.hours=p(o/c),o%=c,this.$d.minutes=p(o/n),o%=n,this.$d.seconds=p(o/i),o%=i,this.$d.milliseconds=o},f.toISOString=function(){var o=w(this.$d.years,"Y"),T=w(this.$d.months,"M"),S=+this.$d.days||0;this.$d.weeks&&(S+=7*this.$d.weeks);var _=w(S,"D"),C=w(this.$d.hours,"H"),E=w(this.$d.minutes,"M"),I=this.$d.seconds||0;this.$d.milliseconds&&(I+=this.$d.milliseconds/1e3,I=Math.round(1e3*I)/1e3);var L=w(I,"S"),u=o.negative||T.negative||_.negative||C.negative||E.negative||L.negative,h=C.format||E.format||L.format?"T":"",m=(u?"-":"")+"P"+o.format+T.format+_.format+h+C.format+E.format+L.format;return m==="P"||m==="-P"?"P0D":m},f.toJSON=function(){return this.toISOString()},f.format=function(o){var T=o||"YYYY-MM-DDTHH:mm:ss",S={Y:this.$d.years,YY:e.s(this.$d.years,2,"0"),YYYY:e.s(this.$d.years,4,"0"),M:this.$d.months,MM:e.s(this.$d.months,2,"0"),D:this.$d.days,DD:e.s(this.$d.days,2,"0"),H:this.$d.hours,HH:e.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:e.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:e.s(this.$d.seconds,2,"0"),SSS:e.s(this.$d.milliseconds,3,"0")};return T.replace(Y,(function(_,C){return C||String(S[_])}))},f.as=function(o){return this.$ms/x[V(o)]},f.get=function(o){var T=this.$ms,S=V(o);return S==="milliseconds"?T%=1e3:T=S==="weeks"?p(T/x[S]):this.$d[S],T||0},f.add=function(o,T,S){var _;return _=T?o*x[V(T)]:$(o)?o.$ms:W(o,this).$ms,W(this.$ms+_*(S?-1:1),this)},f.subtract=function(o,T){return this.add(o,T,!0)},f.locale=function(o){var T=this.clone();return T.$l=o,T},f.clone=function(){return W(this.$ms,this)},f.humanize=function(o){return t().add(this.$ms,"ms").locale(this.$l).fromNow(!o)},f.valueOf=function(){return this.asMilliseconds()},f.milliseconds=function(){return this.get("milliseconds")},f.asMilliseconds=function(){return this.as("milliseconds")},f.seconds=function(){return this.get("seconds")},f.asSeconds=function(){return this.as("seconds")},f.minutes=function(){return this.get("minutes")},f.asMinutes=function(){return this.as("minutes")},f.hours=function(){return this.get("hours")},f.asHours=function(){return this.as("hours")},f.days=function(){return this.get("days")},f.asDays=function(){return this.as("days")},f.weeks=function(){return this.get("weeks")},f.asWeeks=function(){return this.as("weeks")},f.months=function(){return this.get("months")},f.asMonths=function(){return this.as("months")},f.years=function(){return this.get("years")},f.asYears=function(){return this.as("years")},b})(),z=function(b,f,o){return b.add(f.years()*o,"y").add(f.months()*o,"M").add(f.days()*o,"d").add(f.hours()*o,"h").add(f.minutes()*o,"m").add(f.seconds()*o,"s").add(f.milliseconds()*o,"ms")};return function(b,f,o){t=o,e=o().$utils(),o.duration=function(_,C){var E=o.locale();return W(_,{$l:E},C)},o.isDuration=$;var T=f.prototype.add,S=f.prototype.subtract;f.prototype.add=function(_,C){return $(_)?z(this,_,1):T.bind(this)(_,C)},f.prototype.subtract=function(_,C){return $(_)?z(this,_,-1):S.bind(this)(_,C)}}}))});var de=K(Ce(),1),H=K(Zt(),1),fe=K(re(),1),he=K(ae(),1),me=K(oe(),1),De=K(Zt(),1),Se=K(ce(),1);var Ft=(function(){var t=r(function(L,u,h,m){for(h=h||{},m=L.length;m--;h[L[m]]=u);return h},"o"),e=[6,8,10,12,13,14,15,16,17,18,20,21,22,23,24,25,26,27,28,29,30,31,33,35,36,38,40],i=[1,26],n=[1,27],c=[1,28],l=[1,29],g=[1,30],y=[1,31],v=[1,32],Y=[1,33],x=[1,34],$=[1,9],W=[1,10],V=[1,11],k=[1,12],p=[1,13],M=[1,14],w=[1,15],P=[1,16],z=[1,19],b=[1,20],f=[1,21],o=[1,22],T=[1,23],S=[1,25],_=[1,35],C={trace:r(function(){},"trace"),yy:{},symbols_:{error:2,start:3,gantt:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NL:10,weekday:11,weekday_monday:12,weekday_tuesday:13,weekday_wednesday:14,weekday_thursday:15,weekday_friday:16,weekday_saturday:17,weekday_sunday:18,weekend:19,weekend_friday:20,weekend_saturday:21,dateFormat:22,inclusiveEndDates:23,topAxis:24,axisFormat:25,tickInterval:26,excludes:27,includes:28,todayMarker:29,title:30,acc_title:31,acc_title_value:32,acc_descr:33,acc_descr_value:34,acc_descr_multiline_value:35,section:36,clickStatement:37,taskTxt:38,taskData:39,click:40,callbackname:41,callbackargs:42,href:43,clickStatementDebug:44,$accept:0,$end:1},terminals_:{2:"error",4:"gantt",6:"EOF",8:"SPACE",10:"NL",12:"weekday_monday",13:"weekday_tuesday",14:"weekday_wednesday",15:"weekday_thursday",16:"weekday_friday",17:"weekday_saturday",18:"weekday_sunday",20:"weekend_friday",21:"weekend_saturday",22:"dateFormat",23:"inclusiveEndDates",24:"topAxis",25:"axisFormat",26:"tickInterval",27:"excludes",28:"includes",29:"todayMarker",30:"title",31:"acc_title",32:"acc_title_value",33:"acc_descr",34:"acc_descr_value",35:"acc_descr_multiline_value",36:"section",38:"taskTxt",39:"taskData",40:"click",41:"callbackname",42:"callbackargs",43:"href"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[19,1],[19,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,1],[9,2],[37,2],[37,3],[37,3],[37,4],[37,3],[37,4],[37,2],[44,2],[44,3],[44,3],[44,4],[44,3],[44,4],[44,2]],performAction:r(function(u,h,m,d,D,s,U){var a=s.length-1;switch(D){case 1:return s[a-1];case 2:this.$=[];break;case 3:s[a-1].push(s[a]),this.$=s[a-1];break;case 4:case 5:this.$=s[a];break;case 6:case 7:this.$=[];break;case 8:d.setWeekday("monday");break;case 9:d.setWeekday("tuesday");break;case 10:d.setWeekday("wednesday");break;case 11:d.setWeekday("thursday");break;case 12:d.setWeekday("friday");break;case 13:d.setWeekday("saturday");break;case 14:d.setWeekday("sunday");break;case 15:d.setWeekend("friday");break;case 16:d.setWeekend("saturday");break;case 17:d.setDateFormat(s[a].substr(11)),this.$=s[a].substr(11);break;case 18:d.enableInclusiveEndDates(),this.$=s[a].substr(18);break;case 19:d.TopAxis(),this.$=s[a].substr(8);break;case 20:d.setAxisFormat(s[a].substr(11)),this.$=s[a].substr(11);break;case 21:d.setTickInterval(s[a].substr(13)),this.$=s[a].substr(13);break;case 22:d.setExcludes(s[a].substr(9)),this.$=s[a].substr(9);break;case 23:d.setIncludes(s[a].substr(9)),this.$=s[a].substr(9);break;case 24:d.setTodayMarker(s[a].substr(12)),this.$=s[a].substr(12);break;case 27:d.setDiagramTitle(s[a].substr(6)),this.$=s[a].substr(6);break;case 28:this.$=s[a].trim(),d.setAccTitle(this.$);break;case 29:case 30:this.$=s[a].trim(),d.setAccDescription(this.$);break;case 31:d.addSection(s[a].substr(8)),this.$=s[a].substr(8);break;case 33:d.addTask(s[a-1],s[a]),this.$="task";break;case 34:this.$=s[a-1],d.setClickEvent(s[a-1],s[a],null);break;case 35:this.$=s[a-2],d.setClickEvent(s[a-2],s[a-1],s[a]);break;case 36:this.$=s[a-2],d.setClickEvent(s[a-2],s[a-1],null),d.setLink(s[a-2],s[a]);break;case 37:this.$=s[a-3],d.setClickEvent(s[a-3],s[a-2],s[a-1]),d.setLink(s[a-3],s[a]);break;case 38:this.$=s[a-2],d.setClickEvent(s[a-2],s[a],null),d.setLink(s[a-2],s[a-1]);break;case 39:this.$=s[a-3],d.setClickEvent(s[a-3],s[a-1],s[a]),d.setLink(s[a-3],s[a-2]);break;case 40:this.$=s[a-1],d.setLink(s[a-1],s[a]);break;case 41:case 47:this.$=s[a-1]+" "+s[a];break;case 42:case 43:case 45:this.$=s[a-2]+" "+s[a-1]+" "+s[a];break;case 44:case 46:this.$=s[a-3]+" "+s[a-2]+" "+s[a-1]+" "+s[a];break}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},t(e,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:17,12:i,13:n,14:c,15:l,16:g,17:y,18:v,19:18,20:Y,21:x,22:$,23:W,24:V,25:k,26:p,27:M,28:w,29:P,30:z,31:b,33:f,35:o,36:T,37:24,38:S,40:_},t(e,[2,7],{1:[2,1]}),t(e,[2,3]),{9:36,11:17,12:i,13:n,14:c,15:l,16:g,17:y,18:v,19:18,20:Y,21:x,22:$,23:W,24:V,25:k,26:p,27:M,28:w,29:P,30:z,31:b,33:f,35:o,36:T,37:24,38:S,40:_},t(e,[2,5]),t(e,[2,6]),t(e,[2,17]),t(e,[2,18]),t(e,[2,19]),t(e,[2,20]),t(e,[2,21]),t(e,[2,22]),t(e,[2,23]),t(e,[2,24]),t(e,[2,25]),t(e,[2,26]),t(e,[2,27]),{32:[1,37]},{34:[1,38]},t(e,[2,30]),t(e,[2,31]),t(e,[2,32]),{39:[1,39]},t(e,[2,8]),t(e,[2,9]),t(e,[2,10]),t(e,[2,11]),t(e,[2,12]),t(e,[2,13]),t(e,[2,14]),t(e,[2,15]),t(e,[2,16]),{41:[1,40],43:[1,41]},t(e,[2,4]),t(e,[2,28]),t(e,[2,29]),t(e,[2,33]),t(e,[2,34],{42:[1,42],43:[1,43]}),t(e,[2,40],{41:[1,44]}),t(e,[2,35],{43:[1,45]}),t(e,[2,36]),t(e,[2,38],{42:[1,46]}),t(e,[2,37]),t(e,[2,39])],defaultActions:{},parseError:r(function(u,h){if(h.recoverable)this.trace(u);else{var m=new Error(u);throw m.hash=h,m}},"parseError"),parse:r(function(u){var h=this,m=[0],d=[],D=[null],s=[],U=this.table,a="",tt=0,ft=0,ht=0,_t=2,mt=1,kt=s.slice.call(arguments,1),A=Object.create(this.lexer),j={yy:{}};for(var q in this.yy)Object.prototype.hasOwnProperty.call(this.yy,q)&&(j.yy[q]=this.yy[q]);A.setInput(u,j.yy),j.yy.lexer=A,j.yy.parser=this,typeof A.yylloc>"u"&&(A.yylloc={});var Z=A.yylloc;s.push(Z);var et=A.options&&A.options.ranges;typeof j.yy.parseError=="function"?this.parseError=j.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function it(R){m.length=m.length-2*R,D.length=D.length-R,s.length=s.length-R}r(it,"popStack");function st(){var R;return R=d.pop()||A.lex()||mt,typeof R!="number"&&(R instanceof Array&&(d=R,R=d.pop()),R=h.symbols_[R]||R),R}r(st,"lex");for(var F,Q,B,N,mi,Dt,nt={},yt,X,qt,gt;;){if(B=m[m.length-1],this.defaultActions[B]?N=this.defaultActions[B]:((F===null||typeof F>"u")&&(F=st()),N=U[B]&&U[B][F]),typeof N>"u"||!N.length||!N[0]){var St="";gt=[];for(yt in U[B])this.terminals_[yt]&&yt>_t&&gt.push("'"+this.terminals_[yt]+"'");A.showPosition?St="Parse error on line "+(tt+1)+`:
`+A.showPosition()+`
Expecting `+gt.join(", ")+", got '"+(this.terminals_[F]||F)+"'":St="Parse error on line "+(tt+1)+": Unexpected "+(F==mt?"end of input":"'"+(this.terminals_[F]||F)+"'"),this.parseError(St,{text:A.match,token:this.terminals_[F]||F,line:A.yylineno,loc:Z,expected:gt})}if(N[0]instanceof Array&&N.length>1)throw new Error("Parse Error: multiple actions possible at state: "+B+", token: "+F);switch(N[0]){case 1:m.push(F),D.push(A.yytext),s.push(A.yylloc),m.push(N[1]),F=null,Q?(F=Q,Q=null):(ft=A.yyleng,a=A.yytext,tt=A.yylineno,Z=A.yylloc,ht>0&&ht--);break;case 2:if(X=this.productions_[N[1]][1],nt.$=D[D.length-X],nt._$={first_line:s[s.length-(X||1)].first_line,last_line:s[s.length-1].last_line,first_column:s[s.length-(X||1)].first_column,last_column:s[s.length-1].last_column},et&&(nt._$.range=[s[s.length-(X||1)].range[0],s[s.length-1].range[1]]),Dt=this.performAction.apply(nt,[a,ft,tt,j.yy,N[1],D,s].concat(kt)),typeof Dt<"u")return Dt;X&&(m=m.slice(0,-1*X*2),D=D.slice(0,-1*X),s=s.slice(0,-1*X)),m.push(this.productions_[N[1]][0]),D.push(nt.$),s.push(nt._$),qt=U[m[m.length-2]][m[m.length-1]],m.push(qt);break;case 3:return!0}}return!0},"parse")},E=(function(){var L={EOF:1,parseError:r(function(h,m){if(this.yy.parser)this.yy.parser.parseError(h,m);else throw new Error(h)},"parseError"),setInput:r(function(u,h){return this.yy=h||this.yy||{},this._input=u,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:r(function(){var u=this._input[0];this.yytext+=u,this.yyleng++,this.offset++,this.match+=u,this.matched+=u;var h=u.match(/(?:\r\n?|\n).*/g);return h?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),u},"input"),unput:r(function(u){var h=u.length,m=u.split(/(?:\r\n?|\n)/g);this._input=u+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-h),this.offset-=h;var d=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),m.length-1&&(this.yylineno-=m.length-1);var D=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:m?(m.length===d.length?this.yylloc.first_column:0)+d[d.length-m.length].length-m[0].length:this.yylloc.first_column-h},this.options.ranges&&(this.yylloc.range=[D[0],D[0]+this.yyleng-h]),this.yyleng=this.yytext.length,this},"unput"),more:r(function(){return this._more=!0,this},"more"),reject:r(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:r(function(u){this.unput(this.match.slice(u))},"less"),pastInput:r(function(){var u=this.matched.substr(0,this.matched.length-this.match.length);return(u.length>20?"...":"")+u.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:r(function(){var u=this.match;return u.length<20&&(u+=this._input.substr(0,20-u.length)),(u.substr(0,20)+(u.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:r(function(){var u=this.pastInput(),h=new Array(u.length+1).join("-");return u+this.upcomingInput()+`
`+h+"^"},"showPosition"),test_match:r(function(u,h){var m,d,D;if(this.options.backtrack_lexer&&(D={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(D.yylloc.range=this.yylloc.range.slice(0))),d=u[0].match(/(?:\r\n?|\n).*/g),d&&(this.yylineno+=d.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:d?d[d.length-1].length-d[d.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+u[0].length},this.yytext+=u[0],this.match+=u[0],this.matches=u,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(u[0].length),this.matched+=u[0],m=this.performAction.call(this,this.yy,this,h,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),m)return m;if(this._backtrack){for(var s in D)this[s]=D[s];return!1}return!1},"test_match"),next:r(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var u,h,m,d;this._more||(this.yytext="",this.match="");for(var D=this._currentRules(),s=0;s<D.length;s++)if(m=this._input.match(this.rules[D[s]]),m&&(!h||m[0].length>h[0].length)){if(h=m,d=s,this.options.backtrack_lexer){if(u=this.test_match(m,D[s]),u!==!1)return u;if(this._backtrack){h=!1;continue}else return!1}else if(!this.options.flex)break}return h?(u=this.test_match(h,D[d]),u!==!1?u:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:r(function(){var h=this.next();return h||this.lex()},"lex"),begin:r(function(h){this.conditionStack.push(h)},"begin"),popState:r(function(){var h=this.conditionStack.length-1;return h>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:r(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:r(function(h){return h=this.conditionStack.length-1-Math.abs(h||0),h>=0?this.conditionStack[h]:"INITIAL"},"topState"),pushState:r(function(h){this.begin(h)},"pushState"),stateStackSize:r(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:r(function(h,m,d,D){var s=D;switch(d){case 0:return this.begin("open_directive"),"open_directive";break;case 1:return this.begin("acc_title"),31;break;case 2:return this.popState(),"acc_title_value";break;case 3:return this.begin("acc_descr"),33;break;case 4:return this.popState(),"acc_descr_value";break;case 5:this.begin("acc_descr_multiline");break;case 6:this.popState();break;case 7:return"acc_descr_multiline_value";case 8:break;case 9:break;case 10:break;case 11:return 10;case 12:break;case 13:break;case 14:this.begin("href");break;case 15:this.popState();break;case 16:return 43;case 17:this.begin("callbackname");break;case 18:this.popState();break;case 19:this.popState(),this.begin("callbackargs");break;case 20:return 41;case 21:this.popState();break;case 22:return 42;case 23:this.begin("click");break;case 24:this.popState();break;case 25:return 40;case 26:return 4;case 27:return 22;case 28:return 23;case 29:return 24;case 30:return 25;case 31:return 26;case 32:return 28;case 33:return 27;case 34:return 29;case 35:return 12;case 36:return 13;case 37:return 14;case 38:return 15;case 39:return 16;case 40:return 17;case 41:return 18;case 42:return 20;case 43:return 21;case 44:return"date";case 45:return 30;case 46:return"accDescription";case 47:return 36;case 48:return 38;case 49:return 39;case 50:return":";case 51:return 6;case 52:return"INVALID"}},"anonymous"),rules:[/^(?:%%\{)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:%%(?!\{)*[^\n]*)/i,/^(?:[^\}]%%*[^\n]*)/i,/^(?:%%*[^\n]*[\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:%[^\n]*)/i,/^(?:href[\s]+["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:call[\s]+)/i,/^(?:\([\s]*\))/i,/^(?:\()/i,/^(?:[^(]*)/i,/^(?:\))/i,/^(?:[^)]*)/i,/^(?:click[\s]+)/i,/^(?:[\s\n])/i,/^(?:[^\s\n]*)/i,/^(?:gantt\b)/i,/^(?:dateFormat\s[^#\n;]+)/i,/^(?:inclusiveEndDates\b)/i,/^(?:topAxis\b)/i,/^(?:axisFormat\s[^#\n;]+)/i,/^(?:tickInterval\s[^#\n;]+)/i,/^(?:includes\s[^#\n;]+)/i,/^(?:excludes\s[^#\n;]+)/i,/^(?:todayMarker\s[^\n;]+)/i,/^(?:weekday\s+monday\b)/i,/^(?:weekday\s+tuesday\b)/i,/^(?:weekday\s+wednesday\b)/i,/^(?:weekday\s+thursday\b)/i,/^(?:weekday\s+friday\b)/i,/^(?:weekday\s+saturday\b)/i,/^(?:weekday\s+sunday\b)/i,/^(?:weekend\s+friday\b)/i,/^(?:weekend\s+saturday\b)/i,/^(?:\d\d\d\d-\d\d-\d\d\b)/i,/^(?:title\s[^\n]+)/i,/^(?:accDescription\s[^#\n;]+)/i,/^(?:section\s[^\n]+)/i,/^(?:[^:\n]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[6,7],inclusive:!1},acc_descr:{rules:[4],inclusive:!1},acc_title:{rules:[2],inclusive:!1},callbackargs:{rules:[21,22],inclusive:!1},callbackname:{rules:[18,19,20],inclusive:!1},href:{rules:[15,16],inclusive:!1},click:{rules:[24,25],inclusive:!1},INITIAL:{rules:[0,1,3,5,8,9,10,11,12,13,14,17,23,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52],inclusive:!0}}};return L})();C.lexer=E;function I(){this.yy={}}return r(I,"Parser"),I.prototype=C,C.Parser=I,new I})();Ft.parser=Ft;var Me=Ft;H.default.extend(fe.default);H.default.extend(he.default);H.default.extend(me.default);var le={friday:5,saturday:6},G="",Pt="",zt=void 0,Nt="",ot=[],ct=[],Rt=new Map,Ht=[],xt=[],lt="",jt="",ke=["active","done","crit","milestone","vert"],Bt=[],rt="",dt=!1,Gt=!1,Ut="sunday",wt="saturday",Ot=0,Ee=r(function(){Ht=[],xt=[],lt="",Bt=[],Tt=0,Vt=void 0,bt=void 0,O=[],G="",Pt="",jt="",zt=void 0,Nt="",ot=[],ct=[],dt=!1,Gt=!1,Ot=0,Rt=new Map,rt="",Qt(),Ut="sunday",wt="saturday"},"clear"),Ie=r(function(t){rt=t},"setDiagramId"),Ye=r(function(t){Pt=t},"setAxisFormat"),$e=r(function(){return Pt},"getAxisFormat"),Le=r(function(t){zt=t},"setTickInterval"),Ae=r(function(){return zt},"getTickInterval"),Fe=r(function(t){Nt=t},"setTodayMarker"),Oe=r(function(){return Nt},"getTodayMarker"),We=r(function(t){G=t},"setDateFormat"),Ve=r(function(){dt=!0},"enableInclusiveEndDates"),Pe=r(function(){return dt},"endDatesAreInclusive"),ze=r(function(){Gt=!0},"enableTopAxis"),Ne=r(function(){return Gt},"topAxisEnabled"),Re=r(function(t){jt=t},"setDisplayMode"),He=r(function(){return jt},"getDisplayMode"),je=r(function(){return G},"getDateFormat"),ye=r((t,e)=>{let i=e.toLowerCase().split(/[\s,]+/).filter(n=>n!=="");return[...new Set([...t,...i])]},"mergeTokens"),Be=r(function(t){ot=ye(ot,t)},"setIncludes"),Ge=r(function(){return ot},"getIncludes"),Ue=r(function(t){ct=ye(ct,t)},"setExcludes"),Xe=r(function(){return ct},"getExcludes"),qe=r(function(){return Rt},"getLinks"),Ze=r(function(t){lt=t,Ht.push(t)},"addSection"),Qe=r(function(){return Ht},"getSections"),Ke=r(function(){let t=ue(),e=10,i=0;for(;!t&&i<e;)t=ue(),i++;return xt=O,xt},"getTasks"),ge=r(function(t,e,i,n){let c=t.format(e.trim()),l=t.format("YYYY-MM-DD");return n.includes(c)||n.includes(l)?!1:i.includes("weekends")&&(t.isoWeekday()===le[wt]||t.isoWeekday()===le[wt]+1)||i.includes(t.format("dddd").toLowerCase())?!0:i.includes(c)||i.includes(l)},"isInvalidDate"),Je=r(function(t){Ut=t},"setWeekday"),ti=r(function(){return Ut},"getWeekday"),ei=r(function(t){wt=t},"setWeekend"),pe=r(function(t,e,i,n){if(!i.length||t.manualEndTime)return;let c;t.startTime instanceof Date?c=(0,H.default)(t.startTime):c=(0,H.default)(t.startTime,e,!0),c=c.add(1,"d");let l;t.endTime instanceof Date?l=(0,H.default)(t.endTime):l=(0,H.default)(t.endTime,e,!0);let[g,y]=ii(c,l,e,i,n);t.endTime=g.toDate(),t.renderEndTime=y},"checkTaskDates"),ii=r(function(t,e,i,n,c){let l=!1,g=null,y=e.add(1e4,"d");for(;t<=e;){if(l||(g=e.toDate()),l=ge(t,i,n,c),l&&(e=e.add(1,"d"),e>y))throw new Error("Failed to find a valid date that was not excluded by `excludes` after 10,000 iterations.");t=t.add(1,"d")}return[e,g]},"fixTaskDates"),ve=r(function(t,e){ut.warn(`Gantt: the "${t}" statement references unknown task id(s): ${e.join(", ")}. Make sure the referenced tasks exist and declare an id. Milestones need both an id and a duration, e.g. "Milestone :milestone, m1, 2023-01-01, 0d".`)},"warnAboutUnknownTaskIds"),Wt=r(function(t,e,i){if(i=i.trim(),r(y=>{let v=y.trim();return v==="x"||v==="X"},"isTimestampFormat")(e)&&/^\d+$/.test(i))return new Date(Number(i));let l=/^after\s+(?<ids>[\d\w- ]+)/.exec(i);if(l!==null){let y=null,v=[],Y=l.groups.ids.split(" ").filter($=>$!=="");for(let $ of Y){let W=J($);if(W===void 0){v.push($);continue}(!y||W.endTime>y.endTime)&&(y=W)}if(v.length>0&&ve("after",v),y)return y.endTime;let x=new Date;return x.setHours(0,0,0,0),x}let g=(0,H.default)(i,e.trim(),!0);if(g.isValid())return g.toDate();{ut.debug("Invalid date:"+i),ut.debug("With date format:"+e.trim());let y=new Date(i);if(y===void 0||isNaN(y.getTime())||y.getFullYear()<-1e4||y.getFullYear()>1e4)throw new Error("Invalid date:"+i);return y}},"getStartDate"),Te=r(function(t){let e=/^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t.trim());return e!==null?[Number.parseFloat(e[1]),e[2]]:[NaN,"ms"]},"parseDuration"),be=r(function(t,e,i,n=!1){i=i.trim();let l=/^until\s+(?<ids>[\d\w- ]+)/.exec(i);if(l!==null){let x=null,$=[],W=l.groups.ids.split(" ").filter(k=>k!=="");for(let k of W){let p=J(k);if(p===void 0){$.push(k);continue}(!x||p.startTime<x.startTime)&&(x=p)}if($.length>0&&ve("until",$),x)return x.startTime;let V=new Date;return V.setHours(0,0,0,0),V}let g=(0,H.default)(i,e.trim(),!0);if(g.isValid())return n&&(g=g.add(1,"d")),g.toDate();let y=(0,H.default)(t),[v,Y]=Te(i);if(Number.isNaN(v))ut.warn(`Gantt: "${i}" is neither a valid date for the "${e.trim()}" date format nor a valid duration (e.g. "3d"), so it is ignored and the task gets a zero duration. Milestones need a duration too, e.g. "Milestone :milestone, m1, 2023-01-01, 0d".`);else{let x=y.add(v,Y);x.isValid()&&(y=x)}return y.toDate()},"getEndDate"),Tt=0,at=r(function(t){return t===void 0?(Tt=Tt+1,"task"+Tt):t},"parseId"),si=r(function(t,e){let i;e.substr(0,1)===":"?i=e.substr(1,e.length):i=e;let n=i.split(","),c={};Xt(n,c,ke);for(let g=0;g<n.length;g++)n[g]=n[g].trim();let l="";switch(n.length){case 1:c.id=at(),c.startTime=t.endTime,l=n[0];break;case 2:c.id=at(),c.startTime=Wt(void 0,G,n[0]),l=n[1];break;case 3:c.id=at(n[0]),c.startTime=Wt(void 0,G,n[1]),l=n[2];break;default:}return l&&(c.endTime=be(c.startTime,G,l,dt),c.manualEndTime=(0,H.default)(l,"YYYY-MM-DD",!0).isValid(),pe(c,G,ct,ot)),c},"compileData"),ni=r(function(t,e){let i;e.substr(0,1)===":"?i=e.substr(1,e.length):i=e;let n=i.split(","),c={};Xt(n,c,ke);for(let l=0;l<n.length;l++)n[l]=n[l].trim();switch(n.length){case 1:c.id=at(),c.startTime={type:"prevTaskEnd",id:t},c.endTime={data:n[0]};break;case 2:c.id=at(),c.startTime={type:"getStartDate",startData:n[0]},c.endTime={data:n[1]};break;case 3:c.id=at(n[0]),c.startTime={type:"getStartDate",startData:n[1]},c.endTime={data:n[2]};break;default:}return c},"parseData"),Vt,bt,O=[],xe={},ri=r(function(t,e){let i={section:lt,type:lt,processed:!1,manualEndTime:!1,renderEndTime:null,raw:{data:e},task:t,classes:[]},n=ni(bt,e);i.raw.startTime=n.startTime,i.raw.endTime=n.endTime,i.id=n.id,i.prevTaskId=bt,i.active=n.active,i.done=n.done,i.crit=n.crit,i.milestone=n.milestone,i.vert=n.vert,i.vert?i.order=-1:(i.order=Ot,Ot++);let c=O.push(i);bt=i.id,xe[i.id]=c-1},"addTask"),J=r(function(t){let e=xe[t];return O[e]},"findTaskById"),ai=r(function(t,e){let i={section:lt,type:lt,description:t,task:t,classes:[]},n=si(Vt,e);i.startTime=n.startTime,i.endTime=n.endTime,i.id=n.id,i.active=n.active,i.done=n.done,i.crit=n.crit,i.milestone=n.milestone,i.vert=n.vert,Vt=i,xt.push(i)},"addTaskOrg"),ue=r(function(){let t=r(function(i){let n=O[i],c="";switch(O[i].raw.startTime.type){case"prevTaskEnd":{let l=J(n.prevTaskId);n.startTime=l.endTime;break}case"getStartDate":c=Wt(void 0,G,O[i].raw.startTime.startData),c&&(O[i].startTime=c);break}return O[i].startTime&&(O[i].endTime=be(O[i].startTime,G,O[i].raw.endTime.data,dt),O[i].endTime&&(O[i].processed=!0,O[i].manualEndTime=(0,H.default)(O[i].raw.endTime.data,"YYYY-MM-DD",!0).isValid(),pe(O[i],G,ct,ot))),O[i].processed},"compileTask"),e=!0;for(let[i,n]of O.entries())t(i),e=e&&n.processed;return e},"compileTasks"),oi=r(function(t,e){let i=e;vt().securityLevel!=="loose"&&(i=(0,de.sanitizeUrl)(e)),t.split(",").forEach(function(n){J(n)!==void 0&&(_e(n,()=>{window.open(i,"_self")}),Rt.set(n,i))}),we(t,"clickable")},"setLink"),we=r(function(t,e){t.split(",").forEach(function(i){let n=J(i);n!==void 0&&n.classes.push(e)})},"setClass"),ci=r(function(t,e,i){if(vt().securityLevel!=="loose"||e===void 0)return;let n=[];if(typeof i=="string"){n=i.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);for(let l=0;l<n.length;l++){let g=n[l].trim();g.startsWith('"')&&g.endsWith('"')&&(g=g.substr(1,g.length-2)),n[l]=g}}n.length===0&&n.push(t),J(t)!==void 0&&_e(t,()=>{ne.runFunc(e,...n)})},"setClickFun"),_e=r(function(t,e){Bt.push(function(){let i=rt?`${rt}-${t}`:t,n=document.querySelector(`[id="${i}"]`);n!==null&&n.addEventListener("click",function(){e()})},function(){let i=rt?`${rt}-${t}`:t,n=document.querySelector(`[id="${i}-text"]`);n!==null&&n.addEventListener("click",function(){e()})})},"pushFun"),li=r(function(t,e,i){t.split(",").forEach(function(n){ci(n,e,i)}),we(t,"clickable")},"setClickEvent"),ui=r(function(t){Bt.forEach(function(e){e(t)})},"bindFunctions"),di={getConfig:r(()=>vt().gantt,"getConfig"),clear:Ee,setDateFormat:We,getDateFormat:je,enableInclusiveEndDates:Ve,endDatesAreInclusive:Pe,enableTopAxis:ze,topAxisEnabled:Ne,setAxisFormat:Ye,getAxisFormat:$e,setTickInterval:Le,getTickInterval:Ae,setTodayMarker:Fe,getTodayMarker:Oe,setAccTitle:Kt,getAccTitle:Jt,setDiagramTitle:ie,getDiagramTitle:se,setDiagramId:Ie,setDisplayMode:Re,getDisplayMode:He,setAccDescription:te,getAccDescription:ee,addSection:Ze,getSections:Qe,getTasks:Ke,addTask:ri,findTaskById:J,addTaskOrg:ai,setIncludes:Be,getIncludes:Ge,setExcludes:Ue,getExcludes:Xe,setClickEvent:li,setLink:oi,getLinks:qe,bindFunctions:ui,parseDuration:Te,isInvalidDate:ge,setWeekday:Je,getWeekday:ti,setWeekend:ei};function Xt(t,e,i){let n=!0;for(;n;)n=!1,i.forEach(function(c){let l="^\\s*"+c+"\\s*$",g=new RegExp(l);t[0].match(g)&&(e[c]=!0,t.shift(1),n=!0)})}r(Xt,"getTaskTags");De.default.extend(Se.default);var fi=r(t=>`
  .mermaid-main-font {
        font-family: ${t.fontFamily};
  }

  .exclude-range {
    fill: ${t.excludeBkgColor};
  }

  .section {
    stroke: none;
    opacity: 0.2;
  }

  .section0 {
    fill: ${t.sectionBkgColor};
  }

  .section2 {
    fill: ${t.sectionBkgColor2};
  }

  .section1,
  .section3 {
    fill: ${t.altSectionBkgColor};
    opacity: 0.2;
  }

  .sectionTitle0 {
    fill: ${t.titleColor};
  }

  .sectionTitle1 {
    fill: ${t.titleColor};
  }

  .sectionTitle2 {
    fill: ${t.titleColor};
  }

  .sectionTitle3 {
    fill: ${t.titleColor};
  }

  .sectionTitle {
    text-anchor: start;
    font-family: ${t.fontFamily};
  }


  /* Grid and axis */

  .grid .tick {
    stroke: ${t.gridColor};
    opacity: 0.8;
    shape-rendering: crispEdges;
  }

  .grid .tick text {
    font-family: ${t.fontFamily};
    fill: ${t.textColor};
  }

  .grid path {
    stroke-width: 0;
  }


  /* Today line */

  .today {
    fill: none;
    stroke: ${t.todayLineColor};
    stroke-width: 2px;
  }


  /* Task styling */

  /* Default task */

  .task {
    stroke-width: 2;
  }

  .taskText {
    text-anchor: middle;
    font-family: ${t.fontFamily};
  }

  .taskTextOutsideRight {
    fill: ${t.taskTextDarkColor};
    text-anchor: start;
    font-family: ${t.fontFamily};
  }

  .taskTextOutsideLeft {
    fill: ${t.taskTextDarkColor};
    text-anchor: end;
  }


  /* Special case clickable */

  .task.clickable {
    cursor: pointer;
  }

  .taskText.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideLeft.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideRight.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }


  /* Specific task settings for the sections*/

  .taskText0,
  .taskText1,
  .taskText2,
  .taskText3 {
    fill: ${t.taskTextColor};
  }

  .task0,
  .task1,
  .task2,
  .task3 {
    fill: ${t.taskBkgColor};
    stroke: ${t.taskBorderColor};
  }

  .taskTextOutside0,
  .taskTextOutside2
  {
    fill: ${t.taskTextOutsideColor};
  }

  .taskTextOutside1,
  .taskTextOutside3 {
    fill: ${t.taskTextOutsideColor};
  }


  /* Active task */

  .active0,
  .active1,
  .active2,
  .active3 {
    fill: ${t.activeTaskBkgColor};
    stroke: ${t.activeTaskBorderColor};
  }

  .activeText0,
  .activeText1,
  .activeText2,
  .activeText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Completed task */

  .done0,
  .done1,
  .done2,
  .done3 {
    stroke: ${t.doneTaskBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
  }

  .doneText0,
  .doneText1,
  .doneText2,
  .doneText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  /* Done task text displayed outside the bar sits against the diagram background,
     not against the done-task bar, so it must use the outside/contrast color. */
  .doneText0.taskTextOutsideLeft,
  .doneText0.taskTextOutsideRight,
  .doneText1.taskTextOutsideLeft,
  .doneText1.taskTextOutsideRight,
  .doneText2.taskTextOutsideLeft,
  .doneText2.taskTextOutsideRight,
  .doneText3.taskTextOutsideLeft,
  .doneText3.taskTextOutsideRight {
    fill: ${t.taskTextOutsideColor} !important;
  }


  /* Tasks on the critical line */

  .crit0,
  .crit1,
  .crit2,
  .crit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.critBkgColor};
    stroke-width: 2;
  }

  .activeCrit0,
  .activeCrit1,
  .activeCrit2,
  .activeCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.activeTaskBkgColor};
    stroke-width: 2;
  }

  .doneCrit0,
  .doneCrit1,
  .doneCrit2,
  .doneCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
    cursor: pointer;
    shape-rendering: crispEdges;
  }

  .milestone {
    transform: rotate(45deg) scale(0.8,0.8);
  }

  .milestoneText {
    font-style: italic;
  }
  .doneCritText0,
  .doneCritText1,
  .doneCritText2,
  .doneCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  /* Done-crit task text outside the bar \u2014 same reasoning as doneText above. */
  .doneCritText0.taskTextOutsideLeft,
  .doneCritText0.taskTextOutsideRight,
  .doneCritText1.taskTextOutsideLeft,
  .doneCritText1.taskTextOutsideRight,
  .doneCritText2.taskTextOutsideLeft,
  .doneCritText2.taskTextOutsideRight,
  .doneCritText3.taskTextOutsideLeft,
  .doneCritText3.taskTextOutsideRight {
    fill: ${t.taskTextOutsideColor} !important;
  }

  .vert {
    stroke: ${t.vertLineColor};
  }

  .vertText {
    font-size: 15px;
    text-anchor: middle;
    fill: ${t.vertLineColor} !important;
  }

  .activeCritText0,
  .activeCritText1,
  .activeCritText2,
  .activeCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .titleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.titleColor||t.textColor};
    font-family: ${t.fontFamily};
  }
`,"getStyles"),hi=fi,ji={parser:Me,db:di,renderer:{},styles:hi};export{ji as diagram};
