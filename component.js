/**
 * Created by luye on 10/01/2018.
 */
// jq: css, attr, removeAttr, find, children, prev, next, siblings, parent, closest, delegate, append, after, before, remove, html, text, toggleClass, addClass, hasClass, data
(function(){
    function Table(param) {
        this.init(param);
    };
    Table.prototype = {
        init:function(param){
            console.log(param);
            param.setAttribute('tt', 'cc');
            this.innerHTML = param;
//                this.
        }
    };
    window.Table = Table;
})();
var dom = document.createElement('div');
document.body.appendChild(dom);
var tb = new Table(dom);
