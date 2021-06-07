export const isTrue = (value) => {//是否为布尔值true
    return value === true;
};

export const getStrTime = (exdays) => {//获取保留日期
    let exdate = new Date(); //获取时间
    let saveTime = exdate.getTime() + 24 * 60 * 60 * 1000 * exdays;
    exdate.setTime(saveTime); //保存的天数
    return exdate.toGMTString();
}

export const setWinCookie = ({cookieName = '', cookieValue = '', exdateStr = '',}) => {//设置cookie
    window.document.cookie = cookieName + "=" + cookieValue + ";path=/;expires=" + exdateStr;
}

export const getRemeberFlag = (value) => {
    return value + "remeberFlag";
}

export const currying = (fn, ...args) => {//函数柯里化，纯函数化
    if(!fn.bind()) throw new Error("不是函数！");
    return fn.bind(null, ...args);
}

export const isEqual = (val1, val2) => {//是否相等
    return val1 == val2;
};