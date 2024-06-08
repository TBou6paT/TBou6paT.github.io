window.onload = function(){
    let advTime = true;
    let showAdv = undefined;
    let interval;
    if(window.YaGames){
        YaGames.init({
            adv: {
                onAdvClose: wasShown => {
                    if(!wasShown){
                        advTime = true;
                        clearInterval(interval);
                    }
                }
            }
        }).then(ysdk => {
            showAdv = () => {
                ysdk.adv.showFullscreenAdv({
                    callbacks: {
                        onClose: function() {
                            advTime = false;
                            interval = setTimeout(()=>{
                                advTime = true;
                            }, 250000);
                        }
                    }
                });
            };
        });
    }
    let ww;
    let wh;
    let selectedIcons = [];
    const ELEMENTS = [
        {name: 'Жизнь', img: 'life.png', id: 2, contacts: {6: 13, 18: 17, 26: 22, 6:23 }},
        {name: 'Вода', img: 'water.png', id: 3, contacts: {7: 11, 14: 15, 6: 18}},
        {name: 'Ветер', img: 'wind.png', id: 4, contacts: {6: 9}},
        {name: 'Огонь', img: 'fire.png', id: 5, contacts: {9: 12, 20: 21, 33: 34, 38: 39, 49: 41}},
        {name: 'Земля', img: 'ground.png', id: 6, contacts: {4: 9, 2: 13, 3:18, 2:23, 14:27}},
        {name: 'Энергия', img: 'energy.png', id: 7, contacts: {11: 10, 3:11, 31: 32}},
        {name: 'Время', img: 'time.png', id: 8, contacts: {28: 29}},
        {name: 'Песок', img: 'sand.png', id: 9, contacts: {5: 12, 14:15, 18: 19}},
        {name: 'Солнце', img: 'sun.png', id: 10, contacts: {}},
        {name: 'Газ', img: 'gas.png', id: 11, contacts: {7: 10}},
        {name: 'Стекло', img: 'glass.png', id: 12, contacts: {22: 36}},
        {name: 'Семена', img: 'seeds.png', id: 13, contacts: {2: 14}},
        {name: 'Проросток', img: 'seedling.png', id: 14, contacts: {9: 15, 6: 27, 7:33}},
        {name: 'Сахарный тростник', img: 'sugar cane.png', id: 15, contacts: {22: 16}},
        {name: 'Сахар', img: 'sugar.png', id: 16, contacts: {37: 31}},
        {name: 'Бактерии', img: 'bacteria.png', id: 17, contacts: {7: 44, 210: 211}},
        {name: 'Болото', img: 'swamp.png', id: 18, contacts: {9: 19, 23: 24}},
        {name: 'Глина', img: 'clay.png', id: 19, contacts: {22: 20}},
        {name: 'Глиняный сосуд', img: 'clay vessel.png', id: 20, contacts: {5: 27}},
        {name: 'Керамика', img: 'ceramics.png', id: 21, contacts: {}},
        {name: 'Человек', img: 'person.png', id: 22, contacts: {15: 16, 19: 20, 27: 28, 12 : 36, 33: 43, 45: 46}},
        {name: 'Червь', img: 'worm.png', id: 23, contacts: {18: 24, 24: 25}},
        {name: 'Змея', img: 'snake.png', id: 24, contacts: {23: 25, 25: 26}},
        {name: 'Ящерица', img: 'lizard.png', id: 25, contacts: {24: 26}},
        {name: 'Зверь', img: 'beast.png', id: 26, contacts: {2: 22}},
        {name: 'Виноград', img: 'grape.png', id: 27, contacts: {22: 28}},
        {name: 'Виноградный сок', img: 'grape juice.png', id: 28, contacts: {8: 29}},
        {name: 'Внинная кислота', img: 'tartaric acid.png', id: 29, contacts: {35: 30}},
        {name: 'Соль Рошеля', img: 'rochelle salt.png', id: 30, contacts: {32: 48}},
        {name: 'Молочная кислота', img: 'lactic acid.png', id: 31, contacts: {7: 32}},
        {name: 'PLA', img: 'pla.png', id: 32, contacts: {42: 49, 30: 48}},
        {name: 'Трава', img: 'grass.png', id: 33, contacts: {5: 34, 22: 43}},
        {name: 'Зола', img: 'ash.png', id: 34, contacts: {3: 35, 22: 38}},
        {name: 'Щёлочь', img: 'alkali.png', id: 35, contacts: {0: 27, 210: 38}},
        {name: 'Чашка Петри', img: 'petri dish.png', id: 36, contacts: {17: 38}},
        {name: 'Колония бактерий', img: 'colony of bacteria.png', id: 37, contacts: {16: 31}},
        {name: 'Фосфор', img: 'phosphorus.png', id: 38, contacts: {5: 39}},
        {name: 'Оксид фосфора', img: 'phosphorus oxide.png', id: 39, contacts: {3: 40}},
        {name: 'Фосфорная кислота', img: 'phocphoric acid.png', id: 40, contacts: {0: 27}},
        {name: 'Оксид кальция', img: 'calcium oxide.png', id: 41, contacts: {3: 42}},
        {name: 'Гидроксид кальция', img: 'calcium hydroxide.png', id: 42, contacts: {40: 49}},
        {name: 'Эфирные масла', img: 'essential oil.png', id: 43, contacts: {}},
        {name: 'L-аргинин', img: 'l-arginine.png', id: 44, contacts: {49: 47}},
        {name: 'Наша жевательная резинка', img: 'our chewing gum.png', id: 45, contacts: {22: 50}},
        {name: '1 часть жвачки', img: '1.png', id: 47, contacts: {48: 45}},
        {name: '2 часть жвачки', img: '2.png', id: 48, contacts: {47: 45}},
        {name: 'Гидроксиапатит кальция', img: '3.png', id: 49, contacts: {44: 47, 5: 41}},
        {name: 'Счастливый человек', img: '50', id: 50, contacts: {22: 50}},
    ];
    let localMyElements = localStorage.getItem('myElements');
    let localMapElements = localStorage.getItem('mapElements');
    let mapElements = localMapElements ?  JSON.parse(localMapElements): [];
    let got = document.querySelector('.got');
    let myElements =  localMyElements ? localMyElements.split(',') : [4,6];
    function getNextElement(){
        for(let i = 0; i < ELEMENTS.length; i++){
            if(i === 161) continue;
            if(!myElements.includes(i)){
                let canGet = canGetElement(i);
                if(!canGet) continue;
                return ELEMENTS[i].name;
            }
        }
        if(!myElements.includes(161)) return 'Игра скопа';
        return 'Ошибка.';
    }
    function canGetElement(id) {
        for(let i = 0; i < myElements.length; i++){
            for(let key in ELEMENTS[i].contacts){
                if(ELEMENTS[i].contacts[key] === id){
                    return true;
                }
            }
        }
        return false;
    }
    if(localMyElements){
        myElements = myElements.map(e=>Number(e));
    }
    changeGot();
    function changeGot() {
        got.innerText = 'Получено элементов:' + myElements.length +'/'+ ELEMENTS.length +'. Ближайший элемент: ' + getNextElement();
    }
    const tableSelector = document.querySelector(".table");
    const iconsList = document.querySelector(".icons");
    const iconSize = 50;
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    ww = (iOS) ? screen.width : window.outerWidth;
    wh = (iOS) ? screen.height : window.outerHeight;
    if(iOS){
        document.documentElement.addEventListener('gesturestart', function (event) {
            event.preventDefault();
        }, false);
    }
    //Если первая игра, выдаём 4 элемента
    if(!localMapElements){
        newGame();
    }else{
        mapElements.forEach((el, index)=>{
            if(el === null) return;
            addElementToTable(ELEMENTS[Number(el.id)],
                Number(el.x.substr(0, el.x.indexOf('px'))),
                Number(el.y.substr(0, el.y.indexOf('px'))),
                index)
        });
    }
    addAllElementsToList();
    function newGame(){
        addElementToTable(ELEMENTS[0], ww/2-iconSize*2, wh/2-iconSize*2.5);
        addElementToTable(ELEMENTS[1], ww/2+iconSize, wh/2-iconSize*2.5);
        addElementToTable(ELEMENTS[3], ww/2-iconSize*0.5, wh/2-iconSize*4);
        addElementToTable(ELEMENTS[2], ww/2-iconSize*0.5, wh/2-iconSize);
    }
    //Соединить элементы
    function connectElements(el1, el2) {
        let n1 = Number(el1.getAttribute('data-id'));
        let n2 = Number(el2.getAttribute('data-id'));
        let newEl = ELEMENTS[n1].contacts[n2] || ELEMENTS[n2].contacts[n1];
        //Соединяем координаты двух элементов и делим пополам
        let x = (Number(
            el1.style.left.substr(0, el1.style.left.indexOf('px') ) )
            + Number(el2.style.left.substr(0, el2.style.left.indexOf('px'))) )/2;
        let y = (Number(el1.style.top.substr(0, el1.style.top.indexOf('px')))
            + Number(el2.style.top.substr(0, el2.style.top.indexOf('px'))))/2;
        if(newEl){
            addElementToTable(ELEMENTS[newEl], x, y);
            //Удалить скрещенные элементы
            deleteElement(el1);
            deleteElement(el2);
            //Если элемента нет в коллекции, добавить его
            if(!myElements.includes(newEl)){
                myElements.push(newEl);
                localStorage.setItem('myElements', myElements);
                addElementToList(ELEMENTS[newEl]);
                changeGot();
                if(myElements.length === ELEMENTS.length){
                    got.innerText = 'Вы открыли все элементы! Поздравляем! Вы можете начать новую игру или построить красивые картинки из созданных элементов!';
                }
            }
            return true;
        }
        return false;

    }
    //Удалить элемент
    function deleteElement(el) {
        let id = el.getAttribute('data-map-id');
        if(id){
            mapElements[id] = null;
            localStorage.setItem('mapElements', mapElements);
        }
        el.remove();
    }
    //Добавление элемента на поле
    function addElementToTable(el, x, y) {
        let div = createElement(el);
        //При условии переданной позиции элемента
        if(y) div.style.top = y + 'px';
        else div.style.top = wh / 2.2 + 'px';
        if(x) div.style.left = x + 'px';
        else div.style.left = ww / 2.2 + 'px';
        dragElement(div);
        let isPhone =  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if(isPhone){
            var touchtime = 0;
            div.onclick =  function() {
                if (touchtime === 0) {
                    touchtime = new Date().getTime();
                } else {
                    if (((new Date().getTime()) - touchtime) < 500) {
                        doublelement(el, this);
                        touchtime = 0;
                    } else {
                        touchtime = new Date().getTime();
                    }
                }
            };
        }else{
            div.ondblclick = function(){
                doublelement(el, this);
            };
        }
        // setIconToMap(div);
        tableSelector.append(div);
    }
    //Дублировать элемент при двойном нажатии
    function doublelement(el, that) {
        let x = Number(that.style.left.substr(0, that.style.left.indexOf('px')));
        let y = Number(that.style.top.substr(0, that.style.top.indexOf('px')));
        addElementToTable(el, x-10, y-5);
    }
    function createElement(el) {
        let div = document.createElement('div');
        div.classList.add('icon');
        div.setAttribute('data-id', el.id);
        let p = document.createElement('p');
        p.classList.add('desc');
        p.innerText = el.name;
        div.append(p);
        div.style.background = 'url(images/' + el.img + ') center center no-repeat';
        return div;
    }
    const map = {
        'q' : 'й', 'w' : 'ц', 'e' : 'у', 'r' : 'к', 't' : 'е', 'y' : 'н', 'u' : 'г', 'i' : 'ш', 'o' : 'щ', 'p' : 'з', '[' : 'х', ']' : 'ъ', 'a' : 'ф', 's' : 'ы', 'd' : 'в', 'f' : 'а', 'g' : 'п', 'h' : 'р', 'j' : 'о', 'k' : 'л', 'l' : 'д', ';' : 'ж', '\'' : 'э', 'z' : 'я', 'x' : 'ч', 'c' : 'с', 'v' : 'м', 'b' : 'и', 'n' : 'т', 'm' : 'ь', ',' : 'б', '.' : 'ю','Q' : 'Й', 'W' : 'Ц', 'E' : 'У', 'R' : 'К', 'T' : 'Е', 'Y' : 'Н', 'U' : 'Г', 'I' : 'Ш', 'O' : 'Щ', 'P' : 'З', '[' : 'Х', ']' : 'Ъ', 'A' : 'Ф', 'S' : 'Ы', 'D' : 'В', 'F' : 'А', 'G' : 'П', 'H' : 'Р', 'J' : 'О', 'K' : 'Л', 'L' : 'Д', ';' : 'Ж', '\'' : 'Э', 'Z' : '?', 'X' : 'ч', 'C' : 'С', 'V' : 'М', 'B' : 'И', 'N' : 'Т', 'M' : 'Ь', ',' : 'Б', '.' : 'Ю'
    };
    let findInput = document.querySelector('.iconsHead input');
    //Поиск по элементам
    findInput.oninput = findElement;
    window.onkeydown = function(e) {
        if(!icons.classList.contains('none') && !findInput.focused){
            findInput.focus();
        }
    };
    function findElement() {
        let text = findInput.value.split('').reduce((acc, e)=>{
            if(map[e]) return acc + map[e];
            return acc + e;
        }, '');
        findInput.value = text;
        deleteAllMenuElements();
        for(let i = 0; i < myElements.length; i++){
            if(ELEMENTS[myElements[i]].name.toLowerCase().includes(text.toLowerCase())){
                addElementToList(ELEMENTS[myElements[i]]);
            }
        }
    }
    //Элементы в меню
    let addIcons = document.querySelector('.addIcons');
    let wwc = ww / 2.2;
    let whc = wh / 2.2;
    let elementsOnTable = [];
    elementsOnTable[0] = [wwc, whc];
    elementsOnTable[1] = [wwc+40, whc+40];
    elementsOnTable[2] = [wwc-40, whc+40];
    elementsOnTable[3] = [wwc+40, whc-40];
    elementsOnTable[4] = [wwc-40, whc-40];
    elementsOnTable[5] = [wwc, whc-60];
    elementsOnTable[6] = [wwc, whc+60];
    elementsOnTable[7] = [wwc+60, whc];
    elementsOnTable[8] = [wwc-60, whc];
    elementsOnTable[9] = [wwc+80, whc+80];
    elementsOnTable[10] = [wwc+80, whc-80];
    elementsOnTable[11] = [wwc-80, whc+80];
    elementsOnTable[12] = [wwc-80, whc-80];
    elementsOnTable[13] = [wwc, whc-120];
    elementsOnTable[14] = [wwc, whc+120];
    elementsOnTable[15] = [wwc+120, whc];
    elementsOnTable[16] = [wwc-120, whc];
    elementsOnTable[17] = [wwc, whc+180];
    elementsOnTable[18] = [wwc, whc-180];
    addIcons.onclick = function() {
        for(let i = 0; i < selectedIcons.length; i++){
            let index = i < elementsOnTable.length ? i : i % elementsOnTable.length;
            let x = elementsOnTable[index] ? elementsOnTable[index][0] : wwc;
            let y = elementsOnTable[index] ? elementsOnTable[index][1] : whc;
            addElementToTable(ELEMENTS[selectedIcons[i]], x, y);
        }
        toggleIconsMenu();
    };
    //Удалить все элементы в меню
    function deleteAllMenuElements() {
        document.querySelectorAll('.iconMenu').forEach((e)=>{
            e.remove();
        });
    }
    //Добавить элементы в свой набор
    function addAllElementsToList(){
        selectedIcons = [];
        deleteAllMenuElements();
        myElements.forEach((num)=>{
            addElementToList(ELEMENTS[num]);
        });
    }
    document.querySelector('.add').onclick = function(){
        if(showAdv && advTime){
            showAdv();
        }
        toggleIconsMenu();
    };
    let icons = document.querySelector('.icons');
    function toggleIconsMenu(){
        if(!icons.classList.contains('none')){
            findInput.value = '';
            addAllElementsToList();
        }else{
            addIcons.innerText = 'Закрыть';
        }
        icons.classList.toggle('none');
    }
    function addElementToList(el) {
        let div = createElement(el);
        div.classList.add('iconMenu');
        let num = Number(div.getAttribute('data-id'));
        if(selectedIcons.includes(num)){
            div.classList.add('selectedIcon');
        }
        div.onclick = function(){
            if(selectedIcons.includes(num)){
                div.classList.remove('selectedIcon');
                selectedIcons.splice(selectedIcons.indexOf(num), 1);
            }else{
                selectedIcons.push(num);
                div.classList.add('selectedIcon');
            }


            if(selectedIcons.length === 0){
                addIcons.innerText = 'Закрыть';
            }else{
                addIcons.innerText = 'Добавить';
            }
        };
        iconsList.append(div);
    }
    window.onblur = setAllIconsToMap;
    window.onbeforeunload = setAllIconsToMap;
    window.onpagehide = setAllIconsToMap;
    function setAllIconsToMap() {
        let iconsTable = document.querySelectorAll('.icon:not(.iconMenu)');
        mapElements = [];
        iconsTable.forEach((e)=>{
            setIconToMap(e);
        });
        localStorage.setItem('mapElements', JSON.stringify(mapElements));
    }
    function setIconToMap(el) {
        let num = el.getAttribute('data-id');
        mapElements.push({id: num, x: el.style.left, y: el.style.top});
    }
    /*Перетаскивание элементов*/
    function dragElement(el) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        el.onmousedown = dragMouseDown;
        el.ontouchstart = dragMouseDown;
        function dragMouseDown(e) {
            let cx = e.clientX || e.changedTouches[0].clientX;
            let cy = e.clientY || e.changedTouches[0].clientY;
            pos3 = cx;
            pos4 = cy;
            document.onmouseup = closeDragElement;
            document.ontouchend = closeDragElement;
            document.onmousemove = elementDrag;
            document.ontouchmove = elementDrag;
        }
        function elementDrag(e) {
            let cx = e.clientX || e.changedTouches[0].clientX;
            let cy = e.clientY || e.changedTouches[0].clientY;
            pos1 = pos3 - cx;
            pos2 = pos4 - cy;
            pos3 = cx;
            pos4 = cy;
            el.style.top = (el.offsetTop - pos2) + "px";
            el.style.left = (el.offsetLeft - pos1) + "px";
            let eg = el.getBoundingClientRect();
            if(eg.x + eg.width > ww){
                el.style.left = (el.offsetLeft - pos1 + (ww - eg.x - eg.width)) + "px";
            }else if(eg.x < 0){
                el.style.left = (el.offsetLeft - pos1 - eg.x) + "px";
            }
            const g = document.body.getBoundingClientRect();
            let minus = 0;
            if(ww > 1200) minus = 50;
            if(eg.y + eg.height > wh-minus){
                el.style.top = (el.offsetTop - pos2 + (wh-minus - eg.y - eg.height + g.y)) + "px";
            }else if(eg.y < 0){
                el.style.top = (el.offsetTop - pos2 - eg.y) + "px";
            }
        }
        function closeDragElement(e) {
            el.hidden = true;
            let cx = e.clientX || e.changedTouches[0].clientX;
            let cy = e.clientY || e.changedTouches[0].clientY;
            let elBellow = document.elementFromPoint(cx, cy);
            if(elBellow){
                if(elBellow.classList.contains('icon')){
                    connectElements(el, elBellow);
                }else if(elBellow.classList.contains('drop')){
                    deleteElement(el);
                }
            }
            if(el){
                el.hidden = false;
            }
            document.onmouseup = null;
            document.ontouchend = null;
            document.onmousemove = null;
            document.ontouchmove = null;
        }
    }
    //Нажатие по корзине - удаление всего
    document.querySelector('.drop').onclick = function(){
        let iconsTable = document.querySelectorAll('.icon:not(.iconMenu)');
        iconsTable.forEach((e)=>{
            e.remove();
        })
    };

    let rules = document.querySelector('.rules');
    let caution = document.querySelector('.caution');
    let black = document.querySelector('.blackout');
    document.querySelector('.info').onclick = function() {
        if(showAdv && advTime){
            showAdv();
        }
        openInfo();
    };
    //Первый заход в игру
    if(!localMyElements){
        openInfo()
    }
    function openInfo(){
        rules.classList.toggle('none');
        caution.classList.add('none');
        black.classList.add('none');
    }
    document.querySelector('.close').onclick = function() {
        rules.classList.add('none');
    };
    document.getElementById('delete').onclick = function() {
      caution.classList.remove('none');
      black.classList.remove('none');
    };
    //Удаление всего прогресса игры
    document.getElementById('deleteCertain').onclick = function() {
        caution.classList.add('none');
        black.classList.add('none');
        rules.classList.add('none');
        let icons = document.querySelectorAll('.icon');
        for(let i = 0; i < icons.length; i++){
            icons[i].remove();
        }
        localStorage.removeItem('myElements');
        localStorage.removeItem('mapElements');
        newGame();
        myElements = [0,1,2,3];
        addAllElementsToList();
    };
    document.getElementById('notDelete').onclick = function() {
        caution.classList.add('none');
        black.classList.add('none');
    };
    //Предзагрузка изображений
    try{
        for(let i = 0; i < ELEMENTS.length; i++){
            new Promise(function() {
                new Image().src= 'images/' + ELEMENTS[i].img;
            }).then((ignored)=>{});
        }
    }catch(ignored){}
};
