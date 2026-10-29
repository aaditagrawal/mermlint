import{a as I}from"./chunk-L7BMR7WL.js";import{a as _}from"./chunk-NCOVM3YF.js";import{a as G}from"./chunk-J35EDLZO.js";import"./chunk-ATQQWCXO.js";import"./chunk-TPW5CADB.js";import"./chunk-TMMWB6NQ.js";import"./chunk-TWGPYWIY.js";import"./chunk-FBC3PYSO.js";import"./chunk-4W4OQ3QY.js";import"./chunk-RV7WQMNL.js";import"./chunk-WGMEMLED.js";import"./chunk-KNYDPLLK.js";import"./chunk-HP75Y56I.js";import"./chunk-TSOLLCID.js";import"./chunk-6UFWKTSA.js";import"./chunk-76QEHT4T.js";import"./chunk-A7665WVC.js";import"./chunk-T3FZWEYV.js";import"./chunk-L465623K.js";import{g as R,m as O}from"./chunk-OJH5COR5.js";import"./chunk-STBOPOHX.js";import{A as u,L as f,O as C,P as v,Q as E,R as T,S as L,T as M,U as P,q as k}from"./chunk-UUXTRKVL.js";import{b as l}from"./chunk-RRKEGWUA.js";import{a as c}from"./chunk-EIBFAW37.js";import"./chunk-PHKIAKHS.js";var $={NORMAL:0,REVERSE:1,HIGHLIGHT:2,MERGE:3,CHERRY_PICK:4},N=k.gitGraph,y=c(()=>O({...N,...u().gitGraph}),"getConfig"),r=new I(()=>{let e=y(),t=e.mainBranchName,a=e.mainBranchOrder;return{mainBranchName:t,commits:new Map,head:null,branchConfig:new Map([[t,{name:t,order:a}]]),branches:new Map([[t,null]]),currBranch:t,direction:"LR",seq:0,options:{}}});function b(){return R({length:7})}c(b,"getID");function D(e,t){let a=Object.create(null);return e.reduce((s,o)=>{let h=t(o);return a[h]||(a[h]=!0,s.push(o)),s},[])}c(D,"uniqBy");var F=c(function(e){r.records.direction=e},"setDirection"),z=c(function(e){l.debug("options str",e),e=e?.trim(),e=e||"{}";try{r.records.options=JSON.parse(e)}catch(t){l.error("error while parsing gitGraph options",t.message)}},"setOptions"),Y=c(function(){return r.records.options},"getOptions"),j=c(function(e){let t=e.msg,a=e.id,s=e.type,o=e.tags;l.info("commit",t,a,s,o),l.debug("Entering commit:",t,a,s,o);let h=y();a=f.sanitizeText(a,h),t=f.sanitizeText(t,h),o=o?.map(n=>f.sanitizeText(n,h));let i={id:a||r.records.seq+"-"+b(),message:t,seq:r.records.seq++,type:s??$.NORMAL,tags:o??[],parents:r.records.head==null?[]:[r.records.head.id],branch:r.records.currBranch};r.records.head=i,l.info("main branch",h.mainBranchName),r.records.commits.has(i.id)&&l.warn(`Commit ID ${i.id} already exists`),r.records.commits.set(i.id,i),r.records.branches.set(r.records.currBranch,i.id),l.debug("in pushCommit "+i.id)},"commit"),K=c(function(e){let t=e.name,a=e.order;if(t=f.sanitizeText(t,y()),r.records.branches.has(t))throw new Error(`Trying to create an existing branch. (Help: Either use a new name if you want create a new branch or try using "checkout ${t}")`);r.records.branches.set(t,r.records.head!=null?r.records.head.id:null),r.records.branchConfig.set(t,{name:t,order:a}),W(t),l.debug("in createBranch")},"branch"),U=c(e=>{let t=e.branch,a=e.id,s=e.type,o=e.tags,h=y();t=f.sanitizeText(t,h),a&&(a=f.sanitizeText(a,h));let i=r.records.branches.get(r.records.currBranch),n=r.records.branches.get(t),d=i?r.records.commits.get(i):void 0,p=n?r.records.commits.get(n):void 0;if(d&&p&&d.branch===t)throw new Error(`Cannot merge branch '${t}' into itself.`);if(r.records.currBranch===t){let m=new Error('Incorrect usage of "merge". Cannot merge a branch to itself');throw m.hash={text:`merge ${t}`,token:`merge ${t}`,expected:["branch abc"]},m}if(d===void 0||!d){let m=new Error(`Incorrect usage of "merge". Current branch (${r.records.currBranch})has no commits`);throw m.hash={text:`merge ${t}`,token:`merge ${t}`,expected:["commit"]},m}if(!r.records.branches.has(t)){let m=new Error('Incorrect usage of "merge". Branch to be merged ('+t+") does not exist");throw m.hash={text:`merge ${t}`,token:`merge ${t}`,expected:[`branch ${t}`]},m}if(p===void 0||!p){let m=new Error('Incorrect usage of "merge". Branch to be merged ('+t+") has no commits");throw m.hash={text:`merge ${t}`,token:`merge ${t}`,expected:['"commit"']},m}if(d===p){let m=new Error('Incorrect usage of "merge". Both branches have same head');throw m.hash={text:`merge ${t}`,token:`merge ${t}`,expected:["branch abc"]},m}if(a&&r.records.commits.has(a)){let m=new Error('Incorrect usage of "merge". Commit with id:'+a+" already exists, use different custom id");throw m.hash={text:`merge ${t} ${a} ${s} ${o?.join(" ")}`,token:`merge ${t} ${a} ${s} ${o?.join(" ")}`,expected:[`merge ${t} ${a}_UNIQUE ${s} ${o?.join(" ")}`]},m}let x=n||"",g={id:a||`${r.records.seq}-${b()}`,message:`merged branch ${t} into ${r.records.currBranch}`,seq:r.records.seq++,parents:r.records.head==null?[]:[r.records.head.id,x],branch:r.records.currBranch,type:$.MERGE,customType:s,customId:!!a,tags:o??[]};r.records.head=g,r.records.commits.set(g.id,g),r.records.branches.set(r.records.currBranch,g.id),l.debug(r.records.branches),l.debug("in mergeBranch")},"merge"),V=c(function(e){let t=e.id,a=e.targetId,s=e.tags,o=e.parent;l.debug("Entering cherryPick:",t,a,s);let h=y();if(t=f.sanitizeText(t,h),a=f.sanitizeText(a,h),s=s?.map(d=>f.sanitizeText(d,h)),o=f.sanitizeText(o,h),!t||!r.records.commits.has(t)){let d=new Error('Incorrect usage of "cherryPick". Source commit id should exist and provided');throw d.hash={text:`cherryPick ${t} ${a}`,token:`cherryPick ${t} ${a}`,expected:["cherry-pick abc"]},d}let i=r.records.commits.get(t);if(i===void 0||!i)throw new Error('Incorrect usage of "cherryPick". Source commit id should exist and provided');if(o&&!(Array.isArray(i.parents)&&i.parents.includes(o)))throw new Error("Invalid operation: The specified parent commit is not an immediate parent of the cherry-picked commit.");let n=i.branch;if(i.type===$.MERGE&&!o)throw new Error("Incorrect usage of cherry-pick: If the source commit is a merge commit, an immediate parent commit must be specified.");if(!a||!r.records.commits.has(a)){if(n===r.records.currBranch){let g=new Error('Incorrect usage of "cherryPick". Source commit is already on current branch');throw g.hash={text:`cherryPick ${t} ${a}`,token:`cherryPick ${t} ${a}`,expected:["cherry-pick abc"]},g}let d=r.records.branches.get(r.records.currBranch);if(d===void 0||!d){let g=new Error(`Incorrect usage of "cherry-pick". Current branch (${r.records.currBranch})has no commits`);throw g.hash={text:`cherryPick ${t} ${a}`,token:`cherryPick ${t} ${a}`,expected:["cherry-pick abc"]},g}let p=r.records.commits.get(d);if(p===void 0||!p){let g=new Error(`Incorrect usage of "cherry-pick". Current branch (${r.records.currBranch})has no commits`);throw g.hash={text:`cherryPick ${t} ${a}`,token:`cherryPick ${t} ${a}`,expected:["cherry-pick abc"]},g}let x={id:r.records.seq+"-"+b(),message:`cherry-picked ${i?.message} into ${r.records.currBranch}`,seq:r.records.seq++,parents:r.records.head==null?[]:[r.records.head.id,i.id],branch:r.records.currBranch,type:$.CHERRY_PICK,tags:s?s.filter(Boolean):[`cherry-pick:${i.id}${i.type===$.MERGE?`|parent:${o}`:""}`]};r.records.head=x,r.records.commits.set(x.id,x),r.records.branches.set(r.records.currBranch,x.id),l.debug(r.records.branches),l.debug("in cherryPick")}},"cherryPick"),W=c(function(e){if(e=f.sanitizeText(e,y()),r.records.branches.has(e)){r.records.currBranch=e;let t=r.records.branches.get(r.records.currBranch);t===void 0||!t?r.records.head=null:r.records.head=r.records.commits.get(t)??null}else{let t=new Error(`Trying to checkout branch which is not yet created. (Help try using "branch ${e}")`);throw t.hash={text:`checkout ${e}`,token:`checkout ${e}`,expected:[`branch ${e}`]},t}},"checkout");function w(e,t,a){let s=e.indexOf(t);s===-1?e.push(a):e.splice(s,1,a)}c(w,"upsert");function B(e){let t=e.reduce((o,h)=>o.seq>h.seq?o:h,e[0]),a="";e.forEach(function(o){o===t?a+="	*":a+="	|"});let s=[a,t.id,t.seq];for(let o in r.records.branches)r.records.branches.get(o)===t.id&&s.push(o);if(l.debug(s.join(" ")),t.parents&&t.parents.length==2&&t.parents[0]&&t.parents[1]){let o=r.records.commits.get(t.parents[0]);w(e,t,o),t.parents[1]&&e.push(r.records.commits.get(t.parents[1]))}else{if(t.parents.length==0)return;if(t.parents[0]){let o=r.records.commits.get(t.parents[0]);w(e,t,o)}}e=D(e,o=>o.id),B(e)}c(B,"prettyPrintCommitHistory");var Z=c(function(){l.debug(r.records.commits);let e=q()[0];B([e])},"prettyPrint"),X=c(function(){r.reset(),C()},"clear"),J=c(function(){return[...r.records.branchConfig.values()].map((t,a)=>t.order!==null&&t.order!==void 0?t:{...t,order:parseFloat(`0.${a}`)}).sort((t,a)=>(t.order??0)-(a.order??0)).map(({name:t})=>({name:t}))},"getBranchesAsObjArray"),Q=c(function(){return r.records.branches},"getBranches"),ee=c(function(){return r.records.commits},"getCommits"),q=c(function(){let e=[...r.records.commits.values()];return e.forEach(function(t){l.debug(t.id)}),e.sort((t,a)=>t.seq-a.seq),e},"getCommitsArray"),te=c(function(){return r.records.currBranch},"getCurrentBranch"),re=c(function(){return r.records.direction},"getDirection"),ae=c(function(){return r.records.head},"getHead"),A={commitType:$,getConfig:y,setDirection:F,setOptions:z,getOptions:Y,commit:j,branch:K,merge:U,cherryPick:V,checkout:W,prettyPrint:Z,clear:X,getBranchesAsObjArray:J,getBranches:Q,getCommits:ee,getCommitsArray:q,getCurrentBranch:te,getDirection:re,getHead:ae,setAccTitle:v,getAccTitle:E,getAccDescription:L,setAccDescription:T,setDiagramTitle:M,getDiagramTitle:P},oe=c((e,t)=>{_(e,t),e.dir&&t.setDirection(e.dir);for(let a of e.statements)se(a,t)},"populate"),se=c((e,t)=>{let s={Commit:c(o=>t.commit(ne(o)),"Commit"),Branch:c(o=>t.branch(ce(o)),"Branch"),Merge:c(o=>t.merge(ie(o)),"Merge"),Checkout:c(o=>t.checkout(de(o)),"Checkout"),CherryPicking:c(o=>t.cherryPick(he(o)),"CherryPicking")}[e.$type];s?s(e):l.error(`Unknown statement type: ${e.$type}`)},"parseStatement"),ne=c(e=>({id:e.id,msg:e.message??"",type:e.type!==void 0?$[e.type]:$.NORMAL,tags:e.tags??void 0}),"parseCommit"),ce=c(e=>({name:e.name,order:e.order??0}),"parseBranch"),ie=c(e=>({branch:e.branch,id:e.id??"",type:e.type!==void 0?$[e.type]:void 0,tags:e.tags??void 0}),"parseMerge"),de=c(e=>e.branch,"parseCheckout"),he=c(e=>({id:e.id,targetId:"",tags:e.tags?.length===0?void 0:e.tags,parent:e.parent}),"parseCherryPicking"),le={parse:c(async e=>{let t=await G("gitGraph",e);l.debug(t),oe(t,A)},"parse")};var H=8,S=new Set(["redux","redux-dark","redux-color","redux-dark-color"]),me=new Set(["redux-color","redux-dark-color"]),ge=new Set(["neo","neo-dark"]),fe=new Set(["dark","redux-dark","redux-dark-color","neo-dark"]),$e=new Set(["redux","redux-dark","redux-color","redux-dark-color","neo","neo-dark"]),pe=c(e=>{let{svgId:t}=e,a="";if(e.useGradient&&t)for(let s=0;s<e.THEME_COLOR_LIMIT;s++)a+=`
      .label${s}  { fill: ${e.mainBkg}; stroke: url(${t}-gradient); stroke-width: ${e.strokeWidth};}
             `;return a},"genGitGraphGradient"),ye=c(e=>{let t=u(),{theme:a,themeVariables:s}=t,{borderColorArray:o}=s,h=S.has(a);if(ge.has(a)){let i="";for(let n=0;n<e.THEME_COLOR_LIMIT;n++)if(n===0)i+=`
        .branch-label${n} { fill: ${e.nodeBorder};}
        .commit${n} { stroke: ${e.nodeBorder};   }
        .commit-highlight${n} { stroke: ${e.nodeBorder}; fill: ${e.nodeBorder}; }
        .arrow${n} { stroke: ${e.nodeBorder}; }
        .commit-bullets { fill: ${e.nodeBorder}; }
        .commit-cherry-pick${n} { stroke: ${e.nodeBorder}; }
        ${pe(e)}`;else{let d=n%H;i+=`
        .branch-label${n} { fill: ${e["gitBranchLabel"+d]}; }
        .commit${n} { stroke: ${e["git"+d]}; fill: ${e["git"+d]}; }
        .commit-highlight${n} { stroke: ${e["gitInv"+d]}; fill: ${e["gitInv"+d]}; }
        .arrow${n} { stroke: ${e["git"+d]}; }
        `}return i}else if(me.has(a)){let i="";for(let n=0;n<e.THEME_COLOR_LIMIT;n++)if(n===0)i+=`
        .branch-label${n} { fill: ${e.nodeBorder}; ${h?`font-weight:${e.noteFontWeight}`:""} }
        .commit${n} { stroke: ${e.nodeBorder}; }
        .commit-highlight${n} { stroke: ${e.nodeBorder}; fill: ${e.mainBkg}; }
        .label${n}  { fill: ${e.mainBkg}; stroke: ${e.nodeBorder}; stroke-width: ${e.strokeWidth}; ${h?`font-weight:${e.noteFontWeight}`:""} }
        .arrow${n} { stroke: ${e.nodeBorder}; }
        .commit-bullets { fill: ${e.nodeBorder}; }
        `;else{let d=n%o.length;i+=`
        .branch-label${n} { fill: ${e.nodeBorder}; ${h?`font-weight:${e.noteFontWeight}`:""} }
        .commit${n} { stroke: ${o[d]}; fill: ${o[d]}; }
        .commit-highlight${n} { stroke: ${o[d]}; fill: ${o[d]}; }
        .label${n}  { fill: ${fe.has(a)?e.mainBkg:o[d]}; stroke: ${o[d]};  stroke-width: ${e.strokeWidth}; }
        .arrow${n} { stroke: ${o[d]}; }
        `}return i}else{let i="";for(let n=0;n<e.THEME_COLOR_LIMIT;n++)i+=`
        .branch-label${n} { fill: ${e.nodeBorder}; ${h?`font-weight:${e.noteFontWeight}`:""} }
        .commit${n} { stroke: ${e.nodeBorder};   }
        .commit-highlight${n} { stroke: ${e.nodeBorder}; fill: ${e.nodeBorder}; }
        .label${n}  { fill: ${e.mainBkg}; stroke: ${e.nodeBorder}; stroke-width: ${e.strokeWidth}; ${h?`font-weight:${e.noteFontWeight}`:""}}
        .arrow${n} { stroke: ${e.nodeBorder}; }
        .commit-bullets { fill: ${e.nodeBorder}; }
        .commit-cherry-pick${n} { stroke: ${e.nodeBorder}; }
        `;return i}},"genColor"),xe=c(e=>`${Array.from({length:e.THEME_COLOR_LIMIT},(t,a)=>a).map(t=>{let a=t%H;return`
        .branch-label${t} { fill: ${e["gitBranchLabel"+a]}; }
        .commit${t} { stroke: ${e["git"+a]}; fill: ${e["git"+a]}; }
        .commit-highlight${t} { stroke: ${e["gitInv"+a]}; fill: ${e["gitInv"+a]}; }
        .label${t}  { fill: ${e["git"+a]}; }
        .arrow${t} { stroke: ${e["git"+a]}; }
        `}).join(`
`)}`,"normalTheme"),ue=c(e=>{let t=u(),{theme:a}=t,s=$e.has(a);return`
  .commit-id,
  .commit-msg,
  .branch-label {
    fill: lightgrey;
    color: lightgrey;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
  }
  
  ${s?ye(e):xe(e)}

  .branch {
    stroke-width: ${e.strokeWidth};
    stroke: ${e.commitLineColor??e.lineColor};
    stroke-dasharray:  ${s?"4 2":"2"};
  }
  .commit-label { font-size: ${e.commitLabelFontSize}; fill: ${s?e.nodeBorder:e.commitLabelColor}; ${s?`font-weight:${e.noteFontWeight};`:""}}
  .commit-label-bkg { font-size: ${e.commitLabelFontSize}; fill: ${s?"transparent":e.commitLabelBackground}; opacity: ${s?"":.5};  }
  .tag-label { font-size: ${e.tagLabelFontSize}; fill: ${e.tagLabelColor};}
  .tag-label-bkg { fill: ${s?e.mainBkg:e.tagLabelBackground}; stroke: ${s?e.nodeBorder:e.tagLabelBorder}; ${s?`filter:${e.dropShadow}`:""}  }
  .tag-hole { fill: ${e.textColor}; }

  .commit-merge {
    stroke: ${s?e.mainBkg:e.primaryColor};
    fill: ${s?e.mainBkg:e.primaryColor};
  }
  .commit-reverse {
    stroke: ${s?e.mainBkg:e.primaryColor};
    fill: ${s?e.mainBkg:e.primaryColor};
    stroke-width: ${s?e.strokeWidth:3};
  }
  .commit-highlight-outer {
  }
  .commit-highlight-inner {
    stroke: ${s?e.mainBkg:e.primaryColor};
    fill: ${s?e.mainBkg:e.primaryColor};
  }

  .arrow {
    /* Intentional: neo themes keep the bold 8px arrow (like classic themes); only redux-geometry themes use the thinner options.strokeWidth. */
    stroke-width: ${S.has(a)?e.strokeWidth:8};
    stroke-linecap: round;
    fill: none
  }
  .gitTitleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${e.textColor};
  }
`},"getStyles"),be=ue,Ie={parser:le,db:A,renderer:{},styles:be};export{Ie as diagram};
