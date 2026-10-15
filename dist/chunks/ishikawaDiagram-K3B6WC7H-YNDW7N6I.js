import"./chunk-D4ZCYAKM.js";import{a as ct}from"./chunk-WEMV4B62.js";import"./chunk-E2EDNZQV.js";import"./chunk-STBOPOHX.js";import{L as Y,O as K,P as q,Q,R as J,S as tt,T as O,U as et,V as it}from"./chunk-6XJTJGUF.js";import"./chunk-RRKEGWUA.js";import{a}from"./chunk-EIBFAW37.js";import{c as ht}from"./chunk-PHKIAKHS.js";var yt=ht(ct(),1),C=(function(){var n=a(function(p,t,e,i){for(e=e||{},i=p.length;i--;e[p[i]]=t);return e},"o"),S=[1,4],f=[1,14],d=[1,12],m=[1,13],w=[6,7,8],V=[1,20],R=[1,18],W=[1,19],E=[6,7,11],F=[1,6,13,14],j=[1,23],z=[1,24],x=[1,6,7,11,13,14],T={trace:a(function(){},"trace"),yy:{},symbols_:{error:2,start:3,ishikawa:4,spaceLines:5,SPACELINE:6,NL:7,ISHIKAWA:8,document:9,stop:10,EOF:11,statement:12,SPACELIST:13,TEXT:14,$accept:0,$end:1},terminals_:{2:"error",6:"SPACELINE",7:"NL",8:"ISHIKAWA",11:"EOF",13:"SPACELIST",14:"TEXT"},productions_:[0,[3,1],[3,2],[5,1],[5,2],[5,2],[4,2],[4,3],[10,1],[10,1],[10,1],[10,2],[10,2],[9,3],[9,2],[12,2],[12,1],[12,1],[12,1]],performAction:a(function(t,e,i,l,r,s,v){var b=s.length-1;switch(r){case 6:case 7:return l;case 15:l.addNode(s[b-1].length,s[b].trim());break;case 16:l.addNode(0,s[b].trim());break}},"anonymous"),table:[{3:1,4:2,5:3,6:[1,5],8:S},{1:[3]},{1:[2,1]},{4:6,6:[1,7],7:[1,8],8:S},{6:f,7:[1,10],9:9,12:11,13:d,14:m},n(w,[2,3]),{1:[2,2]},n(w,[2,4]),n(w,[2,5]),{1:[2,6],6:f,12:15,13:d,14:m},{6:f,9:16,12:11,13:d,14:m},{6:V,7:R,10:17,11:W},n(E,[2,18],{14:[1,21]}),n(E,[2,16]),n(E,[2,17]),{6:V,7:R,10:22,11:W},{1:[2,7],6:f,12:15,13:d,14:m},n(F,[2,14],{7:j,11:z}),n(x,[2,8]),n(x,[2,9]),n(x,[2,10]),n(E,[2,15]),n(F,[2,13],{7:j,11:z}),n(x,[2,11]),n(x,[2,12])],defaultActions:{2:[2,1],6:[2,2]},parseError:a(function(t,e){if(e.recoverable)this.trace(t);else{var i=new Error(t);throw i.hash=e,i}},"parseError"),parse:a(function(t){var e=this,i=[0],l=[],r=[null],s=[],v=this.table,b="",A=0,H=0,G=0,at=2,U=1,rt=s.slice.call(arguments,1),o=Object.create(this.lexer),g={yy:{}};for(var M in this.yy)Object.prototype.hasOwnProperty.call(this.yy,M)&&(g.yy[M]=this.yy[M]);o.setInput(t,g.yy),g.yy.lexer=o,g.yy.parser=this,typeof o.yylloc>"u"&&(o.yylloc={});var P=o.yylloc;s.push(P);var lt=o.options&&o.options.ranges;typeof g.yy.parseError=="function"?this.parseError=g.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function ot(c){i.length=i.length-2*c,r.length=r.length-c,s.length=s.length-c}a(ot,"popStack");function Z(){var c;return c=l.pop()||o.lex()||U,typeof c!="number"&&(c instanceof Array&&(l=c,c=l.pop()),c=e.symbols_[c]||c),c}a(Z,"lex");for(var h,B,k,u,gt,N,_={},I,y,X,L;;){if(k=i[i.length-1],this.defaultActions[k]?u=this.defaultActions[k]:((h===null||typeof h>"u")&&(h=Z()),u=v[k]&&v[k][h]),typeof u>"u"||!u.length||!u[0]){var D="";L=[];for(I in v[k])this.terminals_[I]&&I>at&&L.push("'"+this.terminals_[I]+"'");o.showPosition?D="Parse error on line "+(A+1)+`:
`+o.showPosition()+`
Expecting `+L.join(", ")+", got '"+(this.terminals_[h]||h)+"'":D="Parse error on line "+(A+1)+": Unexpected "+(h==U?"end of input":"'"+(this.terminals_[h]||h)+"'"),this.parseError(D,{text:o.match,token:this.terminals_[h]||h,line:o.yylineno,loc:P,expected:L})}if(u[0]instanceof Array&&u.length>1)throw new Error("Parse Error: multiple actions possible at state: "+k+", token: "+h);switch(u[0]){case 1:i.push(h),r.push(o.yytext),s.push(o.yylloc),i.push(u[1]),h=null,B?(h=B,B=null):(H=o.yyleng,b=o.yytext,A=o.yylineno,P=o.yylloc,G>0&&G--);break;case 2:if(y=this.productions_[u[1]][1],_.$=r[r.length-y],_._$={first_line:s[s.length-(y||1)].first_line,last_line:s[s.length-1].last_line,first_column:s[s.length-(y||1)].first_column,last_column:s[s.length-1].last_column},lt&&(_._$.range=[s[s.length-(y||1)].range[0],s[s.length-1].range[1]]),N=this.performAction.apply(_,[b,H,A,g.yy,u[1],r,s].concat(rt)),typeof N<"u")return N;y&&(i=i.slice(0,-1*y*2),r=r.slice(0,-1*y),s=s.slice(0,-1*y)),i.push(this.productions_[u[1]][0]),r.push(_.$),s.push(_._$),X=v[i[i.length-2]][i[i.length-1]],i.push(X);break;case 3:return!0}}return!0},"parse")},nt=(function(){var p={EOF:1,parseError:a(function(e,i){if(this.yy.parser)this.yy.parser.parseError(e,i);else throw new Error(e)},"parseError"),setInput:a(function(t,e){return this.yy=e||this.yy||{},this._input=t,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:a(function(){var t=this._input[0];this.yytext+=t,this.yyleng++,this.offset++,this.match+=t,this.matched+=t;var e=t.match(/(?:\r\n?|\n).*/g);return e?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),t},"input"),unput:a(function(t){var e=t.length,i=t.split(/(?:\r\n?|\n)/g);this._input=t+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-e),this.offset-=e;var l=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),i.length-1&&(this.yylineno-=i.length-1);var r=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:i?(i.length===l.length?this.yylloc.first_column:0)+l[l.length-i.length].length-i[0].length:this.yylloc.first_column-e},this.options.ranges&&(this.yylloc.range=[r[0],r[0]+this.yyleng-e]),this.yyleng=this.yytext.length,this},"unput"),more:a(function(){return this._more=!0,this},"more"),reject:a(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:a(function(t){this.unput(this.match.slice(t))},"less"),pastInput:a(function(){var t=this.matched.substr(0,this.matched.length-this.match.length);return(t.length>20?"...":"")+t.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:a(function(){var t=this.match;return t.length<20&&(t+=this._input.substr(0,20-t.length)),(t.substr(0,20)+(t.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:a(function(){var t=this.pastInput(),e=new Array(t.length+1).join("-");return t+this.upcomingInput()+`
`+e+"^"},"showPosition"),test_match:a(function(t,e){var i,l,r;if(this.options.backtrack_lexer&&(r={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(r.yylloc.range=this.yylloc.range.slice(0))),l=t[0].match(/(?:\r\n?|\n).*/g),l&&(this.yylineno+=l.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:l?l[l.length-1].length-l[l.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+t[0].length},this.yytext+=t[0],this.match+=t[0],this.matches=t,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(t[0].length),this.matched+=t[0],i=this.performAction.call(this,this.yy,this,e,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),i)return i;if(this._backtrack){for(var s in r)this[s]=r[s];return!1}return!1},"test_match"),next:a(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var t,e,i,l;this._more||(this.yytext="",this.match="");for(var r=this._currentRules(),s=0;s<r.length;s++)if(i=this._input.match(this.rules[r[s]]),i&&(!e||i[0].length>e[0].length)){if(e=i,l=s,this.options.backtrack_lexer){if(t=this.test_match(i,r[s]),t!==!1)return t;if(this._backtrack){e=!1;continue}else return!1}else if(!this.options.flex)break}return e?(t=this.test_match(e,r[l]),t!==!1?t:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:a(function(){var e=this.next();return e||this.lex()},"lex"),begin:a(function(e){this.conditionStack.push(e)},"begin"),popState:a(function(){var e=this.conditionStack.length-1;return e>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:a(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:a(function(e){return e=this.conditionStack.length-1-Math.abs(e||0),e>=0?this.conditionStack[e]:"INITIAL"},"topState"),pushState:a(function(e){this.begin(e)},"pushState"),stateStackSize:a(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:a(function(e,i,l,r){var s=r;switch(l){case 0:return 6;case 1:return 8;case 2:return 8;case 3:return 6;case 4:return 7;case 5:return 13;case 6:return 14;case 7:return 11}},"anonymous"),rules:[/^(?:\s*%%.*)/i,/^(?:ishikawa-beta\b)/i,/^(?:ishikawa\b)/i,/^(?:[\s]+[\n])/i,/^(?:[\n]+)/i,/^(?:[\s]+)/i,/^(?:[^\n]+)/i,/^(?:$)/i],conditions:{INITIAL:{rules:[0,1,2,3,4,5,6,7],inclusive:!0}}};return p})();T.lexer=nt;function $(){this.yy={}}return a($,"Parser"),$.prototype=T,T.Parser=$,new $})();C.parser=C;var ut=C,dt=class{constructor(){this.stack=[],this.clear=this.clear.bind(this),this.addNode=this.addNode.bind(this),this.getRoot=this.getRoot.bind(this)}static{a(this,"IshikawaDB")}clear(){this.root=void 0,this.stack=[],this.baseLevel=void 0,K()}getRoot(){return this.root}addNode(n,S){let f=Y.sanitizeText(S,it());if(!this.root){this.root={text:f,children:[]},this.stack=[{level:0,node:this.root}],O(f);return}this.baseLevel??=n;let d=n-this.baseLevel+1;for(d<=0&&(d=1);this.stack.length>1&&this.stack[this.stack.length-1].level>=d;)this.stack.pop();let m=this.stack[this.stack.length-1].node,w={text:f,children:[]};m.children.push(w),this.stack.push({level:d,node:w})}getAccTitle(){return Q()}setAccTitle(n){q(n)}getAccDescription(){return tt()}setAccDescription(n){J(n)}getDiagramTitle(){return et()}setDiagramTitle(n){O(n)}};var st=82*Math.PI/180,Et=Math.cos(st),$t=Math.sin(st);var ft=a(n=>`
.ishikawa .ishikawa-spine,
.ishikawa .ishikawa-branch,
.ishikawa .ishikawa-sub-branch {
  stroke: ${n.lineColor};
  stroke-width: 2;
  fill: none;
}

.ishikawa .ishikawa-sub-branch {
  stroke-width: 1;
}

.ishikawa .ishikawa-arrow {
  fill: ${n.lineColor};
}

.ishikawa .ishikawa-head {
  fill: ${n.mainBkg};
  stroke: ${n.lineColor};
  stroke-width: 2;
}

.ishikawa .ishikawa-label-box {
  fill: ${n.mainBkg};
  stroke: ${n.lineColor};
  stroke-width: 2;
}

.ishikawa text {
  font-family: ${n.fontFamily};
  font-size: ${n.fontSize};
  fill: ${n.textColor};
}

.ishikawa .ishikawa-head-label {
  font-weight: 600;
  text-anchor: middle;
  dominant-baseline: middle;
  font-size: 14px;
}

.ishikawa .ishikawa-label {
  text-anchor: end;
}

.ishikawa .ishikawa-label.cause {
  text-anchor: middle;
  dominant-baseline: middle;
}

.ishikawa .ishikawa-label.align {
  text-anchor: end;
  dominant-baseline: middle;
}

.ishikawa .ishikawa-label.up {
  dominant-baseline: baseline;
}

.ishikawa .ishikawa-label.down {
  dominant-baseline: hanging;
}
`,"getStyles"),pt=ft,At={parser:ut,get db(){return new dt},renderer:{},styles:pt};export{At as diagram};
