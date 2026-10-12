import{a as u}from"./chunk-NCOVM3YF.js";import"./chunk-JGPFOCDP.js";import{a as m}from"./chunk-LKH7MUID.js";import"./chunk-ATQQWCXO.js";import"./chunk-TPW5CADB.js";import"./chunk-TMMWB6NQ.js";import"./chunk-TWGPYWIY.js";import"./chunk-FBC3PYSO.js";import"./chunk-4W4OQ3QY.js";import"./chunk-RV7WQMNL.js";import"./chunk-WGMEMLED.js";import"./chunk-KNYDPLLK.js";import"./chunk-HP75Y56I.js";import"./chunk-TSOLLCID.js";import"./chunk-6UFWKTSA.js";import"./chunk-76QEHT4T.js";import"./chunk-A7665WVC.js";import"./chunk-T3FZWEYV.js";import"./chunk-L465623K.js";import"./chunk-662UOJDC.js";import"./chunk-4DYN46BX.js";import{O as s,P as c,Q as d,R as g,S as p,T as h,U as f,q as l}from"./chunk-JGNBUWUV.js";import{b as i}from"./chunk-AE5YYKYE.js";import{a}from"./chunk-EIBFAW37.js";import"./chunk-EMBIDUMY.js";var v=l.pie,n={sections:new Map,showData:!1,config:v},r=n.sections,o=n.showData,x=structuredClone(v),w=a(()=>structuredClone(x),"getConfig"),C=a(()=>{r=new Map,o=n.showData,s()},"clear"),$=a(({label:t,value:e})=>{if(e<0)throw new Error(`"${t}" has invalid value: ${e}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);r.has(t)||(r.set(t,e),i.debug(`added new section: ${t}, with value: ${e}`))},"addSection"),D=a(()=>r,"getSections"),y=a(t=>{o=t},"setShowData"),T=a(()=>o,"getShowData"),S={getConfig:w,clear:C,setDiagramTitle:h,getDiagramTitle:f,setAccTitle:c,getAccTitle:d,setAccDescription:g,getAccDescription:p,addSection:$,getSections:D,setShowData:y,getShowData:T},b=a((t,e)=>{u(t,e),e.setShowData(t.showData),t.sections.map(e.addSection)},"populateDb"),A={parse:a(async t=>{let e=await m("pie",t);i.debug(e),b(e,S)},"parse")},k=a(t=>`
  .pieCircle{
    stroke: ${t.pieStrokeColor};
    stroke-width : ${t.pieStrokeWidth};
    opacity : ${t.pieOpacity};
  }
  .pieCircle.highlighted{
    scale: 1.05;
    opacity: 1;
  }
  .pieCircle.highlightedOnHover:hover{
    transition-duration: 250ms;
    scale: 1.05;
    opacity: 1;
  }
  .pieOuterCircle{
    stroke: ${t.pieOuterStrokeColor};
    stroke-width: ${t.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${t.pieTitleTextSize};
    fill: ${t.pieTitleTextColor};
    font-family: ${t.fontFamily};
  }
  .slice {
    font-family: ${t.fontFamily};
    fill: ${t.pieSectionTextColor};
    font-size:${t.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${t.pieLegendTextColor};
    font-family: ${t.fontFamily};
    font-size: ${t.pieLegendTextSize};
  }
`,"getStyles"),_=k;var X={parser:A,db:S,renderer:{},styles:_};export{X as diagram};
