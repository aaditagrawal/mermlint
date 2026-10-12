import{a as $}from"./chunk-NCOVM3YF.js";import"./chunk-JGPFOCDP.js";import{a as C}from"./chunk-LKH7MUID.js";import"./chunk-ATQQWCXO.js";import"./chunk-TPW5CADB.js";import"./chunk-TMMWB6NQ.js";import"./chunk-TWGPYWIY.js";import"./chunk-FBC3PYSO.js";import"./chunk-4W4OQ3QY.js";import"./chunk-RV7WQMNL.js";import"./chunk-WGMEMLED.js";import"./chunk-KNYDPLLK.js";import"./chunk-HP75Y56I.js";import"./chunk-TSOLLCID.js";import"./chunk-6UFWKTSA.js";import"./chunk-76QEHT4T.js";import"./chunk-A7665WVC.js";import"./chunk-T3FZWEYV.js";import"./chunk-L465623K.js";import{m as g}from"./chunk-662UOJDC.js";import"./chunk-4DYN46BX.js";import{A as m,O as u,P as b,Q as w,R as v,S as x,T as y,U as B,q as k}from"./chunk-JGNBUWUV.js";import{b as p}from"./chunk-AE5YYKYE.js";import{a as n}from"./chunk-EIBFAW37.js";import"./chunk-EMBIDUMY.js";var T=k.packet,S=class{constructor(){this.packet=[],this.setAccTitle=b,this.getAccTitle=w,this.setDiagramTitle=y,this.getDiagramTitle=B,this.getAccDescription=x,this.setAccDescription=v}static{n(this,"PacketDB")}getConfig(){let t=g({...T,...m().packet});return t.showBits&&(t.paddingY+=10),t}getPacket(){return this.packet}pushWord(t){t.length>0&&this.packet.push(t)}clear(){u(),this.packet=[]}},z=1e4,E=n((t,e)=>{$(t,e);let a=-1,i=[],s=1,{bitsPerRow:c}=e.getConfig();for(let{start:r,end:o,bits:l,label:d}of t.blocks){if(r!==void 0&&o!==void 0&&o<r)throw new Error(`Packet block ${r} - ${o} is invalid. End must be greater than start.`);if(r??=a+1,r!==a+1)throw new Error(`Packet block ${r} - ${o??r} is not contiguous. It should start from ${a+1}.`);if(l===0)throw new Error(`Packet block ${r} is invalid. Cannot have a zero bit field.`);for(o??=r+(l??1)-1,l??=o-r+1,a=o,p.debug(`Packet block ${r} - ${a} with label ${d}`);i.length<=c+1&&e.getPacket().length<z;){let[h,f]=F({start:r,end:o,bits:l,label:d},s,c);if(i.push(h),h.end+1===s*c&&(e.pushWord(i),i=[],s++),!f)break;({start:r,end:o,bits:l,label:d}=f)}}e.pushWord(i)},"populate"),F=n((t,e,a)=>{if(t.start===void 0)throw new Error("start should have been set during first phase");if(t.end===void 0)throw new Error("end should have been set during first phase");if(t.start>t.end)throw new Error(`Block start ${t.start} is greater than block end ${t.end}.`);if(t.end+1<=e*a)return[t,void 0];let i=e*a-1,s=e*a;return[{start:t.start,end:i,label:t.label,bits:i-t.start},{start:s,end:t.end,label:t.label,bits:t.end-s}]},"getNextFittingBlock"),D={parser:{yy:void 0},parse:n(async t=>{let e=await C("packet",t),a=D.parser?.yy;if(!(a instanceof S))throw new Error("parser.parser?.yy was not a PacketDB. This is due to a bug within Mermaid, please report this issue at https://github.com/mermaid-js/mermaid/issues.");p.debug(e),E(e,a)},"parse")};var P={byteFontSize:"10px",startByteColor:"black",endByteColor:"black",labelColor:"black",labelFontSize:"12px",titleColor:"black",titleFontSize:"14px",blockStrokeColor:"black",blockStrokeWidth:"1",blockFillColor:"#efefef"},A=n(({packet:t}={})=>{let e=g(P,t);return`
	.packetByte {
		font-size: ${e.byteFontSize};
	}
	.packetByte.start {
		fill: ${e.startByteColor};
	}
	.packetByte.end {
		fill: ${e.endByteColor};
	}
	.packetLabel {
		fill: ${e.labelColor};
		font-size: ${e.labelFontSize};
	}
	.packetTitle {
		fill: ${e.titleColor};
		font-size: ${e.titleFontSize};
	}
	.packetBlock {
		stroke: ${e.blockStrokeColor};
		stroke-width: ${e.blockStrokeWidth};
		fill: ${e.blockFillColor};
	}
	`},"styles"),G={parser:D,get db(){return new S},renderer:{},styles:A};export{G as diagram};
