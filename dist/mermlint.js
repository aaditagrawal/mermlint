#!/usr/bin/env node
import{enableCompileCache as o}from"node:module";process.env.NODE_DISABLE_COMPILE_CACHE!=="1"&&o();var{main:s}=await import("./chunks/cli-2LGMVOMC.js");s(process.argv.slice(2)).catch(e=>{console.error(`mermlint: ${e?.message||String(e)}`),process.exitCode=2});
