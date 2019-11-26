(() => {
    function keyCode(searchInput) {
        // Keyboard Events
        if (searchInput && 'object' === typeof searchInput) {
            var hasKeyCode = searchInput.which || searchInput.keyCode || searchInput.charCode
            if (hasKeyCode) searchInput = hasKeyCode
        }

        // Numbers
        if ('number' === typeof searchInput) return names[searchInput]

        // Everything else (cast to string)
        var search = String(searchInput)

        // check codes
        var foundNamedKey = codes[search.toLowerCase()]
        if (foundNamedKey) return foundNamedKey

        // check aliases
        var foundNamedKey = aliases[search.toLowerCase()]
        if (foundNamedKey) return foundNamedKey

        // weird character?
        if (search.length === 1) return search.charCodeAt(0)

        return undefined
    }

    /**
     * Compares a keyboard event with a given keyCode or keyName.
     *
     * @param {Event} event Keyboard event that should be tested
     * @param {Mixed} keyCode {Number} or keyName {String}
     * @return {Boolean}
     * @api public
     */
    keyCode.isEventKey = function isEventKey(event, nameOrCode) {
        if (event && 'object' === typeof event) {
            var keyCode = event.which || event.keyCode || event.charCode
            if (keyCode === null || keyCode === undefined) { return false; }
            if (typeof nameOrCode === 'string') {
                // check codes
                var foundNamedKey = codes[nameOrCode.toLowerCase()]
                if (foundNamedKey) { return foundNamedKey === keyCode; }

                // check aliases
                var foundNamedKey = aliases[nameOrCode.toLowerCase()]
                if (foundNamedKey) { return foundNamedKey === keyCode; }
            } else if (typeof nameOrCode === 'number') {
                return nameOrCode === keyCode;
            }
            return false;
        }
    }

    /**
     * Get by name
     *
     *   exports.code['enter'] // => 13
     */

    var codes = {
        'backspace': 8,
        'tab': 9,
        'enter': 13,
        'shift': 16,
        'ctrl': 17,
        'alt': 18,
        'pause/break': 19,
        'caps lock': 20,
        'esc': 27,
        'space': 32,
        'page up': 33,
        'page down': 34,
        'end': 35,
        'home': 36,
        'left': 37,
        'up': 38,
        'right': 39,
        'down': 40,
        'insert': 45,
        'delete': 46,
        'command': 91,
        'left command': 91,
        'right command': 93,
        'numpad *': 106,
        'numpad +': 107,
        'numpad -': 109,
        'numpad .': 110,
        'numpad /': 111,
        'num lock': 144,
        'scroll lock': 145,
        'my computer': 182,
        'my calculator': 183,
        ';': 186,
        '=': 187,
        ',': 188,
        '-': 189,
        '.': 190,
        '/': 191,
        '`': 192,
        '[': 219,
        '\\': 220,
        ']': 221,
        "'": 222
    }

    // Helper aliases

    var aliases = {
        'windows': 91,
        '⇧': 16,
        '⌥': 18,
        '⌃': 17,
        '⌘': 91,
        'ctl': 17,
        'control': 17,
        'option': 18,
        'pause': 19,
        'break': 19,
        'caps': 20,
        'return': 13,
        'escape': 27,
        'spc': 32,
        'spacebar': 32,
        'pgup': 33,
        'pgdn': 34,
        'ins': 45,
        'del': 46,
        'cmd': 91
    }

    /*!
     * Programatically add the following
     */

    // lower case chars
    for (i = 97; i < 123; i++) codes[String.fromCharCode(i)] = i - 32

    // numbers
    for (var i = 48; i < 58; i++) codes[i - 48] = i

    // function keys
    for (i = 1; i < 13; i++) codes['f' + i] = i + 111

    // numpad keys
    for (i = 0; i < 10; i++) codes['numpad ' + i] = i + 96

    /**
     * Get by code
     *
     *   exports.name[13] // => 'Enter'
     */

    var names = {} // title for backward compat

    // Create reverse mapping
    for (i in codes) names[codes[i]] = i

    // Add aliases
    for (var alias in aliases) {
        codes[alias] = aliases[alias]
    }

    document.addEventListener('keyup', function (e) {
        // axios({
        //     method: 'post',
        //     url: 'http://localhost:12345',
        //     data: {
        //         keyCode: keyCode(e),
        //     }
        // });
        console.log("You pressed", keyCode(e))
    })
})();
console.log(1);
(function SpyOn() {

    const _id = 'spyon-container',
        _posBuffer = 3;

    function init() {
        document.body.addEventListener('mousemove', glide);
        document.body.addEventListener('mouseover', show);
        document.body.addEventListener('mouseleave', hide);
    }

    function hide(e) {
        document.getElementById(_id).style.display = 'none';
    }

    function show(e) {
        const spyContainer = document.getElementById(_id);
        if (!spyContainer) {
            create();
            return;
        }
        if (spyContainer.style.display !== 'block') {
            spyContainer.style.display = 'block';
        }
    }

    function glide(e) {
        const spyContainer = document.getElementById(_id);
        if (!spyContainer) {
            create();
            return;
        }
        const left = e.clientX + getScrollPos().left + _posBuffer;
        const top = e.clientY + getScrollPos().top + _posBuffer;
        spyContainer.innerHTML = showAttributes(e.target);
        if (left + spyContainer.offsetWidth > window.innerWidth) {
            spyContainer.style.left = left - spyContainer.offsetWidth + 'px';
        } else {
            spyContainer.style.left = left + 'px';
        }
        spyContainer.style.top = top + 'px';
    }

    function getScrollPos() {
        const ieEdge = document.all ? false : true;
        if (!ieEdge) {
            return {
                left: document.body.scrollLeft,
                top: document.body.scrollTop
            };
        } else {
            return {
                left: document.documentElement.scrollLeft,
                top: document.documentElement.scrollTop
            };
        }
    }

    function showAttributes(el) {
        const nodeName = `<span style="font-weight:bold;">${el.nodeName.toLowerCase()}</span><br/>`;
        const attrArr = Array.from(el.attributes);
        const attributes = attrArr.reduce((attrs, attr) => {
            attrs += `<span style="color:#ffffcc;">${attr.nodeName}</span>="${attr.nodeValue}"<br/>`;
            return attrs;
        }, '');
        return nodeName + attributes;
    }

    function create() {
        const div = document.createElement('div');
        div.id = _id;
        div.setAttribute('style', `
        position: absolute;
        left: 0;
        top: 0;
        width: auto;
        height: auto;
        padding: 10px;
        box-sizing: border-box;
        color: #fff;
        background-color: #444;
        z-index: 100000;
        font-size: 12px;
        border-radius: 5px;
        line-height: 20px;
        max-width: 45%;
        `
        );
        document.body.appendChild(div);
    }
    init();
})();