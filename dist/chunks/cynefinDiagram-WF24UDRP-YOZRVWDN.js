import{a as W}from"./chunk-NCOVM3YF.js";import"./chunk-C3LVN2UL.js";import{a as R}from"./chunk-J35EDLZO.js";import"./chunk-ATQQWCXO.js";import"./chunk-TPW5CADB.js";import"./chunk-TMMWB6NQ.js";import"./chunk-TWGPYWIY.js";import"./chunk-FBC3PYSO.js";import"./chunk-4W4OQ3QY.js";import"./chunk-RV7WQMNL.js";import"./chunk-WGMEMLED.js";import"./chunk-KNYDPLLK.js";import"./chunk-HP75Y56I.js";import"./chunk-TSOLLCID.js";import"./chunk-6UFWKTSA.js";import"./chunk-76QEHT4T.js";import"./chunk-A7665WVC.js";import"./chunk-T3FZWEYV.js";import"./chunk-L465623K.js";import{m as k}from"./chunk-OJH5COR5.js";import"./chunk-STBOPOHX.js";import{A as D,O as S,P as M,Q as z,R as L,S as N,T as P,U as I,o as A,q as B}from"./chunk-UUXTRKVL.js";import{b as v}from"./chunk-RRKEGWUA.js";import{a as r}from"./chunk-EIBFAW37.js";import"./chunk-PHKIAKHS.js";var F=r(()=>({domains:new Map,transitions:[]}),"createDefaultData"),h=F(),_=r(()=>h.domains,"getDomains"),E=r(()=>h.transitions,"getTransitions"),H=r(t=>{if(t)for(let e of t){let n=e.domain,a=(e.items??[]).map(c=>({label:c.label}));h.domains.set(n,{name:n,items:a})}},"setDomains"),G=r(t=>{t&&(h.transitions=t.filter(e=>e.from===e.to?(v.warn(`Cynefin: self-loop transition on domain "${e.from}" is not meaningful and will be skipped.`),!1):!0).map(e=>({from:e.from,to:e.to,label:e.label||void 0})))},"setTransitions"),Y=r(()=>k({...B.cynefin,...D().cynefin}),"getConfig"),O=r(()=>{S(),h=F()},"clear"),x={getDomains:_,getTransitions:E,setDomains:H,setTransitions:G,getConfig:Y,clear:O,setAccTitle:M,getAccTitle:z,setDiagramTitle:P,getDiagramTitle:I,getAccDescription:N,setAccDescription:L},X=r(t=>{W(t,x),x.setDomains(t.domains),x.setTransitions(t.transitions)},"populate"),j={parse:r(async t=>{let e=await R("cynefin",t);v.debug(e),X(e)},"parse")};function u(t){let e=t+1831565813|0;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}r(u,"seededRandom");function V(t){let e=0;for(let n=0;n<t.length;n++){let a=t.charCodeAt(n);e=(e<<5)-e+a,e|=0}return e}r(V,"hashString");function q(t,e){return typeof t=="number"&&Number.isFinite(t)&&t!==0?t:V(e)}r(q,"resolveSeed");function U(t,e,n,a){let c=t/2,i=a??t*.015,f=7,g=e/f,s=[];for(let o=0;o<=f;o++){let l=u(n+o*17)*i*2-i;s.push({x:c+l,y:o*g})}let m=`M${s[0].x},${s[0].y}`;for(let o=0;o<s.length-1;o++){let l=s[o],d=s[o+1],p=(l.y+d.y)/2,$=o%2===0?1:-1,y=i*1.5*$*u(n+o*31+7),b=l.x+y,w=p,C=d.x-y;m+=` C${b},${w} ${C},${p} ${d.x},${d.y}`}return m}r(U,"generateFoldPath");function Q(t,e,n,a){let c=e/2,i=a??e*.015,f=7,g=t/f,s=[];for(let o=0;o<=f;o++){let l=u(n+o*23)*i*2-i;s.push({x:o*g,y:c+l})}let m=`M${s[0].x},${s[0].y}`;for(let o=0;o<s.length-1;o++){let l=s[o],d=s[o+1],p=(l.x+d.x)/2,$=o%2===0?1:-1,y=i*1.5*$*u(n+o*37+11),b=p,w=l.y+y,C=p,T=d.y-y;m+=` C${b},${w} ${C},${T} ${d.x},${d.y}`}return m}r(Q,"generateHorizontalBoundary");function Z(t,e){let n=t/2,a=e*.5,c=e,i=t*.03;return[`M${n},${a}`,`C${n+i},${a+(c-a)*.2}`,`${n-i*1.5},${a+(c-a)*.55}`,`${n+i*.5},${a+(c-a)*.75}`,`C${n-i},${a+(c-a)*.85}`,`${n+i*.3},${a+(c-a)*.95}`,`${n},${c}`].join(" ")}r(Z,"generateCliffPath");function J(t,e,n,a){return[`M${t-n},${e}`,`A${n},${a} 0 1,1 ${t+n},${e}`,`A${n},${a} 0 1,1 ${t-n},${e}`,"Z"].join(" ")}r(J,"generateConfusionPath");var K=r(()=>{let t=A(),e=D();return k(t,e.themeVariables).cynefin},"getCynefinTheme"),tt=r(()=>{let t=K();return`
	.cynefinDomain {
		stroke: none;
	}
	.cynefinDomainLabel {
		font-size: ${t.domainFontSize}px;
		font-weight: bold;
		fill: ${t.labelColor};
	}
	.cynefinSubtitle {
		font-size: ${t.itemFontSize-1}px;
		fill: ${t.textColor};
		font-style: italic;
	}
	.cynefinItem {
		fill-opacity: 0.95;
		stroke: ${t.boundaryColor};
		stroke-width: 1;
	}
	.cynefinItemText {
		font-size: ${t.itemFontSize}px;
		fill: ${t.textColor};
	}
	.cynefinItemOverflow {
		fill-opacity: 0.6;
		stroke: ${t.boundaryColor};
		stroke-width: 1;
		stroke-dasharray: 3 2;
	}
	.cynefinBoundary {
		stroke: ${t.boundaryColor};
		stroke-width: ${t.boundaryWidth};
		stroke-dasharray: 6 3;
	}
	.cynefinCliff {
		stroke: ${t.cliffColor};
		stroke-width: ${t.cliffWidth};
	}
	.cynefinConfusion {
		stroke: ${t.boundaryColor};
		stroke-width: 1.5;
		stroke-dasharray: 4 2;
	}
	.cynefinArrowLine {
		stroke: ${t.arrowColor};
		stroke-width: ${t.arrowWidth};
		fill: none;
	}
	.cynefinArrowHead {
		fill: ${t.arrowColor};
		stroke: none;
	}
	.cynefinArrowLabel {
		font-size: ${t.itemFontSize-1}px;
		fill: ${t.textColor};
	}
	.cynefinTitle {
		font-size: ${t.domainFontSize+2}px;
		font-weight: bold;
		fill: ${t.labelColor};
	}
	`},"styles"),et=tt,ft={parser:j,db:x,renderer:{},styles:et};export{ft as diagram};
