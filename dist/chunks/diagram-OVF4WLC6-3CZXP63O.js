import{a as w}from"./chunk-NCOVM3YF.js";import"./chunk-Z5QYJEUT.js";import{a as T}from"./chunk-LKH7MUID.js";import"./chunk-ATQQWCXO.js";import"./chunk-TPW5CADB.js";import"./chunk-TMMWB6NQ.js";import"./chunk-TWGPYWIY.js";import"./chunk-FBC3PYSO.js";import"./chunk-4W4OQ3QY.js";import"./chunk-RV7WQMNL.js";import"./chunk-WGMEMLED.js";import"./chunk-KNYDPLLK.js";import"./chunk-HP75Y56I.js";import"./chunk-TSOLLCID.js";import"./chunk-6UFWKTSA.js";import"./chunk-MTAF5H4Z.js";import"./chunk-76QEHT4T.js";import"./chunk-A7665WVC.js";import"./chunk-T3FZWEYV.js";import"./chunk-L465623K.js";import{c as C}from"./chunk-TRSBKIEX.js";import{m as c}from"./chunk-GYWUWOX2.js";import"./chunk-4DYN46BX.js";import{A as d,O as u,P as y,Q as g,R as S,S as x,T as b,U as v,o as m,q as f}from"./chunk-YGT53WNP.js";import{b as p}from"./chunk-AE5YYKYE.js";import{a as i}from"./chunk-EIBFAW37.js";import"./chunk-EMBIDUMY.js";var $=class{constructor(){this.nodes=[],this.levels=new Map,this.outerNodes=[],this.classes=new Map,this.setAccTitle=y,this.getAccTitle=g,this.setDiagramTitle=b,this.getDiagramTitle=v,this.getAccDescription=x,this.setAccDescription=S}static{i(this,"TreeMapDB")}getNodes(){return this.nodes}getConfig(){let t=f,s=d();return c({...t.treemap,...s.treemap??{}})}addNode(t,s){this.nodes.push(t),this.levels.set(t,s),s===0&&(this.outerNodes.push(t),this.root??=t)}getRoot(){return{name:"",children:this.outerNodes}}addClass(t,s){let a=this.classes.get(t)??{id:t,styles:[],textStyles:[]},l=s.replace(/\\,/g,"\xA7\xA7\xA7").replace(/,/g,";").replace(/§§§/g,",").split(";");l&&l.forEach(e=>{C(e)&&(a?.textStyles?a.textStyles.push(e):a.textStyles=[e]),a?.styles?a.styles.push(e):a.styles=[e]}),this.classes.set(t,a)}getClasses(){return this.classes}getStylesForClass(t){return this.classes.get(t)?.styles??[]}clear(){u(),this.nodes=[],this.levels=new Map,this.outerNodes=[],this.classes=new Map,this.root=void 0}};function L(t){if(!t.length)return[];let s=[],a=[];return t.forEach(l=>{let e={name:l.name,children:l.type==="Leaf"?void 0:[]};for(e.classSelector=l?.classSelector,l?.cssCompiledStyles&&(e.cssCompiledStyles=l.cssCompiledStyles),l.type==="Leaf"&&l.value!==void 0&&(e.value=l.value);a.length>0&&a[a.length-1].level>=l.level;)a.pop();if(a.length===0)s.push(e);else{let r=a[a.length-1].node;r.children?r.children.push(e):r.children=[e]}l.type!=="Leaf"&&a.push({node:e,level:l.level})}),s}i(L,"buildHierarchy");var P=i((t,s)=>{w(t,s);let a=[];for(let r of t.TreemapRows??[])r.$type==="ClassDefStatement"&&s.addClass(r.className??"",r.styleText??"");for(let r of t.TreemapRows??[]){let n=r.item;if(!n)continue;let o=r.indent?parseInt(r.indent):0,N=D(n),h=n.classSelector?s.getStylesForClass(n.classSelector):[],z=h.length>0?h:void 0,A={level:o,name:N,type:n.$type,value:n.value,classSelector:n.classSelector,cssCompiledStyles:z};a.push(A)}let l=L(a),e=i((r,n)=>{for(let o of r)s.addNode(o,n),o.children&&o.children.length>0&&e(o.children,n+1)},"addNodesRecursively");e(l,0)},"populate"),D=i(t=>t.name?String(t.name):"","getItemName"),F={parser:{yy:void 0},parse:i(async t=>{try{let a=await T("treemap",t);p.debug("Treemap AST:",a);let l=F.parser?.yy;if(!(l instanceof $))throw new Error("parser.parser?.yy was not a TreemapDB. This is due to a bug within Mermaid, please report this issue at https://github.com/mermaid-js/mermaid/issues.");P(a,l)}catch(s){throw p.error("Error parsing treemap:",s),s}},"parse")};var V={sectionStrokeColor:"black",sectionStrokeWidth:"1",sectionFillColor:"#efefef",leafStrokeColor:"black",leafStrokeWidth:"1",leafFillColor:"#efefef",labelFontSize:"12px",valueFontSize:"10px",titleFontSize:"14px"},M=i(({treemap:t}={})=>{let s=m(),a=d(),l=c(s,a.themeVariables),e=c(V,t),r=e.titleColor??l.titleColor,n=e.labelColor??l.textColor,o=e.valueColor??l.textColor;return`
  .treemapNode.section {
    stroke: ${e.sectionStrokeColor};
    stroke-width: ${e.sectionStrokeWidth};
    fill: ${e.sectionFillColor};
  }
  .treemapNode.leaf {
    stroke: ${e.leafStrokeColor};
    stroke-width: ${e.leafStrokeWidth};
    fill: ${e.leafFillColor};
  }
  .treemapLabel {
    fill: ${n};
    font-size: ${e.labelFontSize};
  }
  .treemapValue {
    fill: ${o};
    font-size: ${e.valueFontSize};
  }
  .treemapTitle {
    fill: ${r};
    font-size: ${e.titleFontSize};
  }
  `},"getStyles"),k=M,te={parser:F,get db(){return new $},renderer:{},styles:k};export{te as diagram};
