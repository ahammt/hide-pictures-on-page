// ==UserScript==
// @namespace         http://tampermonkey.net/

// @name              一键隐藏图片
// @name:zh           一键隐藏图片
// @name:en           hide pictures on page

// @description       摸鱼时页面显示与工作不相关的图片未免有些明目张胆，这时候就需要一键隐藏全图了。
// @description:zh    摸鱼时页面显示与工作不相关的图片未免有些明目张胆，这时候就需要一键隐藏全图了。
// @description:en    hide all pictures on page by clicking

// @version           0.2.1
// @author            SoyaDokio
// @license           LGPLv3

// @match             *://*/*

// @grant             GM_addStyle

// @require           https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.slim.min.js
// @run-at            document-start
// ==/UserScript==

(function() {
    "use strict";

    init();

    function init() {
        addCtrlPopup();
        addCtrlEvent();
    }

    // 添加控制开关的控制区域
    function addCtrlPopup() {
        var node = document.createElement("hide-pictures-on-page");
        node.id = "hpop-ctrl";
        node.className = "hpop-ctrl";
        node.style.cssText = "position:fixed;top:" + ($(window).height()/2-14) + "px;left:0px;";
        node.innerHTML = "<input type='checkbox' id='hpop-switch' /><label style='cursor:pointer;font-size:12px;color:3d3d3d;'>图片隐藏</label>";
        if (window.self === window.top) {
            if (document.querySelector("body")) {
                document.body.appendChild(node);
            } else {
                document.documentElement.appendChild(node);
            }
        }
        // 给控制开关绑定事件
        node.addEventListener("mouseover", function () {
            node.classList.add("hpop-active");
        });
        node.addEventListener("mouseleave", function () {
            setTimeout(function() {
                node.classList.remove("hpop-active");
            }, 100);
        });
        // 添加控制开关所需式样
        var style = document.createElement("style");
        style.type = "text/css";
        var styleRaw = "#hpop-ctrl{" +
                "position:fixed;" +
                "transform:translate(-63px,0);" +
                "width:64px;" +
                "height:20px;" +
                "font-size:12px;" +
                "font-weight: 500;" +
                "font-family:Verdana, Arial, '宋体';" +
                "background:#f1f1f1;" +
                "z-index:2147483647;" +
                "margin: 0;" +
                "opacity:0.4;" +
                "transition:0.3s;" +
                "overflow:hidden;" +
                "user-select:none;" +
                "text-align:left;" +
                "white-space:nowrap;" +
                "line-height:20px;" +
                "padding:3px 6px;" +
                "border:1px solid #ccc;" +
                "border-width:1px 1px 1px 0;" +
                "border-top-right-radius: 14px;" +
                "border-bottom-right-radius: 14px;" +
                "box-sizing: content-box;" +
            "}" +
            "#hpop-ctrl input{" +
                "margin: 0;" +
                "padding: 0;" +
                "vertical-align:middle;" +
                "-webkit-appearance:checkbox;" +
                "-moz-appearance:checkbox;" +
                "position: static;" +
                "clip: auto;" +
                "opacity: 1;" +
                "cursor: pointer;" +
            "}" +
            "#hpop-ctrl.hpop-active{" +
                "left: 0px;" +
                "width:70px;" +
                "transform:translate(0,0);" +
                "opacity: 0.9;" +
            "}" +
            "#hpop-ctrl label{" +
                "margin:0;" +
                "padding:0 0 0 3px;" +
                "font-weight:500;" +
            "}" +
            " ";
        style.innerHTML = styleRaw;
        if (document.querySelector("#hpop-ctrl")) {
            document.querySelector("#hpop-ctrl").appendChild(style);
        } else {
            GM_addStyle(styleRaw);
        }
    }

    // 绑定控制事件
    function addCtrlEvent() {
        document.querySelector("#hpop-ctrl").addEventListener("click", function() {
            if (document.querySelector("#hpop-switch").checked) {
                document.querySelector("#hpop-switch").checked = false;
                $("img").show("500");
            } else {
                document.querySelector("#hpop-switch").checked = true;
                $("img").hide("500");
            }
        });
        document.querySelector("#hpop-switch").addEventListener("click", function() {
            if (document.querySelector("#hpop-switch").checked) {
                document.querySelector("#hpop-switch").checked = false;
                $("img").hide("500");
            } else {
                document.querySelector("#hpop-switch").checked = true;
                $("img").show("500");
            }
        });
    }
})();