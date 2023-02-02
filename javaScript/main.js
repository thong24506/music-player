const account = 'thongND';
const password = 'musicplayer';
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const accountValue = $('#account');
const passwordValue = $('#password');
const button = $('#button');
const login = $('#login')

// Xử Lý đi đến trang musicplayer

button.onclick = function() {
    if (accountValue.value === account && passwordValue.value === password) {
        login.innerHTML = `<a id="link-music" href="./musicPlayer.html" style="display: none;">Click vào đây để đến trang musicplayer</a>`;
        const goToMusicPlayer = $('#link-music');
        goToMusicPlayer.click();
    }
    else if (accountValue.value.trim() === '' || passwordValue.value === '') {
        if (accountValue.value.trim() === '') {
            inputAccount.onblur();
        }
        if (passwordValue.value === '') {
            inputPassword.onblur();
        }
        unWrongInformation();
    }
    else {
        wrongInformation()
    }  
}

// Định nghĩa hàm để xử lý form đăng nhập
var textMessage = 'Vui lòng nhập thông tin';
function checkValue(value) {
    return value === '' ? textMessage : undefined;
}

function wrongInformation () {
    $('#message-wrongInformation').innerText = 'Tên đăng nhập hoặc mật khẩu không chính xác';
}

function unWrongInformation() {
    $('#message-wrongInformation').innerText = '';
}

// Xử lý báo lỗi form đăng nhập
const loginItem = $$('.login-item');
const inputAccount = $('#account');
const inputPassword = $('#password');


    inputAccount.onblur = function (e) {
        const inputAccountValue = inputAccount.value.trim();
        if (checkValue(inputAccountValue) === textMessage) {
            $('#message-account').innerText = textMessage;
            unWrongInformation();
        } else {
            $('#message-account').innerText = '';
        }
    }

    inputPassword.onblur = function (e) {
        const inputPasswordValue = inputPassword.value;
        if (checkValue(inputPasswordValue) === textMessage) {
            $('#message-password').innerText = textMessage;
            unWrongInformation();
        } else {
            $('#message-password').innerText = '';
        }
    }


document.onkeydown = function(e) {

    if (e.key === 'Enter') {
        inputAccount.blur();
        inputPassword.blur();
        button.onclick();
    }
}

inputAccount.oninput = function() {
    if (inputAccount.value.trim() !== '') {
        $('#message-account').innerText = '';
    }
}

inputPassword.oninput = function() {
    if(inputPassword.value != '') {
        $('#message-password').innerText = '';
    }
}