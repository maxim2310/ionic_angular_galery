import{V as h,b as a,e as n,i as o,l as r,m as l}from"./chunk-QFSULYQ5.js";var f=(()=>{let t=class t{constructor(e){this.httpClient=e,this.items=new a([]),this.items$=this.items.asObservable(),this.loading=new a(!1),this.loading$=this.loading.asObservable()}loadItems(){this.loading.next(!0),this.httpClient.get("assets/data/items.json").pipe(o(2e3)).subscribe(e=>{this.items.next(e),this.loading.next(!1)})}getItemsByTitle(e){this.loading.next(!0),this.httpClient.get("assets/data/items.json").pipe(o(2e3),n(i=>i.filter(c=>c.title.toLocaleLowerCase().includes(e.toLocaleLowerCase())))).subscribe(i=>{this.items.next(i),this.loading.next(!1)})}};t.\u0275fac=function(i){return new(i||t)(l(h))},t.\u0275prov=r({token:t,factory:t.\u0275fac,providedIn:"root"});let s=t;return s})();export{f as a};
