import"./chunk-Z5QYJEUT.js";import{c as it,f as R}from"./chunk-HIGPS4L2.js";import"./chunk-GYWUWOX2.js";import"./chunk-4DYN46BX.js";import{A as O,N as rt,O as nt,c as Y,d as tt,e as et}from"./chunk-YGT53WNP.js";import{d as G}from"./chunk-AE5YYKYE.js";import{a as s,b as Q}from"./chunk-EIBFAW37.js";import"./chunk-EMBIDUMY.js";var D=(function(){var t=s(function(_,e,r,a){for(r=r||{},a=_.length;a--;r[_[a]]=e);return r},"o"),o=[6,11,13,14,15,17,19,20,23,24],h=[1,12],i=[1,13],u=[1,14],y=[1,15],b=[1,16],c=[1,19],T=[1,20],k={trace:s(function(){},"trace"),yy:{},symbols_:{error:2,start:3,timeline_header:4,document:5,EOF:6,timeline:7,timeline_lr:8,timeline_td:9,line:10,SPACE:11,statement:12,NEWLINE:13,title:14,acc_title:15,acc_title_value:16,acc_descr:17,acc_descr_value:18,acc_descr_multiline_value:19,section:20,period_statement:21,event_statement:22,period:23,event:24,$accept:0,$end:1},terminals_:{2:"error",6:"EOF",7:"timeline",8:"timeline_lr",9:"timeline_td",11:"SPACE",13:"NEWLINE",14:"title",15:"acc_title",16:"acc_title_value",17:"acc_descr",18:"acc_descr_value",19:"acc_descr_multiline_value",20:"section",23:"period",24:"event"},productions_:[0,[3,3],[4,1],[4,1],[4,1],[5,0],[5,2],[10,2],[10,1],[10,1],[10,1],[12,1],[12,2],[12,2],[12,1],[12,1],[12,1],[12,1],[21,1],[22,1]],performAction:s(function(e,r,a,l,d,n,L){var p=n.length-1;switch(d){case 1:return n[p-1];case 3:l.setDirection("LR");break;case 4:l.setDirection("TD");break;case 5:this.$=[];break;case 6:n[p-1].push(n[p]),this.$=n[p-1];break;case 7:case 8:this.$=n[p];break;case 9:case 10:this.$=[];break;case 11:l.getCommonDb().setDiagramTitle(n[p].substr(6)),this.$=n[p].substr(6);break;case 12:this.$=n[p].trim(),l.getCommonDb().setAccTitle(this.$);break;case 13:case 14:this.$=n[p].trim(),l.getCommonDb().setAccDescription(this.$);break;case 15:l.addSection(n[p].substr(8)),this.$=n[p].substr(8);break;case 18:l.addTask(n[p],0,""),this.$=n[p];break;case 19:l.addEvent(n[p].substr(2)),this.$=n[p];break}},"anonymous"),table:[{3:1,4:2,7:[1,3],8:[1,4],9:[1,5]},{1:[3]},t(o,[2,5],{5:6}),t(o,[2,2]),t(o,[2,3]),t(o,[2,4]),{6:[1,7],10:8,11:[1,9],12:10,13:[1,11],14:h,15:i,17:u,19:y,20:b,21:17,22:18,23:c,24:T},t(o,[2,10],{1:[2,1]}),t(o,[2,6]),{12:21,14:h,15:i,17:u,19:y,20:b,21:17,22:18,23:c,24:T},t(o,[2,8]),t(o,[2,9]),t(o,[2,11]),{16:[1,22]},{18:[1,23]},t(o,[2,14]),t(o,[2,15]),t(o,[2,16]),t(o,[2,17]),t(o,[2,18]),t(o,[2,19]),t(o,[2,7]),t(o,[2,12]),t(o,[2,13])],defaultActions:{},parseError:s(function(e,r){if(r.recoverable)this.trace(e);else{var a=new Error(e);throw a.hash=r,a}},"parseError"),parse:s(function(e){var r=this,a=[0],l=[],d=[null],n=[],L=this.table,p="",M=0,X=0,Z=0,bt=2,j=1,vt=n.slice.call(arguments,1),g=Object.create(this.lexer),S={yy:{}};for(var P in this.yy)Object.prototype.hasOwnProperty.call(this.yy,P)&&(S.yy[P]=this.yy[P]);g.setInput(e,S.yy),S.yy.lexer=g,S.yy.parser=this,typeof g.yylloc>"u"&&(g.yylloc={});var B=g.yylloc;n.push(B);var _t=g.options&&g.options.ranges;typeof S.yy.parseError=="function"?this.parseError=S.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function wt(m){a.length=a.length-2*m,d.length=d.length-m,n.length=n.length-m}s(wt,"popStack");function q(){var m;return m=l.pop()||g.lex()||j,typeof m!="number"&&(m instanceof Array&&(l=m,m=l.pop()),m=r.symbols_[m]||m),m}s(q,"lex");for(var f,V,E,x,Mt,F,N={},A,v,J,C;;){if(E=a[a.length-1],this.defaultActions[E]?x=this.defaultActions[E]:((f===null||typeof f>"u")&&(f=q()),x=L[E]&&L[E][f]),typeof x>"u"||!x.length||!x[0]){var z="";C=[];for(A in L[E])this.terminals_[A]&&A>bt&&C.push("'"+this.terminals_[A]+"'");g.showPosition?z="Parse error on line "+(M+1)+`:
`+g.showPosition()+`
Expecting `+C.join(", ")+", got '"+(this.terminals_[f]||f)+"'":z="Parse error on line "+(M+1)+": Unexpected "+(f==j?"end of input":"'"+(this.terminals_[f]||f)+"'"),this.parseError(z,{text:g.match,token:this.terminals_[f]||f,line:g.yylineno,loc:B,expected:C})}if(x[0]instanceof Array&&x.length>1)throw new Error("Parse Error: multiple actions possible at state: "+E+", token: "+f);switch(x[0]){case 1:a.push(f),d.push(g.yytext),n.push(g.yylloc),a.push(x[1]),f=null,V?(f=V,V=null):(X=g.yyleng,p=g.yytext,M=g.yylineno,B=g.yylloc,Z>0&&Z--);break;case 2:if(v=this.productions_[x[1]][1],N.$=d[d.length-v],N._$={first_line:n[n.length-(v||1)].first_line,last_line:n[n.length-1].last_line,first_column:n[n.length-(v||1)].first_column,last_column:n[n.length-1].last_column},_t&&(N._$.range=[n[n.length-(v||1)].range[0],n[n.length-1].range[1]]),F=this.performAction.apply(N,[p,X,M,S.yy,x[1],d,n].concat(vt)),typeof F<"u")return F;v&&(a=a.slice(0,-1*v*2),d=d.slice(0,-1*v),n=n.slice(0,-1*v)),a.push(this.productions_[x[1]][0]),d.push(N.$),n.push(N._$),J=L[a[a.length-2]][a[a.length-1]],a.push(J);break;case 3:return!0}}return!0},"parse")},w=(function(){var _={EOF:1,parseError:s(function(r,a){if(this.yy.parser)this.yy.parser.parseError(r,a);else throw new Error(r)},"parseError"),setInput:s(function(e,r){return this.yy=r||this.yy||{},this._input=e,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:s(function(){var e=this._input[0];this.yytext+=e,this.yyleng++,this.offset++,this.match+=e,this.matched+=e;var r=e.match(/(?:\r\n?|\n).*/g);return r?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),e},"input"),unput:s(function(e){var r=e.length,a=e.split(/(?:\r\n?|\n)/g);this._input=e+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-r),this.offset-=r;var l=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),a.length-1&&(this.yylineno-=a.length-1);var d=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:a?(a.length===l.length?this.yylloc.first_column:0)+l[l.length-a.length].length-a[0].length:this.yylloc.first_column-r},this.options.ranges&&(this.yylloc.range=[d[0],d[0]+this.yyleng-r]),this.yyleng=this.yytext.length,this},"unput"),more:s(function(){return this._more=!0,this},"more"),reject:s(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:s(function(e){this.unput(this.match.slice(e))},"less"),pastInput:s(function(){var e=this.matched.substr(0,this.matched.length-this.match.length);return(e.length>20?"...":"")+e.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:s(function(){var e=this.match;return e.length<20&&(e+=this._input.substr(0,20-e.length)),(e.substr(0,20)+(e.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:s(function(){var e=this.pastInput(),r=new Array(e.length+1).join("-");return e+this.upcomingInput()+`
`+r+"^"},"showPosition"),test_match:s(function(e,r){var a,l,d;if(this.options.backtrack_lexer&&(d={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(d.yylloc.range=this.yylloc.range.slice(0))),l=e[0].match(/(?:\r\n?|\n).*/g),l&&(this.yylineno+=l.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:l?l[l.length-1].length-l[l.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+e[0].length},this.yytext+=e[0],this.match+=e[0],this.matches=e,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(e[0].length),this.matched+=e[0],a=this.performAction.call(this,this.yy,this,r,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),a)return a;if(this._backtrack){for(var n in d)this[n]=d[n];return!1}return!1},"test_match"),next:s(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var e,r,a,l;this._more||(this.yytext="",this.match="");for(var d=this._currentRules(),n=0;n<d.length;n++)if(a=this._input.match(this.rules[d[n]]),a&&(!r||a[0].length>r[0].length)){if(r=a,l=n,this.options.backtrack_lexer){if(e=this.test_match(a,d[n]),e!==!1)return e;if(this._backtrack){r=!1;continue}else return!1}else if(!this.options.flex)break}return r?(e=this.test_match(r,d[l]),e!==!1?e:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:s(function(){var r=this.next();return r||this.lex()},"lex"),begin:s(function(r){this.conditionStack.push(r)},"begin"),popState:s(function(){var r=this.conditionStack.length-1;return r>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:s(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:s(function(r){return r=this.conditionStack.length-1-Math.abs(r||0),r>=0?this.conditionStack[r]:"INITIAL"},"topState"),pushState:s(function(r){this.begin(r)},"pushState"),stateStackSize:s(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:s(function(r,a,l,d){var n=d;switch(l){case 0:break;case 1:break;case 2:return 13;case 3:break;case 4:break;case 5:return 8;case 6:return 9;case 7:return 7;case 8:return 14;case 9:return this.begin("acc_title"),15;break;case 10:return this.popState(),"acc_title_value";break;case 11:return this.begin("acc_descr"),17;break;case 12:return this.popState(),"acc_descr_value";break;case 13:this.begin("acc_descr_multiline");break;case 14:this.popState();break;case 15:return"acc_descr_multiline_value";case 16:return 20;case 17:return 24;case 18:return 23;case 19:return 6;case 20:return"INVALID"}},"anonymous"),rules:[/^(?:%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:timeline[ \t]+LR\b)/i,/^(?:timeline[ \t]+TD\b)/i,/^(?:timeline\b)/i,/^(?:title\s[^\n]+)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:section\s[^:\n]+)/i,/^(?::\s(?:[^:\n]|:(?!\s))+)/i,/^(?:[^#:\n]+)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[14,15],inclusive:!1},acc_descr:{rules:[12],inclusive:!1},acc_title:{rules:[10],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,8,9,11,13,16,17,18,19,20],inclusive:!0}}};return _})();k.lexer=w;function $(){this.yy={}}return s($,"Parser"),$.prototype=k,k.Parser=$,new $})();D.parser=D;var St=D,at={};Q(at,{addEvent:()=>yt,addSection:()=>ut,addTask:()=>ft,addTaskOrg:()=>mt,clear:()=>ct,default:()=>Et,getCommonDb:()=>lt,getDirection:()=>dt,getSections:()=>pt,getTasks:()=>gt,setDirection:()=>ht});var I="",ot=0,K="LR",U=[],W=[],H=[],lt=s(()=>rt,"getCommonDb"),ct=s(function(){U.length=0,W.length=0,I="",H.length=0,K="LR",nt()},"clear"),ht=s(function(t){K=t},"setDirection"),dt=s(function(){return K},"getDirection"),ut=s(function(t){I=t,U.push(t)},"addSection"),pt=s(function(){return U},"getSections"),gt=s(function(){let t=st(),o=100,h=0;for(;!t&&h<o;)t=st(),h++;return W.push(...H),W},"getTasks"),ft=s(function(t,o,h){let i={id:ot++,section:I,type:I,task:t,score:o||0,events:h?[h]:[]};H.push(i)},"addTask"),yt=s(function(t){H.find(h=>h.id===ot-1).events.push(t)},"addEvent"),mt=s(function(t){let o={section:I,type:I,description:t,task:t,classes:[]};W.push(o)},"addTaskOrg"),st=s(function(){let t=s(function(h){return H[h].processed},"compileTask"),o=!0;for(let[h,i]of H.entries())t(h),o=o&&i.processed;return o},"compileTasks"),Et={clear:ct,getCommonDb:lt,getDirection:dt,setDirection:ht,addSection:ut,getSections:pt,getTasks:gt,addTask:ft,addTaskOrg:mt,addEvent:yt};function Tt(t,o){t.each(function(){var h=G(this),i=h.text().split(/(\s+|<br>)/).reverse(),u,y=[],b=1.1,c=h.attr("y"),T=parseFloat(h.attr("dy")),k=h.text(null).append("tspan").attr("x",0).attr("y",c).attr("dy",T+"em");for(let w=0;w<i.length;w++)u=i[i.length-1-w],y.push(u),k.text(y.join(" ").trim()),(k.node().getComputedTextLength()>o||u==="<br>")&&(y.pop(),k.text(y.join(" ").trim()),u==="<br>"?y=[""]:y=[u],k=h.append("tspan").attr("x",0).attr("y",c).attr("dy",b+"em").text(u))})}s(Tt,"wrap");var xt=200,kt=5,Xt=xt+kt*2,$t=xt+100,Zt=$t+kt*2;var Nt=s(t=>{let{theme:o}=O(),h=o?.includes("dark"),i=it(o,t.borderColorArray),u=t.svgId?.replace(/^#/,"")??"",y=u?`url(#${u}-drop-shadow)`:t.dropShadow??"none",b="";for(let c=0;c<R(t.THEME_COLOR_LIMIT);c++){let T=`${17-3*c}`,k=i?t.borderColorArray[c%t.borderColorArray.length]:void 0,w=k??t.mainBkg,$=k??t.nodeBorder;b+=`
    .section-${c-1} rect,
    .section-${c-1} path,
    .section-${c-1} circle {
      fill: ${h&&i?t.mainBkg:w};
      stroke: ${$};
      stroke-width: ${t.strokeWidth};
      filter: ${y};
    }

    .section-${c-1} text {
      fill: ${t.nodeBorder};
      font-weight: ${t.fontWeight}
    }

    .node-icon-${c-1} {
      font-size: 40px;
      color: ${t["cScaleLabel"+c]};
    }

    .section-edge-${c-1} {
      stroke: ${t["cScale"+c]};
    }

    .edge-depth-${c-1} {
      stroke-width: ${T};
    }

    .section-${c-1} line {
      stroke: ${t["cScaleInv"+c]};
      stroke-width: 3;
    }

    .lineWrapper line {
      stroke: ${t.nodeBorder};
      stroke-width:${t.strokeWidth}
    }

    .disabled,
    .disabled circle,
    .disabled text {
      fill: ${t.tertiaryColor??"lightgray"};
    }

    .disabled text {
      fill: ${t.clusterBorder??"#efefef"};
    }
    `}return b},"genReduxSections"),It=s(t=>{let o="",h=R(t.THEME_COLOR_LIMIT);for(let i=0;i<h;i++)t["lineColor"+i]=t["lineColor"+i]??t["cScaleInv"+i],Y(t["lineColor"+i])?t["lineColor"+i]=tt(t["lineColor"+i],20):t["lineColor"+i]=et(t["lineColor"+i],20);for(let i=0;i<h;i++){let u=""+(17-3*i);o+=`
    .section-${i-1} rect, .section-${i-1} path, .section-${i-1} circle, .section-${i-1} path  {
      fill: ${t["cScale"+i]};
    }
    .section-${i-1} text {
     fill: ${t["cScaleLabel"+i]};
    }
    .node-icon-${i-1} {
      font-size: 40px;
      color: ${t["cScaleLabel"+i]};
    }
    .section-edge-${i-1}{
      stroke: ${t["cScale"+i]};
    }
    .edge-depth-${i-1}{
      stroke-width: ${u};
    }
    .section-${i-1} line {
      stroke: ${t["cScaleInv"+i]} ;
      stroke-width: 3;
    }

    .lineWrapper line{
      stroke: ${t["cScaleLabel"+i]} ;
    }

    .disabled, .disabled circle, .disabled text {
      fill: ${t.tertiaryColor??"lightgray"};
    }
    .disabled text {
      fill: ${t.clusterBorder??"#efefef"};
    }
    `}return o},"genSections"),Ht=s(t=>{let{theme:o}=O(),h=o?.includes("redux"),i=o==="neutral",u=t.svgId?.replace(/^#/,"")??"",y="";if(t.useGradient&&u&&t.THEME_COLOR_LIMIT&&!i){let b=R(t.THEME_COLOR_LIMIT);for(let c=0;c<b;c++)y+=`
      .section-${c-1}[data-look="neo"] rect,
      .section-${c-1}[data-look="neo"] path,
      .section-${c-1}[data-look="neo"] circle {
        fill: ${t.mainBkg};
        stroke: url(#${u}-gradient);
        stroke-width: 2;
      }
      .section-${c-1}[data-look="neo"] line {
        stroke: url(#${u}-gradient);
        stroke-width: 2;
      }`}return`
  .edge {
    stroke-width: 3;
  }
  ${h?Nt(t):It(t)}
  ${y}
  .section-root rect, .section-root path, .section-root circle  {
    fill: ${t.git0};
  }
  .section-root text {
    fill: ${t.gitBranchLabel0};
  }
  .icon-container {
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .edge {
    fill: none;
  }
  .eventWrapper  {
   filter: brightness(120%);
  }
`},"getStyles"),Lt=Ht;var qt={db:at,renderer:{},parser:St,styles:Lt};export{qt as diagram};
