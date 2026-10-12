import{a as C}from"./chunk-NCOVM3YF.js";import"./chunk-JGPFOCDP.js";import{a as S}from"./chunk-LKH7MUID.js";import"./chunk-ATQQWCXO.js";import"./chunk-TPW5CADB.js";import"./chunk-TMMWB6NQ.js";import"./chunk-TWGPYWIY.js";import"./chunk-FBC3PYSO.js";import"./chunk-4W4OQ3QY.js";import"./chunk-RV7WQMNL.js";import"./chunk-WGMEMLED.js";import"./chunk-KNYDPLLK.js";import"./chunk-HP75Y56I.js";import"./chunk-TSOLLCID.js";import"./chunk-6UFWKTSA.js";import"./chunk-76QEHT4T.js";import"./chunk-A7665WVC.js";import"./chunk-T3FZWEYV.js";import"./chunk-L465623K.js";import{m as h}from"./chunk-662UOJDC.js";import"./chunk-4DYN46BX.js";import{A as y,O as u,P as m,Q as w,R as k,S as b,T as $,U as v,V as P,o as g}from"./chunk-JGNBUWUV.js";import{b as x}from"./chunk-AE5YYKYE.js";import{a as n}from"./chunk-EIBFAW37.js";import"./chunk-EMBIDUMY.js";var f=n((t,a)=>{let e=t<=1?t*100:t;if(e<0||e>100)throw new Error(`${a} must be between 0-1 (decimal) or 0-100 (percentage). Received: ${t}`);return e},"toPercent"),l=n((t,a,e)=>({x:f(a,`${e} evolution`),y:f(t,`${e} visibility`)}),"toCoordinates"),M=n(t=>{if(t){if(t==="+<>")return"bidirectional";if(t==="+<")return"backward";if(t==="+>")return"forward"}},"getFlowFromPort"),V=n(t=>{if(!t?.startsWith("+"))return{};let e=/^\+'([^']*)'/.exec(t)?.[1];return t.includes("<>")?{flow:"bidirectional",label:e}:t.includes("<")?{flow:"backward",label:e}:t.includes(">")?{flow:"forward",label:e}:{label:e}},"extractFlowFromArrow"),_=n((t,a)=>{if(C(t,a),t.size&&a.setSize(t.size.width,t.size.height),t.evolution){let e=t.evolution.stages.map(r=>r.secondName?`${r.name.trim()} / ${r.secondName.trim()}`:r.name.trim()),o=t.evolution.stages.filter(r=>r.boundary!==void 0).map(r=>r.boundary);a.updateAxes({stages:e,stageBoundaries:o})}if(t.anchors.forEach(e=>{let o=l(e.visibility,e.evolution,`Anchor "${e.name}"`);a.addNode(e.name,e.name,o.x,o.y,"anchor")}),t.components.forEach(e=>{let o=l(e.visibility,e.evolution,`Component "${e.name}"`),r=e.label?(e.label.negX?-1:1)*e.label.offsetX:void 0,s=e.label?(e.label.negY?-1:1)*e.label.offsetY:void 0,d=e.decorator?.strategy;a.addNode(e.name,e.name,o.x,o.y,"component",r,s,e.inertia,d)}),t.notes.forEach(e=>{let o=l(e.visibility,e.evolution,`Note "${e.text}"`);a.addNote(e.text,o.x,o.y)}),t.pipelines.forEach(e=>{let o=a.getNode(e.parent);if(!o||typeof o.y!="number")throw new Error(`Pipeline "${e.parent}" must reference an existing component with coordinates.`);let r=o.y;a.startPipeline(e.parent),e.components.forEach(s=>{let d=`${e.parent}_${s.name}`,c=s.label?(s.label.negX?-1:1)*s.label.offsetX:void 0,p=s.label?(s.label.negY?-1:1)*s.label.offsetY:void 0,j=f(s.evolution,`Pipeline component "${s.name}" evolution`);a.addNode(d,s.name,j,r,"pipeline-component",c,p),a.addPipelineComponent(e.parent,d)})}),t.links.forEach(e=>{let o=!!e.arrow&&(e.arrow.includes("-.->")||e.arrow.includes(".-.")),r=M(e.fromPort)??M(e.toPort),{flow:s,label:d}=V(e.arrow);!r&&s&&(r=s);let c=e.linkLabel,p=d??c;a.addLink(a.resolveNodeId(e.from),a.resolveNodeId(e.to),o,p,r)}),t.evolves.forEach(e=>{let o=a.getNode(e.component);if(o?.y!==void 0){let r=f(e.target,`Evolve target for "${e.component}"`);a.addTrend(e.component,r,o.y)}}),t.annotations.length>0){let e=t.annotations[0],o=l(e.x,e.y,"Annotations box");a.setAnnotationsBox(o.x,o.y)}t.annotation.forEach(e=>{let o=l(e.x,e.y,`Annotation ${e.number}`);a.addAnnotation(e.number,[{x:o.x,y:o.y}],e.text)}),t.accelerators.forEach(e=>{let o=l(e.x,e.y,`Accelerator "${e.name}"`);a.addAccelerator(e.name,o.x,o.y)}),t.deaccelerators.forEach(e=>{let o=l(e.x,e.y,`Deaccelerator "${e.name}"`);a.addDeaccelerator(e.name,o.x,o.y)})},"populateDb"),N={parser:{yy:void 0},parse:n(async t=>{let a=await S("wardley",t);x.debug(a);let e=N.parser?.yy;if(!e||typeof e.addNode!="function")throw new Error("parser.parser?.yy was not a WardleyDB. This is due to a bug within Mermaid, please report this issue at https://github.com/mermaid-js/mermaid/issues.");_(a,e)},"parse")},Z=class{constructor(){this.nodes=new Map,this.links=[],this.trends=new Map,this.pipelines=new Map,this.annotations=[],this.notes=[],this.accelerators=[],this.deaccelerators=[],this.axes={}}static{n(this,"WardleyBuilder")}addNode(t){let a=this.nodes.get(t.id)??{id:t.id,label:t.label},e={...a,...t,className:t.className??a.className,labelOffsetX:t.labelOffsetX??a.labelOffsetX,labelOffsetY:t.labelOffsetY??a.labelOffsetY};this.nodes.set(t.id,e)}addLink(t){this.links.push(t)}addTrend(t){this.trends.set(t.nodeId,t)}startPipeline(t){this.pipelines.set(t,{nodeId:t,componentIds:[]});let a=this.nodes.get(t);a&&(a.isPipelineParent=!0)}addPipelineComponent(t,a){let e=this.pipelines.get(t);e&&e.componentIds.push(a);let o=this.nodes.get(a);o&&(o.inPipeline=!0)}addAnnotation(t){this.annotations.push(t)}addNote(t){this.notes.push(t)}addAccelerator(t){this.accelerators.push(t)}addDeaccelerator(t){this.deaccelerators.push(t)}setAnnotationsBox(t,a){this.annotationsBox={x:t,y:a}}setAxes(t){this.axes={...this.axes,...t}}setSize(t,a){this.size={width:t,height:a}}getNode(t){return this.nodes.get(t)}resolveNodeId(t){if(this.nodes.has(t))return t;for(let[a,e]of this.nodes)if(e.label===t)return a;return t}build(){let t=[];for(let a of this.nodes.values()){if(typeof a.x!="number"||typeof a.y!="number")throw new Error(`Node "${a.label}" is missing coordinates`);t.push(a)}return{nodes:t,links:[...this.links],trends:[...this.trends.values()],pipelines:[...this.pipelines.values()],annotations:[...this.annotations],notes:[...this.notes],accelerators:[...this.accelerators],deaccelerators:[...this.deaccelerators],annotationsBox:this.annotationsBox,axes:{...this.axes},size:this.size}}clear(){this.nodes.clear(),this.links=[],this.trends.clear(),this.pipelines.clear(),this.annotations=[],this.notes=[],this.accelerators=[],this.deaccelerators=[],this.annotationsBox=void 0,this.axes={},this.size=void 0}},i=new Z;function z(){return P()["wardley-beta"]}n(z,"getConfig");function L(t,a,e,o,r,s,d,c,p){i.addNode({id:t,label:a,x:e,y:o,className:r,labelOffsetX:s,labelOffsetY:d,inertia:c,sourceStrategy:p})}n(L,"addNode");function T(t,a,e=!1,o,r){i.addLink({source:t,target:a,dashed:e,label:o,flow:r})}n(T,"addLink");function A(t,a,e){i.addTrend({nodeId:t,targetX:a,targetY:e})}n(A,"addTrend");function X(t,a,e){i.addAnnotation({number:t,coordinates:a,text:e})}n(X,"addAnnotation");function E(t,a,e){i.addNote({text:t,x:a,y:e})}n(E,"addNote");function Y(t,a,e){i.addAccelerator({name:t,x:a,y:e})}n(Y,"addAccelerator");function I(t,a,e){i.addDeaccelerator({name:t,x:a,y:e})}n(I,"addDeaccelerator");function B(t,a){i.setAnnotationsBox(t,a)}n(B,"setAnnotationsBox");function F(t,a){i.setSize(t,a)}n(F,"setSize");function R(t){i.startPipeline(t)}n(R,"startPipeline");function O(t,a){i.addPipelineComponent(t,a)}n(O,"addPipelineComponent");function W(t){i.setAxes(t)}n(W,"updateAxes");function D(t){return i.getNode(t)}n(D,"getNode");function G(t){return i.resolveNodeId(t)}n(G,"resolveNodeId");function q(){return i.build()}n(q,"getWardleyData");function H(){i.clear(),u()}n(H,"clear");var U={getConfig:z,addNode:L,addLink:T,addTrend:A,addAnnotation:X,addNote:E,addAccelerator:Y,addDeaccelerator:I,setAnnotationsBox:B,setSize:F,startPipeline:R,addPipelineComponent:O,updateAxes:W,getNode:D,resolveNodeId:G,getWardleyData:q,clear:H,setAccTitle:m,getAccTitle:w,setDiagramTitle:$,getDiagramTitle:v,getAccDescription:b,setAccDescription:k};var J=n(({wardley:t}={})=>{let a=g(),e=y(),o=h(a,e.themeVariables),r=h(o.wardley,t);return`
  .wardley-background {
    fill: ${r.backgroundColor};
  }
  .wardley-axes line, .wardley-axes path {
    stroke: ${r.axisColor};
  }
  .wardley-axis-label {
    fill: ${r.axisTextColor};
  }
  .wardley-stage-label {
    fill: ${r.axisTextColor};
  }
  .wardley-grid line {
    stroke: ${r.gridColor};
  }
  .wardley-node circle {
    fill: ${r.componentFill};
    stroke: ${r.componentStroke};
  }
  .wardley-node-label {
    fill: ${r.componentLabelColor};
  }
  .wardley-link {
    stroke: ${r.linkStroke};
  }
  .wardley-link--dashed {
    stroke-dasharray: 4 4;
  }
  .wardley-link-label {
    fill: ${r.axisTextColor};
  }
  .wardley-trend line {
    stroke: ${r.evolutionStroke};
  }
  .wardley-annotation-line {
    stroke: ${r.annotationStroke};
  }
  .wardley-annotation circle {
    fill: ${r.annotationFill};
    stroke: ${r.annotationStroke};
  }
  .wardley-annotation text {
    fill: ${r.annotationTextColor};
  }
  .wardley-annotations-box rect {
    fill: ${r.annotationFill};
    stroke: ${r.annotationStroke};
  }
  .wardley-annotations-box text {
    fill: ${r.annotationTextColor};
  }
  .wardley-pipeline-box {
    stroke: ${r.componentStroke};
  }
  .wardley-notes text {
    fill: ${r.axisTextColor};
  }
  `},"styles"),it={parser:N,db:U,renderer:{},styles:J};export{it as diagram};
