import{a as I}from"./chunk-NCOVM3YF.js";import"./chunk-JGPFOCDP.js";import{a as _}from"./chunk-LKH7MUID.js";import"./chunk-ATQQWCXO.js";import"./chunk-TPW5CADB.js";import"./chunk-TMMWB6NQ.js";import"./chunk-TWGPYWIY.js";import"./chunk-FBC3PYSO.js";import"./chunk-4W4OQ3QY.js";import"./chunk-RV7WQMNL.js";import"./chunk-WGMEMLED.js";import"./chunk-KNYDPLLK.js";import"./chunk-HP75Y56I.js";import"./chunk-TSOLLCID.js";import"./chunk-6UFWKTSA.js";import"./chunk-76QEHT4T.js";import"./chunk-A7665WVC.js";import"./chunk-T3FZWEYV.js";import"./chunk-L465623K.js";import{m as h}from"./chunk-662UOJDC.js";import"./chunk-4DYN46BX.js";import{A as f,O as M,P as L,Q as T,R as S,S as k,T as O,U as R,o as b,q as A}from"./chunk-JGNBUWUV.js";import{b as $}from"./chunk-AE5YYKYE.js";import{a as s}from"./chunk-EIBFAW37.js";import"./chunk-EMBIDUMY.js";var p={showLegend:!0,ticks:5,max:null,min:0,graticule:"circle"},v=32,E={axes:[],curves:[],options:p},l=structuredClone(E),W=A.radar,V=s(()=>h({...W,...f().radar}),"getConfig"),F=s(()=>l.axes,"getAxes"),H=s(()=>l.curves,"getCurves"),j=s(()=>l.options,"getOptions"),U=s(a=>{l.axes=a.map(t=>({name:t.name,label:t.label??t.name}))},"setAxes"),X=s(a=>{l.curves=a.map(t=>({name:t.name,label:t.label??t.name,entries:K(t.entries)}))},"setCurves"),K=s(a=>{if(a[0].axis==null)return a.map(e=>e.value);let t=F();if(t.length===0)throw new Error("Axes must be populated before curves for reference entries");return t.map(e=>{let r=a.find(n=>n.axis?.$refText===e.name);if(r===void 0)throw new Error("Missing entry for axis "+e.label);return r.value})},"computeCurveEntries"),N=s(a=>{let t=a.reduce((e,r)=>(e[r.name]=r,e),{});l.options={showLegend:t.showLegend?.value??p.showLegend,ticks:t.ticks?.value??p.ticks,max:t.max?.value??p.max,min:t.min?.value??p.min,graticule:t.graticule?.value??p.graticule},l.options.ticks>v&&($.warn(`Radar diagram ticks (${l.options.ticks}) exceeds maximum allowed (${v}). Using ${v} instead.`),l.options.ticks=v)},"setOptions"),Y=s(()=>{M(),l=structuredClone(E)},"clear"),g={getAxes:F,getCurves:H,getOptions:j,setAxes:U,setCurves:X,setOptions:N,getConfig:V,clear:Y,setAccTitle:L,getAccTitle:T,setDiagramTitle:O,getDiagramTitle:R,getAccDescription:k,setAccDescription:S},Z=s(a=>{I(a,g);let{axes:t,curves:e,options:r}=a;g.setAxes(t),g.setCurves(e),g.setOptions(r)},"populate"),q={parse:s(async a=>{let t=await _("radar",a);$.debug(t),Z(t)},"parse")};function J(a,t,e,r,n,d,i){let o=t.length,u=Math.min(i.width,i.height)/2;e.forEach((c,m)=>{if(c.entries.length!==o)return;let y=c.entries.map((x,z)=>{let w=2*Math.PI*z/o-Math.PI/2,C=D(x,r,n,u),G=C*Math.cos(w),B=C*Math.sin(w);return{x:G,y:B}});d==="circle"?a.append("path").attr("d",P(y,i.curveTension)).attr("class",`radarCurve-${m}`):d==="polygon"&&a.append("polygon").attr("points",y.map(x=>`${x.x},${x.y}`).join(" ")).attr("class",`radarCurve-${m}`)})}s(J,"drawCurves");function D(a,t,e,r){let n=Math.min(Math.max(a,t),e);return r*(n-t)/(e-t)}s(D,"relativeRadius");function P(a,t){let e=a.length,r=`M${a[0].x},${a[0].y}`;for(let n=0;n<e;n++){let d=a[(n-1+e)%e],i=a[n],o=a[(n+1)%e],u=a[(n+2)%e],c={x:i.x+(o.x-d.x)*t,y:i.y+(o.y-d.y)*t},m={x:o.x-(u.x-i.x)*t,y:o.y-(u.y-i.y)*t};r+=` C${c.x},${c.y} ${m.x},${m.y} ${o.x},${o.y}`}return`${r} Z`}s(P,"closedRoundCurve");function Q(a,t,e,r){if(!e)return;let n=(r.width/2+r.marginRight)*3/4,d=-(r.height/2+r.marginTop)*3/4,i=20;t.forEach((o,u)=>{let c=a.append("g").attr("transform",`translate(${n}, ${d+u*i})`);c.append("rect").attr("width",12).attr("height",12).attr("class",`radarLegendBox-${u}`),c.append("text").attr("x",16).attr("y",0).attr("class","radarLegendText").text(o.label)})}s(Q,"drawLegend");var tt=s((a,t)=>{let e="";for(let r=0;r<a.THEME_COLOR_LIMIT;r++){let n=a[`cScale${r}`];e+=`
		.radarCurve-${r} {
			color: ${n};
			fill: ${n};
			fill-opacity: ${t.curveOpacity};
			stroke: ${n};
			stroke-width: ${t.curveStrokeWidth};
		}
		.radarLegendBox-${r} {
			fill: ${n};
			fill-opacity: ${t.curveOpacity};
			stroke: ${n};
		}
		`}return e},"genIndexStyles"),et=s(a=>{let t=b(),e=f(),r=h(t,e.themeVariables),n=h(r.radar,a);return{themeVariables:r,radarOptions:n}},"buildRadarStyleOptions"),at=s(({radar:a}={})=>{let{themeVariables:t,radarOptions:e}=et(a);return`
	.radarTitle {
		font-size: ${t.fontSize};
		color: ${t.titleColor};
		dominant-baseline: hanging;
		text-anchor: middle;
	}
	.radarAxisLine {
		stroke: ${e.axisColor};
		stroke-width: ${e.axisStrokeWidth};
	}
	.radarAxisLabel {
		font-size: ${e.axisLabelFontSize}px;
		color: ${e.axisColor};
	}
	.radarGraticule {
		fill: ${e.graticuleColor};
		fill-opacity: ${e.graticuleOpacity};
		stroke: ${e.graticuleColor};
		stroke-width: ${e.graticuleStrokeWidth};
	}
	.radarLegendText {
		text-anchor: start;
		font-size: ${e.legendFontSize}px;
		dominant-baseline: hanging;
	}
	${tt(t,e)}
	`},"styles"),pt={parser:q,db:g,renderer:{},styles:at};export{pt as diagram};
