import store from '../store'

export const getTableH = (tags = []) => {//获取表格高度，接受计算差值的数组class名称
    const HEADER_H = document.getElementsByClassName('headbar')[0].clientHeight;
    const FOOTER_H = document.getElementById('footer').clientHeight;
    let bodyH = document.body.clientHeight;
    let tableH = bodyH - HEADER_H - FOOTER_H;
    if(tags.length > 0) {
        tags.map( itemTag => {
            tableH = tableH - document.getElementsByClassName(itemTag)[0].clientHeight ;
        })
    }
    return tableH;
}

export const updateVueX = () => {
    //在页面加载时读取sessionStorage里的状态信息
    let store = sessionStorage.getItem("store");
    if (store) {
        store.replaceState(Object.assign({}, store.state, JSON.parse(store)))
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store",JSON.stringify(store.state))
    })
}
