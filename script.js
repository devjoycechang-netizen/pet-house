
// 讀取寵物名稱，預設為花枝丸
let petName = localStorage.getItem("petName") || "花枝丸";

// 讀取之前儲存的資料，沒有資料就使用初始值
let savedPet = JSON.parse(localStorage.getItem("huazhiwan")) || {
    hunger: 80,
    mood: 80,
    energy: 80
};

let hunger = savedPet.hunger;
let mood = savedPet.mood;
let energy = savedPet.energy;

// 儲存寵物狀態
function savePet() {
    localStorage.setItem("huazhiwan", JSON.stringify({
        hunger: hunger,
        mood: mood,
        energy: energy
    }));
}

// 更新畫面
function updateStatus() {
    document.getElementById("hunger").textContent = hunger;
    document.getElementById("mood").textContent = mood;
    document.getElementById("energy").textContent = energy;

    updatePetMessage();
    savePet();
}

// 餵食
function feedPet() {
    hunger = Math.min(100, hunger + 20);

    changePetAnimation("idle");

    updateStatus();
}

// 玩耍
function playPet() {
    if (energy < 15) {
        alert("花枝丸太累了，先讓牠休息一下吧！");
        return;
    }

    mood = Math.min(100, mood + 20);
    energy = Math.max(0, energy - 15);
    hunger = Math.max(0, hunger - 10);

    changePetAnimation("jump");

    updateStatus();
}

// 睡覺
function sleepPet() {
    energy = Math.min(100, energy + 30);

    changePetAnimation("sleep");

    updateStatus();
}

// 初始化
updateStatus();

// 每 30 秒降低寵物狀態
setInterval(() => {
    hunger = Math.max(0, hunger - 1);
    mood = Math.max(0, mood - 1);
    energy = Math.max(0, energy - 1);

    updateStatus();
}, 30000);

function updatePetMessage() {
    const message = document.getElementById("petMessage");

    if (energy <= 20) {
        message.textContent = "💤 花枝丸好累……想睡覺了……";
    } else if (hunger <= 20) {
        message.textContent = "🍖 花枝丸肚子餓了……";
    } else if (mood <= 20) {
        message.textContent = "🥺 花枝丸有點寂寞……陪牠玩一下吧！";
    } else if (hunger >= 80 && mood >= 80 && energy >= 80) {
        message.textContent = "💕 花枝丸今天精神超好！";
    } else {
        message.textContent = "🐶 汪！今天也要一起玩嗎？";
    }
}

// 修改寵物名稱
function changePetName() {
    const input = document.getElementById("nameInput");
    const newName = input.value.trim();

    if (newName === "") {
        alert("請輸入寵物名字！");
        return;
    }

    petName = newName;

    // 更新畫面
    document.getElementById("petName").textContent = petName;

    // 保存名字
    localStorage.setItem("petName", petName);

    // 清空輸入欄位
    input.value = "";

    alert("成功！" + petName + " 的名字設定完成！");
}

// 網頁載入時顯示已保存的名字
document.getElementById("petName").textContent = petName;

// 切換花枝丸動畫
function changePetAnimation(animation) {
    const pet = document.getElementById("petImage");

    clearTimeout(pet.animationTimer);
    clearTimeout(pet.autoWalkTimer);

    pet.classList.remove("idle", "walk", "jump", "sleep");
    pet.classList.add(animation);

    if (animation === "jump") {
        pet.animationTimer = setTimeout(() => {
            changePetAnimation("idle");
        }, 1000);
    }

    if (animation === "sleep") {
        pet.animationTimer = setTimeout(() => {
            changePetAnimation("idle");
        }, 3000);
    }

    if (animation === "walk") {
        pet.animationTimer = setTimeout(() => {
            changePetAnimation("idle");
        }, 3000);
    }

    // 待機一段時間後，隨機開始散步
    if (animation === "idle") {
        const randomTime = Math.random() * 7000 + 8000;

        pet.autoWalkTimer = setTimeout(() => {
            changePetAnimation("walk");
        }, randomTime);
    }
}

// 散步
function walkPet() {
    changePetAnimation("walk");
}

changePetAnimation("idle");