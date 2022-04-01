let calculate = document.getElementById("btn_calculate");

calculate.addEventListener('click', () => {
    console.log("Popup DOM fully loaded and parsed");
    let num1 = document.getElementById("num1").value;
    let num2 = document.getElementById("num2").value;
    num1 = parseInt(num1);
    num2 = parseInt(num2)

    function modifyDOM(pstart, pend) {
        let a = 0;
        let b = 0;
        let c = 0;
        let pageError = "无法计算"
        // alert(document.getElementsByClassName("cur-list").length)
        // alert(document.getElementsByClassName("list-box").length)
        if (document.getElementsByClassName("list-box").length == 0) return pageError + "1"
        let durations = document.getElementsByClassName("list-box")[0].getElementsByClassName("duration")
        if (durations.length == 0) return pageError + "2"

        if (pstart > pend || pstart > durations.length || pend > durations.length || pstart < 1 || pend < 1) return "集数错误"
        for (let i = 0; i < durations.length; i++) {
            if (i >= (pstart - 1) && i < pend) {
                let s = durations[i].innerHTML.split(/^(?:(\d+):)?(?:(\d+):)(\d+)$/);
                if (s.length != 5) return pageError + "3"
                a += parseInt((s[1] != undefined) ? s[1] : 0);
                b += parseInt(s[2]);
                c += parseInt(s[3]);
                if (c >= 60) {
                    b += Math.floor(c / 60);
                    c = c % 60;
                }
                if (b >= 60) {
                    a += Math.floor(b / 60);
                    b = b % 60;
                }
            }
        }
        return a + ":" + b + ":" + c;
    }

    // const tabId = window.tabs[0].id;
    chrome.tabs.query({currentWindow: true, active: true}, function (tabArray) {
        chrome.scripting.executeScript(//     {
            //     code: '(' + modifyDOM + ')(' + num1 + ',' + num2 + ');' //argument here is a string but function.toString() returns function's code
            // },
            {
                target: {tabId: tabArray[tabArray.length - 1].id}, // target: {allFrames: true},
                func: modifyDOM, args: [num1, num2],
            }, (results) => {
                document.getElementById("result").setAttribute("value", results[0].result);
            });

    })


});
