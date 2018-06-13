var parseID = 'Cz6DwmLWSLgmTygjtJor7a05yYD6KiwXpFeu7A4f';
var parseRestKey = 'm03I50Op2XlyPA9T9MBr7tEakg7YuUbjQgzvIorv';

$(document).ready(function(){
    getMessages()
    $('#send').click(function(){
        
        var $sendButton = $(this);
        $sendButton.html('<img src="img/spinner.gif" width="20" />');
        var username = $('input[name=username]').val();
        var message = $('input[name=message]').val();

        $.ajax({
            url: 'https://api.parse.com/1/classes/aplicacionparse',
            headers: {
                'X-Parse-Application-Id': parseAppID,
                'X-Parse-REST-API-Key': parseRestKey
            },
            contentType: 'application/json',

            dataType: 'json',
            processData: false,
            data: JSON.stringify({
                'username': username,
                'message': message
            }),
            type: 'POST',
            success: function() {
                console.log('sent')

                getMessages()
                $sendButton.html('SEND')
            },
            error: function() {
                console.log('error')
                $sendButton.html('SEND')
            }
        });
    });
});

        function getMessages() {
            $.ajax({
                url: 'https://api.parse.con/1/classes/aplicacionparse?limit=1000',

                headers: {
                    'X-Parse-Application-Id': parseAppID,
                    'X-Parse-REST-API-Key': parseRestKey
                },
                contentType: 'application/json',
                dataType: 'json',
                type: 'GET',

                success: function(data) {
                    console.log('get')
                    updateView(data)
                },
                error: function() {
                    console.log('error')
                }
            });
        }

        function updateView(message){
            var table = $('.table tbody');
            table.html('');

            $.each(message.results, function (index, value) {
                var trEl = ('<tr><td>'
                            + value.username
                            + '</td><td>'
                            + value.message +
                            '</td></tr>')
                
                table.append(trEl)
            })
            console.log(messages)
        }

