
function onLoad() {
    var socket = io.connect(),
        messageBox = $('#message'),
        sendButton = $('#send'),
        messageContainer = $('.messages'),
        sendCallBack = function (event) {
            var message = messageBox.val();
            if (message.length) {
                socket.emit('send-message', {message:message,name:name});
                messageBox.val('');
            }

        },
        newMessageCallBack = function (data) {
            var message = data.msg,
                name = data.name,
                messageFormat = `<div class="well message">${name}: ${message}</div>`;
            messageContainer.append(messageFormat);
        }
    attachEvent('click', sendButton, sendCallBack);
    attachEvent('keydown', messageBox, function (event) {
        if (event.keyCode === 13 || event.which === 13) {
            sendButton.trigger('click')
        }
    })
    attachEvent('new-message', socket, newMessageCallBack);
    $('#nameModal').modal('show');
    $('#done').on('click',function(){
        name=$('#name').val();
        $('#nameModal').modal('hide');
    });

}

function attachEvent(type, elm, callBack) {
    if (elm) {
        elm.on(type, callBack);
    }
}

$(document).ready(onLoad);