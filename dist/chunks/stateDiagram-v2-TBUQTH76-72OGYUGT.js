import{h as zt}from"./chunk-GHUVWE2W.js";import"./chunk-3ZFRKF6L.js";import"./chunk-W7FR7GUT.js";import"./chunk-DLNT37BT.js";import"./chunk-25KVF5ZE.js";import"./chunk-3KZMXDGI.js";import"./chunk-H4672CSJ.js";import"./chunk-3O23WAPI.js";import"./chunk-LKF2BLXN.js";import"./chunk-WEMV4B62.js";import"./chunk-Q4ED5BE2.js";import"./chunk-5PNKA5RP.js";import"./chunk-TWKGZ3Z2.js";import{b as Wt,c as jt,d as Ut,e as Ht}from"./chunk-HIGPS4L2.js";import{f as Mt}from"./chunk-E2EDNZQV.js";import"./chunk-STBOPOHX.js";import{L as G,O as $t,P as Ft,Q as Pt,R as Bt,S as Gt,T as Yt,U as Vt,V as L,f as Rt}from"./chunk-6XJTJGUF.js";import{b as v,d as pt}from"./chunk-RRKEGWUA.js";import{a as u}from"./chunk-EIBFAW37.js";import"./chunk-PHKIAKHS.js";var At=(function(){var t=u(function(B,o,d,i){for(d=d||{},i=B.length;i--;d[B[i]]=o);return d},"o"),e=[1,2],a=[1,3],s=[1,4],c=[2,4],h=[1,9],p=[1,11],y=[1,16],n=[1,17],m=[1,18],k=[1,19],x=[1,33],$=[1,20],U=[1,21],w=[1,22],f=[1,23],A=[1,24],I=[1,26],V=[1,27],M=[1,28],F=[1,29],P=[1,30],st=[1,31],rt=[1,32],it=[1,35],at=[1,36],nt=[1,37],ot=[1,38],H=[1,34],S=[1,4,5,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],lt=[1,4,5,14,15,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,39,40,41,45,48,51,52,53,54,57],It=[4,5,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],bt={trace:u(function(){},"trace"),yy:{},symbols_:{error:2,start:3,SPACE:4,NL:5,SD:6,document:7,line:8,statement:9,classDefStatement:10,styleStatement:11,cssClassStatement:12,idStatement:13,DESCR:14,"-->":15,HIDE_EMPTY:16,scale:17,WIDTH:18,COMPOSIT_STATE:19,STRUCT_START:20,STRUCT_STOP:21,STATE_DESCR:22,AS:23,ID:24,FORK:25,JOIN:26,CHOICE:27,CONCURRENT:28,note:29,notePosition:30,NOTE_TEXT:31,direction:32,acc_title:33,acc_title_value:34,acc_descr:35,acc_descr_value:36,acc_descr_multiline_value:37,CLICK:38,STRING:39,HREF:40,classDef:41,CLASSDEF_ID:42,CLASSDEF_STYLEOPTS:43,DEFAULT:44,style:45,STYLE_IDS:46,STYLEDEF_STYLEOPTS:47,class:48,CLASSENTITY_IDS:49,STYLECLASS:50,direction_tb:51,direction_bt:52,direction_rl:53,direction_lr:54,eol:55,";":56,EDGE_STATE:57,STYLE_SEPARATOR:58,left_of:59,right_of:60,$accept:0,$end:1},terminals_:{2:"error",4:"SPACE",5:"NL",6:"SD",14:"DESCR",15:"-->",16:"HIDE_EMPTY",17:"scale",18:"WIDTH",19:"COMPOSIT_STATE",20:"STRUCT_START",21:"STRUCT_STOP",22:"STATE_DESCR",23:"AS",24:"ID",25:"FORK",26:"JOIN",27:"CHOICE",28:"CONCURRENT",29:"note",31:"NOTE_TEXT",33:"acc_title",34:"acc_title_value",35:"acc_descr",36:"acc_descr_value",37:"acc_descr_multiline_value",38:"CLICK",39:"STRING",40:"HREF",41:"classDef",42:"CLASSDEF_ID",43:"CLASSDEF_STYLEOPTS",44:"DEFAULT",45:"style",46:"STYLE_IDS",47:"STYLEDEF_STYLEOPTS",48:"class",49:"CLASSENTITY_IDS",50:"STYLECLASS",51:"direction_tb",52:"direction_bt",53:"direction_rl",54:"direction_lr",56:";",57:"EDGE_STATE",58:"STYLE_SEPARATOR",59:"left_of",60:"right_of"},productions_:[0,[3,2],[3,2],[3,2],[7,0],[7,2],[8,2],[8,1],[8,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,3],[9,4],[9,1],[9,2],[9,1],[9,4],[9,3],[9,6],[9,1],[9,1],[9,1],[9,1],[9,4],[9,4],[9,1],[9,2],[9,2],[9,1],[9,5],[9,5],[10,3],[10,3],[11,3],[12,3],[32,1],[32,1],[32,1],[32,1],[55,1],[55,1],[13,1],[13,1],[13,3],[13,3],[30,1],[30,1]],performAction:u(function(o,d,i,g,b,r,z){var l=r.length-1;switch(b){case 3:return g.setRootDoc(r[l]),r[l];break;case 4:this.$=[];break;case 5:r[l]!="nl"&&(r[l-1].push(r[l]),this.$=r[l-1]);break;case 6:case 7:this.$=r[l];break;case 8:this.$="nl";break;case 12:this.$=r[l];break;case 13:let ht=r[l-1];ht.description=g.trimColon(r[l]),this.$=ht;break;case 14:this.$={stmt:"relation",state1:r[l-2],state2:r[l]};break;case 15:let dt=g.trimColon(r[l]);this.$={stmt:"relation",state1:r[l-3],state2:r[l-1],description:dt};break;case 19:this.$={stmt:"state",id:r[l-3],type:"default",description:"",doc:r[l-1]};break;case 20:var N=r[l],O=r[l-2].trim();if(r[l].match(":")){var q=r[l].split(":");N=q[0],O=[O,q[1]]}this.$={stmt:"state",id:N,type:"default",description:O};break;case 21:this.$={stmt:"state",id:r[l-3],type:"default",description:r[l-5],doc:r[l-1]};break;case 22:this.$={stmt:"state",id:r[l],type:"fork"};break;case 23:this.$={stmt:"state",id:r[l],type:"join"};break;case 24:this.$={stmt:"state",id:r[l],type:"choice"};break;case 25:this.$={stmt:"state",id:g.getDividerId(),type:"divider"};break;case 26:this.$={stmt:"state",id:r[l-1].trim(),note:{position:r[l-2].trim(),text:r[l].trim()}};break;case 29:this.$=r[l].trim(),g.setAccTitle(this.$);break;case 30:case 31:this.$=r[l].trim(),g.setAccDescription(this.$);break;case 32:this.$={stmt:"click",id:r[l-3],url:r[l-2],tooltip:r[l-1]};break;case 33:this.$={stmt:"click",id:r[l-3],url:r[l-1],tooltip:""};break;case 34:case 35:this.$={stmt:"classDef",id:r[l-1].trim(),classes:r[l].trim()};break;case 36:this.$={stmt:"style",id:r[l-1].trim(),styleClass:r[l].trim()};break;case 37:this.$={stmt:"applyClass",id:r[l-1].trim(),styleClass:r[l].trim()};break;case 38:g.setDirection("TB"),this.$={stmt:"dir",value:"TB"};break;case 39:g.setDirection("BT"),this.$={stmt:"dir",value:"BT"};break;case 40:g.setDirection("RL"),this.$={stmt:"dir",value:"RL"};break;case 41:g.setDirection("LR"),this.$={stmt:"dir",value:"LR"};break;case 44:case 45:this.$={stmt:"state",id:r[l].trim(),type:"default",description:""};break;case 46:this.$={stmt:"state",id:r[l-2].trim(),classes:[r[l].trim()],type:"default",description:""};break;case 47:this.$={stmt:"state",id:r[l-2].trim(),classes:[r[l].trim()],type:"default",description:""};break}},"anonymous"),table:[{3:1,4:e,5:a,6:s},{1:[3]},{3:5,4:e,5:a,6:s},{3:6,4:e,5:a,6:s},t([1,4,5,16,17,19,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],c,{7:7}),{1:[2,1]},{1:[2,2]},{1:[2,3],4:h,5:p,8:8,9:10,10:12,11:13,12:14,13:15,16:y,17:n,19:m,22:k,24:x,25:$,26:U,27:w,28:f,29:A,32:25,33:I,35:V,37:M,38:F,41:P,45:st,48:rt,51:it,52:at,53:nt,54:ot,57:H},t(S,[2,5]),{9:39,10:12,11:13,12:14,13:15,16:y,17:n,19:m,22:k,24:x,25:$,26:U,27:w,28:f,29:A,32:25,33:I,35:V,37:M,38:F,41:P,45:st,48:rt,51:it,52:at,53:nt,54:ot,57:H},t(S,[2,7]),t(S,[2,8]),t(S,[2,9]),t(S,[2,10]),t(S,[2,11]),t(S,[2,12],{14:[1,40],15:[1,41]}),t(S,[2,16]),{18:[1,42]},t(S,[2,18],{20:[1,43]}),{23:[1,44]},t(S,[2,22]),t(S,[2,23]),t(S,[2,24]),t(S,[2,25]),{30:45,31:[1,46],59:[1,47],60:[1,48]},t(S,[2,28]),{34:[1,49]},{36:[1,50]},t(S,[2,31]),{13:51,24:x,57:H},{42:[1,52],44:[1,53]},{46:[1,54]},{49:[1,55]},t(lt,[2,44],{58:[1,56]}),t(lt,[2,45],{58:[1,57]}),t(S,[2,38]),t(S,[2,39]),t(S,[2,40]),t(S,[2,41]),t(S,[2,6]),t(S,[2,13]),{13:58,24:x,57:H},t(S,[2,17]),t(It,c,{7:59}),{24:[1,60]},{24:[1,61]},{23:[1,62]},{24:[2,48]},{24:[2,49]},t(S,[2,29]),t(S,[2,30]),{39:[1,63],40:[1,64]},{43:[1,65]},{43:[1,66]},{47:[1,67]},{50:[1,68]},{24:[1,69]},{24:[1,70]},t(S,[2,14],{14:[1,71]}),{4:h,5:p,8:8,9:10,10:12,11:13,12:14,13:15,16:y,17:n,19:m,21:[1,72],22:k,24:x,25:$,26:U,27:w,28:f,29:A,32:25,33:I,35:V,37:M,38:F,41:P,45:st,48:rt,51:it,52:at,53:nt,54:ot,57:H},t(S,[2,20],{20:[1,73]}),{31:[1,74]},{24:[1,75]},{39:[1,76]},{39:[1,77]},t(S,[2,34]),t(S,[2,35]),t(S,[2,36]),t(S,[2,37]),t(lt,[2,46]),t(lt,[2,47]),t(S,[2,15]),t(S,[2,19]),t(It,c,{7:78}),t(S,[2,26]),t(S,[2,27]),{5:[1,79]},{5:[1,80]},{4:h,5:p,8:8,9:10,10:12,11:13,12:14,13:15,16:y,17:n,19:m,21:[1,81],22:k,24:x,25:$,26:U,27:w,28:f,29:A,32:25,33:I,35:V,37:M,38:F,41:P,45:st,48:rt,51:it,52:at,53:nt,54:ot,57:H},t(S,[2,32]),t(S,[2,33]),t(S,[2,21])],defaultActions:{5:[2,1],6:[2,2],47:[2,48],48:[2,49]},parseError:u(function(o,d){if(d.recoverable)this.trace(o);else{var i=new Error(o);throw i.hash=d,i}},"parseError"),parse:u(function(o){var d=this,i=[0],g=[],b=[null],r=[],z=this.table,l="",N=0,O=0,q=0,ht=2,dt=1,pe=r.slice.call(arguments,1),T=Object.create(this.lexer),W={yy:{}};for(var kt in this.yy)Object.prototype.hasOwnProperty.call(this.yy,kt)&&(W.yy[kt]=this.yy[kt]);T.setInput(o,W.yy),W.yy.lexer=T,W.yy.parser=this,typeof T.yylloc>"u"&&(T.yylloc={});var Tt=T.yylloc;r.push(Tt);var Se=T.options&&T.options.ranges;typeof W.yy.parseError=="function"?this.parseError=W.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function ge(D){i.length=i.length-2*D,b.length=b.length-D,r.length=r.length-D}u(ge,"popStack");function Nt(){var D;return D=g.pop()||T.lex()||dt,typeof D!="number"&&(D instanceof Array&&(g=D,D=g.pop()),D=d.symbols_[D]||D),D}u(Nt,"lex");for(var E,Et,j,C,He,_t,K={},ut,R,Ot,ft;;){if(j=i[i.length-1],this.defaultActions[j]?C=this.defaultActions[j]:((E===null||typeof E>"u")&&(E=Nt()),C=z[j]&&z[j][E]),typeof C>"u"||!C.length||!C[0]){var vt="";ft=[];for(ut in z[j])this.terminals_[ut]&&ut>ht&&ft.push("'"+this.terminals_[ut]+"'");T.showPosition?vt="Parse error on line "+(N+1)+`:
`+T.showPosition()+`
Expecting `+ft.join(", ")+", got '"+(this.terminals_[E]||E)+"'":vt="Parse error on line "+(N+1)+": Unexpected "+(E==dt?"end of input":"'"+(this.terminals_[E]||E)+"'"),this.parseError(vt,{text:T.match,token:this.terminals_[E]||E,line:T.yylineno,loc:Tt,expected:ft})}if(C[0]instanceof Array&&C.length>1)throw new Error("Parse Error: multiple actions possible at state: "+j+", token: "+E);switch(C[0]){case 1:i.push(E),b.push(T.yytext),r.push(T.yylloc),i.push(C[1]),E=null,Et?(E=Et,Et=null):(O=T.yyleng,l=T.yytext,N=T.yylineno,Tt=T.yylloc,q>0&&q--);break;case 2:if(R=this.productions_[C[1]][1],K.$=b[b.length-R],K._$={first_line:r[r.length-(R||1)].first_line,last_line:r[r.length-1].last_line,first_column:r[r.length-(R||1)].first_column,last_column:r[r.length-1].last_column},Se&&(K._$.range=[r[r.length-(R||1)].range[0],r[r.length-1].range[1]]),_t=this.performAction.apply(K,[l,O,N,W.yy,C[1],b,r].concat(pe)),typeof _t<"u")return _t;R&&(i=i.slice(0,-1*R*2),b=b.slice(0,-1*R),r=r.slice(0,-1*R)),i.push(this.productions_[C[1]][0]),b.push(K.$),r.push(K._$),Ot=z[i[i.length-2]][i[i.length-1]],i.push(Ot);break;case 3:return!0}}return!0},"parse")},fe=(function(){var B={EOF:1,parseError:u(function(d,i){if(this.yy.parser)this.yy.parser.parseError(d,i);else throw new Error(d)},"parseError"),setInput:u(function(o,d){return this.yy=d||this.yy||{},this._input=o,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:u(function(){var o=this._input[0];this.yytext+=o,this.yyleng++,this.offset++,this.match+=o,this.matched+=o;var d=o.match(/(?:\r\n?|\n).*/g);return d?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),o},"input"),unput:u(function(o){var d=o.length,i=o.split(/(?:\r\n?|\n)/g);this._input=o+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-d),this.offset-=d;var g=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),i.length-1&&(this.yylineno-=i.length-1);var b=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:i?(i.length===g.length?this.yylloc.first_column:0)+g[g.length-i.length].length-i[0].length:this.yylloc.first_column-d},this.options.ranges&&(this.yylloc.range=[b[0],b[0]+this.yyleng-d]),this.yyleng=this.yytext.length,this},"unput"),more:u(function(){return this._more=!0,this},"more"),reject:u(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:u(function(o){this.unput(this.match.slice(o))},"less"),pastInput:u(function(){var o=this.matched.substr(0,this.matched.length-this.match.length);return(o.length>20?"...":"")+o.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:u(function(){var o=this.match;return o.length<20&&(o+=this._input.substr(0,20-o.length)),(o.substr(0,20)+(o.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:u(function(){var o=this.pastInput(),d=new Array(o.length+1).join("-");return o+this.upcomingInput()+`
`+d+"^"},"showPosition"),test_match:u(function(o,d){var i,g,b;if(this.options.backtrack_lexer&&(b={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(b.yylloc.range=this.yylloc.range.slice(0))),g=o[0].match(/(?:\r\n?|\n).*/g),g&&(this.yylineno+=g.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:g?g[g.length-1].length-g[g.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+o[0].length},this.yytext+=o[0],this.match+=o[0],this.matches=o,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(o[0].length),this.matched+=o[0],i=this.performAction.call(this,this.yy,this,d,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),i)return i;if(this._backtrack){for(var r in b)this[r]=b[r];return!1}return!1},"test_match"),next:u(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var o,d,i,g;this._more||(this.yytext="",this.match="");for(var b=this._currentRules(),r=0;r<b.length;r++)if(i=this._input.match(this.rules[b[r]]),i&&(!d||i[0].length>d[0].length)){if(d=i,g=r,this.options.backtrack_lexer){if(o=this.test_match(i,b[r]),o!==!1)return o;if(this._backtrack){d=!1;continue}else return!1}else if(!this.options.flex)break}return d?(o=this.test_match(d,b[g]),o!==!1?o:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:u(function(){var d=this.next();return d||this.lex()},"lex"),begin:u(function(d){this.conditionStack.push(d)},"begin"),popState:u(function(){var d=this.conditionStack.length-1;return d>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:u(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:u(function(d){return d=this.conditionStack.length-1-Math.abs(d||0),d>=0?this.conditionStack[d]:"INITIAL"},"topState"),pushState:u(function(d){this.begin(d)},"pushState"),stateStackSize:u(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:u(function(d,i,g,b){function r(){let l=i.yytext.indexOf("%%");if(l===0)return!1;if(l>0){let N=i.yytext.slice(0,l),O=i.yytext.slice(l);O&&d.lexer.unput(O),i.yytext=N}return!0}u(r,"processId");var z=b;switch(g){case 0:return 38;case 1:return 40;case 2:return 39;case 3:return 44;case 4:return 51;case 5:return 52;case 6:return 53;case 7:return 54;case 8:return 5;case 9:break;case 10:break;case 11:break;case 12:break;case 13:return this.pushState("SCALE"),17;break;case 14:return 18;case 15:this.popState();break;case 16:return this.begin("acc_title"),33;break;case 17:return this.popState(),"acc_title_value";break;case 18:return this.begin("acc_descr"),35;break;case 19:return this.popState(),"acc_descr_value";break;case 20:this.begin("acc_descr_multiline");break;case 21:this.popState();break;case 22:return"acc_descr_multiline_value";case 23:return this.pushState("CLASSDEF"),41;break;case 24:return this.popState(),this.pushState("CLASSDEFID"),"DEFAULT_CLASSDEF_ID";break;case 25:return this.popState(),this.pushState("CLASSDEFID"),42;break;case 26:return this.popState(),43;break;case 27:return this.pushState("CLASS"),48;break;case 28:return this.popState(),this.pushState("CLASS_STYLE"),49;break;case 29:return this.popState(),50;break;case 30:return this.pushState("STYLE"),45;break;case 31:return this.popState(),this.pushState("STYLEDEF_STYLES"),46;break;case 32:return this.popState(),47;break;case 33:return this.pushState("SCALE"),17;break;case 34:return 18;case 35:this.popState();break;case 36:this.pushState("STATE");break;case 37:return this.popState(),i.yytext=i.yytext.slice(0,-8).trim(),25;break;case 38:return this.popState(),i.yytext=i.yytext.slice(0,-8).trim(),26;break;case 39:return this.popState(),i.yytext=i.yytext.slice(0,-10).trim(),27;break;case 40:return this.popState(),i.yytext=i.yytext.slice(0,-8).trim(),25;break;case 41:return this.popState(),i.yytext=i.yytext.slice(0,-8).trim(),26;break;case 42:return this.popState(),i.yytext=i.yytext.slice(0,-10).trim(),27;break;case 43:return 51;case 44:return 52;case 45:return 53;case 46:return 54;case 47:this.pushState("STATE_STRING");break;case 48:return this.pushState("STATE_ID"),"AS";break;case 49:if(!r())return;return this.popState(),"ID";break;case 50:this.popState();break;case 51:return"STATE_DESCR";case 52:throw new Error('Error: State name must be a single word. Found: "'+i.yytext.trim()+'"');case 53:return 19;case 54:this.popState();break;case 55:return this.popState(),this.pushState("struct"),20;break;case 56:return this.popState(),21;break;case 57:break;case 58:return this.begin("NOTE"),29;break;case 59:return this.popState(),this.pushState("NOTE_ID"),59;break;case 60:return this.popState(),this.pushState("NOTE_ID"),60;break;case 61:this.popState(),this.pushState("FLOATING_NOTE");break;case 62:return this.popState(),this.pushState("FLOATING_NOTE_ID"),"AS";break;case 63:break;case 64:return"NOTE_TEXT";case 65:if(!r())return;return this.popState(),"ID";break;case 66:if(!r())return;return this.popState(),this.pushState("NOTE_TEXT"),24;break;case 67:return this.popState(),i.yytext=i.yytext.substr(2).trim(),31;break;case 68:return this.popState(),i.yytext=i.yytext.slice(0,-8).trim(),31;break;case 69:return 6;case 70:return 6;case 71:return 16;case 72:return 57;case 73:return r()?24:void 0;case 74:return i.yytext=i.yytext.trim(),14;break;case 75:return 15;case 76:return 28;case 77:return 58;case 78:return 5;case 79:return"INVALID"}},"anonymous"),rules:[/^(?:click\b)/i,/^(?:href\b)/i,/^(?:"[^"]*")/i,/^(?:default\b)/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:[\n]+)/i,/^(?:[\s]+)/i,/^(?:((?!\n)\s)+)/i,/^(?:#[^\n]*)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:classDef\s+)/i,/^(?:DEFAULT\s+)/i,/^(?:\w+\s+)/i,/^(?:[^\n]*)/i,/^(?:class\s+)/i,/^(?:(\w+)+((,\s*\w+)*))/i,/^(?:[^\n]*)/i,/^(?:style\s+)/i,/^(?:[\w,]+\s+)/i,/^(?:[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:state\s+)/i,/^(?:.*<<fork>>)/i,/^(?:.*<<join>>)/i,/^(?:.*<<choice>>)/i,/^(?:.*\[\[fork\]\])/i,/^(?:.*\[\[join\]\])/i,/^(?:.*\[\[choice\]\])/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:["])/i,/^(?:\s*as\s+)/i,/^(?:[^\n\{]*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:\w+\s+\w+.*?\{)/i,/^(?:[^\n\s\{]+)/i,/^(?:\n)/i,/^(?:\{)/i,/^(?:\})/i,/^(?:[\n])/i,/^(?:note\s+)/i,/^(?:left of\b)/i,/^(?:right of\b)/i,/^(?:")/i,/^(?:\s*as\s*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n]*)/i,/^(?:\s*[^:\n\s\-]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:[\s\S]*?\n\s*end note\b)/i,/^(?:stateDiagram\s+)/i,/^(?:stateDiagram-v2\s+)/i,/^(?:hide empty description\b)/i,/^(?:\[\*\])/i,/^(?:[^:\n\s\-\{]+)/i,/^(?:\s*:(?:[^:\n;]|:[^:\n;])+)/i,/^(?:-->)/i,/^(?:--)/i,/^(?::::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{LINE:{rules:[10,11,12],inclusive:!1},struct:{rules:[10,11,12,23,27,30,36,43,44,45,46,56,57,58,72,73,74,75,76,77],inclusive:!1},FLOATING_NOTE_ID:{rules:[65],inclusive:!1},FLOATING_NOTE:{rules:[62,63,64],inclusive:!1},NOTE_TEXT:{rules:[67,68],inclusive:!1},NOTE_ID:{rules:[66],inclusive:!1},NOTE:{rules:[59,60,61],inclusive:!1},STYLEDEF_STYLEOPTS:{rules:[],inclusive:!1},STYLEDEF_STYLES:{rules:[32],inclusive:!1},STYLE_IDS:{rules:[],inclusive:!1},STYLE:{rules:[31],inclusive:!1},CLASS_STYLE:{rules:[29],inclusive:!1},CLASS:{rules:[28],inclusive:!1},CLASSDEFID:{rules:[26],inclusive:!1},CLASSDEF:{rules:[24,25],inclusive:!1},acc_descr_multiline:{rules:[21,22],inclusive:!1},acc_descr:{rules:[19],inclusive:!1},acc_title:{rules:[17],inclusive:!1},SCALE:{rules:[14,15,34,35],inclusive:!1},ALIAS:{rules:[],inclusive:!1},STATE_ID:{rules:[49],inclusive:!1},STATE_STRING:{rules:[50,51],inclusive:!1},FORK_STATE:{rules:[],inclusive:!1},STATE:{rules:[10,11,12,37,38,39,40,41,42,47,48,52,53,54,55],inclusive:!1},ID:{rules:[10,11,12],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,8,9,11,12,13,16,18,20,23,27,30,33,36,55,58,69,70,71,72,73,74,75,77,78,79],inclusive:!0}}};return B})();bt.lexer=fe;function ct(){this.yy={}}return u(ct,"Parser"),ct.prototype=bt,bt.Parser=ct,new ct})();At.parser=At;var ye=At,me="TB",te="TB",Kt="dir",J="state",X="root",xt="relation",be="classDef",ke="style",Te="applyClass",et="default",ee="divider",se="fill:none",re="fill: #333",ie="c",ae="markdown",ne="normal",Dt="rect",Ct="rectWithTitle",Ee="stateStart",_e="stateEnd",Lt="divider",Xt="roundedWithTitle",ve="note",De="noteGroup",mt="statediagram",Ce="state",Ae=`${mt}-${Ce}`,oe="transition",xe="note",Le="note-edge",we=`${oe} ${Le}`,Ie=`${mt}-${xe}`,Ne="cluster",Oe=`${mt}-${Ne}`,Re="cluster-alt",$e=`${mt}-${Re}`,le="parent",ce="note",Fe="state",wt="----",Pe=`${wt}${ce}`,Jt=`${wt}${le}`,gt=new Map,Y=0,he=0,Q=new Map,Be=u((t,e,a,s)=>{if(t===Lt&&a?.id!==void 0&&Q.has(a.id)){let p=Q.get(a.id);return Q.set(e,p),p}let c=he++,h=s?void 0:c;return Q.set(e,h),h},"colorSlotFor");function yt(t="",e=0,a="",s=wt){let c=a!==null&&a.length>0?`${s}${a}`:"";return`${Fe}-${t}${c}-${e}`}u(yt,"stateDomId");var Ge=u((t,e,a,s,c,h,p,y)=>{v.trace("items",e),e.forEach(n=>{switch(n.stmt){case J:tt(t,n,a,s,c,h,p,y);break;case et:tt(t,n,a,s,c,h,p,y);break;case xt:{tt(t,n.state1,a,s,c,h,p,y),tt(t,n.state2,a,s,c,h,p,y);let m=p==="neo",k={id:"edge"+Y,start:n.state1.id,end:n.state2.id,arrowhead:"normal",arrowTypeEnd:m?"arrow_barb_neo":"arrow_barb",style:se,labelStyle:"",label:G.sanitizeText(n.description??"",L()),arrowheadStyle:re,labelpos:ie,labelType:ae,thickness:ne,classes:oe,look:p};c.push(k),Y++}break}})},"setupDoc"),qt=u((t,e=te)=>{let a=e;if(t.doc)for(let s of t.doc)s.stmt==="dir"&&(a=s.value);return a},"getDir");function Z(t,e,a){if(!e.id||e.id==="</join></fork>"||e.id==="</choice>")return;e.cssClasses&&(Array.isArray(e.cssCompiledStyles)||(e.cssCompiledStyles=[]),e.cssClasses.split(" ").forEach(c=>{let h=a.get(c);h&&(e.cssCompiledStyles=[...e.cssCompiledStyles??[],...h.styles])}));let s=t.find(c=>c.id===e.id);s?Object.assign(s,e):t.push(e)}u(Z,"insertOrUpdateNode");function de(t){return t?.classes?.join(" ")??""}u(de,"getClassesFromDbInfo");function ue(t){return t?.styles??[]}u(ue,"getStylesFromDbInfo");var tt=u((t,e,a,s,c,h,p,y)=>{let n=e.id,m=a.get(n),k=de(m),x=ue(m),$=L(),U=k.trim()!==""||x.length>0;if(v.info("dataFetcher parsedItem",e,m,x),n!=="root"){let w=Dt;e.start===!0?w=Ee:e.start===!1&&(w=_e),e.type!==et&&(w=e.type),gt.get(n)||gt.set(n,{id:n,shape:w,description:G.sanitizeText(n,$),cssClasses:`${k} ${Ae}`,cssStyles:x});let f=gt.get(n);e.description&&(Array.isArray(f.description)?(f.shape=Ct,f.description.push(e.description)):f.description?.length&&f.description.length>0?(f.shape=Ct,f.description===n?f.description=[e.description]:f.description=[f.description,e.description]):(f.shape=Dt,f.description=e.description),f.description=G.sanitizeTextOrArray(f.description,$)),f.description?.length===1&&f.shape===Ct&&(f.type==="group"?f.shape=Xt:f.shape=Dt),!f.type&&e.doc&&(v.info("Setting cluster for XCX",n,qt(e)),f.type="group",f.isGroup=!0,f.dir=qt(e),f.shape=e.type===ee?Lt:Xt,f.colorIndex=Be(f.shape,n,t,U),f.cssClasses=`${f.cssClasses} ${Oe} ${h?$e:""}`);let A={labelStyle:"",shape:f.shape,label:f.description,cssClasses:f.cssClasses,cssCompiledStyles:[],cssStyles:f.cssStyles,id:n,dir:f.dir,domId:yt(n,Y),type:f.type,isGroup:f.type==="group",colorIndex:f.colorIndex,padding:8,rx:10,ry:10,look:p,labelType:"markdown"};if(A.shape===Lt&&(A.label=""),t&&t.id!=="root"&&(v.trace("Setting node ",n," to be child of its parent ",t.id),A.parentId=t.id),A.centerLabel=!0,e.note){let I={labelStyle:"",shape:ve,label:e.note.text,labelType:"markdown",cssClasses:Ie,cssStyles:[],cssCompiledStyles:[],id:n+Pe+"-"+Y,domId:yt(n,Y,ce),type:"node",isGroup:!1,padding:$.flowchart?.padding,look:p,position:e.note.position},V=n+Jt,M={labelStyle:"",shape:De,label:e.note.text,cssClasses:f.cssClasses,cssStyles:[],id:n+Jt,domId:yt(n,Y,le),type:"group",isGroup:!0,padding:16,look:p,position:e.note.position};Y++,M.id=V,I.parentId=V,Z(s,M,y),Z(s,I,y),Z(s,A,y);let F=n,P=I.id;e.note.position==="left of"&&(F=I.id,P=n),c.push({id:F+"-"+P,start:F,end:P,arrowhead:"none",arrowTypeEnd:"",style:se,labelStyle:"",classes:we,pattern:"dashed",arrowheadStyle:re,labelpos:ie,labelType:ae,thickness:ne,look:p})}else Z(s,A,y)}e.doc&&(v.trace("Adding nodes children "),Ge(e,e.doc,a,s,c,!h,p,y))},"dataFetcher"),Ye=u(()=>{gt.clear(),Y=0,he=0,Q.clear()},"reset"),Ve=u((t,e=te)=>{if(!t.doc)return e;let a=e;for(let s of t.doc)s.stmt==="dir"&&(a=s.value);return a},"getDir");var _={START_NODE:"[*]",START_TYPE:"start",END_NODE:"[*]",END_TYPE:"end",COLOR_KEYWORD:"color",FILL_KEYWORD:"fill",BG_FILL:"bgFill",STYLECLASS_SEP:","},Qt=u(()=>new Map,"newClassesList"),Zt=u(()=>({relations:[],states:new Map,documents:{}}),"newDoc"),St=u(t=>JSON.parse(JSON.stringify(t)),"clone"),Me=class{constructor(t){this.version=t,this.nodes=[],this.edges=[],this.rootDoc=[],this.classes=Qt(),this.documents={root:Zt()},this.currentDocument=this.documents.root,this.startEndCount=0,this.dividerCnt=0,this.links=new Map,this.funs=[],this.getAccTitle=Pt,this.setAccTitle=Ft,this.getAccDescription=Gt,this.setAccDescription=Bt,this.setDiagramTitle=Yt,this.getDiagramTitle=Vt,this.clear(),this.setRootDoc=this.setRootDoc.bind(this),this.getDividerId=this.getDividerId.bind(this),this.setDirection=this.setDirection.bind(this),this.trimColon=this.trimColon.bind(this),this.bindFunctions=this.bindFunctions.bind(this)}static{u(this,"StateDB")}static{this.relationType={AGGREGATION:0,EXTENSION:1,COMPOSITION:2,DEPENDENCY:3}}extract(t){this.clear(!0);for(let s of Array.isArray(t)?t:t.doc)switch(s.stmt){case J:this.addState(s.id.trim(),s.type,s.doc,s.description,s.note);break;case xt:this.addRelation(s.state1,s.state2,s.description);break;case be:this.addStyleClass(s.id.trim(),s.classes);break;case ke:this.handleStyleDef(s);break;case Te:this.setCssClass(s.id.trim(),s.styleClass);break;case"click":this.addLink(s.id,s.url,s.tooltip);break}let e=this.getStates(),a=L();Ye(),tt(void 0,this.getRootDocV2(),e,this.nodes,this.edges,!0,a.look,this.classes);for(let s of this.nodes)if(Array.isArray(s.label)){if(s.description=s.label.slice(1),s.isGroup&&s.description.length>0)throw new Error(`Group nodes can only have label. Remove the additional description for node [${s.id}]`);s.label=s.label[0]}}handleStyleDef(t){let e=t.id.trim().split(","),a=t.styleClass.split(",");for(let s of e){let c=this.getState(s);if(!c){let h=s.trim();this.addState(h),c=this.getState(h)}c&&(c.styles=a.map(h=>h.replace(/;/g,"")?.trim()))}}setRootDoc(t){v.info("Setting root doc",t),this.rootDoc=t,this.version===1?this.extract(t):this.extract(this.getRootDocV2())}docTranslator(t,e,a){if(e.stmt===xt){this.docTranslator(t,e.state1,!0),this.docTranslator(t,e.state2,!1);return}if(e.stmt===J&&(e.id===_.START_NODE?(e.id=t.id+(a?"_start":"_end"),e.start=a):e.id=e.id.trim()),e.stmt!==X&&e.stmt!==J||!e.doc)return;let s=[],c=[];for(let h of e.doc)if(h.type===ee){let p=St(h);p.doc=St(c),s.push(p),c=[]}else c.push(h);if(s.length>0&&c.length>0){let h={stmt:J,id:Mt(),type:"divider",doc:St(c)};s.push(St(h)),e.doc=s}e.doc.forEach(h=>this.docTranslator(e,h,!0))}getRootDocV2(){return this.docTranslator({id:X,stmt:X},{id:X,stmt:X,doc:this.rootDoc},!0),{id:X,doc:this.rootDoc}}addState(t,e=et,a=void 0,s=void 0,c=void 0,h=void 0,p=void 0,y=void 0){let n=t?.trim();if(!this.currentDocument.states.has(n))v.info("Adding state ",n,s),this.currentDocument.states.set(n,{stmt:J,id:n,descriptions:[],type:e,doc:a,note:c,classes:[],styles:[],textStyles:[]});else{let m=this.currentDocument.states.get(n);if(!m)throw new Error(`State not found: ${n}`);m.doc||(m.doc=a),m.type||(m.type=e)}if(s&&(v.info("Setting state description",n,s),(Array.isArray(s)?s:[s]).forEach(k=>this.addDescription(n,k.trim()))),c){let m=this.currentDocument.states.get(n);if(!m)throw new Error(`State not found: ${n}`);m.note=c,m.note.text=G.sanitizeText(m.note.text,L())}h&&(v.info("Setting state classes",n,h),(Array.isArray(h)?h:[h]).forEach(k=>this.setCssClass(n,k.trim()))),p&&(v.info("Setting state styles",n,p),(Array.isArray(p)?p:[p]).forEach(k=>this.setStyle(n,k.trim()))),y&&(v.info("Setting state styles",n,p),(Array.isArray(y)?y:[y]).forEach(k=>this.setTextStyle(n,k.trim())))}clear(t){this.nodes=[],this.edges=[],this.funs=[this.setupToolTips.bind(this)],this.documents={root:Zt()},this.currentDocument=this.documents.root,this.startEndCount=0,this.classes=Qt(),t||(this.links=new Map,$t())}getState(t){return this.currentDocument.states.get(t)}getStates(){return this.currentDocument.states}logDocuments(){v.info("Documents = ",this.documents)}getRelations(){return this.currentDocument.relations}addLink(t,e,a){this.links.set(t,{url:e,tooltip:a}),v.warn("Adding link",t,e,a)}getLinks(){return this.links}startIdIfNeeded(t=""){return t===_.START_NODE?(this.startEndCount++,`${_.START_TYPE}${this.startEndCount}`):t}startTypeIfNeeded(t="",e=et){return t===_.START_NODE?_.START_TYPE:e}endIdIfNeeded(t=""){return t===_.END_NODE?(this.startEndCount++,`${_.END_TYPE}${this.startEndCount}`):t}endTypeIfNeeded(t="",e=et){return t===_.END_NODE?_.END_TYPE:e}addRelationObjs(t,e,a=""){let s=this.startIdIfNeeded(t.id.trim()),c=this.startTypeIfNeeded(t.id.trim(),t.type),h=this.startIdIfNeeded(e.id.trim()),p=this.startTypeIfNeeded(e.id.trim(),e.type);this.addState(s,c,t.doc,t.description,t.note,t.classes,t.styles,t.textStyles),this.addState(h,p,e.doc,e.description,e.note,e.classes,e.styles,e.textStyles),this.currentDocument.relations.push({id1:s,id2:h,relationTitle:G.sanitizeText(a,L())})}addRelation(t,e,a){if(typeof t=="object"&&typeof e=="object")this.addRelationObjs(t,e,a);else if(typeof t=="string"&&typeof e=="string"){let s=this.startIdIfNeeded(t.trim()),c=this.startTypeIfNeeded(t),h=this.endIdIfNeeded(e.trim()),p=this.endTypeIfNeeded(e);this.addState(s,c),this.addState(h,p),this.currentDocument.relations.push({id1:s,id2:h,relationTitle:a?G.sanitizeText(a,L()):void 0})}}addDescription(t,e){let a=this.currentDocument.states.get(t),s=e.startsWith(":")?e.replace(":","").trim():e;a?.descriptions?.push(G.sanitizeText(s,L()))}cleanupLabel(t){return t.startsWith(":")?t.slice(2).trim():t.trim()}getDividerId(){return this.dividerCnt++,`divider-id-${this.dividerCnt}`}addStyleClass(t,e=""){this.classes.has(t)||this.classes.set(t,{id:t,styles:[],textStyles:[]});let a=this.classes.get(t);e&&a&&e.split(_.STYLECLASS_SEP).forEach(s=>{let c=s.replace(/([^;]*);/,"$1").trim();if(RegExp(_.COLOR_KEYWORD).exec(s)){let p=c.replace(_.FILL_KEYWORD,_.BG_FILL).replace(_.COLOR_KEYWORD,_.FILL_KEYWORD);a.textStyles.push(p)}a.styles.push(c)})}getClasses(){return this.classes}setupToolTips(t){let e=zt();pt(t).select("svg").selectAll("g.node, g.rough-node").on("mouseover",c=>{let h=pt(c.currentTarget),p=h.attr("title");if(p===null)return;let y=c.currentTarget?.getBoundingClientRect();e.transition().duration(200).style("opacity",".9"),e.style("left",window.scrollX+y.left+(y.right-y.left)/2+"px").style("top",window.scrollY+y.bottom+"px"),e.html(Rt.sanitize(p)),h.classed("hover",!0)}).on("mouseout",c=>{e.transition().duration(500).style("opacity",0),pt(c.currentTarget).classed("hover",!1)})}setCssClass(t,e){t.split(",").forEach(a=>{let s=this.getState(a);if(!s){let c=a.trim();this.addState(c),s=this.getState(c)}s?.classes?.push(e)})}setStyle(t,e){this.getState(t)?.styles?.push(e)}setTextStyle(t,e){this.getState(t)?.textStyles?.push(e)}bindFunctions(t){this.funs.forEach(e=>{e(t)})}getDirectionStatement(){return this.rootDoc.find(t=>t.stmt===Kt)}getDirection(){return this.getDirectionStatement()?.value??me}setDirection(t){let e=this.getDirectionStatement();e?e.value=t:this.rootDoc.unshift({stmt:Kt,value:t})}trimColon(t){return t.startsWith(":")?t.slice(1).trim():t.trim()}getData(){let t=L();for(let e of this.nodes)e.wrappingWidth??=t.state?.wrappingWidth,e.isGroup||(e.minWidth??=t.state?.minNodeWidth);return{nodes:this.nodes,edges:this.edges,other:{},config:t,direction:Ve(this.getRootDocV2())}}getConfig(){return L().state}},We=u(t=>{let{theme:e,bkgColorArray:a,borderColorArray:s}=t;if(!jt(e,s))return"";let c=Ut(t.look),h=Wt(a),p="";for(let y=0;y<Ht(s);y++){let n=s[y],m=h?`fill: ${a[y%a.length]};`:"",k=`[data-look="${c}"][data-color-id="color-${y}"]`;p+=`

    /* The title strip: \`rect.outer\` spans the whole composite and \`rect.inner\` covers
       the body, so what stays visible of \`outer\` is the band behind the label. */
    ${k}.statediagram-cluster rect.outer {
      stroke: ${n};
      ${m}
    }

    ${k}.statediagram-cluster rect.inner {
      stroke: ${n};
    }

    /* Concurrency regions. Siblings of one composite share a slot, so a divided composite
       reads as one thing split into parts rather than as several composites. */
    ${k}.statediagram-cluster rect.divider {
      stroke: ${n};
      ${m}
    }

    /* handDrawn draws the same container as roughjs shapes rather than plain rects, so it
       needs its own rules. \`roundedWithTitle\` and \`divider\` name those groups \`outer\`,
       \`inner\` and \`divider\` to match the classic branch, which is what lets these
       discriminate -- a bare \`.statediagram-cluster path\` rule reached the body as well and
       tinted the whole composite, losing \`compositeBackground\` and diverging from what
       classic and neo do.

       roughjs emits two paths per shape and marks them: the filled shape carries
       \`stroke="none"\` and the sketched outline carries \`fill="none"\`. Splitting on that is
       what keeps \`fill\` off the outline -- a rough outline is open squiggles, not a closed
       region, so filling it produces smears -- and keeps \`stroke\` off the fill shape, which
       would otherwise gain an edge it was drawn without. */
    ${k}.statediagram-cluster .outer path[stroke='none'] {
      ${m}
    }

    ${k}.statediagram-cluster .outer path[fill='none'] {
      stroke: ${n};
    }

    /* No \`.inner\` rule on purpose. The body shape is left entirely alone under handDrawn,
       where a rect's \`inner\` counterpart cannot be recoloured safely: roughjs draws a
       hachure fill as *stroked* lines, so its fill paths carry \`fill="none"\` exactly like
       the outline and no selector separates them. An \`.inner\` stroke rule therefore
       repainted the hatching of every alt composite in the palette colour instead of
       leaving it on \`altBackground\`. The container still reads as palette-coloured: the
       \`outer\` shape spans the whole composite, so its outline already frames the body. */

    /* Regions split the same way, which is why \`divider\` fills solid rather than taking
       roughjs's default hachure -- see the note on that call. Hatched, both of its paths
       carried \`fill="none"\` and these two rules degenerated: the tint matched nothing and
       the border rule repainted the hatching. */
    ${k}.statediagram-cluster .divider path[stroke='none'] {
      ${m}
    }

    ${k}.statediagram-cluster .divider path[fill='none'] {
      stroke: ${n};
    }
    `}return p},"genColor"),je=u(t=>`
${We(t)}
defs [id$="-barbEnd"] {
    fill: ${t.transitionColor};
    stroke: ${t.transitionColor};
  }
g.stateGroup text {
  fill: ${t.nodeBorder};
  stroke: none;
  font-size: 10px;
}
g.stateGroup text {
  fill: ${t.textColor};
  stroke: none;
  font-size: 10px;

}
g.stateGroup .state-title {
  font-weight: bolder;
  fill: ${t.stateLabelColor};
}

g.stateGroup rect {
  fill: ${t.mainBkg};
  stroke: ${t.nodeBorder};
}

g.stateGroup line {
  stroke: ${t.lineColor};
  stroke-width: ${t.strokeWidth||1};
}

.transition {
  stroke: ${t.transitionColor};
  stroke-width: ${t.strokeWidth||1};
  fill: none;
}

.stateGroup .composit {
  fill: ${t.background};
  border-bottom: 1px
}

.stateGroup .alt-composit {
  fill: #e0e0e0;
  border-bottom: 1px
}

.state-note {
  stroke: ${t.noteBorderColor};
  fill: ${t.noteBkgColor};

  text {
    fill: ${t.noteTextColor};
    stroke: none;
    font-size: 10px;
  }
}

.stateLabel .box {
  stroke: none;
  stroke-width: 0;
  fill: ${t.mainBkg};
  opacity: 0.5;
}

.edgeLabel .label rect {
  fill: ${t.labelBackgroundColor};
  opacity: 0.5;
}
.edgeLabel {
  background-color: ${t.edgeLabelBackground};
  p {
    background-color: ${t.edgeLabelBackground};
  }
  rect {
    opacity: 0.5;
    background-color: ${t.edgeLabelBackground};
    fill: ${t.edgeLabelBackground};
  }
  text-align: center;
}
.edgeLabel .label text {
  fill: ${t.transitionLabelColor||t.tertiaryTextColor};
}
.label div .edgeLabel {
  color: ${t.transitionLabelColor||t.tertiaryTextColor};
}

.stateLabel text {
  fill: ${t.stateLabelColor};
  font-size: 10px;
  font-weight: bold;
}

.node circle.state-start {
  fill: ${t.specialStateColor};
  stroke: ${t.specialStateColor};
}

.node .fork-join {
  fill: ${t.specialStateColor};
  stroke: ${t.specialStateColor};
}

.node circle.state-end {
  fill: ${t.innerEndBackground};
  stroke: ${t.background};
  stroke-width: 1.5
}
.end-state-inner {
  fill: ${t.compositeBackground||t.background};
  // stroke: ${t.background};
  stroke-width: 1.5
}

.node rect {
  fill: ${t.stateBkg||t.mainBkg};
  stroke: ${t.stateBorder||t.nodeBorder};
  stroke-width: ${t.strokeWidth||1}px;
}
.node polygon {
  fill: ${t.mainBkg};
  stroke: ${t.stateBorder||t.nodeBorder};;
  stroke-width: ${t.strokeWidth||1}px;
}
[id$="-barbEnd"] {
  fill: ${t.lineColor};
}

.statediagram-cluster rect {
  fill: ${t.compositeTitleBackground};
  stroke: ${t.stateBorder||t.nodeBorder};
  stroke-width: ${t.strokeWidth||1}px;
}

.cluster-label, .nodeLabel {
  color: ${t.stateLabelColor};
  // line-height: 1;
}

.statediagram-cluster rect.outer {
  rx: 5px;
  ry: 5px;
}
.statediagram-state .divider {
  stroke: ${t.stateBorder||t.nodeBorder};
}

.statediagram-state .title-state {
  rx: 5px;
  ry: 5px;
}
.statediagram-cluster.statediagram-cluster .inner {
  fill: ${t.compositeBackground||t.background};
}
.statediagram-cluster.statediagram-cluster-alt .inner {
  fill: ${t.altBackground?t.altBackground:"#efefef"};
}

.statediagram-cluster .inner {
  rx:0;
  ry:0;
}

.statediagram-state rect.basic {
  rx: 5px;
  ry: 5px;
}
.statediagram-state rect.divider {
  stroke-dasharray: 10,10;
  fill: ${t.altBackground?t.altBackground:"#efefef"};
}

.note-edge {
  stroke-dasharray: 5;
}

.statediagram-note rect {
  fill: ${t.noteBkgColor};
  stroke: ${t.noteBorderColor};
  stroke-width: 1px;
  rx: 0;
  ry: 0;
}
.statediagram-note rect {
  fill: ${t.noteBkgColor};
  stroke: ${t.noteBorderColor};
  stroke-width: 1px;
  rx: 0;
  ry: 0;
}

.statediagram-note text {
  fill: ${t.noteTextColor};
}

.statediagram-note .nodeLabel {
  color: ${t.noteTextColor};
}
.statediagram .edgeLabel {
  color: red; // ${t.noteTextColor};
}

[id$="-dependencyStart"], [id$="-dependencyEnd"] {
  fill: ${t.lineColor};
  stroke: ${t.lineColor};
  stroke-width: ${t.strokeWidth||1};
}

.statediagramTitleText {
  text-anchor: middle;
  font-size: 18px;
  fill: ${t.textColor};
}

[data-look="neo"].statediagram-cluster rect {
  fill: ${t.mainBkg};
  stroke: ${t.useGradient?"url("+t.svgId+"-gradient)":t.stateBorder||t.nodeBorder};
  stroke-width: ${t.strokeWidth??1};
}
[data-look="neo"].statediagram-cluster rect.outer {
  rx: ${t.radius}px;
  ry: ${t.radius}px;
  filter: ${t.dropShadow?t.dropShadow.replace("url(#drop-shadow)",`url(${t.svgId}-drop-shadow)`):"none"}
}
`,"getStyles"),Ue=je,ys={parser:ye,get db(){return new Me(2)},renderer:{},styles:Ue,init:u(t=>{t.state||(t.state={}),t.state.arrowMarkerAbsolute=t.arrowMarkerAbsolute},"init")};export{ys as diagram};
