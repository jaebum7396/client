const pStart = { x: 0, y: 0 };
const pCurrent = { x: 0, y: 0 };
const cards = document.querySelectorAll(".card");
const main = document.querySelector("#chatbox");
let isLoading = false;

function loading() {
    isLoading = true;
    main.style.transform = `translateY(0px)`;
    setTimeout(() => {
        main.style.transform = `translateY(-50px)`;
        isLoading = false;
        for (const card of cards) {
            card.style.transform = `rotateX(0deg)`;
        }
    }, 2000);
}

function swipeStart(e) {
    if (typeof e["targetTouches"] !== "undefined") {
        let touch = e.targetTouches[0];
        pStart.x = touch.screenX;
        pStart.y = touch.screenY;
    } else {
        pStart.x = e.screenX;
        pStart.y = e.screenY;
    }
}

function swipeEnd(e) {
    // 내부 요소가 스크롤되고 있을 때는 로딩을 실행하지 않음
    if (e.target === main && main.scrollTop === 0 && !isLoading) {
        for (const card of cards) card.style.transform = `rotateX(0deg)`;
    }
}

function swipe(e) {
    // 내부 요소가 스크롤되고 있을 때는 로딩을 실행하지 않음
    if (e.target === main) {
        if (typeof e["changedTouches"] !== "undefined") {
            let touch = e.changedTouches[0];
            pCurrent.x = touch.screenX;
            pCurrent.y = touch.screenY;
        } else {
            pCurrent.x = e.screenX;
            pCurrent.y = e.screenY;
        }
        let changeY = pStart.y < pCurrent.y ? Math.abs(pStart.y - pCurrent.y) : 0;
        const rotation = changeY < 100 ? changeY * 30 / 100 : 30;
        if (main.scrollTop === 0) {
            if (changeY > 100) loading();
            for (const card of cards) card.style.transform = `rotateX(${rotation}deg)`;
        }
    }
}

document.addEventListener("touchstart", e => swipeStart(e), false);
document.addEventListener("touchmove", e => swipe(e), false);
document.addEventListener("touchend", e => swipeEnd(e), false);