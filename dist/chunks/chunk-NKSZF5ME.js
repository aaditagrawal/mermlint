import{A as D,G as E,O as W,V as _,o as O}from"./chunk-UUXTRKVL.js";import{b as v}from"./chunk-RRKEGWUA.js";import{a as h}from"./chunk-EIBFAW37.js";var z="",b="",N="",A=[],R=new Map,C=h(e=>E(e,_()),"sanitizeText"),F=h(e=>{switch(e.type){case"terminal":return{...e,value:C(e.value)};case"nonterminal":return{...e,name:C(e.name)};case"sequence":return{...e,elements:e.elements.map(F)};case"choice":return{...e,alternatives:e.alternatives.map(F)};case"optional":return{...e,element:F(e.element)};case"repetition":return{...e,element:F(e.element),separator:e.separator?F(e.separator):void 0};case"special":return{...e,text:C(e.text)}}},"sanitizeAstNode"),H=h(()=>{z="",b="",N="",A.length=0,R.clear(),W(),v.debug("[Railroad] Database cleared")},"clear"),B=h(e=>{z=C(e),v.debug("[Railroad] Title set:",e)},"setTitle"),Y=h(()=>z,"getTitle"),q=h(e=>{let i={...e,name:C(e.name),definition:F(e.definition),comment:e.comment?C(e.comment):void 0};v.debug("[Railroad] Adding rule:",i.name),R.has(i.name)&&v.warn(`[Railroad] Rule '${i.name}' is already defined. Overwriting.`),A.push(i),R.set(i.name,i)},"addRule"),G=h(()=>A,"getRules"),U=h(e=>R.get(e),"getRule"),j=h(e=>{b=C(e).replace(/^\s+/g,""),v.debug("[Railroad] Accessibility title set:",e)},"setAccTitle"),K=h(()=>b,"getAccTitle"),J=h(e=>{N=C(e).replace(/\n\s+/g,`
`),v.debug("[Railroad] Accessibility description set:",e)},"setAccDescription"),Q=h(()=>N,"getAccDescription"),Z=B,V=Y,pe={clear:H,setTitle:B,getTitle:Y,addRule:q,getRules:G,getRule:U,setAccTitle:j,getAccTitle:K,setAccDescription:J,getAccDescription:Q,setDiagramTitle:Z,getDiagramTitle:V},g={compactMode:!1,padding:10,verticalSeparation:8,horizontalSeparation:10,arcRadius:10,fontSize:14,fontFamily:"monospace",terminalFill:"#FFFFC0",terminalStroke:"#000000",terminalTextColor:"#000000",nonTerminalFill:"#FFFFFF",nonTerminalStroke:"#000000",nonTerminalTextColor:"#000000",lineColor:"#000000",strokeWidth:2,markerFill:"#000000",commentFill:"#E8E8E8",commentStroke:"#888888",commentTextColor:"#666666",specialFill:"#F0E0FF",specialStroke:"#8800CC",ruleNameColor:"#000066",showMarkers:!0,markerRadius:5},ee=/^#(?:[\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$|^(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch)\([\d\s%+,./-]+\)$|^[a-z]+$/i,te=/^[\w "',.-]+$/,re=new Set(["compactMode","padding","verticalSeparation","horizontalSeparation","arcRadius","fontSize","fontFamily","terminalFill","terminalStroke","terminalTextColor","nonTerminalFill","nonTerminalStroke","nonTerminalTextColor","lineColor","strokeWidth","markerFill","commentFill","commentStroke","commentTextColor","specialFill","specialStroke","ruleNameColor","showMarkers","markerRadius"]),P=h(e=>e?Object.keys(e).every(i=>i==="railroad"||re.has(i)):!1,"isRailroadStyleOptions"),ie=h(e=>e?"railroad"in e&&e.railroad?e.railroad:P(e)?e:{}:{},"extractRailroadOverrides"),ne=h(e=>{if(!e||P(e))return{};let{railroad:i,svgId:a,theme:r,look:t,...n}=e;return n},"extractThemeOverrides"),m=h((e,i)=>{if(typeof e!="string")return i;let a=e.trim();return ee.test(a)?a:i},"sanitizeColorValue"),L=h((e,i)=>{if(typeof e!="string")return i;let a=e.trim();return te.test(a)?a:i},"sanitizeFontFamilyValue"),S=h((e,i)=>{let a=typeof e=="number"?e:typeof e=="string"?Number.parseFloat(e):Number.NaN;return Number.isFinite(a)&&a>=0?a:i},"sanitizeNumberValue"),ae=h(e=>{let i=typeof e=="number"?e:typeof e=="string"?Number.parseFloat(e):Number.NaN;return Number.isFinite(i)&&i>0?i:void 0},"parseThemeFontSize"),oe=h(e=>{let i=L(e.fontFamily,g.fontFamily),a=ae(e.fontSize)??g.fontSize;return{...g,fontFamily:i,fontSize:a,terminalFill:m(e.secondBkg??e.secondaryColor,g.terminalFill),terminalStroke:m(e.secondaryBorderColor??e.lineColor,g.terminalStroke),terminalTextColor:m(e.secondaryTextColor??e.textColor,g.terminalTextColor),nonTerminalFill:m(e.mainBkg??e.background,g.nonTerminalFill),nonTerminalStroke:m(e.primaryBorderColor??e.lineColor,g.nonTerminalStroke),nonTerminalTextColor:m(e.primaryTextColor??e.textColor,g.nonTerminalTextColor),lineColor:m(e.lineColor,g.lineColor),markerFill:m(e.lineColor,g.markerFill),commentFill:m(e.labelBackground??e.tertiaryColor,g.commentFill),commentStroke:m(e.tertiaryBorderColor??e.lineColor,g.commentStroke),commentTextColor:m(e.tertiaryTextColor??e.textColor,g.commentTextColor),specialFill:m(e.tertiaryColor??e.secondaryColor,g.specialFill),specialStroke:m(e.tertiaryBorderColor??e.secondaryBorderColor,g.specialStroke),ruleNameColor:m(e.titleColor??e.textColor,g.ruleNameColor)}},"buildThemeDefaults"),I=h(e=>{let i=D(),a={...O(),...i.themeVariables??{},...ne(e)},r=oe(a),t={...i.railroad??{},...ie(e)};return{compactMode:t.compactMode??r.compactMode,padding:S(t.padding,r.padding),verticalSeparation:S(t.verticalSeparation,r.verticalSeparation),horizontalSeparation:S(t.horizontalSeparation,r.horizontalSeparation),arcRadius:S(t.arcRadius,r.arcRadius),fontSize:S(t.fontSize,r.fontSize),fontFamily:L(t.fontFamily,r.fontFamily),terminalFill:m(t.terminalFill,r.terminalFill),terminalStroke:m(t.terminalStroke,r.terminalStroke),terminalTextColor:m(t.terminalTextColor,r.terminalTextColor),nonTerminalFill:m(t.nonTerminalFill,r.nonTerminalFill),nonTerminalStroke:m(t.nonTerminalStroke,r.nonTerminalStroke),nonTerminalTextColor:m(t.nonTerminalTextColor,r.nonTerminalTextColor),lineColor:m(t.lineColor,r.lineColor),strokeWidth:S(t.strokeWidth,r.strokeWidth),markerFill:m(t.markerFill,r.markerFill),commentFill:m(t.commentFill,r.commentFill),commentStroke:m(t.commentStroke,r.commentStroke),commentTextColor:m(t.commentTextColor,r.commentTextColor),specialFill:m(t.specialFill,r.specialFill),specialStroke:m(t.specialStroke,r.specialStroke),ruleNameColor:m(t.ruleNameColor,r.ruleNameColor),showMarkers:t.showMarkers??r.showMarkers,markerRadius:S(t.markerRadius,r.markerRadius)}},"buildRailroadStyleOptions"),ue=h(e=>{let{fontFamily:i,fontSize:a,terminalFill:r,terminalStroke:t,terminalTextColor:n,nonTerminalFill:p,nonTerminalStroke:s,nonTerminalTextColor:o,lineColor:u,strokeWidth:c,markerFill:d,commentFill:x,commentStroke:l,commentTextColor:f,specialFill:y,specialStroke:k,ruleNameColor:w}=I(e);return`
  .railroad-diagram {
    font-family: ${i};
    font-size: ${a}px;
  }

  .railroad-terminal rect {
    fill: ${r};
    stroke: ${t};
    stroke-width: ${c}px;
  }

  .railroad-terminal text {
    fill: ${n};
    font-family: ${i};
    font-size: ${a}px;
    text-anchor: middle;
    dominant-baseline: middle;
  }

  .railroad-nonterminal rect {
    fill: ${p};
    stroke: ${s};
    stroke-width: ${c}px;
  }

  .railroad-nonterminal text {
    fill: ${o};
    font-family: ${i};
    font-size: ${a}px;
    text-anchor: middle;
    dominant-baseline: middle;
  }

  .railroad-line {
    stroke: ${u};
    stroke-width: ${c}px;
    fill: none;
  }

  .railroad-start circle,
  .railroad-end circle {
    fill: ${d};
  }

  .railroad-comment ellipse {
    fill: ${x};
    stroke: ${l};
    stroke-width: ${c}px;
  }

  .railroad-comment text {
    fill: ${f};
    font-style: italic;
    font-family: ${i};
    font-size: ${a}px;
    text-anchor: middle;
    dominant-baseline: middle;
  }

  .railroad-special rect {
    fill: ${y};
    stroke: ${k};
    stroke-width: ${c}px;
    stroke-dasharray: 5,3;
  }

  .railroad-special text {
    fill: ${o};
    font-family: ${i};
    font-size: ${a}px;
    text-anchor: middle;
    dominant-baseline: middle;
  }

  .railroad-rule-name {
    font-weight: bold;
    fill: ${w};
    font-family: ${i};
    font-size: ${a}px;
  }

  .railroad-group {
    /* Grouping container, no specific styles */
  }
