export const injectDialogStyles = () => {
    if (typeof document === 'undefined') return; // Skip during SSR
  
    const style = document.createElement('style');
    style.textContent = `
      /* 
	
The MIT License (MIT)

Copyright (c) 2017 Etienne Martin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/


#dialog-holder,
#dialog-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    transform: translateZ(0)
}

#dialog-holder,
#dialog-holder #dialog-center td .dialog-alert label input {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale
}

#dialog-overlay {
    bottom: 0;
    z-index: 966;
    color: #fff;
    text-align: center;
    font-size: 18px;
    text-shadow: none;
    background: rgba(51, 51, 51, .6);
    opacity: 0;
    transition: opacity .5s
}

#dialog-overlay.dialog-closing {
    transition: opacity .25s
}

#dialog-overlay.dialog-visible {
    opacity: 1
}

#dialog-holder {
    height: 100%;
    z-index: 977;
    cursor: default
}

#dialog-holder.dialog-fixed {
    position: fixed;
    overflow: auto
}

#dialog-holder #dialog-center {
    width: 100%;
    height: 100%;
    z-index: 999;
    border-spacing: 0;
    padding: 0;
    margin: 0
}

#dialog-holder #dialog-center td {
    text-align: center;
    vertical-align: middle;
    padding: 5%;
    margin: 0;
    width: 90%;
    perspective: 1000px
}

#dialog-holder #dialog-center td .dialog-alert {
    position: relative;
    margin: 0 auto;
    padding: 10px 30px;
    background: #fff;
    z-index: 999;
    max-width: 400px;
    word-break: break-word;
    display: none;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, .1) 0 2px 3px, rgba(0, 0, 0, .2) 0 5px 15px;
    opacity: 0;
    transition: transform .5s, opacity .45s;
    font-size: 14px;
    color: #666
}

@keyframes shake {

    20%,
    60% {
        transform: translateX(-12px) rotateY(-8deg)
    }

    40%,
    80% {
        transform: translateX(12px) rotateY(8deg)
    }
}

#dialog-holder #dialog-center td .dialog-alert[data-dialog-animation=scale] {
    -ms-transform: scale(.8);
    transform: scale(.8)
}

#dialog-holder #dialog-center td .dialog-alert[data-dialog-animation=slide] {
    -ms-transform: translateY(-50%);
    transform: translateY(-50%)
}

#dialog-holder #dialog-center td .dialog-alert.dialog-closing {
    transition: transform .25s, opacity .2s
}

#dialog-holder #dialog-center td .dialog-alert.dialog-visible {
    -ms-transform: scale(1);
    transform: scale(1);
    opacity: 1
}

#dialog-holder #dialog-center td .dialog-alert.dialog-shaking {
    animation: shake .5s linear
}

#dialog-holder #dialog-center td .dialog-alert .dialog-border {
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border: 1px solid #000;
    z-index: -1;
    border-radius: 5px;
    opacity: .2
}

#dialog-holder #dialog-center td .dialog-alert .dialog-title {
    padding: 20px 5px 0;
    line-height: 25px;
    font-size: 24px;
    display: block;
    color: #555;
    font-weight: 400
}

#dialog-holder #dialog-center td .dialog-alert .dialog-title:empty {
    padding-top: 0
}

#dialog-holder #dialog-center td .dialog-alert .dialog-message {
    padding: 20px 5px 0;
    line-height: 1.444;
    display: block;
    max-width: 370px;
    margin: 0 auto
}

#dialog-holder #dialog-center td .dialog-alert .dialog-message a {
    color: #007eff
}

#dialog-holder #dialog-center td .dialog-alert .dialog-message:empty {
    padding-top: 0
}

#dialog-holder #dialog-center td .dialog-alert label {
    display: block;
    margin: 20px auto 0;
    max-width: 300px
}

#dialog-holder #dialog-center td .dialog-alert label input {
    box-sizing: border-box;
    padding: 15px 20px;
    border: 2px solid #007eff;
    border-radius: 100px;
    outline: 0;
    width: 100%;
    font-size: 14px;
    color: #555
}

#dialog-holder #dialog-center td .dialog-alert .dialog-cancel,
#dialog-holder #dialog-center td .dialog-alert .dialog-confirm {
    display: block;
    margin: 20px auto 10px;
    padding: 15px 30px;
    background: #eee;
    cursor: pointer;
    border-radius: 100px;
    font-weight: 700;
    max-width: 240px;
    transition: background .25s;
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .1);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none
}

#dialog-holder #dialog-center td .dialog-alert .dialog-cancel:hover,
#dialog-holder #dialog-center td .dialog-alert .dialog-confirm:hover {
    background: #e1e1e1
}

#dialog-holder #dialog-center td .dialog-alert .dialog-cancel:active,
#dialog-holder #dialog-center td .dialog-alert .dialog-confirm:active {
    box-shadow: inset 0 1px 0 rgba(0, 0, 0, .1)
}

#dialog-holder #dialog-center td .dialog-alert .dialog-cancel.dialog-confirm,
#dialog-holder #dialog-center td .dialog-alert .dialog-confirm.dialog-confirm {
    background: #007eff;
    color: #fff;
    margin-bottom: 20px
}

#dialog-holder #dialog-center td .dialog-alert .dialog-cancel.dialog-confirm:hover,
#dialog-holder #dialog-center td .dialog-alert .dialog-confirm.dialog-confirm:hover {
    background: #0071e6
}

#dialog-holder #dialog-center td .dialog-alert .dialog-cancel.dialog-cancel+.dialog-confirm,
#dialog-holder #dialog-center td .dialog-alert .dialog-confirm.dialog-cancel+.dialog-confirm {
    margin-top: 10px
}

#dialog-holder #dialog-center td .dialog-alert .dialog-close {
    position: absolute;
    top: 15px;
    right: 15px;
    margin-bottom: -10px;
    cursor: pointer;
    line-height: 10px;
    padding: 5px;
    font-size: 24px;
    opacity: .5;
    transition: opacity .25s;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-transform: translateZ(0)
}

#dialog-holder #dialog-center td .dialog-alert .dialog-close:hover {
    opacity: 1
}

#dialog-holder #dialog-center td .dialog-alert .dialog-close:before {
    content: "";
    position: absolute;
    top: -15px;
    left: -15px;
    right: -15px;
    bottom: -15px
}

#dialog-holder #dialog-center td .dialog-alert .dialog-clearFloat {
    clear: both;
    width: 100%;
    height: 1px;
    display: block
}
    `;
    document.head.appendChild(style);
  };