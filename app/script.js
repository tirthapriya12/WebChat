
function onLoad() {

    var socket = io.connect(),
        messageBox = $('#message'),
        sendButton = $('#send'),
        messageContainer = $('.messages'),
        sendCallBack = function (event) {
            var message = messageBox.val();
            if (message.length) {
                socket.emit('send-message', message);
                messageBox.val('');
            }

        },
        newMessageCallBack = function (data) {
            var message = data.msg,
                messageFormat = `<div class="well message">${message}</div>`;
            messageContainer.append(messageFormat);
        }
    attachEvent('click', sendButton, sendCallBack);
    attachEvent('keydown', messageBox, function (event) {
        if (event.keyCode === 13 || event.which === 13) {
            sendButton.trigger('click')
        }
    })
    attachEvent('new-message', socket, newMessageCallBack);

}

function attachEvent(type, elm, callBack) {
    if (elm) {
        elm.on(type, callBack);
    }
}

$(document).ready(onLoad);