`},"getStyles"),T=class{constructor(){this.d=""}static{h(this,"PathBuilder")}moveTo(e,i){return this.d+=`M ${e} ${i} `,this}lineTo(e,i){return this.d+=`L ${e} ${i} `,this}horizontalTo(e){return this.d+=`H ${e} `,this}verticalTo(e){return this.d+=`V ${e} `,this}arcTo(e,i,a,r,t,n,p){return this.d+=`A ${e} ${i} ${a} ${r?1:0} ${t?1:0} ${n} ${p} `,this}build(){return this.d.trim()}},ge=class{constructor(e,i=I()){this.textCache=new Map,this.svg=e,this.config=i}static{h(this,"RailroadRenderer")}measureText(e){if(this.textCache.has(e))return this.textCache.get(e);let i=this.svg.append("text").attr("font-family",this.config.fontFamily).attr("font-size",this.config.fontSize).text(e),a=i.node().getBBox(),r={width:a.width,height:a.height};return i.remove(),this.textCache.set(e,r),r}renderTerminal(e,i){let a=this.measureText(i),r=a.width+this.config.padding*2,t=a.height+this.config.padding*2,n=e.append("g").attr("class","railroad-terminal");return n.append("rect").attr("x",0).attr("y",0).attr("width",r).attr("height",t).attr("rx",10).attr("ry",10),n.append("text").attr("x",r/2).attr("y",t/2).text(i),{element:n.node(),dimensions:{width:r,height:t,up:t/2,down:t/2}}}renderNonTerminal(e,i){let a=this.measureText(i),r=a.width+this.config.padding*2,t=a.height+this.config.padding*2,n=e.append("g").attr("class","railroad-nonterminal");return n.append("rect").attr("x",0).attr("y",0).attr("width",r).attr("height",t),n.append("text").attr("x",r/2).attr("y",t/2).text(i),{element:n.node(),dimensions:{width:r,height:t,up:t/2,down:t/2}}}renderSequence(e,i){let a=i.map(o=>this.renderExpression(e,o)),r=0,t=0,n=0;for(let o of a)r+=o.dimensions.width,t=Math.max(t,o.dimensions.up),n=Math.max(n,o.dimensions.down);r+=(a.length-1)*this.config.horizontalSeparation;let p=e.append("g").attr("class","railroad-sequence"),s=0;for(let o=0;o<a.length;o++){let u=a[o],c=t-u.dimensions.up;if(p.node().appendChild(u.element).setAttribute("transform",`translate(${s}, ${c})`),o<a.length-1){let x=s+u.dimensions.width,l=x+this.config.horizontalSeparation,f=t;p.append("path").attr("class","railroad-line").attr("d",new T().moveTo(x,f).lineTo(l,f).build())}s+=u.dimensions.width+this.config.horizontalSeparation}return{element:p.node(),dimensions:{width:r,height:t+n,up:t,down:n}}}renderChoice(e,i){let a=i.map(d=>this.renderExpression(e,d)),r=0,t=0;for(let d of a)r=Math.max(r,d.dimensions.width),t+=d.dimensions.height;t+=(a.length-1)*this.config.verticalSeparation;let n=this.config.arcRadius,p=n*4,s=r+p,o=e.append("g").attr("class","railroad-choice"),u=0,c=t/2;for(let d of a){let x=u,l=x+d.dimensions.up,f=n*2+(r-d.dimensions.width)/2;o.node().appendChild(d.element).setAttribute("transform",`translate(${f}, ${x})`);let k=new T,w=l>c;l===c?k.moveTo(0,c).lineTo(f,l):k.moveTo(0,c).arcTo(n,n,0,!1,w,n,c+(w?n:-n)).lineTo(n,l-(w?n:-n)).arcTo(n,n,0,!1,!w,n*2,l).lineTo(f,l),o.append("path").attr("class","railroad-line").attr("d",k.build());let $=new T,M=f+d.dimensions.width,X=s-n*2;l===c?$.moveTo(M,l).lineTo(s,c):$.moveTo(M,l).lineTo(X,l).arcTo(n,n,0,!1,!w,s-n,l+(w?-n:n)).lineTo(s-n,c+(w?n:-n)).arcTo(n,n,0,!1,w,s,c),o.append("path").attr("class","railroad-line").attr("d",$.build()),u+=d.dimensions.height+this.config.verticalSeparation}return{element:o.node(),dimensions:{width:s,height:t,up:c,down:t-c}}}renderOptional(e,i){let a=this.renderExpression(e,i),r=this.config.arcRadius,t=r*2,n=a.dimensions.width+r*4,p=a.dimensions.height+t,s=e.append("g").attr("class","railroad-optional"),o=r*2,u=t;s.node().appendChild(a.element).setAttribute("transform",`translate(${o}, ${u})`);let d=u+a.dimensions.up,x=new T().moveTo(0,d).lineTo(r*2,d);s.append("path").attr("class","railroad-line").attr("d",x.build());let l=new T().moveTo(o+a.dimensions.width,d).lineTo(n,d);s.append("path").attr("class","railroad-line").attr("d",l.build());let f=new T().moveTo(0,d).arcTo(r,r,0,!1,!1,r,d-r).lineTo(r,r).arcTo(r,r,0,!1,!0,r*2,0).lineTo(n-r*2,0).arcTo(r,r,0,!1,!0,n-r,r).lineTo(n-r,d-r).arcTo(r,r,0,!1,!1,n,d);return s.append("path").attr("class","railroad-line").attr("d",f.build()),{element:s.node(),dimensions:{width:n,height:p,up:d,down:p-d}}}renderRepetition(e,i,a){let r=this.renderExpression(e,i),t=this.config.arcRadius,n=t*2,p=r.dimensions.width+t*4,s=a===0,o=r.dimensions.height+n+(s?n:0),u=e.append("g").attr("class","railroad-repetition"),c=t*2,d=s?n:0;u.node().appendChild(r.element).setAttribute("transform",`translate(${c}, ${d})`);let l=d+r.dimensions.up;u.append("path").attr("class","railroad-line").attr("d",new T().moveTo(0,l).lineTo(t*2,l).build()),u.append("path").attr("class","railroad-line").attr("d",new T().moveTo(c+r.dimensions.width,l).lineTo(p,l).build());let f=d+r.dimensions.height+t,y=new T().moveTo(c+r.dimensions.width,l).arcTo(t,t,0,!1,!0,c+r.dimensions.width+t,l+t).lineTo(c+r.dimensions.width+t,f).arcTo(t,t,0,!1,!0,c+r.dimensions.width,f+t).lineTo(t*2,f+t).arcTo(t,t,0,!1,!0,t,f).lineTo(t,l+t).arcTo(t,t,0,!1,!0,t*2,l);if(u.append("path").attr("class","railroad-line").attr("d",y.build()),s){let k=new T().moveTo(0,l).arcTo(t,t,0,!1,!1,t,l-t).lineTo(t,t).arcTo(t,t,0,!1,!0,t*2,0).lineTo(p-t*2,0).arcTo(t,t,0,!1,!0,p-t,t).lineTo(p-t,l-t).arcTo(t,t,0,!1,!1,p,l);u.append("path").attr("class","railroad-line").attr("d",k.build())}return{element:u.node(),dimensions:{width:p,height:o,up:l,down:o-l}}}renderSpecial(e,i){let a=this.measureText("? "+i+" ?"),r=a.width+this.config.padding*2,t=a.height+this.config.padding*2,n=e.append("g").attr("class","railroad-special");return n.append("rect").attr("x",0).attr("y",0).attr("width",r).attr("height",t),n.append("text").attr("x",r/2).attr("y",t/2).text("? "+i+" ?"),{element:n.node(),dimensions:{width:r,height:t,up:t/2,down:t/2}}}renderExpression(e,i){switch(i.type){case"terminal":return this.renderTerminal(e,i.value);case"nonterminal":return this.renderNonTerminal(e,i.name);case"sequence":return this.renderSequence(e,i.elements);case"choice":return this.renderChoice(e,i.alternatives);case"optional":return this.renderOptional(e,i.element);case"repetition":return this.renderRepetition(e,i.element,i.min);case"special":return this.renderSpecial(e,i.text);default:throw new Error(`Unknown node type: ${i.type}`)}}renderRule(e,i){let a=this.svg.append("g").attr("class","railroad-rule").attr("transform",`translate(0, ${i})`),r=e.name+" =",t=this.measureText(r).width+20,n=t+20,p=a.append("g"),s=this.renderExpression(p,e.definition),o=Math.max(20,s.dimensions.up),u=o-s.dimensions.up;return p.attr("transform",`translate(${n}, ${u})`),a.append("g").attr("class","railroad-rule-name-group").append("text").attr("class","railroad-rule-name").attr("x",0).attr("y",o).text(r),a.append("g").attr("class","railroad-start").append("circle").attr("cx",t).attr("cy",o).attr("r",this.config.markerRadius),a.append("g").attr("class","railroad-end").append("circle").attr("cx",n+s.dimensions.width+10).attr("cy",o).attr("r",this.config.markerRadius),a.append("path").attr("class","railroad-line").attr("d",new T().moveTo(t+this.config.markerRadius,o).lineTo(n,o).build()),a.append("path").attr("class","railroad-line").attr("d",new T().moveTo(n+s.dimensions.width,o).lineTo(n+s.dimensions.width+10-this.config.markerRadius,o).build()),{height:Math.max(40,u+s.dimensions.height+this.config.padding*2),width:n+s.dimensions.width+10+this.config.markerRadius}}renderDiagram(e){let i=this.config.padding,a=0;for(let r of e){let t=this.renderRule(r,i);i+=t.height+this.config.verticalSeparation,a=Math.max(a,t.width)}return{width:a+this.config.padding*2,height:i+this.config.padding}}};export{pe as a,ue as b};
