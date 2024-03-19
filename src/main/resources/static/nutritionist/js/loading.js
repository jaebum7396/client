let pStart = { x: 0, y: 0 };
let pCurrent = { x: 0, y: 0 };
//let cards = document.querySelectorAll(".card");
let target = document.querySelector("#main_screen");
let main = document.querySelector("#main_container");
let isLoading = false;

function loading() {
    isLoading = true;
    target.style.transform = `translateY(0px)`;
    location.reload();
    /*setTimeout(() => {
        target.style.transform = `translateY(-50px)`;
        isLoading = false;
        for (const card of cards) {
            card.style.transform = `rotateX(0deg)`;
        }
        location.reload();
    }, 2000);*/
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
    if (main.scrollTop === 0 && !isLoading) {
        //for (const card of cards) card.style.transform = `rotateX(0deg)`;
    }
}

function swipe(e) {
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
        //for (const card of cards) card.style.transform = `rotateX(${rotation}deg)`;
    }
}

main.addEventListener("touchstart", e => swipeStart(e), false);
main.addEventListener("touchmove", e => swipe(e), false);
main.addEventListener("touchend", e => swipeEnd(e), false);

