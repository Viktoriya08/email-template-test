function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as o}from"./index-6KYmnAOa.js";function e(){return{checkDialogSupport:e=>{window.HTMLDialogElement||o((()=>import("./dialog-polyfill.esm-chunk-XnPKOI3f.js")),__vite__mapDeps([])).then((({default:o})=>{o.registerDialog(e)}))}}}export{e as u};
